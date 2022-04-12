import { types } from "mobx-state-tree"

import SecondModelItem, {fromGrpc as SecondModelItemFromGrpc} from "../second-model/second-model-item";
import Quantity, { fromGrpc as QuantityFromGrpc } from "../quantity";
import QuantityOriginDuration, {fromGrpc as QuantityOriginDurationFromGrpc} from "../second-model/quantity-origin-duration";
import MainModelPricedItemSourceInfoPriceInfo, {fromGrpc as MainModelPricedItemSourceInfoPriceInfoFromGrpc} from "./main-model-priced-item-source-info-price-info";

const MainModelPricedItemSourceInfo = types.model("MainModelPricedItemSourceInfo", {
  pricedOrderItem: types.reference(SecondModelItem),
  stock: types.maybe(Quantity),
  priceInfo:  types.reference(MainModelPricedItemSourceInfoPriceInfo),
  leadDurations: types.array(QuantityOriginDuration),
  deliveryDurations: types.array(QuantityOriginDuration),
});

export function fromGrpc(mainModelPricedItemSourceInfo: any) {
  if (!mainModelPricedItemSourceInfo.pricedOrderItem)
    throw new Error("Can not MainModelPricedItemSourceInfo.fromGrpc with empty pricedOrderItem");

  return MainModelPricedItemSourceInfo.create({
    // @ts-ignore
    pricedOrderItem: SecondModelItemFromGrpc(mainModelPricedItemSourceInfo.pricedOrderItem),

    stock: mainModelPricedItemSourceInfo.stock ? QuantityFromGrpc(mainModelPricedItemSourceInfo.stock) : undefined,
    // @ts-ignore

    priceInfo: mainModelPricedItemSourceInfo.priceInfo
      ? MainModelPricedItemSourceInfoPriceInfoFromGrpc(mainModelPricedItemSourceInfo.priceInfo)
      : undefined,

    leadDurations: mainModelPricedItemSourceInfo.leadDurations.map((leadDuration: any) => QuantityOriginDurationFromGrpc(leadDuration)),
    deliveryDurations: mainModelPricedItemSourceInfo.deliveryDurations.map((deliveryDuration: any) =>
      QuantityOriginDurationFromGrpc(deliveryDuration)
    ),
  });
}

export default MainModelPricedItemSourceInfo;
