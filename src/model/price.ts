import { types } from "mobx-state-tree"

const Price = types.model("Price", {
  currency: "",
  price: 0,
  priceDefaultCurrency: 0,
});

export function fromGrpc(quantity: any) {
  return Price.create({
    currency: quantity.currency,
    price: quantity.price,
    priceDefaultCurrency: quantity.priceDefaultCurrency,
  });
}

export default Price;
