import { types } from "mobx-state-tree"
import SecondModelItem, {fromGrpc as SecondModelItemFromGrpc} from "./second-model-item";
import SecondModelStatus, {fromGrpc as SecondModelStatusFromGrpc} from "./second-model-status";
import SecondModelShipment, {fromGrpc as SecondModelShipmentFromGrpc} from "./second-model-shipment";
import SecondeModelPrice, {fromGrpc as SecondeModelPriceFromGrpc} from "./second-model-price";


const SecondModel = types.model("SecondModel", {
  id: "",
  externalId: "",
  supplierId: "",
  supplierName: "",
  items: types.array(SecondModelItem),
  total: 0,
  orderTracking: "",
  orderTrackingInternal: "",
  orderingInfoId: "",
  status: types.maybe(SecondModelStatus),
  warehouse: "",
  shipments: types.array(SecondModelShipment),
  expiresAt: types.maybe(types.string),
  latestShipmentReceptionDate:  types.maybe(types.string),
  latestExpectedItemReceptionDate:  types.maybe(types.string),
  createdAt: types.maybe(types.string),
  updatedAt: types.maybe(types.string),
  prices: types.array(SecondeModelPrice),
});

export function fromGrpc(secondModel: any) {
  return SecondModel.create({
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
    status: secondModel.status ? SecondModelStatusFromGrpc(secondModel.status) : undefined,
    shipments: secondModel.shipments.map((shipment: any) => SecondModelShipmentFromGrpc(shipment)),
    prices: secondModel.prices.map((price: any) => SecondeModelPriceFromGrpc(price)),
    items: secondModel.items.map((item: any) => SecondModelItemFromGrpc(item)),
  });
}

export default SecondModel;
