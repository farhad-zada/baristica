export const FIRST_ORDER_DISCOUNT_RATE = 0.15;

export const applyDiscount = (amount, rate = FIRST_ORDER_DISCOUNT_RATE) => {
  if (!amount || amount <= 0) return 0;
  return amount * (1 - rate);
};

export const getDiscountAmount = (amount, rate = FIRST_ORDER_DISCOUNT_RATE) => {
  if (!amount || amount <= 0) return 0;
  return amount * rate;
};
