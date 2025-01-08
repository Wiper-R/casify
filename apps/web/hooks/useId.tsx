"use client";

import React from "react";

export function useId(id?: string) {
  const _id = React.useId();
  return id || _id;
}
