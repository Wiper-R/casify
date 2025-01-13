export type User = {
  id: string;
  email: string;
  name: string;
  createdAt: Date;
  role: "user" | "admin";
};

export type Customization = {
  id: string;
  customizedUrl: string;
  model: string;
  color: string;
  material: string;
  finish: string;
};

export type Address = {
  id: string;
  line1: string;
  line2: string | null;
  city: string;
  country: string;
  postal_code: string;
  state: string;
};

export type Order = {
  id: string;
  amount: number;
  imageUrl: string;
  createdAt: Date;
  width: number;
  height: number;
  transactionId: string | null;
  Customization?: Customization | null;
  Address?: Address | null;
  User?: User | null;
  state: "pending" | "paid" | "refunded" | "cancelled" | "fulfilled";
};
