import React, { useState } from "react";
import "./App.css";
import MainModel , {fromGrpc as MainModelFromGrpc} from "./model/main-model/main-model";
import getData from "./data";
import { createRootStore } from "./store";

function App() {
  const [rootStore] = useState(() => createRootStore());
  const [result1, setResult1] = useState<number>();
  const [result2, setResult2] = useState<number>();
  const [result3, setResult3] = useState<number>();



  return (
    <div>
      <button
        onClick={async () => {
          const data = await getData();

          const t0 = performance.now();
          const mainModel = MainModelFromGrpc(data);
          const t1 = performance.now();
          setResult1(t1 - t0);


          const t2 = performance.now();
          rootStore.setMainModel(mainModel);
          const t3 = performance.now();
          setResult2(t3 - t2);
        }}
      >
        instance MainModel
      </button>
      <button
        onClick={async () => {
          const t4 = performance.now();
          rootStore.setName(String(new Date().getTime()));
          const t5 = performance.now();
          setResult3(t5 - t4);
        }}
      >
        set something in store
      </button>

      <br />
      <br />
      <div>time of instanciation : {result1 || "?"} ms</div>
      <div>time of setting in the store : {result2 || "?"} ms</div>
      <div>time of change a primitive value in the store : {result3 || "?"} ms</div>
    </div>
  );
}

export default App;

