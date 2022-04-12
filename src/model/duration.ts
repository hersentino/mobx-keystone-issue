import { types } from "mobx-state-tree"

const Duration = types.model("Duration", {
  seconds: 0,
  nanos: 0,
}).actions((self) => {
  return {
    setSeconds: (s: number) => { self.seconds = s },
    setNanos: (n: number) => { self.nanos = n }
  }
});


export function fromGrpc(duration: any) {
  return  Duration.create({
    seconds: duration.seconds,
    nanos: duration.nanos,
  });
}

export default Duration;
