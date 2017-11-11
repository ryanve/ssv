declare module ssv {
  export function add(ssv: string, value: string): string;
  export function compact(ssv: string): string;
  export function concat(ssv: string, more: string): string;
  export function has(ssv: string, value: string): boolean;
  export function parse(ssv: string): string[];
  export function pop(ssv: string): string;
  export function push(ssv: string, value: string): string;
  export function remove(ssv: string, value: string): string;
  export function split(ssv: string): string[];
  export function slice(ssv: string, begin?: number, end?: number): string;
  export function union(ssv: string, more: string): string;
  export function uniq(ssv: string): string;
}

declare module "ssv" {
  export = ssv;
}
