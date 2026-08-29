/*
 * Copyright (C) 2026 l1ngus
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with this program.  If not, see <https://www.gnu.org/licenses/>.
 */

// src/commands/lang.rs
use serde::Serialize;
use whatlang::{Detector, Lang};

#[derive(Serialize)]
pub struct DetectionResult {
    lang_code: String,
    lang_name: String,
    script: String,
    confidence: f64,
}

#[tauri::command]
pub fn detect_language(text: String, whitelist: Option<Vec<String>>) -> Option<DetectionResult> {
    let detector = if let Some(codes) = whitelist {
        let allowlist: Vec<Lang> = codes.iter().filter_map(Lang::from_code).collect();

        if allowlist.is_empty() {
            Detector::new()
        } else {
            Detector::with_allowlist(allowlist)
        }
    } else {
        Detector::new()
    };

    let info = detector.detect(&text)?;

    Some(DetectionResult {
        lang_code: info.lang().code().to_string(),
        lang_name: info.lang().eng_name().to_string(),
        script: format!("{:?}", info.script()),
        confidence: info.confidence(),
    })
}
