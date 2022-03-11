import { model, Model, prop } from "mobx-keystone";

@model("MobxStore/Common/Price/Price")
class Price extends Model({
  currency: prop<string>(""),
  price: prop<number>(0),
  priceDefaultCurrency: prop<number>(0),
},{
  valueType: true,
}) {
  static fromGrpc(quantity: any): Price {
    return new this({
      currency: quantity.currency,
      price: quantity.price,
      priceDefaultCurrency: quantity.priceDefaultCurrency,
    });
  }
}

export default Price;
