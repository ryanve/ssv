!function(root, name, make) {
  typeof module != 'undefined' && module.exports ? module.exports = make() : root[name] = make()
}(this, 'ssv', function() {

  var api = {}
  var word = /\S+/g
  var space = ' '

  function match(string) {
    return string.match(word) || []
  }

  function compact(ssv) {
    return match(ssv).join(space)
  }

  function pad(string) {
    return space + string + space
  }

  function has(ssv, value) {
    if (!ssv.match(word)) return false
    return -1 < pad(compact(ssv)).indexOf(pad(value))
  }

  function add(ssv, value) {
    return ssv.length ? compact(ssv + space + value) : String(value)
  }

  function admit(ssv, value) {
    return has(ssv, value) ? compact(ssv) : add(ssv, value)
  }

  function remove(ssv, value) {
    ssv = pad(compact(ssv)).replace(pad(value), space)
    return has(ssv, value) ? remove(ssv, value) : compact(ssv)
  }

  api['compact'] = compact
  api['has'] = has
  api['add'] = add
  api['admit'] = admit
  api['remove'] = remove
  return api
});
