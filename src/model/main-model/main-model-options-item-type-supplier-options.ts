import { types } from "mobx-state-tree"
import SecondModelItemType from "../second-model/second-model-item-type";
import MainModelSupplierOptions, {fromGrpc as MainModelSupplierOptionsFromGrpc} from "./main-model-supplier-options";

const MainModelOptionsItemTypeSupplierOptions = types.model("MainModelOptionsItemTypeSupplierOptions", {
  type: types.literal(SecondModelItemType.UNRECOGNIZED),
  supplierOptions: types.maybe(MainModelSupplierOptions),
});

export function fromGrpc(
  mainModelOptionsItemTypeSupplierOptions: any
) {
  return MainModelOptionsItemTypeSupplierOptions.create({
    supplierOptions: mainModelOptionsItemTypeSupplierOptions.supplierOptions
      ? MainModelSupplierOptionsFromGrpc(mainModelOptionsItemTypeSupplierOptions.supplierOptions)
      : undefined,
    type: mainModelOptionsItemTypeSupplierOptions.type,
  });
}

export default MainModelOptionsItemTypeSupplierOptions;
