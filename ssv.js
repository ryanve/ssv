/** @preserve npm.im/ssv */
!function(root, name, make) {
  typeof module != "undefined" && module.exports ? module.exports = make() : root[name] = make()
}(this, "ssv", function() {

  var vacant
  var $ = "$"
  var chain = ssv.prototype
  var own = {}.hasOwnProperty
  var word = /\S+/g
  var space = " "
  var empty = ""

  function split(set) {
    return set.match(word) || []
  }

  function compact(set) {
    return split(set).join(space)
  }

  function count(set) {
    return split(set).length
  }

  function blank(set) {
    return !set.match(word)
  }

  function any(set, search) {
    search = split(search)
    var l = search.length
    if (!l) return false
    set = split(set)
    var n = set.length
    var j = 0
    while (j < n) {
      var i = l
      var v = set[j++]
      while (i--) if (v === search[i]) return true
    }
    return false
  }

  function all(set, search) {
    return blank(search) || !diff(search, set)
  }

  function at(set, i) {
    i = +i
    if (i !== i || i === i/0) return empty
    set = split(set)
    if (i < 0) i += set.length
    return set[i] || empty
  }

  function concat(set, more) {
    return compact(set + space + more)
  }

  function need(set, more) {
    return compact(set + space + diff(more, set))
  }

  function union(set, more) {
    return uniq(set + space + more)
  }

  function xor(left, right) {
    return union(diff(left, right), diff(right, left))
  }

  function meet(left, right) {
    return diff(union(left, right), xor(left, right))
  }

  function uniq(set) {
    set = split(set)
    var n = 0
    var u = []
    var l = set.length
    outer:for (var i = 0; i < l; i++) {
      for (var j = n; j--;) if (set[i] === u[j]) continue outer
      u[n++] = set[i]
    }
    return u.join(space)
  }

  function diff(set, less) {
    var d = empty
    set = split(set)
    less = split(less)
    var n = set.length
    var l = less.length
    var j = 0
    outer:while (j < n) {
      var i = l
      var v = set[j++]
      while (i--) if (v === less[i]) continue outer
      d ? d += space + v : d = v
    }
    return d
  }

  function state(state) {
    var s
    if (typeof state == "string") s = state
    else for (var key in state) {
      if (own.call(state, key)) {
        if (state[key]) {
          if (s) s += space + key
          else s = key
        }
      }
    }
    return s ? compact(s) : empty
  }

  /** @constructor */
  function ssv(set) {
    var o = this instanceof ssv ? this : new ssv
    o[$] = set === vacant ? empty : empty + set
    return o
  }

  chain.toString = function() {
    return this instanceof ssv ? empty + this[$] : empty
  }

  function dot(f) {
    return function(uno) {
      var o = this instanceof ssv ? this : new ssv
      var v = f(o[$], uno)
      if (typeof v != "string") return v
      o[$] = v
      return o
    }
  }

  function give(f) {
    var method = f.name
    ssv[method] = f
    chain[method] = dot(f)
  }

  give(all)
  give(any)
  give(at)
  give(blank)
  give(compact)
  give(need)
  give(concat)
  give(count)
  give(diff)
  give(meet)
  give(split)
  give(state)
  give(union)
  give(uniq)
  give(xor)

  return ssv
});
