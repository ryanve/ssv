# ssv
Opensource JavaScript module for working with <b>space-separated values</b>

## Setup

```
npm install ssv --save
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
ssv.blank("travis") // false
ssv.blank("      ") // true
ssv.blank("") // true
ssv.count("  matt  mark  ") // 2
ssv.count("matt matt matt") // 3
ssv.at("mark tom travis", 0) // "mark"
ssv.at("mark tom travis", 1) // "tom"
ssv.at("mark tom travis", -1) // "travis"
ssv.at("mark tom travis", -2) // "tom"
ssv.at("mark tom travis", 5) // ""
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
ssv.need("mark tom", "travis") // "mark tom travis"
ssv.need("mark tom travis", "travis") // "mark tom travis"
ssv.need("tom tom", "tom mark mark") // "tom tom mark mark"
ssv.uniq(" travis travis  tom  travis ") // "travis tom"
ssv.xor("", "mark mark") // "mark"
ssv.xor("mark tom", "mark") // "tom"
ssv.xor("mark tom", "travis") // "mark tom travis"
ssv.xor("mark tom", "travis tom") // "mark travis"
ssv.xor(" mark tom ", " matt  tom ") // "mark matt"
ssv.xor(" mark tom tom", "mark mark") // "tom"
ssv.xor("mark mark", "tom tom") // "mark tom"
```

```js
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

## Static API

### `ssv.all(SSV, SSV2)`
- Test if <var>SSV</var> contains **all** <var>SSV2</var> values
- `@return` boolean

### `ssv.any(SSV, SSV2)`
- Test if <var>SSV</var> contains **any** <var>SSV2</var> values
- `@return` boolean

### `ssv.at(SSV, index)`
- Get the value at the specified <var>index</var>
- Supports positive or negative <var>index</var>
- `@return` string

### `ssv.blank(SSV)`
- Test if <var>SSV</var> has no values
- `true` for empty string or whitespace
- `@return` boolean

### `ssv.compact(SSV)`
- Remove excess whitespace from <var>SSV</var>
- `@return` string

### `ssv.concat(SSV, SSV2)`
- Concatenate 2 SSV strings
- `@return` string

### `ssv.count(SSV)`
- Count the number of values in <var>SSV</var>
- `@return` number

### `ssv.diff(SSV, SSV2)`
- Get the difference of 2 SSV strings (values in first not present in second)
- `@return` string

### `ssv.meet(SSV, SSV2)`
- Get the intersection of 2 SSV strings (unique values present in both)
- `@return` string

### `ssv.need(SSV, SSV2)`
- Complement <var>SSV</var> with needed values from <var>SSV2</var>
- `@return` string

### `ssv.split(SSV)`
- Split <var>SSV</var> into compact array of values
- `@return` array

### `ssv.state(state={})`
- Get SSV string from <var>state</var> object or string
- Useful for conditional classnames
- `@return` string

### `ssv.union(SSV, SSV2)`
- Get the union of 2 SSV strings (unique values found in either)
- `@return` string

### `ssv.uniq(SSV)`
- Get unique values found in <var>SSV</var>
- `@return` string

### `ssv.xor(SSV, SSV2)`
- Get unique values found in either <var>SSV</var> or <var>SSV2</var> but not both
- `@return` string

## Chaining API

Chaining offers all the static methods in chain syntax

### `ssv(SSV="")`
- Create an `ssv` object instance
- <var>SSV</var> defaults to an empty string
- `@return` object

#### Non-string returns are direct

```js
ssv("mark tom travis").count() === 3
ssv("mark tom").concat("travis").count() === 3
ssv("mark tom travis").any("mark") === true
ssv().blank() === true
```

#### strings continue chaining

use `.$` or `.toString()` to get the string value

```js
ssv() instanceof ssv === true
ssv("mark").$ === "mark"
ssv("mark").toString() === "mark"
ssv("mark").concat("tom").$ === "mark tom"
ssv("mark").concat("tom").toString() === "mark tom"
ssv("mark tom scott").diff("scott").concat("travis").$ === "mark tom travis"
```

#### split if you wanna convert to an array

```js
ssv("mark tom scott")
  .diff("scott tom")
  .concat("travis matt")
  .split()
  .forEach(member => console.log(member))
```

#### prototype calls jumpstart the chain

```js
ssv.prototype.count() === 0
ssv.prototype.concat("tom").$ === "tom"
ssv.prototype.concat("") instanceof ssv === true
```

#### You can combine static and chaining methods

```js
ssv("mark tom scott")
  .diff(ssv.state({ "tom scott": true }))
  .union(ssv.state({ "travis matt": true }))
  .$ === "mark travis matt"
```
