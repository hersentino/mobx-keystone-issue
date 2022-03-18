import React, { useState } from "react";
import "./App.css";
import { createRootStore } from "./store";
import { observer } from "mobx-react";




const App = observer(() => {
  const [rootStore] = useState(() => createRootStore());
  const [resultMiddleware, setresultMiddleware] = useState<undefined | number>();
  const [resultMiddleware2, setresultMiddleware2] = useState<undefined | number>()



  return (
    <div>
      <button
        onClick={async () => {
          // const data = await getData();

          try {
          // big data
          const t0 = performance.now()
          await rootStore.doSomeThing();
          const t1 = performance.now()
          setresultMiddleware(t1 - t0)

          // small data
          const t2 = performance.now()
           rootStore.doSomeThing2();
          const t3 = performance.now()
          setresultMiddleware2(t3 - t2)
          } catch (err) {
            console.log(err)
          }
        }}
      >
        instance user
      </button>
      <br />
      <br />
      <h4>With big data</h4>
      <div>time of instanciation with fromGrpc without middleware : {rootStore.result1 || "?"} ms</div>
      <div>time of instanciation with fromGrpc with middleware : {resultMiddleware || "?"} ms</div>
      {resultMiddleware && rootStore.result1 && <div>time took by the middleware {resultMiddleware - rootStore.result1} ms</div>}
      <br />
      <h4>With small data</h4>
      <div>time of instanciation with fromGrpc without middleware : {rootStore.result2 || "?"} ms</div>
      <div>time of instanciation with fromGrpc with middleware : {resultMiddleware2 || "?"} ms</div>
      {resultMiddleware2 && rootStore.result2 && <div>time took by the middleware {resultMiddleware2 - rootStore.result2} ms</div>}
    </div>
  );
});

export default App;