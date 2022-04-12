import { DataModel, model, ModelData, prop } from "mobx-keystone";

@model("MobxStore/Common/Price/Price")
class Price extends DataModel({
  currency: prop<string>(""),
  price: prop<number>(0),
  priceDefaultCurrency: prop<number>(0),
}) {
  static fromGrpc(quantity: any): ModelData<Price> {
    return {
      currency: quantity.currency,
      price: quantity.price,
      priceDefaultCurrency: quantity.priceDefaultCurrency,
    };
  }
}

export default Price;
