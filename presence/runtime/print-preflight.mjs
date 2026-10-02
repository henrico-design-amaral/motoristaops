function text(value, field) {
  const v = String(value ?? '').trim();
  if (!v) throw new Error(`Missing ${field}`);
  return v;
}

function positive(value, field, allowZero = false) {
  const n = Number(value);
  if (!Number.isFinite(n) || (allowZero ? n < 0 : n <= 0)) {
    throw new Error(`Invalid ${field}`);
  }
  return n;
}

function httpsUrl(value, field) {
  const raw = text(value, field);
  let url;
  try {
    url = new URL(raw);
  } catch {
    throw new Error(`Invalid URL: ${field}`);
  }
  if (url.protocol !== 'https:') throw new Error(`Only https URLs are allowed: ${field}`);
  return url.toString();
}

export function validateVerifiedPrintSupplierSpec(input) {
  if (!input || typeof input !== 'object' || Array.isArray(input)) {
    throw new Error('Invalid print supplier spec');
  }

  if (input?.verification?.status !== 'verified') {
    throw new Error('Print supplier spec must be verified');
  }

  const verifiedAt = text(input?.verification?.verifiedAt, 'verification.verifiedAt');
  if (!Number.isFinite(Date.parse(verifiedAt))) throw new Error('Invalid verification.verifiedAt');

  const productKey = text(input.productKey, 'productKey');
  if (!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(productKey)) {
    throw new Error('Invalid productKey');
  }

  const finish = Array.isArray(input.finish)
    ? input.finish.map((value, index) => text(value, `finish[${index}]`))
    : [];
  if (finish.length < 1) throw new Error('At least one finish value is required');

  const restrictions = input.supplierRestrictions == null
    ? []
    : Array.isArray(input.supplierRestrictions)
      ? input.supplierRestrictions.map((value, index) => text(value, `supplierRestrictions[${index}]`))
      : (() => { throw new Error('Invalid supplierRestrictions'); })();

  return {
    supplier: text(input.supplier, 'supplier'),
    productKey,
    productName: text(input.productName, 'productName'),
    verification: {
      status: 'verified',
      sourceUrl: httpsUrl(input.verification.sourceUrl, 'verification.sourceUrl'),
      verifiedAt
    },
    finishedSizeMm: {
      width: positive(input?.finishedSizeMm?.width, 'finishedSizeMm.width'),
      height: positive(input?.finishedSizeMm?.height, 'finishedSizeMm.height')
    },
    bleedMm: positive(input.bleedMm, 'bleedMm', true),
    safeAreaMm: positive(input.safeAreaMm, 'safeAreaMm', true),
    colorProfile: text(input.colorProfile, 'colorProfile'),
    minimumDpi: (() => {
      const n = Number(input.minimumDpi);
      if (!Number.isInteger(n) || n < 1) throw new Error('Invalid minimumDpi');
      return n;
    })(),
    outputFormat: text(input.outputFormat, 'outputFormat'),
    finish,
    supplierRestrictions: restrictions
  };
}

export function assertPrintArtifactPreflight({ spec, artifact }) {
  const verified = validateVerifiedPrintSupplierSpec(spec);
  if (!artifact || typeof artifact !== 'object' || Array.isArray(artifact)) {
    throw new Error('Invalid print artifact metadata');
  }

  const width = positive(artifact.widthMm, 'artifact.widthMm');
  const height = positive(artifact.heightMm, 'artifact.heightMm');
  const dpi = Number(artifact.dpi);
  const format = text(artifact.format, 'artifact.format');
  const colorProfile = text(artifact.colorProfile, 'artifact.colorProfile');

  const expectedWidth = verified.finishedSizeMm.width + (verified.bleedMm * 2);
  const expectedHeight = verified.finishedSizeMm.height + (verified.bleedMm * 2);

  if (Math.abs(width - expectedWidth) > 0.001 || Math.abs(height - expectedHeight) > 0.001) {
    throw new Error('Artifact dimensions do not match verified finished size + bleed');
  }
  if (!Number.isInteger(dpi) || dpi < verified.minimumDpi) {
    throw new Error('Artifact resolution below verified minimum');
  }
  if (format.toLowerCase() !== verified.outputFormat.toLowerCase()) {
    throw new Error('Artifact format does not match verified supplier spec');
  }
  if (colorProfile !== verified.colorProfile) {
    throw new Error('Artifact color profile does not match verified supplier spec');
  }

  return {
    passed: true,
    productKey: verified.productKey,
    expectedWidthMm: expectedWidth,
    expectedHeightMm: expectedHeight,
    minimumDpi: verified.minimumDpi,
    outputFormat: verified.outputFormat,
    colorProfile: verified.colorProfile
  };
}
