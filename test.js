var ssv = require("./")
var assert = require("assert")
var ok = assert.ok
var doesNotThrow = assert.doesNotThrow

ok(ssv.split("").length === 0)
ok(ssv.split(" ").length === 0)
ok(ssv.split("mark").join("-") === "mark")
ok(ssv.split("mark tom").join("-") === "mark-tom")
ok(ssv.split(" mark tom ").join("-") === "mark-tom")
ok(ssv.split(0).join("-") === "0")
ok(ssv.split(182).join("-") === "182")
console.log("#split tests passed")

ok(ssv.count("") === 0)
ok(ssv.count("    ") === 0)
ok(ssv.count("blink") === 1)
ok(ssv.count("mark-hoppus matt-skiba") === 2)
ok(ssv.count("  mark  matt  travis  ") === 3)
ok(ssv.count(" blink blink blink 182") === 4)
ok(ssv.count(0) === 1)
ok(ssv.count(182) === 1)
console.log("#count tests passed")

ok(ssv.blank("travis") === false)
ok(ssv.blank("      ") === true)
ok(ssv.blank("") === true)
ok(ssv.blank(0) === false)
ok(ssv.blank(182) === false)
console.log("#blank tests passed")

ok(ssv.jam("") === "")
ok(ssv.jam("    ") === "")
ok(ssv.jam("  mark  tom  travis  ") === "mark tom travis")
ok(ssv.jam("\n mark \r tom \t travis \n\r\t") === "mark tom travis")
ok(ssv.jam(0) === "0")
ok(ssv.jam(182) === "182")
console.log("#jam tests passed")

ok(ssv.at("") === "")
ok(ssv.at("", 5) === "")
ok(ssv.at("", -1) === "")
ok(ssv.at("tom", NaN) === "")
ok(ssv.at("tom", 1/0) === "")
ok(ssv.at("tom", -1/0) === "")
ok(ssv.at("tom", "0") === "tom")
ok(ssv.at("scott travis", "1") === "travis")
ok(ssv.at("scott travis", "-1") === "travis")
ok(ssv.at("mark tom scott", 0) === "mark")
ok(ssv.at("mark tom scott", 2) === "scott")
ok(ssv.at("mark tom scott", -1) === "scott")
ok(ssv.at("mark tom scott", -2) === "tom")
ok(ssv.at("mark tom scott", 1) === "tom")
ok(ssv.at("mark tom scott", 8) === "")
ok(ssv.at("mark tom scott", -8) === "")
ok(ssv.at(0, 0) === "0")
ok(ssv.at(182, 0) === "182")
console.log("#at tests passed")

ok(ssv.gum("", "") === "")
ok(ssv.gum("", "mark") === "mark")
ok(ssv.gum("mark tom", "travis") === "mark tom travis")
ok(ssv.gum("mark tom", "travis matt") === "mark tom travis matt")
ok(ssv.gum("mark tom", "mark") === "mark tom mark")
ok(ssv.gum("  mark  tom  ", "  travis  matt ") === "mark tom travis matt")
ok(ssv.gum("  mark  tom  ", "mark") === "mark tom mark")
console.log("#gum tests passed")

ok(ssv.yolo("") === "")
ok(ssv.yolo(0) === "0")
ok(ssv.yolo(182) === "182")
ok(ssv.yolo("mark tom mark") === "mark tom")
ok(ssv.yolo("mark tom mark mark tom tom mark") === "mark tom")
ok(ssv.yolo("mark tom Mark") === "mark tom Mark")
console.log("#yolo tests passed")

ok(ssv.or("", "") === "")
ok(ssv.or("", "mark") === "mark")
ok(ssv.or("mark tom", "travis") === "mark tom travis")
ok(ssv.or("mark tom", "travis matt") === "mark tom travis matt")
ok(ssv.or("mark tom", "mark") === "mark tom")
ok(ssv.or("  mark  tom  ", "  travis  matt ") === "mark tom travis matt")
ok(ssv.or("  mark  tom  ", "mark") === "mark tom")
ok(ssv.or("mark mark mark", "") === "mark")
ok(ssv.or("mark mark mark", "tom") === "mark tom")
ok(ssv.or(0, 0) === "0")
ok(ssv.or(182, 182) === "182")
console.log("#or tests passed")

ok(ssv.not("", "") === "")
ok(ssv.not("", "mark") === "")
ok(ssv.not("mark tom", "travis") === "mark tom")
ok(ssv.not("mark tom", "travis tom") === "mark")
ok(ssv.not("mark tom", "mark") === "tom")
ok(ssv.not("  mark tom  ", " travis  tom ") === "mark")
ok(ssv.not("  mark tom tom", "mark mark") === "tom tom")
ok(ssv.not("mark mark mark", "") === "mark mark mark")
ok(ssv.not("mark mark", "tom tom") === "mark mark")
ok(ssv.not("mark tom travis matt", "tom matt") === "mark travis")
ok(ssv.not("mark tom tom tom", "tom") === "mark")
ok(ssv.not("mark tom tom tom", "tom travis") === "mark")
ok(ssv.not("mark tom tom tom", "tom travis tom") === "mark")
ok(ssv.not(0, 182) === "0")
ok(ssv.not(182, 0) === "182")
console.log("#not tests passed")

doesNotThrow(function() { ssv.any(null, " ") })
ok(ssv.any("", "") === false)
ok(ssv.any("", " ") === false)
ok(ssv.any(" ", " ") === false)
ok(ssv.any("mark tom", "") === false)
ok(ssv.any("mark tom", " ") === false)
ok(ssv.any("mark tom", "tom") === true)
ok(ssv.any("mark tom", "mark") === true)
ok(ssv.any("mark tom", "travis") === false)
ok(ssv.any("  mark   tom  ", "mark  tom") === true)
ok(ssv.any("  mark   tom  ", "mark scott") === true)
ok(ssv.any("  mark   tom ", "matt travis") === false)
ok(ssv.any("  mark   tom  mark", "travis tom") === true)
ok(ssv.any(0, 0) === true)
ok(ssv.any(0, 182) === false)
ok(ssv.any(182, 0) === false)
console.log("#any tests passed")

doesNotThrow(function() { ssv.all(null, " ") })
ok(ssv.all("", "") === true)
ok(ssv.all("", " ") === true)
ok(ssv.all(" ", " ") === true)
ok(ssv.all("mark tom", "") === true)
ok(ssv.all("mark tom", " ") === true)
ok(ssv.all("mark tom", "tom") === true)
ok(ssv.all("mark tom", "mark") === true)
ok(ssv.all("mark tom", "travis") === false)
ok(ssv.all("  mark   tom  ", "mark  tom") === true)
ok(ssv.all("  mark   tom  ", "mark scott") === false)
ok(ssv.all("  mark   tom ", "matt travis") === false)
ok(ssv.all("  mark   tom  mark", "travis tom") === false)
ok(ssv.all(0, 0) === true)
ok(ssv.all(182, 0) === false)
ok(ssv.all(0, 182) === false)
console.log("#all tests passed")

ok(ssv.xor("", "") === "")
ok(ssv.xor("", "mark") === "mark")
ok(ssv.xor("mark tom", "mark") === "tom")
ok(ssv.xor("mark tom", "travis") === "mark tom travis")
ok(ssv.xor("mark tom", "travis tom") === "mark travis")
ok(ssv.xor("  mark tom  ", " matt  tom ") === "mark matt")
ok(ssv.xor("  mark tom tom", "mark mark") === "tom")
ok(ssv.xor("mark mark mark", "") === "mark")
ok(ssv.xor("mark mark", "tom tom") === "mark tom")
ok(ssv.xor("mark tom travis matt", "tom matt") === "mark travis")
ok(ssv.xor(0, 182) === "0 182")
ok(ssv.xor(182, 0) === "182 0")
console.log("#xor tests passed")

ok(ssv.and("", "") === "")
ok(ssv.and("", "mark") === "")
ok(ssv.and("mark matt travis", "tom scott") === "")
ok(ssv.and("mark tom tom", "mark tom travis") === "mark tom")
ok(ssv.and("tom tom tom scott", "tom travis scott") === "tom scott")
ok(ssv.and(182, 0) === "")
ok(ssv.and(0, 182) === "")
console.log("#and tests passed")

ok(ssv.state("") === "")
ok(ssv.state(" ") === "")
ok(ssv.state({}) === "")
ok(ssv.state(ssv.state("mark")) === "mark")
ok(ssv.state(ssv.state(" tom ")) === "tom")
ok(ssv.state(ssv.state(" mark matt ")) === "mark matt")
ok(ssv.state(ssv.state("travis travis")) === "travis")
ok(ssv.state({
  "mark travis": true,
  "matt": true,
  "tom scott": false
}) === "mark travis matt")
ok(ssv.state({
  " mark travis ": true,
  " matt ": true,
  " tom scott ": false,
  " ": true,
}) === "mark travis matt")
ok(ssv.state({
  "mark": true,
  "mark travis": true,
  "travis": false
}) === "mark travis")
console.log("#state tests passed")

ok(ssv.edit() === "")
ok(ssv.edit(182) === "182")
ok(ssv.edit(182, {}) === "182")
ok(ssv.edit("mark ", {}) === "mark")
ok(ssv.edit("mark tom scott", {
  "tom scott": false,
  "travis matt": true
}) === "mark travis matt")
ok(ssv.edit("mark tom scott", {
  "scott scott": false,
  "travis travis": true
}) === "mark tom travis")
ok(ssv.edit("mark mark", {
  "tom": true,
}) === "mark tom")
ok(ssv.edit("mark tom scott", {
  "scott": 0,
  "travis": 1,
  "tom": 0,
  "matt": 1,
}) === "mark travis matt")
console.log("#edit tests passed")

console.log("All tests passed =)")
