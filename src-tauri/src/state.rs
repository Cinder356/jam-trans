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

use async_openai::{config::OpenAIConfig, Client};
use msedge_tts::voice::Voice;
use rodio::mixer::Mixer;
use rodio::OutputStream;
use std::sync::Arc;
use tokio::sync::{Mutex, RwLock};

/// rodio::OutputStream is !Send on macOS (cpal CoreAudio listener callback).
/// Safe because the stream is created once in `setup()` and never moved; only
/// the mixer (which is truly Send) is accessed from commands.
pub(crate) struct OutputStreamHandle(pub(crate) Option<OutputStream>);

unsafe impl Send for OutputStreamHandle {}

pub struct AppState {
    pub openai_client: Mutex<Option<Client<OpenAIConfig>>>,
    pub audio_mixer: Mutex<Option<Arc<Mixer>>>,
    pub _audio_stream: Mutex<Option<OutputStreamHandle>>,
    pub voices: RwLock<Vec<Voice>>,
}
