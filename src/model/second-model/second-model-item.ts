import { model, prop, ModelData, DataModel } from "mobx-keystone";

import Duration from "../duration";
import Quantity from "../quantity";
import SecondModelItemType from "./second-model-item-type";
import Price from "../price";
import QuantityOriginDuration from "./quantity-origin-duration";

@model("Rootstore/SecondModelItem")
class SecondModelItem extends DataModel({
  id: prop<string>(""),
  type: prop<SecondModelItemType>(SecondModelItemType.UNRECOGNIZED),
  specId: prop<string>(""),
  unitPrice: prop<ModelData<Price> | undefined>(undefined),
  quantity: prop<ModelData<Quantity>>(() => new Quantity({})),
  reference: prop<string>(""),
  expectedReceptionDate: prop<string | undefined>(),
  url: prop<string>(""),
  imageUrl: prop<string>(""),
  manufacturer: prop<string>(""),
  mpn:prop<string>(""),
  leadDurations: prop<ModelData<QuantityOriginDuration>[]>(() => []),
  expectedReceptionDelay: prop<ModelData<Duration> | undefined>(undefined),
}) {
  static fromGrpc(secondModelItem: any): ModelData<SecondModelItem> {
    if (!secondModelItem.quantity)
      throw new Error("Can not SecondModelItem.fromGrpc with empty quantity");

    return {
      id: secondModelItem.id,
      specId: secondModelItem.specId,
      reference: secondModelItem.reference,
      expectedReceptionDate: secondModelItem.expectedReceptionDate,
      url: secondModelItem.url,
      imageUrl: secondModelItem.imageUrl,
      manufacturer: secondModelItem.manufacturer,
      mpn: secondModelItem.mpn,
      quantity: Quantity.fromGrpc(secondModelItem.quantity),
      unitPrice: secondModelItem.unitPrice ? Price.fromGrpc(secondModelItem.unitPrice) : undefined,
      expectedReceptionDelay: secondModelItem.expectedReceptionDelay ? Duration.fromGrpc(secondModelItem.expectedReceptionDelay) : undefined,
      leadDurations: secondModelItem.leadDurations.map((leadDuration:any) => QuantityOriginDuration.fromGrpc(leadDuration)),
      type: secondModelItem.type as unknown as SecondModelItemType,
    };
  }
}

export default SecondModelItem;
