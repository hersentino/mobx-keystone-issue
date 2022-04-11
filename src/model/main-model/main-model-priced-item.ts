import MainModelPricedItemStatus from "./main-model-priced-item-status";
import Price from "../price";
import Duration from "../duration";
import MainModelPricedItemSourceInfo from "./main-model-priced-item-source-info";
import { makeAutoObservable } from "mobx";

// @model("Rootstore/MainModelPricedItem")
class MainModelPricedItem {
  supplierId: string = ""
  originalOrderItemId: string = ""
  sources: MainModelPricedItemSourceInfo[] = []
  status: MainModelPricedItemStatus = MainModelPricedItemStatus.UNKNOWN;
  unitPrice: Price | undefined;
  maxExpectedReceptionDelay: Duration | undefined;

  constructor(mainModel: MainModelPricedItem) {
    makeAutoObservable(this);
    this.maxExpectedReceptionDelay = mainModel.maxExpectedReceptionDelay;
    this.supplierId = mainModel.supplierId;
    this.sources = mainModel.sources;
    this.status = mainModel.status;
    this.originalOrderItemId = mainModel.originalOrderItemId;
    this.unitPrice = mainModel.unitPrice;
  }

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
