import React from 'react';
import { cleanup, render, waitForElement } from '@testing-library/react';

import TimeSlicer from '..';

afterEach(cleanup);

test('should render children in the background', async () => {
  const { getByText } = render(
    // @ts-ignore
    <TimeSlicer initialPlaceholder="Loading..." shouldRenderImmediatelyOnMount={false}>
      Hello
    </TimeSlicer>,
  );

  await waitForElement(() => getByText('Hello'));
});
