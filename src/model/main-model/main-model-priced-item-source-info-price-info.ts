import { types } from "mobx-state-tree"

import Quantity, { fromGrpc as QuantityFromGrpc } from "../quantity";
import QuotePricedItemSourceInfoPriceInfoPriceBreak, {fromGrpc as QuotePricedItemSourceInfoPriceInfoPriceBreakFromGrpc} from "./main-model-priced-item-source-info-price-info-price-break";


const MainModelPricedItemSourceInfoPriceInfo = types.model("MainModelPricedItemSourceInfoPriceInfo", {
  minimumQuantity: types.maybe(Quantity),
  multipleQuantity: types.maybe(Quantity),
  priceBreaks: types.array(QuotePricedItemSourceInfoPriceInfoPriceBreak),
});

export function fromGrpc(mainModelPricedItemSourceInfoPriceInfo: any) {
  return MainModelPricedItemSourceInfoPriceInfo.create({
    priceBreaks: mainModelPricedItemSourceInfoPriceInfo.priceBreaks.map((priceBreak:any) => QuotePricedItemSourceInfoPriceInfoPriceBreakFromGrpc(priceBreak)),
    minimumQuantity: mainModelPricedItemSourceInfoPriceInfo.minimumQuantity ? QuantityFromGrpc(mainModelPricedItemSourceInfoPriceInfo.minimumQuantity) : undefined,
    multipleQuantity: mainModelPricedItemSourceInfoPriceInfo.multipleQuantity ? QuantityFromGrpc(mainModelPricedItemSourceInfoPriceInfo.multipleQuantity) : undefined,
  });
}

export default MainModelPricedItemSourceInfoPriceInfo;
