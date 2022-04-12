import { model, prop, DataModel, ModelData } from "mobx-keystone";
import SecondModelItem from "./second-model-item";
import SecondModelStatus from "./second-model-status";
import SecondModelShipment from "./second-model-shipment";
import SecondeModelPrice from "./second-model-price";

@model("Rootstore/SecondModel")
class SecondModel extends DataModel({
  id: prop<string>(""),
  externalId: prop<string>(""),
  supplierId: prop<string>(""),
  supplierName: prop<string>(""),
  items: prop<ModelData<SecondModelItem>[]>(() => []),
  total: prop<number>(0),
  orderTracking: prop<string>(""),
  orderTrackingInternal: prop<string>(""),
  orderingInfoId: prop<string>(""),
  status: prop<ModelData<SecondModelStatus> | undefined>(undefined),
  warehouse: prop<string>(""),
  shipments: prop<ModelData<SecondModelShipment>[]>(() => []),
  expiresAt: prop<string | undefined>(),
  latestShipmentReceptionDate:  prop<string | undefined>(),
  latestExpectedItemReceptionDate:  prop<string | undefined>(),
  createdAt: prop<string | undefined>(),
  updatedAt: prop<string | undefined>(),
  prices: prop<ModelData<SecondeModelPrice>[]>(() => []),
}) {
  static fromGrpc(secondModel: any): ModelData<SecondModel> {
    return {
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
    };
  }
}

export default SecondModel;
