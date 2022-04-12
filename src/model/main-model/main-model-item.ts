import { types } from "mobx-state-tree"

import Duration, { fromGrpc as DurationfromGrpc } from "../duration";

import Quantity, {fromGrpc as QuantityFromGrpc} from "../quantity";
import SecondModelItem, {fromGrpc as SecondModelItemFromGrpc} from "../second-model/second-model-item";
import MainModelItemOptions, {fromGrpc as MainModelItemOptionsFromGrpc} from "./main-model-item-options";
import MainModelItemStatus from "./main-model-item-status";

const MainModelItem = types.model("MainModelItem",{
  id: types.string,
  orderItem: types.reference(SecondModelItem),
  options: types.maybe(MainModelItemOptions),
  status: types.literal(MainModelItemStatus.UNKNOWN),
  hasInternalError: false,
  additionalQuantity: types.maybe(Quantity),
  minOpenDaysDuration: types.maybe(Duration)
})

export function fromGrpc(
  mainModelItem: any,
) {
  if (!mainModelItem.orderItem)
    throw new Error("Can not QuoteItem.fromGrpc with empty orderItem");

  return MainModelItem.create({
    id: mainModelItem.id,
    hasInternalError: mainModelItem.hasInternalError,
    additionalQuantity: mainModelItem.additionalQuantity ? QuantityFromGrpc(mainModelItem.additionalQuantity) : undefined,
    minOpenDaysDuration: mainModelItem.minOpenDaysDuration ? DurationfromGrpc(mainModelItem.minOpenDaysDuration) : undefined,
        // @ts-ignore
    orderItem: SecondModelItemFromGrpc(mainModelItem.orderItem),
    options: mainModelItem.options ? MainModelItemOptionsFromGrpc(mainModelItem.options) : undefined,
    status: mainModelItem.status,
  });
}

export default MainModelItem;
