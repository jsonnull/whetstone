import h from 'hyperscript'
import $ from 'jquery'
import { modify } from '../../packages/whetstone-core'
import { transform } from '../../packages/whetstone-transform'

// Set up the editor
let editor = ace.edit('editor')
editor.getSession().setMode('ace/mode/javascript')

// Generate a from the current script
function createMap () {
  let script = editor.getValue()
  let map = transform(script)
  return map
}

const lineHeight = 16
function renderReference (ref) {
  let changeTo = function (newValue) {
    let script = editor.getValue()
    let modified = modify(script, ref, newValue)
    editor.setValue(modified)
    editor.selection.clearSelection()
  }

  let control = undefined
  let type = typeof ref.value.raw
  if (type == 'number') {
    let increment = h('input', {
      type: 'button',
      value: 'inc',
      onclick: e => changeTo(ref.value.raw + 1)
    })
    let decrement = h('input', {
      type: 'button',
      value: 'dec',
      onclick: e => changeTo(ref.value.raw - 1)
    })

    control = h('div', increment, decrement)
  } else if (type == 'string') {
    let uppercase = h('input', {
      type: 'button',
      value: 'upper',
      onclick: e => changeTo(ref.value.raw.toUpperCase())
    })

    let lowercase = h('input', {
      type: 'button',
      value: 'lower',
      onclick: e => changeTo(ref.value.raw.toLowerCase())
    })

    control = h('div', uppercase, lowercase)
  }

  let name = h('div.reference-name', ref.id)
  return h('div.reference', {
    style: {
      'top': (ref.value.loc.start.line - 1) * 16 + 'px'
    }
  }, [ name, control ])
}

function renderReferenceList (referenceMap) {
  let elements = referenceMap
    .filter(ref => ref.value !== null)
    .filter(ref => {
      switch (typeof ref.value.raw) {
        case 'number':
        case 'string':
          return true
        default:
          return false
      }
    })
    .map(renderReference)

  return h('div.references', elements)
}

let renderReferencePane = debounce(function () {
  let map = createMap()
  let referenceList = renderReferenceList(map)
  $('#whetstone').empty().append(referenceList)
}, 100)

editor.getSession().on('change', function (e) {
  renderReferencePane()
})

renderReferencePane()

function debounce (func, wait) {
  let timeout
  return function () {
    let args = arguments
    let later = function () {
      timeout = null
      func.apply(this, args)
    }
    clearTimeout(timeout)
    timeout = setTimeout(later, wait)
  }
}
