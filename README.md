# ssv
Opensource JavaScript module for working with <b>space-separated values</b>

## Setup

```
npm install ssv
```

## Usage


```js
const ssv = require("ssv")
```

```js
ssv.all("mark tom travis", "matt") // false
ssv.all("mark tom travis", "mark") // true
ssv.all("mark tom travis", "mark scott") // false
ssv.all("mark tom travis", "mark travis") // true
ssv.any("mark tom travis", "matt") // false
ssv.any("mark tom travis", "mark") // true
ssv.any("mark tom travis", "mark scott") // true
ssv.any("mark tom travis", "mark travis") // true
ssv.at("mark tom travis", 0) // "mark"
ssv.at("mark tom travis", 1) // "tom"
ssv.at("mark tom travis", -1) // "travis"
ssv.at("mark tom travis", -2) // "tom"
ssv.at("mark tom travis", 5) // ""
ssv.compact("  mark   travis   matt ") // "mark travis matt"
ssv.concat("mark tom", "travis matt") // "mark tom travis matt"
ssv.concat(" mark  tom ", " travis  matt ") // "mark tom travis matt"
ssv.diff("mark tom travis", "tom") // "mark travis"
ssv.diff("mark tom tom", "mark matt") // "tom tom"
ssv.union("mark tom ", "travis tom") // "mark tom travis"
ssv.union("mark tom tom", "travis tom") // "mark tom travis"
ssv.union("matt mark", "matt") // "matt mark"
ssv.split("mark tom travis") // ["mark", "tom", "travis"]
ssv.split(" mark  tom  travis ") // ["mark", "tom", "travis"]
ssv.uniq("travis travis tom travis tom") // "travis tom"
```

## API

### `ssv.all(SSV, SSV2)`
- Test if <var>SSV</var> contains **all** <var>SSV2</var> values
- `@return` boolean

### `ssv.any(SSV, SSV2)`
- Test if <var>SSV</var> contains **any** <var>SSV2</var> values
- `@return` boolean

### `ssv.at(SSV, index)`
- Get the value at the specified index
- **@return** string

### `ssv.compact(SSV)`
- Normalize <var>SSV</var> string to a trim compact string
- `@return` string

### `ssv.concat(SSV, SSV2)`
- Concatenate 2 SSV strings
- `@return` string

### `ssv.diff(SSV, SSV2)`
- Get the difference of 2 SSV strings (values in first not present in second)
- `@return` string

### `ssv.split(SSV)`
- Split <var>SSV</var> into compact array of values
- `@return` array

### `ssv.union(SSV, SSV2)`
- Get the union of 2 SSV strings (unique values present in either)
- `@return` string

### `ssv.uniq(SSV)`
- Get unique <var>SSV</var> string
- `@return` string
