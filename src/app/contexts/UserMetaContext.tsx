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

import { useState, useRef, useEffect, createContext, type PropsWithChildren } from "react";
import { setMetaItem, getAllMetaItems, type UserMeta } from "../stores/userMetaStore";
import { UserMetaSchema } from '@/app/types/UserMeta';

type GetUserMetaFn = <K extends keyof UserMeta>(key: K) => UserMeta[K];
type SetUserMetaFn = <K extends keyof UserMeta>(key: K, value: UserMeta[K]) => void;

interface UserMetaContextValue {
  getUserMeta: GetUserMetaFn;
  setUserMeta: SetUserMetaFn;
}

export const UserMetaContext = createContext<UserMetaContextValue | null>(null);


export const UserMetaProvider = ({ children }: PropsWithChildren) => {
  const userMetaRef = useRef<UserMeta>(UserMetaSchema.parse({}));
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    getAllMetaItems()
      .then(userMeta => {
        setIsLoaded(true);
        userMetaRef.current = userMeta;
      })
  }, [])

  const getUserMeta: GetUserMetaFn = (key) => {
    return userMetaRef.current[key];
  }

  const setUserMeta: SetUserMetaFn = (key, value) => {
    userMetaRef.current[key] = value;
    setMetaItem(key, value);
  }

  if (!isLoaded) return null;

  return (
    <UserMetaContext.Provider value={{ getUserMeta, setUserMeta }}>
      {children}
    </UserMetaContext.Provider>
  )
}


