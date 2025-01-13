export const MATERIALS = {
  name: "material",
  options: [
    { value: "silicone", name: "Silicone", price: 0 },
    { value: "plastic", name: "Plastic (Polycarbonate)", price: 1.49 },
    { value: "leather", name: "Leather", price: 5 },
  ] as const,
} as const;

export const FINISHES = {
  name: "finish",
  options: [
    { name: "Matte", value: "matte", price: 0 },
    { name: "Glossy", value: "glossy", price: 1 },
    { name: "Textured", value: "textured", price: 2 },
  ] as const,
} as const;

export const MODELS = [
  { name: "Samsung S24", value: "samsung_s24" },
  { name: "iPhone 15 Pro", value: "iphone_15_pro" },
] as const;

export const COLORS = [
  { name: "Black", value: "black", color: "#000" },
  { name: "Blue", value: "blue", color: "#101629" },
  { name: "Brown", value: "brown", color: "#211013" },
] as const;

export const BASE_PRICE = 5;
