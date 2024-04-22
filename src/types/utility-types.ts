export type StateUpdateParam<S> = S | ((prev: S) => S);
export type StateSetter<S> = (param: StateUpdateParam<S>) => void;