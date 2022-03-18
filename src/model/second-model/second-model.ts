import { model, prop, Model } from "mobx-keystone";
import SecondModelItem from "./second-model-item";
import SecondModelStatus from "./second-model-status";
import SecondModelShipment from "./second-model-shipment";
import SecondeModelPrice from "./second-model-price";

@model("Rootstore/SecondModel")
class SecondModel extends Model({
  id: prop<string>(""),
  externalId: prop<string>(""),
  supplierId: prop<string>(""),
  supplierName: prop<string>(""),
  items: prop<SecondModelItem[]>(() => []),
  total: prop<number>(0),
  orderTracking: prop<string>(""),
  orderTrackingInternal: prop<string>(""),
  orderingInfoId: prop<string>(""),
  status: prop<SecondModelStatus | undefined>(undefined),
  warehouse: prop<string>(""),
  shipments: prop<SecondModelShipment[]>(() => []),
  expiresAt: prop<string | undefined>(),
  latestShipmentReceptionDate:  prop<string | undefined>(),
  latestExpectedItemReceptionDate:  prop<string | undefined>(),
  createdAt: prop<string | undefined>(),
  updatedAt: prop<string | undefined>(),
  prices: prop<SecondeModelPrice[]>(() => []),
}) {
  static fromGrpc(secondModel: any): void {
    secondModel.$modelType = "Rootstore/SecondModel";
    if (secondModel.status !== undefined) SecondModelStatus.fromGrpc(secondModel.status);
    secondModel.shipments.forEach((shipment:any) => {
      SecondModelShipment.fromGrpc(shipment)
    });
  }
}

export default SecondModel;
