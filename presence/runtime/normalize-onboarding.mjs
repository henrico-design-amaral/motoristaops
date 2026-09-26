export function normalizeOnboarding(raw) {
  const text = (value) => String(value ?? '').trim();
  const nullableText = (value) => {
    const v = text(value);
    return v ? v : null;
  };
  const nullableHttps = (value, field) => {
    const v = text(value);
    if (!v) return null;
    let url;
    try {
      url = new URL(v);
    } catch {
      throw new Error(`Invalid URL: ${field}`);
    }
    if (url.protocol !== 'https:') {
      throw new Error(`Only https URLs are allowed: ${field}`);
    }
    return url.toString();
  };

  const services = Array.isArray(raw.services)
    ? raw.services.map(text).filter(Boolean)
    : [];

  const serviceAreas = Array.isArray(raw.serviceAreas)
    ? raw.serviceAreas.map(text).filter(Boolean)
    : text(raw.serviceAreas)
        .split(/[\n,;]+/)
        .map((value) => value.trim())
        .filter(Boolean);

  const capacityRaw = text(raw.capacity);
  const capacity = capacityRaw ? Number(capacityRaw) : null;
  const year = Number(raw.vehicleYear);

  const payload = {
    profile: {
      displayName: text(raw.displayName),
      fullName: nullableText(raw.fullName),
      phone: nullableText(raw.phone),
      whatsapp: text(raw.whatsapp),
      bio: nullableText(raw.bio)
    },
    vehicle: {
      brand: text(raw.vehicleBrand),
      model: text(raw.vehicleModel),
      year,
      color: text(raw.vehicleColor),
      capacity
    },
    services,
    serviceAreas,
    socialLinks: {
      instagram: nullableHttps(raw.instagram, 'instagram'),
      linkedin: nullableHttps(raw.linkedin, 'linkedin'),
      tiktok: nullableHttps(raw.tiktok, 'tiktok'),
      youtube: nullableHttps(raw.youtube, 'youtube')
    },
    googleBusiness: {
      mode: text(raw.googleBusiness) || 'not_requested'
    },
    printPersonalization: {
      displayName: text(raw.printDisplayName) || text(raw.displayName),
      whatsapp: text(raw.whatsapp),
      shortServiceLine: nullableText(raw.shortServiceLine)
    },
    shippingAddress: {
      postalCode: text(raw.postalCode),
      street: text(raw.street),
      number: text(raw.number),
      complement: nullableText(raw.complement),
      neighborhood: text(raw.neighborhood),
      city: text(raw.city),
      state: text(raw.state).toUpperCase()
    }
  };

  const required = [
    ['profile.displayName', payload.profile.displayName],
    ['profile.whatsapp', payload.profile.whatsapp],
    ['vehicle.brand', payload.vehicle.brand],
    ['vehicle.model', payload.vehicle.model],
    ['vehicle.year', Number.isInteger(payload.vehicle.year) && payload.vehicle.year >= 1990 && payload.vehicle.year <= 2100],
    ['vehicle.color', payload.vehicle.color],
    ['services', payload.services.length > 0],
    ['serviceAreas', payload.serviceAreas.length > 0],
    ['printPersonalization.displayName', payload.printPersonalization.displayName],
    ['shippingAddress.postalCode', payload.shippingAddress.postalCode],
    ['shippingAddress.street', payload.shippingAddress.street],
    ['shippingAddress.number', payload.shippingAddress.number],
    ['shippingAddress.neighborhood', payload.shippingAddress.neighborhood],
    ['shippingAddress.city', payload.shippingAddress.city],
    ['shippingAddress.state', /^[A-Z]{2}$/.test(payload.shippingAddress.state)]
  ];

  for (const [field, valid] of required) {
    if (!valid) throw new Error(`Missing or invalid required field: ${field}`);
  }

  if (capacity != null && (!Number.isInteger(capacity) || capacity < 1 || capacity > 20)) {
    throw new Error('Invalid vehicle capacity');
  }

  const allowedServices = new Set([
    'particular','executive','airport','events','corporate',
    'travel','scheduled','recurring','other'
  ]);
  for (const service of services) {
    if (!allowedServices.has(service)) throw new Error(`Invalid service: ${service}`);
  }

  const googleModes = new Set(['not_requested','create','connect_existing']);
  if (!googleModes.has(payload.googleBusiness.mode)) {
    throw new Error('Invalid Google Business mode');
  }

  return payload;
}

function cliArgs(argv) {
  const result = {};
  for (let i = 2; i < argv.length; i += 2) {
    if (!argv[i]?.startsWith('--') || argv[i + 1] == null) {
      throw new Error('Usage: --input <json> [--output <json>]');
    }
    result[argv[i].slice(2)] = argv[i + 1];
  }
  return result;
}

if (import.meta.url === `file://${process.argv[1]}`) {
  const fs = await import('node:fs/promises');
  const args = cliArgs(process.argv);
  if (!args.input) throw new Error('Missing --input');
  const raw = JSON.parse(await fs.readFile(args.input, 'utf8'));
  const payload = normalizeOnboarding(raw);
  const json = JSON.stringify(payload, null, 2) + '\n';
  if (args.output) {
    await fs.writeFile(args.output, json, 'utf8');
  } else {
    process.stdout.write(json);
  }
}
