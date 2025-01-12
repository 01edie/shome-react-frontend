export const formatQuantity = (q: number, u: string) =>
  q > 1 ? `${q} ${u}s` : `${q} ${u}`;
export const formatAmount = (a: string) => "₹ " + a;
