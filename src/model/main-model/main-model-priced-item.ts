import { types } from "mobx-state-tree"
import MainModelPricedItemStatus from "./main-model-priced-item-status";
import Price, {fromGrpc as PriceFromGrpc} from "../price";
import Duration, {fromGrpc as DurationFromGrpc} from "../duration";
import MainModelPricedItemSourceInfo, {fromGrpc as MainModelPricedItemSourceInfoFromGrpc} from "./main-model-priced-item-source-info";

const MainModelPricedItem = types.model("MainModelPricedItem", {
  supplierId: types.string,
  originalOrderItemId: types.string,
  sources: types.array(MainModelPricedItemSourceInfo),
  status: types.number, // types.literal(MainModelPricedItemStatus.UNKNOWN),
  unitPrice: types.maybe(Price),
  maxExpectedReceptionDelay: types.maybe(Duration),
});

export function fromGrpc(mainModelPricedItem: any) {
  return MainModelPricedItem.create({
    supplierId: mainModelPricedItem.supplierId,
    originalOrderItemId: mainModelPricedItem.originalOrderItemId,
    sources: mainModelPricedItem.sources.map((source: any) => MainModelPricedItemSourceInfoFromGrpc(source)),
    status: mainModelPricedItem.status,
    unitPrice: mainModelPricedItem.unitPrice ? PriceFromGrpc(mainModelPricedItem.unitPrice) : undefined,
    maxExpectedReceptionDelay: mainModelPricedItem.maxExpectedReceptionDelay
      ? DurationFromGrpc(mainModelPricedItem.maxExpectedReceptionDelay)
      : undefined,
  });
}

export default MainModelPricedItem;
