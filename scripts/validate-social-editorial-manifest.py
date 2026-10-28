#!/usr/bin/env python3
import argparse
import json
import sys
from pathlib import Path

ALLOWED_FORMATS = {"carousel", "single_post"}
ALLOWED_WEIGHTS = {"Regular", "Medium", "Semibold", "Bold", "ExtraBold"}
FORBIDDEN_WEIGHTS = {"Light", "Thin"}
REQUIRED_QA = {
    "facts_checked",
    "logo_checked",
    "typography_checked",
    "palette_context_checked",
    "proportions_checked",
    "margins_checked",
    "mobile_legibility_checked",
    "renders_inspected",
}

def is_true(obj, key):
    return isinstance(obj, dict) and obj.get(key) is True

def validate(data):
    errors = []
    if data.get("project") != "MotoristaOPS":
        errors.append("project must be MotoristaOPS")

    fmt = data.get("format")
    override = data.get("operator_override") or {}
    explicit_override = is_true(override, "explicit") and bool(str(override.get("instruction", "")).strip())
    if fmt not in ALLOWED_FORMATS and not explicit_override:
        errors.append("format not allowed without explicit operator override")

    authority = data.get("authority") or {}
    for key in ("canonical_source_resolved", "brand_book_v2_resolved", "official_assets_resolved"):
        if not is_true(authority, key):
            errors.append(f"authority.{key} must be true")

    typography = data.get("typography") or {}
    if typography.get("family") != "Instrument Sans":
        errors.append("typography.family must be Instrument Sans")
    weights = set(typography.get("weights") or [])
    if weights & FORBIDDEN_WEIGHTS:
        errors.append("Light/Thin are forbidden")
    if weights - ALLOWED_WEIGHTS:
        errors.append("unsupported typography weight")

    mobile = data.get("mobile") or {}
    for key in ("strong_hierarchy", "generous_margins", "contrast_ok"):
        if not is_true(mobile, key):
            errors.append(f"mobile.{key} must be true")
    if mobile.get("microtext") is not False:
        errors.append("mobile.microtext must be false")

    brand = data.get("brand") or {}
    if not is_true(brand, "official_logo_asset"):
        errors.append("official logo asset required")
    if brand.get("logo_ai_generated") is not False:
        errors.append("AI-generated logo forbidden")

    vehicle = data.get("vehicle") or {}
    if vehicle.get("shown") is True:
        for key in ("current_vehicle_confirmed", "official_asset"):
            if not is_true(vehicle, key):
                errors.append(f"vehicle.{key} must be true")
        if vehicle.get("ai_generated") is not False:
            errors.append("AI-generated official vehicle forbidden")
        if not str(vehicle.get("model", "")).strip():
            errors.append("vehicle.model required")

    if fmt == "carousel":
        slides = data.get("slides")
        if not isinstance(slides, list) or len(slides) < 2:
            errors.append("carousel requires at least 2 slides")
        else:
            first = slides[0]
            last = slides[-1]
            if first.get("role") != "opening":
                errors.append("first slide must be opening")
            for key in ("introduction", "cta", "signature", "logo"):
                if not is_true(first, key):
                    errors.append(f"opening requires {key}=true")
            for index, slide in enumerate(slides[1:-1], start=2):
                if slide.get("role") != "content":
                    errors.append(f"slide {index} must be content")
                if not is_true(slide, "content"):
                    errors.append(f"slide {index} requires content=true")
                if slide.get("logo") is not False:
                    errors.append(f"slide {index} logo must be false")
                if slide.get("commercial_cta") is not False:
                    errors.append(f"slide {index} commercial_cta must be false")
            if last.get("role") != "closing":
                errors.append("last slide must be closing")
            for key in ("institutional_presentation", "services", "cta", "signature", "logo"):
                if not is_true(last, key):
                    errors.append(f"closing requires {key}=true")

    elif fmt == "single_post":
        single = data.get("single_post") or {}
        for key in ("main_message", "context_composition", "cta", "signature"):
            if not is_true(single, key):
                errors.append(f"single_post.{key} must be true")

    qa = data.get("qa") or {}
    for key in sorted(REQUIRED_QA):
        if not is_true(qa, key):
            errors.append(f"qa.{key} must be true")

    if (data.get("release") or {}).get("qa_status") != "APPROVED":
        errors.append("release.qa_status must be APPROVED")

    return errors

def main():
    parser = argparse.ArgumentParser()
    parser.add_argument("manifest")
    parser.add_argument("--json", action="store_true")
    args = parser.parse_args()

    try:
        data = json.loads(Path(args.manifest).read_text(encoding="utf-8"))
    except Exception as exc:
        result = {"status": "FAIL", "errors": [f"cannot read manifest: {exc}"]}
        print(json.dumps(result, ensure_ascii=False, indent=2) if args.json else "FAIL")
        return 2

    errors = validate(data)
    result = {"status": "PASS" if not errors else "FAIL", "errors": errors}
    if args.json:
        print(json.dumps(result, ensure_ascii=False, indent=2))
    elif errors:
        print("FAIL")
        for error in errors:
            print(f"- {error}")
    else:
        print("PASS")
    return 0 if not errors else 2

if __name__ == "__main__":
    sys.exit(main())
