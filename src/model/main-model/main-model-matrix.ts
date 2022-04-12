import { types } from "mobx-state-tree"
import Quote, {fromGrpc as QuoteFromGrpc} from "./main-model";
import MainModelMatrixHeaders, {fromGrpc as MainModelMatrixHeadersFromGrpc} from "./main-model-matrix-headers";

const MainModelMatrix = types.model("MainModelMatrix", {
  headers: types.maybe(MainModelMatrixHeaders),
  quotes: types.array(Quote),
});

export function fromGrpc(mainModelMatrix: any) {
  return MainModelMatrix.create({
    quotes: mainModelMatrix.quotes.map((quote: any) => QuoteFromGrpc(quote)),
    headers: mainModelMatrix.headers ? MainModelMatrixHeadersFromGrpc(mainModelMatrix.headers) : undefined,
  });
}

export default MainModelMatrix;
