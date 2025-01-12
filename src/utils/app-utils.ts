export const parseAmount = (amount: string | undefined | null) =>
  amount ? parseFloat(amount.replace(/,/g, "")) : 0;
