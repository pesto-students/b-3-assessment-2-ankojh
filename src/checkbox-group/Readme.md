# Create a CheckBoxGroup component

CheckboxGroup makes working with checkboxes much easier.

## Specification

The `CheckboxGroup` takes 4 props. They are

- `name : string` -- The `name` field of the checkbox. This is applied to all checkboxes.
- `value: Array<string>` -- This array contains the checkboxes which are checked by default.
- `onChange: fn` -- The function receives an array of values as a parameter which are currently selected.
- `children : fn` -- The `children` function will receive the "Checkbox" component as a parameter which the user can use to render the checkbox anywhere. Please see the example to understand more.

### Example

```jsx
import React from 'react';
import CheckboxGroup from './CheckboxGroup';

class App extends React.Component {
  state = {
    fruits: ['apple', 'watermelon'],
  };

  componentDidMount() {
    const timer = setTimeout(() => {
      this.setState({ fruits: ['apple', 'orange'] });
    }, 5000);
  }

  setFruits = (fruits) => {
    console.log(fruits); // All checkboxes which are currently checked.
    this.setState({ fruits });
  };

  render() {
    const { fruits } = this.state;

    return (
      <CheckboxGroup name="fruits" value={fruits} onChange={this.setFruits}>
        {(Checkbox) => (
          <>
            <label>
              <Checkbox value="apple" /> Apple
            </label>
            <label>
              <Checkbox value="orange" /> Orange
            </label>
            <label>
              <Checkbox value="watermelon" /> Watermelon
            </label>
          </>
        )}
      </CheckboxGroup>
    );
  }
}
```

The _first_ HTML render by `App` component is as follows.

```html
<label> <input type="checkbox" name="fruits" value="apple" /> Apple </label>
<label>
  <input type="checkbox" name="fruits" value="orange" checked="" /> Orange
</label>
<label>
  <input type="checkbox" name="fruits" value="watermelon" /> Watermelon
</label>
```

# Restrictions

- You can't use external libraries
