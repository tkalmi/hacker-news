import React from 'react';

import { getTimeDiff } from '../utils';

const PublishTime = ({ time }) => (
  <time dateTime={new Date(time * 1_000).toString()}>{getTimeDiff(time)}</time>
);

export default PublishTime;
