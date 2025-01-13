"use client"

import { createContext, useContext } from "react"

export function createContextHelper<T>(){
	const Context = createContext<T | undefined>(undefined)
	function useCtx(){
		const context = useContext(Context)
		if (!context) throw new Error("useContext should be used in Context.Provider")
		return context
	}
	return [Context, useCtx] as const
}
