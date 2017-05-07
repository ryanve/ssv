!function(root, name, make) {
  typeof module != 'undefined' && module.exports ? module.exports = make() : root[name] = make()
}(this, 'ssv', function() {

  var api = {}
  var word = /\S+/g
  var space = ' '
  var empty = ''

  function parse(string) {
    return string.match(word) || []
  }

  function compact(ssv) {
    return parse(ssv).join(space)
  }

  function pad(string) {
    return space + string + space
  }

  function has(ssv, value) {
    if (!ssv.match(word)) return false
    return -1 < pad(compact(ssv)).indexOf(pad(value))
  }

  function pop(ssv) {
    return parse(ssv).pop() || empty
  }

  function push(ssv, value) {
    ssv = parse(ssv)
    ssv.push(value)
    return ssv.join(space)
  }

  function add(ssv, value) {
    return has(ssv, value) ? compact(ssv) : push(ssv, value)
  }

  function remove(ssv, value) {
    ssv = pad(compact(ssv)).replace(pad(value), space)
    return has(ssv, value) ? remove(ssv, value) : compact(ssv)
  }

  api['parse'] = parse
  api['compact'] = compact
  api['has'] = has
  api['pop'] = pop
  api['push'] = push
  api['add'] = add
  api['remove'] = remove
  return api
});
