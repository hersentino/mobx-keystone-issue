import { model, prop, Model } from "mobx-keystone";

import Quantity from "../quantity";
import QuotePricedItemSourceInfoPriceInfoPriceBreak from "./main-model-priced-item-source-info-price-info-price-break";

@model("Rootstore/MainModelPricedItemSourceInfoPriceInfo")
class MainModelPricedItemSourceInfoPriceInfo extends Model({
  minimumQuantity: prop<Quantity | undefined>(undefined),
  multipleQuantity: prop<Quantity | undefined>(undefined),
  priceBreaks: prop<QuotePricedItemSourceInfoPriceInfoPriceBreak[]>(() => []),
}) {
  static fromGrpc(mainModelPricedItemSourceInfoPriceInfo: any): void {
    mainModelPricedItemSourceInfoPriceInfo.$modelType = "Rootstore/MainModelPricedItemSourceInfoPriceInfo";
    mainModelPricedItemSourceInfoPriceInfo.priceBreaks.map((priceBreak:any) => QuotePricedItemSourceInfoPriceInfoPriceBreak.fromGrpc(priceBreak));
    if (mainModelPricedItemSourceInfoPriceInfo.minimumQuantity) Quantity.fromGrpc(mainModelPricedItemSourceInfoPriceInfo.minimumQuantity);
    if (mainModelPricedItemSourceInfoPriceInfo.multipleQuantity) Quantity.fromGrpc(mainModelPricedItemSourceInfoPriceInfo.multipleQuantity);
  }

}

export default MainModelPricedItemSourceInfoPriceInfo;
