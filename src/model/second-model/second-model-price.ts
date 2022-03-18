import { model, Model, prop } from "mobx-keystone";
import Price from "../price";
import SecondModelPriceType from "./second-model-price-type";

@model("Rootstore/SecondeModelPrice")
class SecondeModelPrice extends Model({
  id: prop<string>(),
  type: prop<SecondModelPriceType>(SecondModelPriceType.UNRECOGNIZED),
  price: prop<Price | undefined>(),
  details: prop<string>(""),
}) {
  static fromGrpc(secondeModelPrice: any): void {
    secondeModelPrice.$modelType = "Rootstore/SecondeModelPrice";
    if (secondeModelPrice.price) Price.fromGrpc(secondeModelPrice.price);
  }
}

export default SecondeModelPrice;
