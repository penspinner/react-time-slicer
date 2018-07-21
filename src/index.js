import { Component } from 'react';
import PropTypes from 'prop-types';

class TimeSlicer extends Component {
  scheduler = null;

  static propTypes = { children: PropTypes.node.isRequired };

  componentDidMount() {
    const { children } = this.props;

    this.mounted = true;
    this.previousChildren = children;
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
    const { children } = this.props;

    if (!this.mounted) return children;

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
