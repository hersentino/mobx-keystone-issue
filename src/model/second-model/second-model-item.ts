import { model, prop, Model } from "mobx-keystone";

import Duration from "../duration";
import Quantity from "../quantity";
import SecondModelItemType from "./second-model-item-type";
import Price from "../price";
import QuantityOriginDuration from "./quantity-origin-duration";

@model("Rootstore/SecondModelItem")
class SecondModelItem extends Model({
  id: prop<string>(""),
  type: prop<SecondModelItemType>(SecondModelItemType.UNRECOGNIZED),
  specId: prop<string>(""),
  unitPrice: prop<Price | undefined>(undefined),
  quantity: prop<Quantity>(() => new Quantity({})),
  reference: prop<string>(""),
  expectedReceptionDate: prop<string | undefined>(),
  url: prop<string>(""),
  imageUrl: prop<string>(""),
  manufacturer: prop<string>(""),
  mpn:prop<string>(""),
  leadDurations: prop<QuantityOriginDuration[]>(() => []),
  expectedReceptionDelay: prop<Duration | undefined>(undefined),
}) {
  static fromGrpc(secondModelItem: any): void {
    if (!secondModelItem.quantity)
      throw new Error("Can not SecondModelItem.fromGrpc with empty quantity");

    secondModelItem.$modelType = "Rootstore/SecondModelItem";
    if (secondModelItem.quantity) Quantity.fromGrpc(secondModelItem.quantity);
    if (secondModelItem.unitPrice) Price.fromGrpc(secondModelItem.unitPrice);
    if (secondModelItem.expectedReceptionDelay) Duration.fromGrpc(secondModelItem.expectedReceptionDelay);
    secondModelItem.leadDurations.forEach((leadDuration:any) => QuantityOriginDuration.fromGrpc(leadDuration));
  }
}

export default SecondModelItem;
