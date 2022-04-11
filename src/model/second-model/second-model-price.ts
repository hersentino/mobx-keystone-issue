import { makeAutoObservable } from "mobx";
import Price from "../price";
import SecondModelPriceType from "./second-model-price-type";

class SecondeModelPrice {
  id: string;
  type: SecondModelPriceType = SecondModelPriceType.UNRECOGNIZED;
  price: Price | undefined;
  details: string = "";

  constructor(mainModel: SecondeModelPrice) {
    makeAutoObservable(this);
    this.id = mainModel.id;
    this.type = mainModel.type;
    this.price = mainModel.price;
    this.details = mainModel.details;
  }

  static fromGrpc(secondeModelPrice: any): SecondeModelPrice {
    return new this({
      id: secondeModelPrice.id,
      details: secondeModelPrice.details,
      type: secondeModelPrice.type as unknown as SecondModelPriceType,
      price: secondeModelPrice.price ? Price.fromGrpc(secondeModelPrice.price) : undefined,
    });
  }
}

export default SecondeModelPrice;
