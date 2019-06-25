import { Component, ReactNode } from 'react';

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
  initialPlaceholder?: ReactNode;
  shouldRenderImmediatelyOnMount?: boolean;
}

class TimeSlicer extends Component<ITimeSlicerProps> {
  static defaultProps = {
    shouldRenderImmediatelyOnMount: true,
  };

  scheduler = null;

  previousChildren = this.props.shouldRenderImmediatelyOnMount
    ? this.props.children
    : this.props.initialPlaceholder;

  componentDidMount() {
    const { children, shouldRenderImmediatelyOnMount } = this.props;

    if (!shouldRenderImmediatelyOnMount) this.scheduleNewChildrenRender(children);
  }

  componentDidUpdate() {
    if (this.scheduler) this.cancelNewChildrenRender();

    const { children } = this.props;

    if (children !== this.previousChildren) this.scheduleNewChildrenRender(children);
  }

  componentWillUnmount() {
    if (this.scheduler) this.cancelNewChildrenRender();
  }

  scheduleNewChildrenRender(children: ITimeSlicerProps['children']) {
    this.scheduler = schedule(() => {
      this.previousChildren = children;
      this.setState({});
    });
  }

  cancelNewChildrenRender() {
    cancelSchedule(this.scheduler);
    this.scheduler = null;
  }

  render() {
    return this.previousChildren;
  }
}

export default TimeSlicer;
