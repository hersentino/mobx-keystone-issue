import { types } from "mobx-state-tree"
import MainModelSupplierOptions, {fromGrpc as MainModelSupplierOptionsFromGrpc} from "./main-model-supplier-options";
import MainModelItemOptionsManufacturer, {fromGrpc as MainModelItemOptionsManufacturerFromGrpc} from "./main-model-item-options-manufacturer";

const MainModelItemOptions = types.model("MainModelItemOptions",{
  supplierOptions: types.array(MainModelSupplierOptions),
  manufacturerOptions: types.maybe(MainModelItemOptionsManufacturer),
})

function fromGrpc(mainModelItemOptions: any) {
  return MainModelItemOptions.create({
    supplierOptions: mainModelItemOptions.supplierOptions.map((quoteItemOption:any) => MainModelSupplierOptionsFromGrpc(quoteItemOption)),
    manufacturerOptions: mainModelItemOptions.manufacturerOptions 
      ? MainModelItemOptionsManufacturerFromGrpc(mainModelItemOptions.manufacturerOptions)
      : undefined,
  });
}

export { fromGrpc };
export default MainModelItemOptions;
