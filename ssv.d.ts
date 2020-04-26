declare module ssv {
  export function all(set: any, search: any): boolean;
  export function any(set: any, search: any): boolean;
  export function at(set: any, index: any): string;
  export function blank(set: any): boolean;
  export function compact(set: any): string;
  export function concat(set: any, more: any): string;
  export function count(set: any): number;
  export function diff(set: any, less: any): string;
  export function meet(left: any, right: any): string;
  export function need(set: any, more: any): string;
  export function split(set: any): string[];
  export function slate(set: any): string;
  export function state(set: any): string;
  export function swoop(set: any): string;
  export function union(set: any, more: any): string;
  export function uniq(set: any): string;
  export function xor(left: any, right: any): string;
}

declare module "ssv" {
  export = ssv;
}
