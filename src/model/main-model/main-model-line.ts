import { model, prop, idProp, DataModel, ModelData } from "mobx-keystone";
import Price from "../price";

@model("Rootstore/MainModelLine")
class MainModelLine extends DataModel({
  id: prop<string>(""),
  name: prop<string>(""),
  description: prop<string>(""),
  priceEot: prop<ModelData<Price>>(),
  taxRate: prop<number>(0),
}) {
  static fromGrpc(mainModelLine: any): ModelData<MainModelLine> {
    const { priceEot } = mainModelLine;

    if (!priceEot)
      throw new Error("PriceEot is empty in MainModelLine");
    return {
      id: mainModelLine.id,
      name: mainModelLine.name,
      description: mainModelLine.description,
      taxRate: mainModelLine.taxRate,
      priceEot: Price.fromGrpc(priceEot),
    };
  }
}

export default MainModelLine;
