declare module ssv {
  export function all(set: any, search: any): boolean;
  export function and(left: any, right: any): string;
  export function any(set: any, search: any): boolean;
  export function at(set: any, index: any): string;
  export function blank(set: any): boolean;
  export function count(set: any): number;
  export function edit(set: any, boss: object): string;
  export function gum(set: any, more: any): string;
  export function jam(set: any): string;
  export function not(set: any, less: any): string;
  export function or(set: any, more: any): string;
  export function say(set: any): string;
  export function split(set: any): string[];
  export function state(set: any): string;
  export function xor(left: any, right: any): string;
  export function yolo(set: any): string;
}

declare module "ssv" {
  export = ssv;
}
