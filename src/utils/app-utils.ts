export const parseAmount = (amount: string | undefined | null) =>
  amount ? parseFloat(amount.replace(/,/g, "")) : 0;

export const formatAmount = (amount: number) =>
  amount.toLocaleString(undefined, {
    maximumFractionDigits: 2,
    minimumFractionDigits: 2,
  });
