# React Time Slicer

This package was inspired by Dan Abramov's talk about async rendering and time slicing.

Renders children asynchronously so that high priority updates that triggers render in a low priority update won't get blocked as bad.

```js
import TimeSlicer from "react-time-slicer";

const MyComponent = () => (
  <TimeSlicer>
    // Some heavy element that requires a bit of time to update.
  </TimeSlicer>
);
```

This has not been tested thoroughly, but works for my use case.
