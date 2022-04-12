
import SecondModelItem from "../second-model/second-model-item";
import Quantity from "../quantity";
import QuantityOriginDuration from "../second-model/quantity-origin-duration";
import MainModelPricedItemSourceInfoPriceInfo from "./main-model-priced-item-source-info-price-info";
import { makeAutoObservable } from "mobx";

class MainModelPricedItemSourceInfo {
  pricedOrderItem: SecondModelItem = new SecondModelItem();
  stock: Quantity | undefined;
  priceInfo: MainModelPricedItemSourceInfoPriceInfo | undefined;
  leadDurations: QuantityOriginDuration[] = [];
  deliveryDurations: QuantityOriginDuration[] = [];

  constructor(mainModel?: MainModelPricedItemSourceInfo) {
    makeAutoObservable(this);

    if (mainModel){
      this.pricedOrderItem = mainModel.pricedOrderItem;
      this.stock = mainModel.stock;
      this.priceInfo =  mainModel.priceInfo;
      this.leadDurations =  mainModel.leadDurations;
      this.deliveryDurations =  mainModel.deliveryDurations;
    }
  }

  static fromGrpc(mainModelPricedItemSourceInfo: any): MainModelPricedItemSourceInfo {
    if (!mainModelPricedItemSourceInfo.pricedOrderItem)
      throw new Error("Can not MainModelPricedItemSourceInfo.fromGrpc with empty pricedOrderItem");

    return new this({
      pricedOrderItem: SecondModelItem.fromGrpc(mainModelPricedItemSourceInfo.pricedOrderItem),

      stock: mainModelPricedItemSourceInfo.stock ? Quantity.fromGrpc(mainModelPricedItemSourceInfo.stock) : undefined,
      priceInfo: mainModelPricedItemSourceInfo.priceInfo
        ? MainModelPricedItemSourceInfoPriceInfo.fromGrpc(mainModelPricedItemSourceInfo.priceInfo)
        : undefined,

      leadDurations: mainModelPricedItemSourceInfo.leadDurations.map((leadDuration: any) => QuantityOriginDuration.fromGrpc(leadDuration)),
      deliveryDurations: mainModelPricedItemSourceInfo.deliveryDurations.map((deliveryDuration: any) =>
        QuantityOriginDuration.fromGrpc(deliveryDuration)
      ),
    });
  }
}

export default MainModelPricedItemSourceInfo;
