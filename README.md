
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
ssv.count("  matt  mark  ") // 2
ssv.count("matt matt matt") // 3
```

```js
ssv.split("mark tom travis") // ["mark", "tom", "travis"]
ssv.split(" mark  tom  travis ") // ["mark", "tom", "travis"]
ssv.compact("  mark   travis   matt ") // "mark travis matt"
ssv.concat("mark tom", "matt travis") // "mark tom matt travis"
ssv.concat("mark tom", "tom  travis") // "mark tom tom travis"
ssv.diff("mark tom travis", "tom") // "mark travis"
ssv.diff("mark tom tom", "mark matt") // "tom tom"
ssv.diff("matt matt matt", "") // "matt matt matt"
ssv.diff("mark mark", "tom tom") // "mark mark"
ssv.diff("mark tom tom tom", "tom") // "mark"
ssv.meet("", "mark") // ""
ssv.meet("mark matt travis", "tom scott") // ""
ssv.meet("mark tom tom", "mark tom travis") // "mark tom"
ssv.union("mark tom ", "travis tom") // "mark tom travis"
ssv.union("mark tom tom", "travis tom") // "mark tom travis"
ssv.union("matt mark", "matt") // "matt mark"
ssv.uniq(" travis travis  tom  travis ") // "travis tom"
ssv.xor("", "mark mark") // "mark"
ssv.xor("mark tom", "mark") // "tom"
ssv.xor("mark tom", "travis") // "mark tom travis"
ssv.xor("mark tom", "travis tom") // "mark travis"
ssv.xor(" mark tom ", " matt  tom ") // "mark matt"
ssv.xor(" mark tom tom", "mark mark") // "tom"
ssv.xor("mark mark", "tom tom") // "mark tom"

ssv.state({
  "mark travis": true,
  "matt": true,
  "tom scott": false
}) // "mark travis matt"

ssv.state({
  "mark": true,
  "mark travis": true,
  "travis": false
}) // "mark mark travis"
```

## API

### `ssv.all(SSV, SSV2)`
- Test if <var>SSV</var> contains **all** <var>SSV2</var> values
- `@return` boolean

### `ssv.any(SSV, SSV2)`
- Test if <var>SSV</var> contains **any** <var>SSV2</var> values
- `@return` boolean

### `ssv.at(SSV, index)`
- Get the value at the specified <var>index</var>
- Support positive or negative <var>index</var>
- `@return` string

### `ssv.compact(SSV)`
- Normalize <var>SSV</var> string to a trim compact string
- `@return` string

### `ssv.concat(SSV, SSV2)`
- Concatenate 2 SSV strings
- `@return` string

### `ssv.count(SSV)`
- Count the number of values
- `@return` number

### `ssv.diff(SSV, SSV2)`
- Get the difference of 2 SSV strings (values in first not present in second)
- `@return` string

### `ssv.meet(SSV, SSV2)`
- Get the intersection of 2 SSV strings (unique values present in both)
- `@return` string

### `ssv.split(SSV)`
- Split <var>SSV</var> into compact array of values
- `@return` array

### `ssv.state(state={})`
- Create compact SSV string from <var>state</var> object or string
- Useful for conditional classnames
- `@return` string

### `ssv.union(SSV, SSV2)`
- Get the union of 2 SSV strings (unique values present in either)
- `@return` string

### `ssv.uniq(SSV)`
- Get unique <var>SSV</var> string
- `@return` string

### `ssv.xor(SSV, SSV2)`
- Get unique set of values found in either <var>SSV</var> or <var>SSV2</var> but not both
- `@return` string
