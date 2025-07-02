import { components } from "../api/generated";

type Schemas = components['schemas'];

export type ApiType = {
  [T in keyof Schemas]: Schemas[T];
};
