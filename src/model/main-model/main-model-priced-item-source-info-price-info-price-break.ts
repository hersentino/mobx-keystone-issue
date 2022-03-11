import { model, prop, Model } from "mobx-keystone";
import Quantity from "../quantity";
import Price from "../price";

@model("MobxStore/Supplier/Quote/QuotePricedItemSourceInfoPriceInfoPriceBreak")
class QuotePricedItemSourceInfoPriceInfoPriceBreak extends Model({
  minimumQuantity: prop<Quantity | undefined>(undefined),
  unitPrice: prop<Price | undefined>(undefined),
  multipleQuantity: prop<Quantity | undefined>(undefined),
}) {
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
