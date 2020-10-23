# Instructions

You need to create a class `AbortablePromise` that produces promises that can be aborted. You can try extending the `Promise` class. Though, it is easier without doing that.

When a promise is aborted, it should be rejected with `AbortError` with the same reason passed as argument to `abort` function.

To create `AbortError`, you can extend the native `Error` class.  

_**Note**:_ Usually, a promise can't be cancelled once started. It's effect (that is, resolution and rejection) can be avoided. This question is of the latter kind.

## Input
- An executor function, just like native `Promise`. However, the executor function will take 3 inputs as opposed to the usual two. They are (in order)-
  - resolve (behaves like native resolve)
  - reject (behaves like native reject)
  - onAbort
    - `onAbort` accepts a function and registers it. The registered function will be called after a promise has been aborted.

## Output
- A `Promise` instance.
  - Make sure that the output passes the `instanceof Promise` check.
The only difference is that the instance will also have an extra function called `abort` which will take a `reason` parameter and pass it to the `onAbort` handler.

Here's an example of the constructor, and the output.
```js
const abortablePromise = new AbortablePromise((resolve, reject, onAbort) => {
  setTimeout(resolve, 5000);
  onAbort(() => console.log('aborted'));
});
```

## API
- `AbortablePromise` : _class_  
Same as the `Promise` constructor, but with an appended `onAbort` parameter in executor.
  - `onAbort(fn)` : _void_  
  Accepts a function that is called when the promise is aborted.
- `AbortablePromise#abort(reason? : string)` : _void_
  - Abort the promise and optionally provide a reason.
  Calling it after the promise has settled or multiple times does nothing.

- `AbortablePromise#isAborted` : _boolean_
  - Whether the promise is aborted.

## Example
Assuming the above `abortablePromise` value exists here -
```js
(async () => {
	try {
		console.log('Operation finished successfully:', await abortablePromise);
	} catch (error) {
		if (abortablePromise.isAborted) {
			// Handle the abortion here
			console.log('Operation was aborted');
			return;
		}

		throw error;
	}
})();

// abort the operation after 3 seconds
setTimeout(() => {
	abortablePromise.abort('Aborted reason');
}, 3000);
```

## Restrictions
- Don't use `AbortController`. It's not supported everywhere as of now.
- Don't use external libraries.
- Use ES6 features as far as possible.