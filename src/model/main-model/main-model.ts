import { model, prop, DataModel, ModelData } from "mobx-keystone";

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
class MainModel extends DataModel({
  id: prop<string>(""),
  openDayDelivery: prop<ModelData<Duration> | undefined>(),
  quantity: prop<number>(0),
  pricingMode: prop<PricingMode>(PricingMode.UNKNOWN),
  expiresAt: prop<string | undefined>(),
  createdAt: prop<string | undefined>(),
  updatedAt: prop<string | undefined>(),
  validatedAt: prop<string | undefined>(),
  status: prop<ModelData<MainModelStatus> | undefined>(),
  items: prop<ModelData<MainModelItem>[]>(() => []),
  quoteLines: prop<ModelData<MainModelLine>[]>(() => []),
  totalPriceEot: prop<ModelData<Price> | undefined>(),
  totalPriceIot: prop<ModelData<Price> | undefined>(),
  quoteMatrixId: prop<string>(""),
  isQuoteMatrixReference: prop<boolean>(false),
  projectId:  prop<string>(""),
  options: prop<ModelData<MainModelOptions> | undefined>(),
  itemErrorStatusSummary: prop<MainModelItemStatus>(MainModelItemStatus.UNKNOWN),
  pricedItems: prop<ModelData<MainModelPricedItem>[]>(() => []),
  bestOrders: prop<ModelData<SecondModel>[]>(() => []),
}) {
  static fromGrpc(mainModel: any): ModelData<MainModel> {
    if (!mainModel.status)
      throw new Error("Status is empty in Quote");

    return {
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
    };
  }

  static test(mainModel: ModelData<MainModel>):MainModel {
    return new this(mainModel)
  }
}

export default MainModel;
