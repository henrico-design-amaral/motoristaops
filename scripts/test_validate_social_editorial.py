#!/usr/bin/env python3
import copy
import json
import subprocess
import sys
import tempfile
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
VALIDATOR = ROOT / "scripts" / "validate_social_editorial.py"

BASE = {
    "project": "MotoristaOPS",
    "format": "single_static",
    "explicit_format_override": False,
    "override_authorization": "",
    "font_family": "Instrument Sans",
    "instagram_first": True,
    "microtext": False,
    "identity": {
        "official_logo_asset": True,
        "official_existing_variant": True,
        "identity_modified": False,
        "vectorized": False,
        "logo_variant": "simplified",
    },
    "palette": {
        "mode": "light",
        "tones_modified": False,
        "tokens": {
            "noite": "#070709",
            "grafite": "#151518",
            "champagne": "#C79C5B",
            "champagne_sombra": "#947546",
            "marfim": "#F3EFE4",
            "pedra": "#A6A39E",
            "ambar_percurso": "#F0B44D",
        },
    },
    "vehicle": {
        "current_model": "Omoda 5 Luxury",
        "current_color": "cinza",
        "shown": False,
        "current_vehicle_confirmed": True,
        "official_real_asset": False,
        "ai_generated": False,
    },
    "single": {
        "has_main_message": True,
        "has_contextual_composition": True,
        "has_cta": True,
        "has_closing_signature": True,
    },
    "production": {
        "engine": "gpt_images",
        "vector_creation": False,
        "canva_creation": False,
        "magnific_exception": False,
        "gpt_images_attempted": False,
        "exception_reason": "",
    },
    "qa": {
        "facts_verified": True,
        "official_logo_verified": True,
        "typography_verified": True,
        "margins_verified": True,
        "mobile_legibility_verified": True,
        "each_render_inspected": True,
        "protected_real_assets_verified_when_applicable": True,
    },
}

def run_case(data):
    with tempfile.NamedTemporaryFile("w", suffix=".json", encoding="utf-8", delete=False) as fh:
        json.dump(data, fh, ensure_ascii=False, indent=2)
        path = fh.name
    proc = subprocess.run(
        [sys.executable, str(VALIDATOR), path],
        capture_output=True,
        text=True,
        check=False,
    )
    Path(path).unlink(missing_ok=True)
    return proc.returncode, proc.stdout + proc.stderr

def expect_pass(data, name):
    code, output = run_case(data)
    if code != 0 or "VERDICT: PASS" not in output:
        raise AssertionError(f"{name}: expected PASS, got code={code}\n{output}")

def expect_fail(data, name, needle=None):
    code, output = run_case(data)
    if code == 0 or "VERDICT: REPROVADO" not in output:
        raise AssertionError(f"{name}: expected REPROVADO, got code={code}\n{output}")
    if needle and needle not in output:
        raise AssertionError(f"{name}: expected '{needle}' in output\n{output}")

def main():
    expect_pass(copy.deepcopy(BASE), "valid single static")

    invalid_format = copy.deepcopy(BASE)
    invalid_format["format"] = "reel"
    expect_fail(invalid_format, "reel blocked", "formato fora da whitelist")

    explicit_override = copy.deepcopy(BASE)
    explicit_override["format"] = "reel"
    explicit_override["explicit_format_override"] = True
    explicit_override["override_authorization"] = "Operador autorizou explicitamente Reel apenas nesta tarefa."
    expect_pass(explicit_override, "explicit scoped override")

    vector = copy.deepcopy(BASE)
    vector["production"]["vector_creation"] = True
    expect_fail(vector, "vector creation blocked", "vector creation is forbidden")

    canva = copy.deepcopy(BASE)
    canva["production"]["canva_creation"] = True
    expect_fail(canva, "Canva blocked", "Canva creation is forbidden")

    other_engine = copy.deepcopy(BASE)
    other_engine["production"]["engine"] = "other"
    expect_fail(other_engine, "alternate generator blocked", "production.engine must be gpt_images")

    magnific = copy.deepcopy(BASE)
    magnific["production"].update({
        "engine": "magnific",
        "magnific_exception": True,
        "gpt_images_attempted": True,
        "exception_reason": "GPT Images could not complete the required exceptional transformation.",
    })
    expect_pass(magnific, "Magnific extraordinary fallback")

    identity_mutation = copy.deepcopy(BASE)
    identity_mutation["identity"]["identity_modified"] = True
    expect_fail(identity_mutation, "identity mutation blocked", "identity must remain unmodified")

    derived_logo = copy.deepcopy(BASE)
    derived_logo["identity"]["official_existing_variant"] = False
    expect_fail(derived_logo, "derived logo blocked", "official_existing_variant")

    wrong_palette = copy.deepcopy(BASE)
    wrong_palette["palette"]["tokens"]["champagne"] = "#C89D5C"
    expect_fail(wrong_palette, "palette drift blocked", "canonical exact values")

    modified_tones = copy.deepcopy(BASE)
    modified_tones["palette"]["tones_modified"] = True
    expect_fail(modified_tones, "palette tone modification blocked", "tones cannot be modified")

    old_vehicle = copy.deepcopy(BASE)
    old_vehicle["vehicle"]["current_model"] = "Hyundai HB20 2019"
    expect_fail(old_vehicle, "historical vehicle blocked", "Omoda 5 Luxury")

    ai_vehicle = copy.deepcopy(BASE)
    ai_vehicle["vehicle"].update({
        "shown": True,
        "official_real_asset": True,
        "ai_generated": True,
    })
    expect_fail(ai_vehicle, "AI vehicle blocked", "AI-generated official vehicle")

    wrong_font = copy.deepcopy(BASE)
    wrong_font["font_family"] = "Inter"
    expect_fail(wrong_font, "wrong font", "Instrument Sans")

    missing_qa = copy.deepcopy(BASE)
    missing_qa["qa"]["each_render_inspected"] = False
    expect_fail(missing_qa, "missing render QA", "each_render_inspected")

    bad_carousel = copy.deepcopy(BASE)
    bad_carousel["format"] = "carousel_static"
    bad_carousel.pop("single", None)
    bad_carousel["slides"] = [
        {
            "role": "opening",
            "has_introduction": True,
            "has_cta": True,
            "has_signature": True,
            "has_logo": True,
        },
        {
            "role": "content",
            "has_logo": True,
            "has_commercial_cta": False,
        },
        {
            "role": "closing",
            "has_institutional_presentation": True,
            "has_services": True,
            "has_cta": True,
            "has_signature": True,
            "has_logo": True,
        },
    ]
    expect_fail(bad_carousel, "logo on intermediate", "não pode ter logo")

    print("All MotoristaOPS editorial format-lock regression tests passed.")

if __name__ == "__main__":
    main()
