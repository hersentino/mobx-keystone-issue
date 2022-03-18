import { model, Model, prop } from "mobx-keystone";
import MainModelPricedItemStatus from "./main-model-priced-item-status";
import Price from "../price";
import Duration from "../duration";
import MainModelPricedItemSourceInfo from "./main-model-priced-item-source-info";

@model("Rootstore/MainModelPricedItem")
class MainModelPricedItem extends Model({
  supplierId: prop<string>(),
  originalOrderItemId: prop<string>(),
  sources: prop<MainModelPricedItemSourceInfo[]>(() => []),
  status: prop<MainModelPricedItemStatus>(MainModelPricedItemStatus.UNKNOWN),
  unitPrice: prop<Price | undefined>(undefined),
  maxExpectedReceptionDelay: prop<Duration | undefined>(undefined),
}) {
  static fromGrpc(mainModelPricedItem: any): void {
    mainModelPricedItem.$modelType = "Rootstore/MainModelPricedItem";
    mainModelPricedItem.sources.map((source: any) => MainModelPricedItemSourceInfo.fromGrpc(source));
    if (mainModelPricedItem.unitPrice) Price.fromGrpc(mainModelPricedItem.unitPrice);
    if (mainModelPricedItem.maxExpectedReceptionDelay) Duration.fromGrpc(mainModelPricedItem.maxExpectedReceptionDelay);
    if (mainModelPricedItem.unitPrice) Price.fromGrpc(mainModelPricedItem.unitPrice);
    if (mainModelPricedItem.maxExpectedReceptionDelay) Duration.fromGrpc(mainModelPricedItem.maxExpectedReceptionDelay);
  }
}

export default MainModelPricedItem;
