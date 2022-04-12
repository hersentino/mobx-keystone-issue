import { makeAutoObservable } from "mobx";
import Price from "../price";

class MainModelLine {
  name: string = "";
  description: string = "";
  priceEot: Price = new Price();
  taxRate: number = 0;

  constructor(mainModel?: MainModelLine) {
    makeAutoObservable(this);
    if (mainModel) {  
      this.name = mainModel.name;
      this.priceEot = mainModel.priceEot;
      this.description = mainModel.description;
      this.taxRate = mainModel.taxRate;
    }
  }

  static fromGrpc(mainModelLine: any): MainModelLine {
    const { priceEot } = mainModelLine;

    if (!priceEot)
      throw new Error("PriceEot is empty in MainModelLine");
    return new this({
      name: mainModelLine.name,
      description: mainModelLine.description,
      taxRate: mainModelLine.taxRate,
      priceEot: Price.fromGrpc(priceEot),
    });
  }
}

export default MainModelLine;
