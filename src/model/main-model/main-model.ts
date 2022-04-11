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
import { makeAutoObservable } from "mobx";

class MainModel {
  id: string = "";
  openDayDelivery: Duration | undefined;
  quantity: number = 0;
  pricingMode: PricingMode = PricingMode.UNKNOWN;
  expiresAt: string | undefined;
  createdAt: string | undefined;
  updatedAt: string | undefined;
  validatedAt: string | undefined;
  status: MainModelStatus| undefined;
  items: MainModelItem[] = [];
  quoteLines: MainModelLine[] = [];
  totalPriceEot: Price | undefined;
  totalPriceIot: Price | undefined;
  quoteMatrixId: string = "";
  isQuoteMatrixReference: boolean = false;
  projectId:  string = "";
  options: MainModelOptions | undefined;
  itemErrorStatusSummary: MainModelItemStatus = MainModelItemStatus.UNKNOWN;
  pricedItems: MainModelPricedItem[] = [];
  bestOrders: SecondModel[] = [];

  constructor(mainModel: MainModel) {
    makeAutoObservable(this);
    this.id = mainModel.id;
    this.openDayDelivery = mainModel.openDayDelivery;
    this.quantity = mainModel.quantity;
    this.pricingMode = mainModel.pricingMode;
    this.expiresAt = mainModel.expiresAt;
    this.createdAt = mainModel.createdAt;
    this.updatedAt = mainModel.updatedAt;
    this.validatedAt = mainModel.validatedAt;
    this.items = mainModel.items;
    this.quoteLines = mainModel.quoteLines;
    this.totalPriceEot = mainModel.totalPriceEot;
    this.totalPriceIot = mainModel.totalPriceIot;
    this.quoteMatrixId = mainModel.quoteMatrixId;
    this.isQuoteMatrixReference = mainModel.isQuoteMatrixReference;
    this.options = mainModel.options;
    this.itemErrorStatusSummary = mainModel.itemErrorStatusSummary;
    this.pricedItems = mainModel.pricedItems;
    this.bestOrders = mainModel.bestOrders;
  }

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
