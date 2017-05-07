declare module ssv {
  export function has(ssv: string, value: string): boolean;
  export function pop(ssv: string): string;
  export function push(ssv: string, value: string): string;
  export function add(ssv: string, value: string): string;
  export function remove(ssv: string, value: string): remove;
  export function compact(ssv: string): string;
  export function parse(ssv: string): string[];
}

declare module "ssv" {
  export = ssv;
}
