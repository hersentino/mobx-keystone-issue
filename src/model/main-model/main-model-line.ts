import { model, prop, Model } from "mobx-keystone";
import Price from "../price";

@model("Rootstore/MainModelLine")
class MainModelLine extends Model({
  name: prop<string>(""),
  description: prop<string>(""),
  priceEot: prop<Price>(),
  taxRate: prop<number>(0),
}) {
  static fromGrpc(mainModelLine: any): void {
    const { priceEot } = mainModelLine;

    if (!priceEot)
      throw new Error("PriceEot is empty in MainModelLine");
      mainModelLine.$modelType = "Rootstore/MainModelLine";
      Price.fromGrpc(priceEot);
  }
}

export default MainModelLine;
