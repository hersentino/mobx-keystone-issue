import { makeAutoObservable } from "mobx";

class Price {
  currency: string = "";
  price: number = 0;
  priceDefaultCurrency: number = 0;

  constructor(mainModel?: Price) {
    makeAutoObservable(this);
    if (mainModel) {
      this.currency = mainModel.currency;
      this.priceDefaultCurrency = mainModel.priceDefaultCurrency;
      this.price = mainModel.price;
    }
  }

  static fromGrpc(quantity: any): Price {
    return new this({
      currency: quantity.currency,
      price: quantity.price,
      priceDefaultCurrency: quantity.priceDefaultCurrency,
    });
  }
}

export default Price;
