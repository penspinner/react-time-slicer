import { ReactNode, useEffect, useState } from 'react';

import globalObject from './globalObject';

const schedule = globalObject.requestIdleCallback
  ? globalObject.requestIdleCallback
  : (handler: TimerHandler) => globalObject.setTimeout(handler, 30);

const cancelSchedule = globalObject.cancelIdleCallback
  ? globalObject.cancelIdleCallback
  : globalObject.clearTimeout;

interface ITimeSlicerProps {
  children: ReactNode;
}

const TimeSlicer = ({ children }: ITimeSlicerProps) => {
  const [previousChildren, setPreviousChildren] = useState<ReactNode>(null);

  useEffect(() => {
    const scheduler = schedule(() => {
      setPreviousChildren(children);
    });

    return () => cancelSchedule(scheduler);
  });

  return previousChildren;
};

export default TimeSlicer;
