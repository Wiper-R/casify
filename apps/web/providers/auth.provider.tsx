"use client";

import apiClient from "@/lib/api-client";
import { createContextHelper } from "@/lib/create-context";
import { User } from "@repo/types";
import { PropsWithChildren, useCallback, useEffect, useReducer } from "react";

type AuthContextType = {
  auth: AuthStateType;
  dispatch: React.Dispatch<AuthActionType>;
  refetch: () => void;
};

const [AuthContext, useAuth] = createContextHelper<AuthContextType>();

type AuthStateType =
  | { state: "loading"; user: undefined }
  | { state: "unauthenticated"; user: null }
  | { state: "authenticated"; user: User };

type AuthActionType =
  | { type: "loading" }
  | { type: "unauthenticated" }
  | { type: "authenticated"; user: User };

function authReducer(
  state: AuthStateType,
  action: AuthActionType,
): AuthStateType {
  switch (action.type) {
    case "loading":
      return { state: "loading", user: undefined };
    case "unauthenticated":
      return { state: "unauthenticated", user: null };
    case "authenticated":
      return { state: "authenticated", user: action.user };
    default:
      return state;
  }
}

export function AuthProvider({ children }: PropsWithChildren) {
  const [state, dispatch] = useReducer(authReducer, {
    state: "loading",
    user: undefined,
  });

  const fetchUser = useCallback(async () => {
    dispatch({ type: "loading" });
    try {
      const res = await apiClient.get("/users/@me");
      dispatch({ type: "authenticated", user: res.data });
    } catch (error) {
      dispatch({ type: "unauthenticated" });
    }
  }, []);

  useEffect(() => {
    fetchUser();
  }, [fetchUser]);

  return (
    <AuthContext.Provider value={{ auth: state, dispatch, refetch: fetchUser }}>
      {children}
    </AuthContext.Provider>
  );
}

export { useAuth };
