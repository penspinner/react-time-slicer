import { FC, ReactElement, ReactNode, useEffect, useState } from 'react';

import globalObject from './globalObject';

const schedule = globalObject.requestIdleCallback
  ? globalObject.requestIdleCallback
  : (handler: TimerHandler) => globalObject.setTimeout(handler, 30);

const cancelSchedule = globalObject.cancelIdleCallback
  ? globalObject.cancelIdleCallback
  : globalObject.clearTimeout;

const TimeSlicer: FC = ({ children }) => {
  const [previousChildren, setPreviousChildren] = useState<ReactNode>(null);

  useEffect(() => {
    const scheduler = schedule(() => {
      setPreviousChildren(children);
    });

    return () => cancelSchedule(scheduler);
  });

  // https://stackoverflow.com/questions/54905376/type-error-jsx-element-type-null-undefined-is-not-a-constructor-functi
  return previousChildren as (ReactElement | null);
};

export default TimeSlicer;
