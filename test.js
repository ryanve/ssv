var ssv = require("./")
var assert = require("assert")


assert.strictEqual(ssv.split("").length, 0)
assert.strictEqual(ssv.split(" ").length, 0)
assert.strictEqual(ssv.split("mark").join("-"), "mark")
assert.strictEqual(ssv.split("mark tom").join("-"), "mark-tom")
assert.strictEqual(ssv.split(" mark tom ").join("-"), "mark-tom")
assert.strictEqual(ssv.split(0).join("-"), "0")
assert.strictEqual(ssv.split(182).join("-"), "182")
console.log("#split tests passed")

assert.strictEqual(ssv.count(""), 0)
assert.strictEqual(ssv.count("    "), 0)
assert.strictEqual(ssv.count("blink"), 1)
assert.strictEqual(ssv.count("mark-hoppus matt-skiba"), 2)
assert.strictEqual(ssv.count("  mark  matt  travis  "), 3)
assert.strictEqual(ssv.count(" blink blink blink 182"), 4)
assert.strictEqual(ssv.count(0), 1)
assert.strictEqual(ssv.count(182), 1)
console.log("#count tests passed")

assert.strictEqual(ssv.blank("travis"), false)
assert.strictEqual(ssv.blank("      "), true)
assert.strictEqual(ssv.blank(""), true)
assert.strictEqual(ssv.blank(0), false)
assert.strictEqual(ssv.blank(182), false)
console.log("#blank tests passed")

assert.strictEqual(ssv.compact(""), "")
assert.strictEqual(ssv.compact("    "), "")
assert.strictEqual(ssv.compact("  mark  tom  travis  "), "mark tom travis")
assert.strictEqual(ssv.compact("\n mark \r tom \t travis \n\r\t"), "mark tom travis")
assert.strictEqual(ssv.compact(0), "0")
assert.strictEqual(ssv.compact(182), "182")
console.log("#compact tests passed")

assert.strictEqual(ssv.at(""), "")
assert.strictEqual(ssv.at("", 5), "")
assert.strictEqual(ssv.at("", -1), "")
assert.strictEqual(ssv.at("tom", NaN), "")
assert.strictEqual(ssv.at("tom", 1/0), "")
assert.strictEqual(ssv.at("tom", -1/0), "")
assert.strictEqual(ssv.at("tom", "0"), "tom")
assert.strictEqual(ssv.at("scott travis", "1"), "travis")
assert.strictEqual(ssv.at("scott travis", "-1"), "travis")
assert.strictEqual(ssv.at("mark tom scott", 0), "mark")
assert.strictEqual(ssv.at("mark tom scott", 2), "scott")
assert.strictEqual(ssv.at("mark tom scott", -1), "scott")
assert.strictEqual(ssv.at("mark tom scott", -2), "tom")
assert.strictEqual(ssv.at("mark tom scott", 1), "tom")
assert.strictEqual(ssv.at("mark tom scott", 8), "")
assert.strictEqual(ssv.at("mark tom scott", -8), "")
assert.strictEqual(ssv.at(0, 0), "0")
assert.strictEqual(ssv.at(182, 0), "182")
console.log("#at tests passed")

assert.strictEqual(ssv.concat("", ""), "")
assert.strictEqual(ssv.concat("", "mark"), "mark")
assert.strictEqual(ssv.concat("mark tom", "travis"), "mark tom travis")
assert.strictEqual(ssv.concat("mark tom", "travis matt"), "mark tom travis matt")
assert.strictEqual(ssv.concat("mark tom", "mark"), "mark tom mark")
assert.strictEqual(ssv.concat("  mark  tom  ", "  travis  matt "), "mark tom travis matt")
assert.strictEqual(ssv.concat("  mark  tom  ", "mark"), "mark tom mark")
console.log("#concat tests passed")

assert.strictEqual(ssv.uniq(""), "")
assert.strictEqual(ssv.uniq(0), "0")
assert.strictEqual(ssv.uniq(182), "182")
assert.strictEqual(ssv.uniq("mark tom mark"), "mark tom")
assert.strictEqual(ssv.uniq("mark tom mark mark tom tom mark"), "mark tom")
assert.strictEqual(ssv.uniq("mark tom Mark"), "mark tom Mark")
console.log("#uniq tests passed")

assert.strictEqual(ssv.union("", ""), "")
assert.strictEqual(ssv.union("", "mark"), "mark")
assert.strictEqual(ssv.union("mark tom", "travis"), "mark tom travis")
assert.strictEqual(ssv.union("mark tom", "travis matt"), "mark tom travis matt")
assert.strictEqual(ssv.union("mark tom", "mark"), "mark tom")
assert.strictEqual(ssv.union("  mark  tom  ", "  travis  matt "), "mark tom travis matt")
assert.strictEqual(ssv.union("  mark  tom  ", "mark"), "mark tom")
assert.strictEqual(ssv.union("mark mark mark", ""), "mark")
assert.strictEqual(ssv.union("mark mark mark", "tom"), "mark tom")
assert.strictEqual(ssv.union(0, 0), "0")
assert.strictEqual(ssv.union(182, 182), "182")
console.log("#union tests passed")

assert.strictEqual(ssv.diff("", ""), "")
assert.strictEqual(ssv.diff("", "mark"), "")
assert.strictEqual(ssv.diff("mark tom", "travis"), "mark tom")
assert.strictEqual(ssv.diff("mark tom", "travis tom"), "mark")
assert.strictEqual(ssv.diff("mark tom", "mark"), "tom")
assert.strictEqual(ssv.diff("  mark tom  ", " travis  tom "), "mark")
assert.strictEqual(ssv.diff("  mark tom tom", "mark mark"), "tom tom")
assert.strictEqual(ssv.diff("mark mark mark", ""), "mark mark mark")
assert.strictEqual(ssv.diff("mark mark", "tom tom"), "mark mark")
assert.strictEqual(ssv.diff("mark tom travis matt", "tom matt"), "mark travis")
assert.strictEqual(ssv.diff("mark tom tom tom", "tom"), "mark")
assert.strictEqual(ssv.diff("mark tom tom tom", "tom travis"), "mark")
assert.strictEqual(ssv.diff("mark tom tom tom", "tom travis tom"), "mark")
assert.strictEqual(ssv.diff(0, 182), "0")
assert.strictEqual(ssv.diff(182, 0), "182")
console.log("#diff tests passed")

assert.doesNotThrow(function() { ssv.any(null, " ") })
assert.strictEqual(ssv.any("", ""), false)
assert.strictEqual(ssv.any("", " "), false)
assert.strictEqual(ssv.any(" ", " "), false)
assert.strictEqual(ssv.any("mark tom", ""), false)
assert.strictEqual(ssv.any("mark tom", " "), false)
assert.strictEqual(ssv.any("mark tom", "tom"), true)
assert.strictEqual(ssv.any("mark tom", "mark"), true)
assert.strictEqual(ssv.any("mark tom", "travis"), false)
assert.strictEqual(ssv.any("  mark   tom  ", "mark  tom"), true)
assert.strictEqual(ssv.any("  mark   tom  ", "mark scott"), true)
assert.strictEqual(ssv.any("  mark   tom ", "matt travis"), false)
assert.strictEqual(ssv.any("  mark   tom  mark", "travis tom"), true)
assert.strictEqual(ssv.any(0, 0), true)
assert.strictEqual(ssv.any(0, 182), false)
assert.strictEqual(ssv.any(182, 0), false)
console.log("#any tests passed")

assert.doesNotThrow(function() { ssv.all(null, " ") })
assert.strictEqual(ssv.all("", ""), true)
assert.strictEqual(ssv.all("", " "), true)
assert.strictEqual(ssv.all(" ", " "), true)
assert.strictEqual(ssv.all("mark tom", ""), true)
assert.strictEqual(ssv.all("mark tom", " "), true)
assert.strictEqual(ssv.all("mark tom", "tom"), true)
assert.strictEqual(ssv.all("mark tom", "mark"), true)
assert.strictEqual(ssv.all("mark tom", "travis"), false)
assert.strictEqual(ssv.all("  mark   tom  ", "mark  tom"), true)
assert.strictEqual(ssv.all("  mark   tom  ", "mark scott"), false)
assert.strictEqual(ssv.all("  mark   tom ", "matt travis"), false)
assert.strictEqual(ssv.all("  mark   tom  mark", "travis tom"), false)
assert.strictEqual(ssv.all(0, 0), true)
assert.strictEqual(ssv.all(182, 0), false)
assert.strictEqual(ssv.all(0, 182), false)
console.log("#all tests passed")

assert.strictEqual(ssv.need("", ""), "")
assert.strictEqual(ssv.need("", "tom"), "tom")
assert.strictEqual(ssv.need("tom tom", ""), "tom tom")
assert.strictEqual(ssv.need("mark tom", "mark"), "mark tom")
assert.strictEqual(ssv.need("mark tom", "mark mark"), "mark tom")
assert.strictEqual(ssv.need("mark tom", "travis"), "mark tom travis")
assert.strictEqual(ssv.need("mark tom travis", "travis"), "mark tom travis")
assert.strictEqual(ssv.need("mark tom", "travis travis"), "mark tom travis travis")
assert.strictEqual(ssv.need("mark tom tom", "travis"), "mark tom tom travis")
assert.strictEqual(ssv.need("  mark  tom  ", "  travis  "), "mark tom travis")
assert.strictEqual(ssv.need("  mark  tom  ", "tom"), "mark tom")
assert.strictEqual(ssv.need("mark mark", "tom tom"), "mark mark tom tom")
assert.strictEqual(ssv.need(0, 182), "0 182")
assert.strictEqual(ssv.need(182, 0), "182 0")
console.log("#need tests passed")

assert.strictEqual(ssv.xor("", ""), "")
assert.strictEqual(ssv.xor("", "mark"), "mark")
assert.strictEqual(ssv.xor("mark tom", "mark"), "tom")
assert.strictEqual(ssv.xor("mark tom", "travis"), "mark tom travis")
assert.strictEqual(ssv.xor("mark tom", "travis tom"), "mark travis")
assert.strictEqual(ssv.xor("  mark tom  ", " matt  tom "), "mark matt")
assert.strictEqual(ssv.xor("  mark tom tom", "mark mark"), "tom")
assert.strictEqual(ssv.xor("mark mark mark", ""), "mark")
assert.strictEqual(ssv.xor("mark mark", "tom tom"), "mark tom")
assert.strictEqual(ssv.xor("mark tom travis matt", "tom matt"), "mark travis")
assert.strictEqual(ssv.xor(0, 182), "0 182")
assert.strictEqual(ssv.xor(182, 0), "182 0")
console.log("#xor tests passed")

assert.strictEqual(ssv.meet("", ""), "")
assert.strictEqual(ssv.meet("", "mark"), "")
assert.strictEqual(ssv.meet("mark matt travis", "tom scott"), "")
assert.strictEqual(ssv.meet("mark tom tom", "mark tom travis"), "mark tom")
assert.strictEqual(ssv.meet("tom tom tom scott", "tom travis scott"), "tom scott")
assert.strictEqual(ssv.meet(182, 0), "")
assert.strictEqual(ssv.meet(0, 182), "")
console.log("#meet tests passed")

assert.strictEqual(ssv.state(""), "")
assert.strictEqual(ssv.state(" "), "")
assert.strictEqual(ssv.state({}), "")
assert.strictEqual(ssv.state(Symbol()), "")
assert.strictEqual(ssv.state(Symbol("ignore")), "")
assert.strictEqual(ssv.state(ssv.state("mark")), "mark")
assert.strictEqual(ssv.state(ssv.state(" tom ")), "tom")
assert.strictEqual(ssv.state(ssv.state(" mark matt ")), "mark matt")
assert.strictEqual(ssv.state(ssv.state("travis travis")), "travis travis")
assert.strictEqual(ssv.state({
  "mark travis": true,
  "matt": true,
  "tom scott": false
}), "mark travis matt")
assert.strictEqual(ssv.state({
  " mark travis ": true,
  " matt ": true,
  " tom scott ": false,
  " ": true,
}), "mark travis matt")
assert.strictEqual(ssv.state({
  "mark": true,
  "mark travis": true,
  "travis": false
}), "mark mark travis")
console.log("#state tests passed")

assert.ok(ssv() instanceof ssv)
assert.ok(ssv().$ === "")
assert.ok(ssv(undefined).$ === "")
assert.ok(ssv(null).$ === "")
assert.ok(ssv("182").$ === "182")
assert.ok(ssv(182).$ === "182")
assert.ok(ssv().hasOwnProperty("$"))
console.log("constructor tests passed")

assert.ok(String(ssv(182)) === "182")
assert.ok(ssv(182).toString() === "182")
assert.ok(ssv.prototype.toString() === "")
console.log("toString tests passed")

assert.ok(ssv.prototype.count() === 0)
assert.ok(ssv.prototype.compact() instanceof ssv)
assert.ok(ssv.prototype.compact().$ === "")
assert.ok(ssv.prototype.concat("tom").$ === "tom")
assert.ok(ssv.prototype.split() instanceof Array)
assert.ok(ssv.prototype.split().length === 0)
console.log("prototype tests passed")

assert.ok(ssv().count() === 0)
assert.ok(ssv([]).$ === "")
assert.ok(ssv(true).$ === "true")
assert.ok(ssv(false).$ === "false")
assert.ok(ssv([,"blink"]).$ === "1")
assert.ok(ssv("mark tom scott").any("mark"))
assert.ok(ssv("mark tom scott").count() === 3)
assert.ok(ssv("mark tom scott").diff("scott").count() === 2)
assert.ok(ssv("mark tom scott").diff("scott").$ === "mark tom")
assert.ok(
  ssv("mark tom scott")
    .diff("scott scott")
    .union("travis travis")
    .$ === "mark tom travis"
)
assert.ok(
  ssv("mark tom scott")
    .diff("scott")
    .concat("travis")
    .diff("tom")
    .concat("matt")
    .$ === "mark travis matt"
)
assert.ok(
  ssv("mark tom scott")
    .diff({ "tom scott": true })
    .union({ "travis matt": true })
    .$ === "mark travis matt"
)
assert.ok(
  ssv("mark")
    .xor({ "tom": true })
    .xor({ "tom matt": true })
    .$ === "mark matt"
)
assert.ok(
  ssv("mark")
    .meet({ "mark": true })
    .concat({ "tom": false })
    .$ === "mark"
)
assert.ok(
  ssv().union({
      "mark": true,
      "tom scott": false,
      "travis matt": true,
    }).$ === "mark travis matt"
)
assert.ok(
  ssv({ "mark tom scott": true })
    .diff("scott")
    .union("travis")
    .diff("tom")
    .union("matt")
    .union(182)
    .$ === "mark travis matt 182"
)
console.log("chaining tests passed")

console.log("All tests passed =)")
