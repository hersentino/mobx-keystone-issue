import { types } from "mobx-state-tree"
import MainModelOptionsItemTypeSupplierOptions, {fromGrpc as MainModelOptionsItemTypeSupplierOptionsFromGrpc} from "./main-model-options-item-type-supplier-options";


const MainModelOptions = types.model("MainModelOptions", {
  itemTypeSupplierOptions: types.array(MainModelOptionsItemTypeSupplierOptions),
});

export function fromGrpc(mainModelOptions: any) {
  return MainModelOptions.create({
    itemTypeSupplierOptions: mainModelOptions.itemTypeSupplierOptions.map((itemTypeSupplierOption: any) =>
      MainModelOptionsItemTypeSupplierOptionsFromGrpc(itemTypeSupplierOption)
    ),
  });
}

export default MainModelOptions;
