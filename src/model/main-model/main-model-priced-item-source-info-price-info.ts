
import { makeAutoObservable } from "mobx";
import Quantity from "../quantity";
import QuotePricedItemSourceInfoPriceInfoPriceBreak from "./main-model-priced-item-source-info-price-info-price-break";

class MainModelPricedItemSourceInfoPriceInfo {
  minimumQuantity: Quantity | undefined;
  multipleQuantity: Quantity | undefined;
  priceBreaks: QuotePricedItemSourceInfoPriceInfoPriceBreak[] = [];

  constructor(mainModel?: MainModelPricedItemSourceInfoPriceInfo) {
    makeAutoObservable(this);

    if (mainModel) {
      this.minimumQuantity = mainModel.minimumQuantity;
      this.multipleQuantity = mainModel.multipleQuantity;
      this.priceBreaks =  mainModel.priceBreaks
    }
  }

  static fromGrpc(mainModelPricedItemSourceInfoPriceInfo: any): MainModelPricedItemSourceInfoPriceInfo {
    return new this({
      priceBreaks: mainModelPricedItemSourceInfoPriceInfo.priceBreaks.map((priceBreak:any) => QuotePricedItemSourceInfoPriceInfoPriceBreak.fromGrpc(priceBreak)),
      minimumQuantity: mainModelPricedItemSourceInfoPriceInfo.minimumQuantity ? Quantity.fromGrpc(mainModelPricedItemSourceInfoPriceInfo.minimumQuantity) : undefined,
      multipleQuantity: mainModelPricedItemSourceInfoPriceInfo.multipleQuantity ? Quantity.fromGrpc(mainModelPricedItemSourceInfoPriceInfo.multipleQuantity) : undefined,
    });
  }

}

export default MainModelPricedItemSourceInfoPriceInfo;
