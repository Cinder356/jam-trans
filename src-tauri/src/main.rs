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

// Prevents additional console window on Windows in release, DO NOT REMOVE!!
#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]

fn main() {
    std::panic::set_hook(Box::new(|info| {
        let msg = format!(
            "Panic: {}\nLocation: {:?}\nBacktrace:\n{:?}",
            info.to_string(),
            info.location(),
            std::backtrace::Backtrace::capture(),
        );
        let path = std::env::temp_dir().join("lucid-spell-panic.log");
        let _ = std::fs::write(&path, &msg);
        // Also print to stderr — visible in terminal or debug builds
        eprintln!("{}", msg);
    }));

    lucid_spell_lib::run()
}
