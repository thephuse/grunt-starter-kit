# Page.js Synchronous Router
# 
# Example Usage:
# 
# Page({
#   'home' : [homeJS, [navJS, 'homePage']]
# })
# 
# Pass a single-dimensional array of registered function names
# to invoke them with no arguments. Pass a multi-dimensional array
# to apply them with arguments ordered as they are in the array.
# 
# Works in IE 9+. IE 8 and below require an Array.prototype.indexOf shim.

Page = (pages, el)->

  'use strict'

  # Pages list must be an object
  if typeof pages isnt 'object'
    return console.error "Page: expects argument to be object"

  # Default to finding classes on the body
  if typeof el isnt 'object' or el.nodeType <= 0
    el = document.body

  # Loop through pages list
  for page of pages

    cssClass  = page
    functions = pages[page]

    # Test element for CSS class and return if not found
    if cssClass isnt '*' and el.className.split(' ').indexOf(cssClass) is -1
      return

    # Functions list should always be an array
    if {}.toString.call(functions) isnt '[object Array]'
      console.error "#{cssClass} error: No callbacks supplied."
      continue

    if functions.length is 0
      continue

    # Loop through modules
    for fn in functions

      # Assume no function arguments initially
      args = null

      # The function might have no arguments
      # Syntax: 'home' : [homeJS]
      if typeof fn is 'function'
        func = fn

      # Or might have arguments. In which case glean the arguments from the array.
      # Syntax: 'home' : [[homeJS, 'arg1', 'arg2' ...]]
      else if typeof fn[0] is 'function'
        func = fn[0]
        args = Array.prototype.slice.call(fn, 1)
      
      # Try every function call and offer an error fallover
      try
        func.apply(func, args)
      catch error
        console.error "Page: #{error.message}"
        continue

    continue

# Support CommonJS
if module and typeof module.exports isnt 'undefined'
  module.exports = Page
else
  window.Page = Page