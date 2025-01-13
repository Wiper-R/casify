export function generateRandomCode(length: number) {
  var c = "";
  const chars = "abcdefghijklmnopqrstuvwxyz";
  for (let i = 0; i < length; i++) {
    c += chars[Math.round(Math.random() * chars.length)];
  }
  return c;
}
