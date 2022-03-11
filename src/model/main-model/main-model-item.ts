import { model, prop, Model, idProp } from "mobx-keystone";

import Duration from "../duration";

import Quantity from "../quantity";
import SecondModelItem from "../second-model/second-model-item";
import MainModelItemOptions from "./main-model-item-options";
import MainModelItemStatus from "./main-model-item-status";

@model("Rootstore/MainModelItem")
class MainModelItem extends Model({
  id: idProp,
  orderItem: prop<SecondModelItem>(() => new SecondModelItem({})),
  options: prop<MainModelItemOptions | undefined>(undefined),
  status: prop<MainModelItemStatus>(MainModelItemStatus.UNKNOWN),
  hasInternalError: prop<boolean>(false),
  additionalQuantity: prop<Quantity | undefined>(undefined),
  minOpenDaysDuration: prop<Duration | undefined>(undefined),
}) {
  static fromGrpc(
    mainModelItem: any,
  ): MainModelItem {
    if (!mainModelItem.orderItem)
      throw new Error("Can not QuoteItem.fromGrpc with empty orderItem");

    return new this({
      id: mainModelItem.id,
      hasInternalError: mainModelItem.hasInternalError,
      additionalQuantity: mainModelItem.additionalQuantity ? Quantity.fromGrpc(mainModelItem.additionalQuantity) : undefined,
      minOpenDaysDuration: mainModelItem.minOpenDaysDuration ? Duration.fromGrpc(mainModelItem.minOpenDaysDuration) : undefined,
      orderItem: SecondModelItem.fromGrpc(mainModelItem.orderItem),
      options: mainModelItem.options ? MainModelItemOptions.fromGrpc(mainModelItem.options) : undefined,
      status: mainModelItem.status as unknown as MainModelItemStatus,
    });
  }
}

export default MainModelItem;
