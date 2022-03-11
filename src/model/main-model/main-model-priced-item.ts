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
  static fromGrpc(mainModelPricedItem: any): MainModelPricedItem {
    return new this({
      supplierId: mainModelPricedItem.supplierId,
      originalOrderItemId: mainModelPricedItem.originalOrderItemId,
      sources: mainModelPricedItem.sources.map((source: any) => MainModelPricedItemSourceInfo.fromGrpc(source)),
      status: mainModelPricedItem.status as unknown as MainModelPricedItemStatus,
      unitPrice: mainModelPricedItem.unitPrice ? Price.fromGrpc(mainModelPricedItem.unitPrice) : undefined,
      maxExpectedReceptionDelay: mainModelPricedItem.maxExpectedReceptionDelay
        ? Duration.fromGrpc(mainModelPricedItem.maxExpectedReceptionDelay)
        : undefined,
    });
  }
}

export default MainModelPricedItem;
