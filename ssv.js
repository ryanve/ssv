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
    for (var j = 0; j < n; j++) {
      for (var i = 0; i < l; i++) {
        if (ssv[j] === search[i]) {
          return true
        }
      }
    }
    return false
  }

  function all(ssv, search) {
    search = split(search)
    var l = search.length
    if (!l) return true
    ssv = split(ssv)
    var n = ssv.length
    ask:for (var i = 0; i < l; i++) {
      for (var j = 0; j < n; j++) if (ssv[j] === search[i]) continue ask
      return false
    }
    return true
  }

  function concat(ssv, more) {
    return compact(ssv + space + more)
  }

  function complete(ssv, more) {
    ssv = split(ssv)
    more = split(more)
    mas:for (var i = 0, l = more.length; i < l; i++) {
      for (var j = ssv.length; j--;)
        if (ssv[j] === more[i])
          continue mas
      ssv.push(more[i])
    }
    return ssv.join(space)
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
    var u = []
    var l = ssv.length
    outer:for (var i = 0; i < l; i++) {
      for (var j = u.length; j--;) if (ssv[i] === u[j]) continue outer
      u.push(ssv[i])
    }
    return u.join(space)
  }

  function diff(ssv, less) {
    less = split(less)
    var l = less.length
    if (!l) return compact(ssv)
    ssv = split(ssv)
    var n = ssv.length
    if (!n) return empty
    var r = []
    var i = 0
    var skip = {}
    while (i < l) skip[less[i++]] = less
    for (i = 0; i < n; i++) {
      if (skip[ssv[i]] !== less) {
        r.push(ssv[i])
      }
    }
    return r.join(space)
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
  api["complete"] = complete
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
