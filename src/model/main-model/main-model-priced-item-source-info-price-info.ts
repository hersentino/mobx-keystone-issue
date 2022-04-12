import { model, prop, ModelData, DataModel } from "mobx-keystone";

import Quantity from "../quantity";
import QuotePricedItemSourceInfoPriceInfoPriceBreak from "./main-model-priced-item-source-info-price-info-price-break";

@model("Rootstore/MainModelPricedItemSourceInfoPriceInfo")
class MainModelPricedItemSourceInfoPriceInfo extends DataModel({
  minimumQuantity: prop<ModelData<Quantity> | undefined>(undefined),
  multipleQuantity: prop<ModelData<Quantity> | undefined>(undefined),
  priceBreaks: prop<ModelData<QuotePricedItemSourceInfoPriceInfoPriceBreak>[]>(() => []),
}) {
  static fromGrpc(mainModelPricedItemSourceInfoPriceInfo: any): ModelData<MainModelPricedItemSourceInfoPriceInfo> {
    return {
      priceBreaks: mainModelPricedItemSourceInfoPriceInfo.priceBreaks.map((priceBreak:any) => QuotePricedItemSourceInfoPriceInfoPriceBreak.fromGrpc(priceBreak)),
      minimumQuantity: mainModelPricedItemSourceInfoPriceInfo.minimumQuantity ? Quantity.fromGrpc(mainModelPricedItemSourceInfoPriceInfo.minimumQuantity) : undefined,
      multipleQuantity: mainModelPricedItemSourceInfoPriceInfo.multipleQuantity ? Quantity.fromGrpc(mainModelPricedItemSourceInfoPriceInfo.multipleQuantity) : undefined,
    };
  }

}

export default MainModelPricedItemSourceInfoPriceInfo;
