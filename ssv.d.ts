declare module ssv {
  export function all(ssv: string, search: string): boolean;
  export function any(ssv: string, search: string): boolean;
  export function at(ssv: string, index: number): string;
  export function blank(ssv: string): boolean;
  export function compact(ssv: string): string;
  export function need(ssv: string, more: string): string;
  export function concat(ssv: string, more: string): string;
  export function count(ssv: string): number;
  export function diff(ssv: string, less: string): string;
  export function meet(left: string, right: string): string;
  export function split(ssv: string): string[];
  export function state(state: object | string): string;
  export function union(ssv: string, more: string): string;
  export function uniq(ssv: string): string;
  export function xor(left: string, right: string): string;
}

declare module "ssv" {
  export = ssv;
}
