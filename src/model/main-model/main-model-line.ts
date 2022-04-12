import { types } from "mobx-state-tree"
import Price, {fromGrpc as PriceFromGrpc} from "../price";

const MainModelLine = types.model("MainModelLine", {
  id: types.string,
  name: "",
  description: "",
  priceEot: types.reference(Price),
  taxRate: 0,
});


export function fromGrpc(mainModelLine: any) {
  const { priceEot } = mainModelLine;

  if (!priceEot)
    throw new Error("PriceEot is empty in MainModelLine");
  return MainModelLine.create({
    id: mainModelLine.id,
    name: mainModelLine.name,
    description: mainModelLine.description,
    taxRate: mainModelLine.taxRate,
    // @ts-ignore
    priceEot: PriceFromGrpc(priceEot),
  });
}

export default MainModelLine;
