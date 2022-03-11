import { model, prop, Model, idProp } from "mobx-keystone";

import Duration from "../duration";
import PricingMode from "./pricing-mode";
import MainModelStatus from "./main-model-status";
import MainModelItem from "./main-model-item";
import Price from "../price";
import MainModelOptions from "./main-model-options";
import MainModelLine from "./main-model-line";
import MainModelItemStatus from "./main-model-item-status";
import MainModelPricedItem from "./main-model-priced-item";
import SecondModel from "../second-model/second-model";

@model("Rootstore/MainModel")
class MainModel extends Model({
  id: prop<string>(""),
  openDayDelivery: prop<Duration | undefined>(),
  quantity: prop<number>(0),
  pricingMode: prop<PricingMode>(PricingMode.UNKNOWN),
  expiresAt: prop<string | undefined>(),
  createdAt: prop<string | undefined>(),
  updatedAt: prop<string | undefined>(),
  validatedAt: prop<string | undefined>(),
  status: prop<MainModelStatus| undefined>(),
  items: prop<MainModelItem[]>(() => []),
  quoteLines: prop<MainModelLine[]>(() => []),
  totalPriceEot: prop<Price | undefined>(),
  totalPriceIot: prop<Price | undefined>(),
  quoteMatrixId: prop<string>(""),
  isQuoteMatrixReference: prop<boolean>(false),
  projectId:  prop<string>(""),
  options: prop<MainModelOptions | undefined>(),
  itemErrorStatusSummary: prop<MainModelItemStatus>(MainModelItemStatus.UNKNOWN),
  pricedItems: prop<MainModelPricedItem[]>(() => []),
  bestOrders: prop<SecondModel[]>(() => []),
}) {
  static fromGrpc(mainModel: any): MainModel {
    if (!mainModel.status)
      throw new Error("Status is empty in Quote");

    return new this({
      id: mainModel.id,
      quantity: mainModel.quantity,
      expiresAt: mainModel.expiresAt,
      createdAt: mainModel.createdAt,
      updatedAt: mainModel.updatedAt,
      validatedAt: mainModel.validatedAt,
      quoteMatrixId: mainModel.quoteMatrixId,
      isQuoteMatrixReference: mainModel.isQuoteMatrixReference,
      projectId: mainModel.projectId,
      pricedItems: mainModel.pricedItems.map((pricedItem: any) => MainModelPricedItem.fromGrpc(pricedItem)),
      bestOrders: mainModel.bestOrders.map((bestOrder: any) => SecondModel.fromGrpc(bestOrder)),
      openDayDelivery: mainModel.openDayDelivery ? Duration.fromGrpc(mainModel.openDayDelivery) : undefined,
      pricingMode: mainModel.pricingMode as unknown as PricingMode,
      status: MainModelStatus.fromGrpc(mainModel.status),
      items: mainModel.items.map((item:any) => MainModelItem.fromGrpc(item)),
      quoteLines: mainModel.quoteLines.map((quoteLine:any) => MainModelLine.fromGrpc(quoteLine)),
      totalPriceEot: mainModel.totalPriceEot ? Price.fromGrpc(mainModel.totalPriceEot) : undefined,
      totalPriceIot: mainModel.totalPriceIot ? Price.fromGrpc(mainModel.totalPriceIot) : undefined,
      options: mainModel.options ? MainModelOptions.fromGrpc(mainModel.options) : undefined,
      itemErrorStatusSummary: mainModel.itemErrorStatusSummary as unknown as MainModelItemStatus,
    });
  }
}

export default MainModel;
