import { model, prop, Model, idProp } from "mobx-keystone";
import Price from "../price";

@model("Rootstore/MainModelLine")
class MainModelLine extends Model({
  id: idProp,
  name: prop<string>(""),
  description: prop<string>(""),
  priceEot: prop<Price>(),
  taxRate: prop<number>(0),
}) {
  static fromGrpc(mainModelLine: any): MainModelLine {
    const { priceEot } = mainModelLine;

    if (!priceEot)
      throw new Error("PriceEot is empty in MainModelLine");
    return new this({
      id: mainModelLine.id,
      name: mainModelLine.name,
      description: mainModelLine.description,
      taxRate: mainModelLine.taxRate,
      priceEot: Price.fromGrpc(priceEot),
    });
  }
}

export default MainModelLine;
