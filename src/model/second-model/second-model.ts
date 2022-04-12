import SecondModelItem from "./second-model-item";
import SecondModelStatus from "./second-model-status";
import SecondModelShipment from "./second-model-shipment";
import SecondeModelPrice from "./second-model-price";
import { makeAutoObservable } from "mobx";

class SecondModel {
  id: string= "";
  externalId: string= "";
  supplierId: string= "";
  supplierName: string= "";
  items: SecondModelItem[]= [];
  total: number= 0;
  orderTracking: string= "";
  orderTrackingInternal: string= "";
  orderingInfoId: string= "";
  status: SecondModelStatus | undefined;
  warehouse: string= "";
  shipments: SecondModelShipment[]= [];
  expiresAt: string | undefined;
  latestShipmentReceptionDate:  string | undefined;
  latestExpectedItemReceptionDate:  string | undefined;
  createdAt: string | undefined;
  updatedAt: string | undefined;
  prices: SecondeModelPrice[]= [];

  constructor(mainModel?: SecondModel) {
    makeAutoObservable(this);
    if (mainModel){
      this.id = mainModel.id;
      this.externalId = mainModel.externalId;
      this.supplierId = mainModel.supplierId;
      this.supplierName = mainModel.supplierName;
      this.items = mainModel.items;
      this.total = mainModel.total;
      this.orderTracking = mainModel.orderTracking;
      this.orderTrackingInternal = mainModel.orderTrackingInternal;
      this.orderingInfoId = mainModel.orderingInfoId;
      this.status = mainModel.status;
      this.warehouse = mainModel.warehouse;
      this.shipments = mainModel.shipments;
      this.expiresAt = mainModel.expiresAt;
      this.latestShipmentReceptionDate = mainModel.latestShipmentReceptionDate;
      this.latestExpectedItemReceptionDate = mainModel.latestExpectedItemReceptionDate;
      this.createdAt = mainModel.createdAt;
      this.updatedAt = mainModel.updatedAt;
      this.prices = mainModel.prices;
    }
  }

  static fromGrpc(secondModel: any): SecondModel {
    return new this({
      id: secondModel.id,
      externalId: secondModel.externalId,
      supplierId: secondModel.supplierId,
      supplierName: secondModel.supplierName,
      total: secondModel.total,
      orderTracking: secondModel.orderTracking,
      orderTrackingInternal: secondModel.orderTrackingInternal,
      orderingInfoId: secondModel.orderingInfoId,
      warehouse: secondModel.warehouse,
      expiresAt: secondModel.expiresAt,
      latestShipmentReceptionDate: secondModel.latestShipmentReceptionDate,
      latestExpectedItemReceptionDate: secondModel.latestExpectedItemReceptionDate,
      createdAt: secondModel.createdAt,
      updatedAt: secondModel.updatedAt,
      status: secondModel.status ? SecondModelStatus.fromGrpc(secondModel.status) : undefined,
      shipments: secondModel.shipments.map((shipment: any) => SecondModelShipment.fromGrpc(shipment)),
      prices: secondModel.prices.map((price: any) => SecondeModelPrice.fromGrpc(price)),
      items: secondModel.items.map((item: any) => SecondModelItem.fromGrpc(item)),
    });
  }
}

export default SecondModel;
