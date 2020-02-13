import React from 'react';

import { getTimeDiff } from '../utils';

const PublishTime = ({ time }) => (
  <time dateTime={new Date(time).toString()}>{getTimeDiff(time)}</time>
);

export default PublishTime;
