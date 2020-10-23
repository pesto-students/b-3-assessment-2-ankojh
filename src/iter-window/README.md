# Instructions

Return a sliding window of width n over the given iterable.

## Input
**(iter, n, fillValue=null, step=1)**
- `iter` is an iterable
- `n` is the size of the window
- `fillValue` fills the unoccupied slots when the window is bigger than remaining elements. Defaults to `null`. Essentially, the `fillValue` ensures that every window is always of the same length irrespective of the number of elements in the iterable.
- `step` is how many values to skip for the next window. See the example below. Defaults to `1`.

## Output
- The output is will be an iterable as well which generates the windows. The generated windows will be `Array`s.

## Behaviours
- Appropriate errors should be thrown for incorrect parameters.
- The output should work with existing structures of JavaScript, that is for-of loops.

## Examples
```js
allWindows = iterWindow([1, 2, 3, 4, 5], 3)
Array.from(allWindows)
// => [[1, 2, 3], [2, 3, 4], [3, 4, 5]]
```

With `fillValue` of `NaN`
```js
iterWindow([1, 2, 3], 4, NaN)
// using Array from -> [[1, 2, 3, NaN]]
```

By default, the window advances by step of 1. When `step` is 2
```js
iterWindow([1, 2, 3, 4, 5, 6], 3, '!', 2)
// using Array from -> [[1, 2, 3], [3, 4, 5], [5, 6, '!']]
```

# Restrictions
- You can't use external libraries
