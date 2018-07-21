# React Time Slicer

This package was inspired by Dan Abramov's talk about async rendering and time slicing.

Renders children asynchronously so that high priority updates that triggers render in a low priority update won't get blocked as bad.

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
  state = {
    value: '',
  };

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
          {/* A render-heavy element will cause lag in the input element change without the TimeSlicer. Using the TimeSlicer will relieve some of that lag. */}
          <HeavyComponent value={value} />
        </TimeSlicer>
      </div>
    );
  }
}

ReactDOM.render(<App />, document.getElementById('root'));
```

This has not been tested thoroughly, but works for my use case.
