import { DataModel, model, ModelData, prop } from "mobx-keystone";
import Price from "../price";
import SecondModelPriceType from "./second-model-price-type";

@model("Rootstore/SecondeModelPrice")
class SecondeModelPrice extends DataModel({
  id: prop<string>(),
  type: prop<SecondModelPriceType>(SecondModelPriceType.UNRECOGNIZED),
  price: prop<ModelData<Price> | undefined>(),
  details: prop<string>(""),
}) {
  static fromGrpc(secondeModelPrice: any): ModelData<SecondeModelPrice> {
    return {
      id: secondeModelPrice.id,
      details: secondeModelPrice.details,
      type: secondeModelPrice.type as unknown as SecondModelPriceType,
      price: secondeModelPrice.price ? Price.fromGrpc(secondeModelPrice.price) : undefined,
    };
  }
}

export default SecondeModelPrice;
