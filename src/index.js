import { Component } from 'react';
import PropTypes from 'prop-types';

class TimeSlicer extends Component {
  static propTypes = {
    children: PropTypes.node.isRequired,
    initialPlaceholder: PropTypes.node,
    shouldRenderSynchronouslyOnMount: PropTypes.bool,
  };

  static defaultProps = {
    initialPlaceholder: null,
    shouldRenderSynchronouslyOnMount: true,
  };

  scheduler = null;

  previousChildren = this.props.shouldRenderSynchronouslyOnMount
    ? this.props.children
    : this.props.initialPlaceholder;

  componentDidMount() {
    const { children, shouldRenderSynchronouslyOnMount } = this.props;

    if (!shouldRenderSynchronouslyOnMount) this.scheduleNewChildrenRender(children);
  }

  componentDidUpdate() {
    if (this.scheduler) this.cancelNewChildrenRender();

    const { children } = this.props;

    if (children !== this.previousChildren) this.scheduleNewChildrenRender(children);
  }

  componentWillUnmount() {
    if (this.scheduler) this.cancelNewChildrenRender();
  }

  render() {
    return this.previousChildren;
  }
}

class IdleCallbackTimeSlicer extends TimeSlicer {
  scheduleNewChildrenRender(children) {
    this.scheduler = window.requestIdleCallback(() => {
      this.previousChildren = children;
      this.setState({});
    });
  }

  cancelNewChildrenRender() {
    window.cancelIdleCallback(this.scheduler);
    this.scheduler = null;
  }
}

class TimeoutTimeSlicer extends TimeSlicer {
  scheduleNewChildrenRender(children) {
    this.scheduler = window.setTimeout(() => {
      this.previousChildren = children;
      this.setState({});
    }, 30);
  }

  cancelNewChildrenRender() {
    window.clearTimeout(this.scheduler);
    this.scheduler = null;
  }
}

export default (window.requestIdleCallback ? IdleCallbackTimeSlicer : TimeoutTimeSlicer);
