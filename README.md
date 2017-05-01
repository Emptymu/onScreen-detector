# onScreen-detector
This is a pure JS snippet to capture elements entered the browser viewport.

Call `onScreen.watch(selectors[, enterFn, leaveFn])` to watch selected elements. 

When an element enters or leaves the viewport, `enterFn` or `leaveFn` will be called. `enterFn` and `leaveFn` accept that element as the argument.
