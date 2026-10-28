#!/usr/bin/env python3
import json
import sys
from pathlib import Path

ALLOWED = {"carousel_static", "single_static"}
EXPECTED_PALETTE = {
    "noite": "#070709",
    "grafite": "#151518",
    "champagne": "#C79C5B",
    "champagne_sombra": "#947546",
    "marfim": "#F3EFE4",
    "pedra": "#A6A39E",
    "ambar_percurso": "#F0B44D",
}
ALLOWED_PALETTE_MODES = {"light", "dark", "mixed"}
CURRENT_VEHICLE_MODEL = "Omoda 5 Luxury"
CURRENT_VEHICLE_COLOR = "cinza"
REQUIRED_QA = [
    "facts_verified",
    "official_logo_verified",
    "typography_verified",
    "margins_verified",
    "mobile_legibility_verified",
    "each_render_inspected",
    "protected_real_assets_verified_when_applicable",
]

def verdict(errors):
    if errors:
        for err in errors:
            print(f"FAIL: {err}")
        print("VERDICT: REPROVADO")
        return 1
    print("VERDICT: PASS")
    return 0

def main():
    if len(sys.argv) != 2:
        print("usage: validate_social_editorial.py <manifest.json>")
        return 2
    data = json.loads(Path(sys.argv[1]).read_text(encoding="utf-8"))
    errors = []

    fmt = data.get("format")
    override = bool(data.get("explicit_format_override"))
    authorization = str(data.get("override_authorization", "")).strip()
    if fmt not in ALLOWED and (not override or not authorization):
        errors.append("formato fora da whitelist sem autorização explícita do operador")

    if data.get("font_family") != "Instrument Sans":
        errors.append("tipografia editorial deve ser Instrument Sans")
    if data.get("instagram_first") is not True:
        errors.append("Instagram-first deve estar confirmado")
    if data.get("microtext") is not False:
        errors.append("microtexto não é permitido")

    identity = data.get("identity", {})
    if identity.get("official_logo_asset") is not True:
        errors.append("identity.official_logo_asset must be true")
    if identity.get("official_existing_variant") is not True:
        errors.append("identity.official_existing_variant must be true")
    if identity.get("identity_modified") is not False:
        errors.append("identity must remain unmodified")
    if identity.get("vectorized") is not False:
        errors.append("identity vectorization is forbidden")

    palette = data.get("palette", {})
    if palette.get("mode") not in ALLOWED_PALETTE_MODES:
        errors.append("palette.mode must be light, dark or mixed")
    if palette.get("tones_modified") is not False:
        errors.append("brand palette tones cannot be modified")
    if palette.get("tokens") != EXPECTED_PALETTE:
        errors.append("brand palette tokens must match canonical exact values")

    vehicle = data.get("vehicle", {})
    if vehicle.get("current_model") != CURRENT_VEHICLE_MODEL:
        errors.append("current vehicle must be Omoda 5 Luxury")
    if vehicle.get("current_color") != CURRENT_VEHICLE_COLOR:
        errors.append("current vehicle color must be cinza")
    if vehicle.get("current_vehicle_confirmed") is not True:
        errors.append("current vehicle must be confirmed from canon")
    if vehicle.get("shown") is True:
        if vehicle.get("official_real_asset") is not True:
            errors.append("shown official vehicle requires approved real asset")
        if vehicle.get("ai_generated") is not False:
            errors.append("AI-generated official vehicle is forbidden")

    production = data.get("production", {})
    engine = production.get("engine")
    if production.get("vector_creation") is not False:
        errors.append("vector creation is forbidden")
    if production.get("canva_creation") is not False:
        errors.append("Canva creation is forbidden")
    if engine == "gpt_images":
        pass
    elif engine == "magnific":
        if production.get("magnific_exception") is not True:
            errors.append("Magnific requires magnific_exception=true")
        if production.get("gpt_images_attempted") is not True:
            errors.append("Magnific requires a prior GPT Images attempt")
        if not str(production.get("exception_reason", "")).strip():
            errors.append("Magnific requires a documented exception_reason")
    else:
        errors.append("production.engine must be gpt_images; Magnific is extraordinary fallback only")

    qa = data.get("qa", {})
    for key in REQUIRED_QA:
        if qa.get(key) is not True:
            errors.append(f"QA obrigatório não confirmado: {key}")

    if fmt == "carousel_static":
        slides = data.get("slides") or []
        if len(slides) < 2:
            errors.append("carrossel precisa de abertura e fechamento")
        else:
            first, last = slides[0], slides[-1]
            if first.get("role") != "opening":
                errors.append("slide 1 deve ter role=opening")
            for key in ("has_introduction", "has_cta", "has_signature", "has_logo"):
                if first.get(key) is not True:
                    errors.append(f"slide 1 deve confirmar {key}=true")
            for idx, slide in enumerate(slides[1:-1], start=2):
                if slide.get("role") != "content":
                    errors.append(f"slide {idx} intermediário deve ter role=content")
                if slide.get("has_logo") is not False:
                    errors.append(f"slide {idx} intermediário não pode ter logo")
                if slide.get("has_commercial_cta") is not False:
                    errors.append(f"slide {idx} intermediário não pode ter CTA comercial")
            if last.get("role") != "closing":
                errors.append("último slide deve ter role=closing")
            for key in ("has_institutional_presentation", "has_services", "has_cta", "has_signature", "has_logo"):
                if last.get(key) is not True:
                    errors.append(f"último slide deve confirmar {key}=true")

    if fmt == "single_static":
        single = data.get("single") or {}
        for key in ("has_main_message", "has_contextual_composition", "has_cta", "has_closing_signature"):
            if single.get(key) is not True:
                errors.append(f"post único deve confirmar {key}=true")

    return verdict(errors)

if __name__ == "__main__":
    raise SystemExit(main())
