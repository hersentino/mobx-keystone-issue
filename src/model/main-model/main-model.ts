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
  static fromGrpc(mainModel: any): void {
    if (!mainModel.status)
      throw new Error("Status is empty in Quote");

    mainModel.$modelType = "Rootstore/MainModel";      
    mainModel.pricedItems.map((pricedItem: any) => MainModelPricedItem.fromGrpc(pricedItem));
    mainModel.bestOrders.map((bestOrder: any) => SecondModel.fromGrpc(bestOrder));
    if (mainModel.openDayDelivery) Duration.fromGrpc(mainModel.openDayDelivery);
    if (mainModel.status) MainModelStatus.fromGrpc(mainModel.status);
    mainModel.items.map((item: any) => MainModelItem.fromGrpc(item));
    mainModel.quoteLines.map((quoteLine:any) => MainModelLine.fromGrpc(quoteLine));
    if (mainModel.totalPriceEot) Price.fromGrpc(mainModel.totalPriceEot);
    if (mainModel.totalPriceIot) Price.fromGrpc(mainModel.totalPriceIot);
    if (mainModel.options) MainModelOptions.fromGrpc(mainModel.options);
  }
}

export default MainModel;
