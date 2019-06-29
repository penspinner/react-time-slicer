import { ReactNode, useEffect, useState } from 'react';

type RequestIdleCallbackHandle = any;
type RequestIdleCallbackOptions = {
  timeout: number;
};
type RequestIdleCallbackDeadline = {
  readonly didTimeout: boolean;
  timeRemaining: () => number;
};

declare global {
  interface Window {
    requestIdleCallback: (
      callback: (deadline: RequestIdleCallbackDeadline) => void,
      options?: RequestIdleCallbackOptions,
    ) => RequestIdleCallbackHandle;
    cancelIdleCallback: (handle: RequestIdleCallbackHandle) => void;
  }
}

const schedule = window.requestIdleCallback
  ? window.requestIdleCallback
  : (handler: TimerHandler) => window.setTimeout(handler, 30);

const cancelSchedule = window.cancelIdleCallback ? window.cancelIdleCallback : window.clearTimeout;

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
