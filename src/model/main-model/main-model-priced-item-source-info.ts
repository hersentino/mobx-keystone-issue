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
  static fromGrpc(mainModelPricedItemSourceInfo: any): void {
    if (!mainModelPricedItemSourceInfo.pricedOrderItem)
      throw new Error("Can not MainModelPricedItemSourceInfo.fromGrpc with empty pricedOrderItem");

      mainModelPricedItemSourceInfo.$modelType = "Rootstore/MainModelPricedItemSourceInfo";
    SecondModelItem.fromGrpc(mainModelPricedItemSourceInfo.pricedOrderItem);
    if (mainModelPricedItemSourceInfo.stock) Quantity.fromGrpc(mainModelPricedItemSourceInfo.stock);
    if (mainModelPricedItemSourceInfo.priceInfo) MainModelPricedItemSourceInfoPriceInfo.fromGrpc(mainModelPricedItemSourceInfo.priceInfo);
    mainModelPricedItemSourceInfo.leadDurations.map((leadDuration: any) => QuantityOriginDuration.fromGrpc(leadDuration));
    mainModelPricedItemSourceInfo.deliveryDurations.map((deliveryDuration: any) => QuantityOriginDuration.fromGrpc(deliveryDuration));
  }
}

export default MainModelPricedItemSourceInfo;
