import { types } from "mobx-state-tree"
import Quantity, { fromGrpc as QuantityFromGrpc } from "../quantity";
import Price, {fromGrpc as PriceFromGrpc} from "../price";

const QuotePricedItemSourceInfoPriceInfoPriceBreak = types.model("QuotePricedItemSourceInfoPriceInfoPriceBreak", {
  minimumQuantity: types.maybe(Quantity),
  unitPrice: types.maybe(Price),
  multipleQuantity: types.maybe(Quantity),
});

export function fromGrpc(
  quotePricedItems: any
) {
  return QuotePricedItemSourceInfoPriceInfoPriceBreak.create({
    minimumQuantity: quotePricedItems.minimumQuantity ? QuantityFromGrpc(quotePricedItems.minimumQuantity) : undefined,
    unitPrice: quotePricedItems.unitPrice ? PriceFromGrpc(quotePricedItems.unitPrice) : undefined,
    multipleQuantity: quotePricedItems.multipleQuantity ? QuantityFromGrpc(quotePricedItems.multipleQuantity) : undefined,
  });
}

export default QuotePricedItemSourceInfoPriceInfoPriceBreak;
