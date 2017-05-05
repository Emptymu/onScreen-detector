# onScreen Detector
This is a pure JS snippet to capture elements entered the browser viewport.

Call `onScreen.watch(selectors[, enterFn, leaveFn])` to watch selected elements. 

When an element enters or leaves the viewport, `enterFn` or `leaveFn` will be fired. And this element will be passed to `enterFn` and `leaveFn` as the argument.
