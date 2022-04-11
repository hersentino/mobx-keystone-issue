import Quantity from "../quantity";
import Price from "../price";
import { makeAutoObservable } from "mobx";

class QuotePricedItemSourceInfoPriceInfoPriceBreak {
  minimumQuantity: Quantity | undefined;
  unitPrice: Price | undefined;
  multipleQuantity: Quantity | undefined;

  constructor(mainModel: QuotePricedItemSourceInfoPriceInfoPriceBreak) {
    makeAutoObservable(this);
    this.minimumQuantity = mainModel.minimumQuantity;
    this.unitPrice = mainModel.unitPrice;
    this.multipleQuantity =  mainModel.multipleQuantity
  }

  static fromGrpc(
    quotePricedItems: any
  ): QuotePricedItemSourceInfoPriceInfoPriceBreak {
    return new this({
      minimumQuantity: quotePricedItems.minimumQuantity ? Quantity.fromGrpc(quotePricedItems.minimumQuantity) : undefined,
      unitPrice: quotePricedItems.unitPrice ? Price.fromGrpc(quotePricedItems.unitPrice) : undefined,
      multipleQuantity: quotePricedItems.multipleQuantity ? Quantity.fromGrpc(quotePricedItems.multipleQuantity) : undefined,
    });
  }
}

export default QuotePricedItemSourceInfoPriceInfoPriceBreak;
