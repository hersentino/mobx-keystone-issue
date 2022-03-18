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
  ): void {
    quotePricedItems.$modelType = "MobxStore/Supplier/Quote/QuotePricedItemSourceInfoPriceInfoPriceBreak";
    if (quotePricedItems.minimumQuantity) Quantity.fromGrpc(quotePricedItems.minimumQuantity);
    if (quotePricedItems.unitPrice) Price.fromGrpc(quotePricedItems.unitPrice);
    if (quotePricedItems.multipleQuantity) Quantity.fromGrpc(quotePricedItems.multipleQuantity);
  }
}

export default QuotePricedItemSourceInfoPriceInfoPriceBreak;
