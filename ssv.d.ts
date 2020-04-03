declare module ssv {
  export function all(set: string, search: string): boolean;
  export function any(set: string, search: string): boolean;
  export function at(set: string, index: number): string;
  export function blank(set: string): boolean;
  export function compact(set: string): string;
  export function need(set: string, more: string): string;
  export function concat(set: string, more: string): string;
  export function count(set: string): number;
  export function diff(set: string, less: string): string;
  export function meet(left: string, right: string): string;
  export function split(set: string): string[];
  export function state(state: object | string): string;
  export function union(set: string, more: string): string;
  export function uniq(set: string): string;
  export function xor(left: string, right: string): string;
}

declare module "ssv" {
  export = ssv;
}
