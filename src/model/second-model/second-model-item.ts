import { types } from "mobx-state-tree"

import Duration, {fromGrpc as DurationFromGrpc} from "../duration";
import Quantity, {fromGrpc as QuantityFromGrpc} from "../quantity";
import SecondModelItemType from "./second-model-item-type";
import Price, {fromGrpc as PriceFromGrpc} from "../price";
import QuantityOriginDuration, {fromGrpc as QuantityOriginDurationFromGrpc} from "./quantity-origin-duration";

const SecondModelItem = types.model("SecondModelItem", {
  id: "",
  type: types.literal(SecondModelItemType.UNRECOGNIZED),
  specId: "",
  unitPrice: types.maybe(Price),
  quantity: types.reference(Quantity),
  reference: "",
  expectedReceptionDate: types.maybe(types.string),
  url: "",
  imageUrl: "",
  manufacturer: "",
  mpn:"",
  leadDurations: types.array(QuantityOriginDuration),
  expectedReceptionDelay: types.maybe(Duration),
});

export function fromGrpc(secondModelItem: any) {
  if (!secondModelItem.quantity)
    throw new Error("Can not SecondModelItem.fromGrpc with empty quantity");

  return SecondModelItem.create({
    id: secondModelItem.id,
    specId: secondModelItem.specId,
    reference: secondModelItem.reference,
    expectedReceptionDate: secondModelItem.expectedReceptionDate,
    url: secondModelItem.url,
    imageUrl: secondModelItem.imageUrl,
    manufacturer: secondModelItem.manufacturer,
    mpn: secondModelItem.mpn,
    // @ts-ignore
    quantity: QuantityFromGrpc(secondModelItem.quantity),
    unitPrice: secondModelItem.unitPrice ? PriceFromGrpc(secondModelItem.unitPrice) : undefined,
    expectedReceptionDelay: secondModelItem.expectedReceptionDelay ? DurationFromGrpc(secondModelItem.expectedReceptionDelay) : undefined,
    leadDurations: secondModelItem.leadDurations.map((leadDuration:any) => QuantityOriginDurationFromGrpc(leadDuration)),
    type: secondModelItem.type ,
  });
}

export default SecondModelItem;
