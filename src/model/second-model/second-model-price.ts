import { types } from "mobx-state-tree"
import Price, {fromGrpc as PriceFromGrpc} from "../price";
import SecondModelPriceType from "./second-model-price-type";

const SecondeModelPrice = types.model("SecondeModelPrice", {
  id: types.string,
  type: types.literal(SecondModelPriceType.UNRECOGNIZED),
  price: types.maybe(Price),
  details: "",
});

export function fromGrpc(secondeModelPrice: any) {
  return SecondeModelPrice.create({
    id: secondeModelPrice.id,
    details: secondeModelPrice.details,
    type: secondeModelPrice.type,
    price: secondeModelPrice.price ? PriceFromGrpc(secondeModelPrice.price) : undefined,
  });
}

export default SecondeModelPrice;
