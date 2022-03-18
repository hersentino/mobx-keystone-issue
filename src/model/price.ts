import { model, Model, prop } from "mobx-keystone";

@model("MobxStore/Common/Price/Price")
class Price extends Model({
  currency: prop<string>(""),
  price: prop<number>(0),
  priceDefaultCurrency: prop<number>(0),
},{
  valueType: true,
}) {
  static fromGrpc(price: any): void {
    price.$modelType = "MobxStore/Common/Price/Price";
  }
}

export default Price;
