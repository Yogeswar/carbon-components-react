import React from 'react';
import { storiesOf } from '@kadira/storybook';
import Loading from '../../components/Loading';

const loadingProps = {
  active: true,
  className: 'some-class',
};

storiesOf('Loading', module)
  .addWithInfo(
    '',
    `
      Loading spinners are used when retrieving data or performing slow computations,
      and help to notify users that loading is underway. The 'active' property is true by default;
      set to false to end the animation.
    `,
    () => (
      <Loading {...loadingProps} />
  ));
