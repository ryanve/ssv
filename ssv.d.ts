declare module ssv {
  export function any(ssv: string, search: string): boolean;
  export function at(ssv: string, index: number): string;
  export function compact(ssv: string): string;
  export function concat(ssv: string, more: string): string;
  export function diff(ssv: string, less: string): string;
  export function split(ssv: string): string[];
  export function union(ssv: string, more: string): string;
  export function uniq(ssv: string): string;
}

declare module "ssv" {
  export = ssv;
}
