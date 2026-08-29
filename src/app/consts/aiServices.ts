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


export const AI_SERVICES = {
  openaimanual: {
    label: "Manual OpenAI API",
    url: ""
  },
  groq: {
    label: "Groq Cloud",
    url: "https://api.groq.com/openai/v1"
  },
  openai: {
    label: "OpenAI",
    url: "https://api.openai.com/v1"
  },
  google: {
    label: "Google AI",
    url: "https://generativelanguage.googleapis.com/v1beta/openai"
  },
  anthropic: {
    label: "Anthropic",
    url: "https://api.anthropic.com/v1"
  },
  mistral: {
    label: "Mistral",
    url: "https://api.mistral.ai/v1"
  },
  openrouter: {
    label: "OpenRouter",
    url: "https://openrouter.ai/api/v1"
  }
} as const;


export const AI_SERVICE_KEYS = Object.keys(AI_SERVICES) as [keyof typeof AI_SERVICES, ...(keyof typeof AI_SERVICES)[]];

export const DEFAULT_AI_SERVICE = AI_SERVICE_KEYS[1];
