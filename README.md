# React Time Slicer

React Time Slicer renders children during idle periods to alleviate lag on high priority updates (like updating an input) that triggers render in a heavy low priority update (like rendering charts).

Idle period renders are only available on the browsers specified in this [link](https://caniuse.com/#feat=requestidlecallback). Other browsers will cause React Time Slicer to render children in a 30 millisecond throttler.

This package was inspired by Dan Abramov's talk about React async rendering and time slicing.

### Prop Types

| Property                       | Type      | Required? | Default | Description                                                                                                                                            |
| :----------------------------- | :-------- | :-------: | :------ | :----------------------------------------------------------------------------------------------------------------------------------------------------- |
| children                       | ReactNode |     ✓     |         | The React node that will be rendered (eg `<div />`).                                                                                                   |
| initialPlaceholder             | ReactNode |           | `null`  | The initial placeholder node renders only if property `shouldRenderImmediatelyOnMount` is `false`.                                                     |
| shouldRenderImmediatelyOnMount | Boolean   |           | `true`  | This property controls whether or not children will be rendered immediately on mount. Pass `false` to this if the initial render can take a long time. |

<br>

```js
import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import TimeSlicer from 'react-time-slicer';

const HeavyComponent = ({ value }) => {
  let newValue = value;

  for (let i = 0; i < 1000000; i++) {
    newValue = `${value} ${i}`;
  }

  return newValue;
};

class App extends Component {
  state = { value: '' };

  handleChange = event => {
    this.setState({ value: event.target.value });
  };

  render() {
    const { value } = this.state;

    return (
      <div>
        <label>Update me</label>
        <input onChange={this.handleChange} value={value} />
        <br />
        <TimeSlicer>
          {/*
          A render-heavy element will cause lag in the input element change without the TimeSlicer.
          Using the TimeSlicer will alleviate some of that lag.
          */}
          <HeavyComponent value={value} />
        </TimeSlicer>
      </div>
    );
  }
}

ReactDOM.render(<App />, document.getElementById('root'));
```
