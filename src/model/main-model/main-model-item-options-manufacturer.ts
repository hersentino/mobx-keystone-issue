import { makeAutoObservable } from "mobx";

class MainModelItemOptionsManufacturer {
  manufacturer: string;
  mpn: string;

  constructor(mainModel: MainModelItemOptionsManufacturer) {
    makeAutoObservable(this);
    this.manufacturer = mainModel.manufacturer;
    this.mpn = mainModel.mpn;
  }

  static fromGrpc(mainModelItemOptionsManufacturer: any): MainModelItemOptionsManufacturer {
    return new this({
      manufacturer: mainModelItemOptionsManufacturer.manufacturer,
      mpn: mainModelItemOptionsManufacturer.mpn
    });
  }
}

export default MainModelItemOptionsManufacturer;
