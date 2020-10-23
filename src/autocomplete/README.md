# Instructions

## Requirements

Your task is to implement a React component that renders a text input field with auto-completion.

- In order to fetch items based on the current query, you can use the `getData` function. It takes a `query` string and returns a promise which resolves with an array of values after random times.
- The component should render a div element that has the class name `wrapper` and two child elements: a div element with the class name control and a div element with the class name list. The div element with class name control should contain an input element with the class name input, and this is the input in which the user enters a query.
- Once a response comes from the API, all strings from the response should be displayed inside the div tag with class name "list", each one inside a separate `a` element with the class name `list-item`. The strings should be displayed in the same order as they arrived in from the API.
- You should avoid sending too many requests to the API; in particular, do not send requests on every single keypress! You are expected to properly debounce the requests. The debounce time-out should be 500 milliseconds. You can use lodash's debounce function to implement the debouncing.
- When items are being fetched, a class name `is-loading` should be added to the input's wrapper (the element with class name "control").
- When items are being fetched, no request has been sent or the endpoint has returned zero items, the div element with class name list should not be rendered.
- The component accepts the prop onSelectItem: (item: string) => void, which should be called with an item when the user clicks on it. Clicking on an item does not have any effect apart from calling the callback.

## Assumptions

- Assume the response always comes. The array's length is at most 10.
- Design/styling is not assessed and will not affect your score. You should focus only on implementing the requirements.
  The following imports are provided and are allowed:
  react (v16.9.0),
  classnames (v2.2.6),
  lodash (v4.17.14),
  axios (v0.19.2).
  Use console.log and console.error for debugging purposes via your browser's developer tools.

- You can ignore warnings such as
  - `Warning: A future version of React will block javascript: urls `

## Additional examples

### Example 1

Let's consider the following sequence of actions:

    The user types "q" into the input;
    After 50 ms the user presses "u", and then again, after every 50 ms, a new character is inserted until the input value is "query";
    Only one request to the API is sent, exactly 500 ms after "y" is inputted;
    During this period (from pressing "y" until the response comes in), the class name is-loading is added to the input's wrapper.

### Example 2

If the response from the API endpoint is:

["Italy", "Spain", "Portugal", "Macedonia"]

then the list section, which is rendered as follows:

```html
<div class="list">
  <a class="list-item">Italy</a>
  <a class="list-item">Spain</a>
  <a class="list-item">Portugal</a>
  <a class="list-item">Macedonia</a>
</div>
```

satisfies all the task's requirements.
