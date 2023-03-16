let formatting_options = {
  style: "currency",
  currency: "NGN",
  minimumFractionDigits: 2,
};

export const dollarString = new Intl.NumberFormat("en-US", formatting_options);
