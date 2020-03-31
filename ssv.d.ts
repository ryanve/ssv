declare module ssv {
  export function all(ssv: string, search: string): boolean;
  export function any(ssv: string, search: string): boolean;
  export function blank(ssv: string): boolean;
  export function compact(ssv: string): string;
  export function complete(ssv: string, more: string): string;
  export function concat(ssv: string, more: string): string;
  export function count(ssv: string): number;
  export function diff(ssv: string, less: string): string;
  export function meet(left: string, right: string): string;
  export function split(ssv: string): string[];
  export function state(state: object | string): string;
  export function union(ssv: string, more: string): string;
  export function uniq(ssv: string): string;
  export function diff(left: string, right: string): string;
}

declare module "ssv" {
  export = ssv;
}
