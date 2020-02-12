import MockDate from 'mockdate';

import * as utils from './utils';

test('Gets correct time difference from given Unix timestp', () => {
  // Set system time to fixed value
  const SYSTEM_TIME = 1_000_000_000;
  MockDate.set(SYSTEM_TIME * 1_000);

  const secondsAgo = SYSTEM_TIME - 10;
  expect(utils.getTimeDiff(secondsAgo)).toEqual('10 seconds ago');

  const minutesAgo = SYSTEM_TIME - 100;
  expect(utils.getTimeDiff(minutesAgo)).toEqual('2 minutes ago');

  const hoursAgo = SYSTEM_TIME - 7_600;
  expect(utils.getTimeDiff(hoursAgo)).toEqual('2 hours ago');

  const dayAgo = SYSTEM_TIME - 60 * 60 * 24 * 1.43;
  expect(utils.getTimeDiff(dayAgo)).toEqual('1 day ago');

  const manyDaysAgo = SYSTEM_TIME - 60 * 60 * 24 * 364;
  expect(utils.getTimeDiff(manyDaysAgo)).toEqual('364 days ago');

  const yearsAgo = SYSTEM_TIME - 60 * 60 * 24 * 365 * 2;
  expect(utils.getTimeDiff(yearsAgo)).toEqual('2 years ago');
});
