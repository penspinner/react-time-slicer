# React Time Slicer

This package was inspired by Dan Abramov's talk about async rendering and time slicing.

Renders children asynchronously so that high priority updates that triggers render in a low priority update won't get blocked as bad.

```js
import TimeSlicer from 'react-time-slicer';

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

        <TimeSlicer>{value}</TimeSlicer>
      </div>
    );
  }
}
```

This has not been tested thoroughly, but works for my use case.
