export function getExternalSecret(name: string): string | undefined {
  const env = process.env as unknown as Record<string, string | undefined>;
  const value = env[name];
  return value && value.trim() ? value : undefined;
}