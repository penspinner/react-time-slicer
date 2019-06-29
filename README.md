# React Time Slicer

React Time Slicer renders React nodes during idle periods to alleviate lag on high priority updates (like updating an input) that triggers render in a heavy low priority update (like rendering charts).

Idle period renders are only available on the browsers specified in this [link](https://caniuse.com/#feat=requestidlecallback). Other browsers will cause React Time Slicer to render children in a 30 millisecond throttler.

This package was inspired by Dan Abramov's talk about React async rendering and time slicing.

### Prop Types

| Property | Type      | Required? | Default | Description                                          |
| :------- | :-------- | :-------: | :------ | :--------------------------------------------------- |
| children | ReactNode |     ✓     |         | The React node that will be rendered (eg `<div />`). |

<br>

```js
import React from 'react';
import ReactDOM from 'react-dom';
import TimeSlicer from 'react-time-slicer';

const HeavyComponent = ({ value }) => {
  let newValue = value;

  for (let i = 0; i < 1000000; i++) {
    newValue = `${value} ${i}`;
  }

  return newValue;
};

const App = () => {
  const [value, setValue] = React.useState('');

  const handleChange = e => {
    setValue(e.target.value);
  };

  return (
    <div>
      <label htmlFor="input">
        Update me
        <input id="input" onChange={handleChange} value={value} />
      </label>

      <br />

      <TimeSlicer>
        {/* A render-heavy element will cause lag in the input element change without the TimeSlicer.
          Using the TimeSlicer will alleviate some of that lag. */}
        <HeavyComponent value={value} />
      </TimeSlicer>
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById('root'));
```
