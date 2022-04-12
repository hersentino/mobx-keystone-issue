
import { makeAutoObservable } from "mobx";
import Duration from "../duration";

import Quantity from "../quantity";
import SecondModelItem from "../second-model/second-model-item";
import MainModelItemOptions from "./main-model-item-options";
import MainModelItemStatus from "./main-model-item-status";

class MainModelItem {
  orderItem: SecondModelItem = new SecondModelItem();
  options: MainModelItemOptions | undefined = undefined; 
  status: MainModelItemStatus = MainModelItemStatus.UNKNOWN;
  hasInternalError: boolean = false;
  additionalQuantity: Quantity | undefined = undefined;
  minOpenDaysDuration: Duration | undefined = undefined;

  constructor(mainModel?: MainModelItem) {
    makeAutoObservable(this);
    if (mainModel) {
      this.orderItem = mainModel.orderItem;
      this.options = mainModel.options;
      this.status = mainModel.status;
      this.hasInternalError = mainModel.hasInternalError;
      this.additionalQuantity = mainModel.additionalQuantity;
      this.minOpenDaysDuration = mainModel.minOpenDaysDuration;
    }
  }

  static fromGrpc(
    mainModelItem: any,
  ): MainModelItem {
    if (!mainModelItem.orderItem)
      throw new Error("Can not QuoteItem.fromGrpc with empty orderItem");
    return new this({
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
