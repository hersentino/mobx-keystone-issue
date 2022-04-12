import { model, prop, Model, ModelData } from "mobx-keystone";

import SecondModelItem from "../second-model/second-model-item";
import Quantity from "../quantity";
import QuantityOriginDuration from "../second-model/quantity-origin-duration";
import MainModelPricedItemSourceInfoPriceInfo from "./main-model-priced-item-source-info-price-info";

@model("Rootstore/MainModelPricedItemSourceInfo")
class MainModelPricedItemSourceInfo extends Model({
  pricedOrderItem: prop<ModelData<SecondModelItem>>(() => new SecondModelItem({}).$),
  stock: prop<ModelData<Quantity> | undefined>(undefined),
  priceInfo: prop<ModelData<MainModelPricedItemSourceInfoPriceInfo> | undefined>(undefined),
  leadDurations: prop<ModelData<QuantityOriginDuration>[]>(() => []),
  deliveryDurations: prop<ModelData<QuantityOriginDuration>[]>(() => []),
}) {
  static fromGrpc(mainModelPricedItemSourceInfo: any): ModelData<MainModelPricedItemSourceInfo> {
    if (!mainModelPricedItemSourceInfo.pricedOrderItem)
      throw new Error("Can not MainModelPricedItemSourceInfo.fromGrpc with empty pricedOrderItem");

    return {
      pricedOrderItem: SecondModelItem.fromGrpc(mainModelPricedItemSourceInfo.pricedOrderItem),

      stock: mainModelPricedItemSourceInfo.stock ? Quantity.fromGrpc(mainModelPricedItemSourceInfo.stock) : undefined,
      priceInfo: mainModelPricedItemSourceInfo.priceInfo
        ? MainModelPricedItemSourceInfoPriceInfo.fromGrpc(mainModelPricedItemSourceInfo.priceInfo)
        : undefined,

      leadDurations: mainModelPricedItemSourceInfo.leadDurations.map((leadDuration: any) => QuantityOriginDuration.fromGrpc(leadDuration)),
      deliveryDurations: mainModelPricedItemSourceInfo.deliveryDurations.map((deliveryDuration: any) =>
        QuantityOriginDuration.fromGrpc(deliveryDuration)
      ),
    };
  }
}

export default MainModelPricedItemSourceInfo;
