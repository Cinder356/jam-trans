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

import React from "react";
import ReactDOM from "react-dom/client";
import App from "./app/App";
import ErrorBoundary from "./components/ErrorBoundary";

import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { SettingsProvider } from '@/app/contexts/SettingsContext';
import { UserMetaProvider } from '@/app/contexts/UserMetaContext';

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <ErrorBoundary>
    <QueryClientProvider client={queryClient}>
      <SettingsProvider>
        <UserMetaProvider>
          <React.StrictMode>
            <App />
          </React.StrictMode>
        </UserMetaProvider>
      </SettingsProvider>
    </QueryClientProvider>
  </ErrorBoundary>
);
