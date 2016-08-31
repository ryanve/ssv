!function(api) {
  function expect(actual, correct) {
    if (actual !== correct) throw new Error(actual + ' should be ' + correct)
  }

  expect(api.compact(''), '')
  expect(api.compact('    '), '')
  expect(api.compact('  yes  no  maybe  '), 'yes no maybe')
  console.log('#compact tests passed')

  expect(api.has('', ''), false)
  expect(api.has('', ' '), false)
  expect(api.has(' ', ' '), false)
  expect(api.has('yes no', ''), false)
  expect(api.has('yes no', ' '), false)
  expect(api.has('yes no', 'no'), true)
  expect(api.has('yes no', 'yes'), true)
  expect(api.has('yes no', 'maybe'), false)
  expect(api.has('  yes   no  ', 'yes'), true)
  console.log('#has tests passed')

  expect(api.add('', ''), '')
  expect(api.add('', 'yes'), 'yes')
  expect(api.add('yes no', 'maybe'), 'yes no maybe')
  expect(api.add('yes no', 'yes'), 'yes no yes')
  expect(api.add('  yes  no  ', 'maybe'), 'yes no maybe')
  expect(api.add('  yes  no  ', 'yes'), 'yes no yes')
  console.log('#add tests passed')

  expect(api.admit('yes no', 'yes'), 'yes no')
  expect(api.admit('yes no', 'maybe'), 'yes no maybe')
  expect(api.admit('  yes   no  ', 'yes'), 'yes no')
  expect(api.admit('  yes  no  ', 'maybe'), 'yes no maybe')
  console.log('#admit tests passed')

  expect(api.remove('', 'yes'), '')
  expect(api.remove('yes no maybe', 'maybe'), 'yes no')
  expect(api.remove('yes no maybe', 'yes'), 'no maybe')
  expect(api.remove('yes no maybe', 'no'), 'yes maybe')
  expect(api.remove('yes no maybe no', 'no'), 'yes maybe')
  expect(api.remove('yes no no maybe', 'no'), 'yes maybe')
  expect(api.remove('  yes  no  maybe  ', 'maybe'), 'yes no')
  expect(api.remove('  yes  no  maybe  ', 'yes'), 'no maybe')
  expect(api.remove('  yes  no  maybe  ', 'no'), 'yes maybe')
  expect(api.remove('  yes  no  maybe no', 'no'), 'yes maybe')
  expect(api.remove('  yes  no  no maybe', 'no'), 'yes maybe')
  console.log('#remove tests passed')

  console.log('All tests passed =)')
}(require('./'));
