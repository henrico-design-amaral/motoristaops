# V2 QA

Status: **PASSED**

- Visual authority: `assets/motoristaops-v2-reference.png`.
- Native comparison viewport: 1086 × 1448.
- Source and rendered composition: identical visible raster at native size.
- CI source lock: SHA-256 `BC85DEA5D68EF5959A28A9ECCDD6494919E7AD69D3E41C5D14E594DF2FDD19A1` and dimensions 1086 × 1448.
- Public CDN pixel check: PSNR `average:inf`; Hostinger's lossless metadata rewrite does not alter any pixel.
- HTML visible drift: none in the initial state.
- Navigation anchors: tested.
- Form fields: tested locally.
- Console errors: none.
- Public validation: PASS in workflow run `43663091601`.
- `https://www.motoristaops.com.br/v2/`: HTTP 200, literal asset marker present, `noindex,nofollow,noarchive` present.
- `https://www.motoristaops.com.br/`: HTTP 200 and unchanged by the isolated V2 deploy.
- `https://dashboard.motoristaops.com.br/`: HTTP 200 and isolated from the V2 deploy.

Evidence:

- `qa/literal-reference-1086x1448.png`
- `qa/comparison-literal-1086x1448.png`
- `../design-qa.md`
