import { model, prop, DataModel, ModelData } from "mobx-keystone";
import Quantity from "../quantity";
import Price from "../price";

@model("MobxStore/Supplier/Quote/QuotePricedItemSourceInfoPriceInfoPriceBreak")
class QuotePricedItemSourceInfoPriceInfoPriceBreak extends DataModel({
  minimumQuantity: prop<ModelData<Quantity> | undefined>(undefined),
  unitPrice: prop<ModelData<Price> | undefined>(undefined),
  multipleQuantity: prop<ModelData<Quantity> | undefined>(undefined),
}) {
  static fromGrpc(
    quotePricedItems: any
  ): ModelData<QuotePricedItemSourceInfoPriceInfoPriceBreak> {
    return {
      minimumQuantity: quotePricedItems.minimumQuantity ? Quantity.fromGrpc(quotePricedItems.minimumQuantity) : undefined,
      unitPrice: quotePricedItems.unitPrice ? Price.fromGrpc(quotePricedItems.unitPrice) : undefined,
      multipleQuantity: quotePricedItems.multipleQuantity ? Quantity.fromGrpc(quotePricedItems.multipleQuantity) : undefined,
    };
  }
}

export default QuotePricedItemSourceInfoPriceInfoPriceBreak;
