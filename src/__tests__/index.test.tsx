import React from 'react';
import { cleanup, render } from '@testing-library/react';

import TimeSlicer from '..';

afterEach(cleanup);

test('should render children immediately', () => {
  const { getByText } = render(<TimeSlicer>Hello</TimeSlicer>);
  const childNode = getByText('Hello');
  expect(childNode).toBeDefined();
});

describe('with shouldRenderImmediatelyOnMount false', () => {
  test('should render initialPlaceholder immediately', () => {
    const { getByText } = render(
      <TimeSlicer initialPlaceholder="Loading..." shouldRenderImmediatelyOnMount={false}>
        Hello
      </TimeSlicer>,
    );
    const childNode = getByText('Loading...');
    expect(childNode).toBeDefined();
  });

  test('should render children in the background', async () => {
    const { getByText } = render(
      <TimeSlicer initialPlaceholder="Loading..." shouldRenderImmediatelyOnMount={false}>
        Hello
      </TimeSlicer>,
    );
    await new Promise(resolve => {
      setTimeout(() => {
        const childNode = getByText('Hello');
        expect(childNode).toBeDefined();
        resolve();
      }, 30);
    });
  });
});