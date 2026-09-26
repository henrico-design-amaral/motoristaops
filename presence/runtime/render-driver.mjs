import fs from 'node:fs/promises';
import path from 'node:path';

function parseArgs(argv) {
  const args = {};
  for (let i = 2; i < argv.length; i += 2) {
    const key = argv[i];
    const value = argv[i + 1];
    if (!key?.startsWith('--') || value == null) {
      throw new Error('Usage: --input <json> --template <html> --output <html>');
    }
    args[key.slice(2)] = value;
  }
  for (const required of ['input', 'template', 'output']) {
    if (!args[required]) throw new Error(`Missing --${required}`);
  }
  return args;
}

function get(obj, dotted) {
  return dotted.split('.').reduce((acc, part) => (acc == null ? undefined : acc[part]), obj);
}

function escapeHtml(value) {
  return String(value ?? '')
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#39;');
}

function requireValue(data, key) {
  const value = get(data, key);
  if (value == null || value === '') throw new Error(`Required field missing: ${key}`);
  return value;
}

function validateUrl(value, key) {
  if (value == null || value === '') return '';
  let url;
  try {
    url = new URL(value);
  } catch {
    throw new Error(`Invalid URL in ${key}`);
  }
  if (url.protocol !== 'https:') throw new Error(`Only https URLs are allowed in ${key}`);
  return url.toString();
}

function render(template, data) {
  const required = [
    'driver.display_name',
    'driver.meta_description',
    'driver.bio',
    'driver.whatsapp_url',
    'driver.whatsapp_display',
    'vehicle.brand',
    'vehicle.model',
    'vehicle.year',
    'vehicle.color',
    'service_areas_text',
    'social_summary'
  ];

  for (const key of required) requireValue(data, key);

  validateUrl(data.driver.whatsapp_url, 'driver.whatsapp_url');
  for (const key of ['driver.instagram', 'driver.linkedin']) {
    const value = get(data, key);
    if (value) validateUrl(value, key);
  }

  let out = template;

  out = out.replace(/{{#if\s+([\w.]+)}}([\s\S]*?){{\/if}}/g, (_match, key, body) => {
    const value = get(data, key);
    return value ? body : '';
  });

  out = out.replace(/{{#each\s+services}}([\s\S]*?){{\/each}}/g, (_match, body) => {
    const services = Array.isArray(data.services) ? data.services : [];
    return services.map((service) => body
      .replaceAll('{{label}}', escapeHtml(service.label))
      .replaceAll('{{description}}', escapeHtml(service.description ?? ''))
    ).join('\n');
  });

  out = out.replace(/{{([\w.]+)}}/g, (_match, key) => {
    const value = get(data, key);
    if (value == null) throw new Error(`Unresolved field: ${key}`);
    return escapeHtml(value);
  });

  if (out.includes('{{')) throw new Error('Unresolved template token detected');
  return out;
}

const args = parseArgs(process.argv);
const [template, raw] = await Promise.all([
  fs.readFile(args.template, 'utf8'),
  fs.readFile(args.input, 'utf8')
]);

const data = JSON.parse(raw);
const html = render(template, data);

await fs.mkdir(path.dirname(args.output), { recursive: true });
await fs.writeFile(args.output, html, 'utf8');

console.log(`Rendered ${args.output}`);
