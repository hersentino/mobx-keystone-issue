import { model, prop, Model } from "mobx-keystone";

import SecondModelItem from "../second-model/second-model-item";
import Quantity from "../quantity";
import QuantityOriginDuration from "../second-model/quantity-origin-duration";
import MainModelPricedItemSourceInfoPriceInfo from "./main-model-priced-item-source-info-price-info";

@model("Rootstore/MainModelPricedItemSourceInfo")
class MainModelPricedItemSourceInfo extends Model({
  pricedOrderItem: prop<SecondModelItem>(() => new SecondModelItem({})),
  stock: prop<Quantity | undefined>(undefined),
  priceInfo: prop<MainModelPricedItemSourceInfoPriceInfo | undefined>(undefined),
  leadDurations: prop<QuantityOriginDuration[]>(() => []),
  deliveryDurations: prop<QuantityOriginDuration[]>(() => []),
}) {
  static fromGrpc(mainModelPricedItemSourceInfo: any): MainModelPricedItemSourceInfo {
    if (!mainModelPricedItemSourceInfo.pricedOrderItem)
      throw new Error("Can not MainModelPricedItemSourceInfo.fromGrpc with empty pricedOrderItem");

    return new this({
      pricedOrderItem: SecondModelItem.fromGrpc(mainModelPricedItemSourceInfo.pricedOrderItem),

      stock: mainModelPricedItemSourceInfo.stock ? Quantity.fromGrpc(mainModelPricedItemSourceInfo.stock) : undefined,
      priceInfo: mainModelPricedItemSourceInfo.priceInfo
        ? MainModelPricedItemSourceInfoPriceInfo.fromGrpc(mainModelPricedItemSourceInfo.priceInfo)
        : undefined,

      leadDurations: mainModelPricedItemSourceInfo.leadDurations.map((leadDuration: any) => QuantityOriginDuration.fromGrpc(leadDuration)),
      deliveryDurations: mainModelPricedItemSourceInfo.deliveryDurations.map((deliveryDuration: any) =>
        QuantityOriginDuration.fromGrpc(deliveryDuration)
      ),
    });
  }
}

export default MainModelPricedItemSourceInfo;
