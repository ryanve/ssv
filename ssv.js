!function(root, name, make) {
  typeof module != "undefined" && module.exports ? module.exports = make() : root[name] = make()
}(this, "ssv", function() {

  var api = {}
  var own = {}.hasOwnProperty
  var word = /\S+/g
  var space = " "
  var empty = ""

  function split(string) {
    return string.match(word) || []
  }

  function compact(ssv) {
    return split(ssv).join(space)
  }

  function count(string) {
    return split(string).length
  }

  function blank(string) {
    return !string.match(word)
  }

  function any(ssv, search) {
    search = split(search)
    var l = search.length
    if (!l) return false
    ssv = split(ssv)
    var n = ssv.length
    var j = 0
    while (j < n) {
      var i = l
      var v = ssv[j++]
      while (i--) if (v === search[i]) return true
    }
    return false
  }

  function all(ssv, search) {
    return blank(search) || !diff(search, ssv)
  }

  function concat(ssv, more) {
    return compact(ssv + space + more)
  }

  function need(ssv, more) {
    return compact(ssv + space + diff(more, ssv))
  }

  function union(ssv, more) {
    return uniq(ssv + space + more)
  }

  function xor(left, right) {
    return union(diff(left, right), diff(right, left))
  }

  function meet(left, right) {
    return diff(union(left, right), xor(left, right))
  }

  function uniq(ssv) {
    ssv = split(ssv)
    var n = 0
    var u = []
    var l = ssv.length
    outer:for (var i = 0; i < l; i++) {
      for (var j = n; j--;) if (ssv[i] === u[j]) continue outer
      u[n++] = ssv[i]
    }
    return u.join(space)
  }

  function diff(ssv, less) {
    var d = empty
    ssv = split(ssv)
    less = split(less)
    var n = ssv.length
    var l = less.length
    var j = 0
    outer:while (j < n) {
      var i = l
      var v = ssv[j++]
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

  api["all"] = all
  api["any"] = any
  api["blank"] = blank
  api["compact"] = compact
  api["need"] = need
  api["concat"] = concat
  api["count"] = count
  api["diff"] = diff
  api["meet"] = meet
  api["split"] = split
  api["state"] = state
  api["union"] = union
  api["uniq"] = uniq
  api["xor"] = xor
  return api
});
