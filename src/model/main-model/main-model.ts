import { types } from "mobx-state-tree"

import Duration, {fromGrpc as DurationFromGrpc} from "../duration";
import PricingMode from "./pricing-mode";
import MainModelStatus, {fromGrpc as MainModelStatusFromGrpc} from "./main-model-status";
import MainModelItem, {fromGrpc as MainModelItemFromGrpc} from "./main-model-item";
import Price, {fromGrpc as PriceFromGrpc} from "../price";
import MainModelOptions, {fromGrpc as MainModelOptionsFromGrpc} from "./main-model-options";
import MainModelLine, {fromGrpc as MainModelLineFromGrpc} from "./main-model-line";
import MainModelItemStatus from "./main-model-item-status";
import MainModelPricedItem, {fromGrpc as MainModelPricedItemFromGrpc} from "./main-model-priced-item";
import SecondModel, {fromGrpc as SecondModelFromGrpc} from "../second-model/second-model";

const MainModel = types.model("MainModel", {
  id: types.maybe(types.identifier),
  openDayDelivery: types.maybe(Duration),
  quantity: 0,
  pricingMode: types.number, // types.literal(PricingMode.UNKNOWN),
  expiresAt: types.maybe(types.string),
  createdAt: types.maybe(types.string),
  updatedAt: types.maybe(types.string),
  validatedAt: types.maybe(types.string),
  status:types.maybe(MainModelStatus),
  items: types.array(MainModelItem),
  quoteLines: types.array(MainModelLine),
  totalPriceEot: types.maybe(Price),
  totalPriceIot: types.maybe(Price),
  quoteMatrixId: "",
  isQuoteMatrixReference: false,
  projectId:  "",
  options: types.maybe(MainModelOptions),
  itemErrorStatusSummary: types.number, // types.literal(MainModelItemStatus.UNKNOWN),
  pricedItems: types.array(MainModelPricedItem),
  bestOrders: types.array(SecondModel),
});

export function fromGrpc(mainModel: any) {
  if (!mainModel.status)
    throw new Error("Status is empty in Quote");

  return MainModel.create({
    id: mainModel.id,
    quantity: mainModel.quantity,
    expiresAt: mainModel.expiresAt,
    createdAt: mainModel.createdAt,
    updatedAt: mainModel.updatedAt,
    validatedAt: mainModel.validatedAt,
    quoteMatrixId: mainModel.quoteMatrixId,
    isQuoteMatrixReference: mainModel.isQuoteMatrixReference,
    projectId: mainModel.projectId,
    pricedItems: mainModel.pricedItems.map((pricedItem: any) => MainModelPricedItemFromGrpc(pricedItem)),
    bestOrders: mainModel.bestOrders.map((bestOrder: any) => SecondModelFromGrpc(bestOrder)),
    openDayDelivery: mainModel.openDayDelivery ? DurationFromGrpc(mainModel.openDayDelivery) : undefined,
    pricingMode: mainModel.pricingMode,
    status: MainModelStatusFromGrpc(mainModel.status),
    items: mainModel.items.map((item:any) => MainModelItemFromGrpc(item)),
    quoteLines: mainModel.quoteLines.map((quoteLine:any) => MainModelLineFromGrpc(quoteLine)),
    totalPriceEot: mainModel.totalPriceEot ? PriceFromGrpc(mainModel.totalPriceEot) : undefined,
    totalPriceIot: mainModel.totalPriceIot ? PriceFromGrpc(mainModel.totalPriceIot) : undefined,
    options: mainModel.options ? MainModelOptionsFromGrpc(mainModel.options) : undefined,
    itemErrorStatusSummary: mainModel.itemErrorStatusSummary,
  });
}

export default MainModel;
