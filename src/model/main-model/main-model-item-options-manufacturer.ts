import { types } from "mobx-state-tree"


const MainModelItemOptionsManufacturer = types.model("MainModelItemOptionsManufacturer", {
  manufacturer: types.string,
  mpn: types.string,
});

function fromGrpc(mainModelItemOptionsManufacturer: any) {
  return MainModelItemOptionsManufacturer.create({
    manufacturer: mainModelItemOptionsManufacturer.manufacturer,
    mpn: mainModelItemOptionsManufacturer.mpn
  });
}

export { fromGrpc };
export default MainModelItemOptionsManufacturer;

