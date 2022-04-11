
import Duration from "../duration";
import Quantity from "../quantity";
import SecondModelItemType from "./second-model-item-type";
import Price from "../price";
import QuantityOriginDuration from "./quantity-origin-duration";
import { makeAutoObservable } from "mobx";

class SecondModelItem {
  id: string = "";
  type: SecondModelItemType = SecondModelItemType.UNRECOGNIZED;
  specId: string = "";
  unitPrice: Price | undefined;
  quantity: Quantity = new Quantity();
  reference: string = "";
  expectedReceptionDate: string | undefined;
  url: string= "";
  imageUrl: string= "";
  manufacturer: string= "";
  mpn: string= "";
  leadDurations: QuantityOriginDuration[] = [];
  expectedReceptionDelay: Duration | undefined;


  constructor(mainModel?: SecondModelItem) {
    makeAutoObservable(this);

    if (mainModel){
      this.id = mainModel.id;
      this.type = mainModel.type;
      this.specId = mainModel.specId;
      this.unitPrice = mainModel.unitPrice;
      this.quantity = mainModel.quantity;
      this.reference = mainModel.reference;
      this.expectedReceptionDate = mainModel.expectedReceptionDate;
      this.url = mainModel.url;
      this.imageUrl = mainModel.imageUrl;
      this.manufacturer = mainModel.manufacturer;
      this.mpn = mainModel.mpn;
      this.leadDurations = mainModel.leadDurations;
      this.expectedReceptionDelay = mainModel.expectedReceptionDelay;
    }
  }

  static fromGrpc(secondModelItem: any): SecondModelItem {
    if (!secondModelItem.quantity)
      throw new Error("Can not SecondModelItem.fromGrpc with empty quantity");

    return new this({
      id: secondModelItem.id,
      specId: secondModelItem.specId,
      reference: secondModelItem.reference,
      expectedReceptionDate: secondModelItem.expectedReceptionDate,
      url: secondModelItem.url,
      imageUrl: secondModelItem.imageUrl,
      manufacturer: secondModelItem.manufacturer,
      mpn: secondModelItem.mpn,
      quantity: Quantity.fromGrpc(secondModelItem.quantity),
      unitPrice: secondModelItem.unitPrice ? Price.fromGrpc(secondModelItem.unitPrice) : undefined,
      expectedReceptionDelay: secondModelItem.expectedReceptionDelay ? Duration.fromGrpc(secondModelItem.expectedReceptionDelay) : undefined,
      leadDurations: secondModelItem.leadDurations.map((leadDuration:any) => QuantityOriginDuration.fromGrpc(leadDuration)),
      type: secondModelItem.type as unknown as SecondModelItemType,
    });
  }
}

export default SecondModelItem;
