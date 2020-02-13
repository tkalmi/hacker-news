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

test('Ensures content for <a> to match its href', () => {
  const honestATag = '<a href="foobar.com">foobar.com</a>';
  expect(utils.ensureHonestLinks(honestATag)).toEqual(honestATag);

  const maliciosATag = `<a href="phishing.com">Click here</a>`;
  expect(utils.ensureHonestLinks(maliciosATag)).toEqual(
    '<a href="phishing.com">phishing.com</a>'
  );

  const noATag = 'bla bla bla <p>Hello world</p>';
  expect(utils.ensureHonestLinks(noATag)).toEqual(noATag);

  const aTagInsideText =
    "<p>Foobar quux <a href='hello.world'>hello.world</a></p>";
  expect(utils.ensureHonestLinks(aTagInsideText)).toEqual(aTagInsideText);

  const maliciousATagInsideText =
    "<p>Malicious <a href='malicious.com'>Click here</a></p>";
  expect(utils.ensureHonestLinks(maliciousATagInsideText)).toEqual(
    "<p>Malicious <a href='malicious.com'>malicious.com</a></p>"
  );
});

test('Wraps quotes in <blockquote> tags', () => {
  const noQuote = '<p>Foobar</p>';
  expect(utils.addBlockQuotes(noQuote)).toEqual(noQuote);

  const onlyQuote = '&gt; This is a quote';
  expect(utils.addBlockQuotes(onlyQuote)).toEqual(
    '<blockquote> This is a quote</blockquote>'
  );

  const startQuote = '&gt; This is a quote<p>Foobar</p>';
  expect(utils.addBlockQuotes(startQuote)).toEqual(
    '<blockquote> This is a quote</blockquote><p>Foobar</p>'
  );

  const endQuote = 'Foobar<p>&gt; This is a quote</p>';
  expect(utils.addBlockQuotes(endQuote)).toEqual(
    'Foobar<blockquote> This is a quote</blockquote>'
  );

  const middleQuote = 'Foobar<p>&gt; This is a quote</p><p>Foobar</p>';
  expect(utils.addBlockQuotes(middleQuote)).toEqual(
    'Foobar<blockquote> This is a quote</blockquote><p>Foobar</p>'
  );

  const multiQuote =
    'Foobar<p>&gt; This is a quote</p><p>&gt; This is another quote</p>';
  expect(utils.addBlockQuotes(multiQuote)).toEqual(
    'Foobar<blockquote> This is a quote</blockquote><blockquote> This is another quote</blockquote>'
  );
});

test('Extracts hostname from a given URL w/out "www.", or returns undefined for invalid URLs', () => {
  const invalidUrl = 'foobar.com';
  expect(utils.extractHostname(invalidUrl)).toBe(undefined);

  const validHostname = 'https://google.com';
  expect(utils.extractHostname(validHostname)).toEqual('google.com');

  const wwwUrl = 'https://www.google.com/www.foobar';
  expect(utils.extractHostname(wwwUrl)).toEqual('google.com');

  const multipartUrl = 'https://app.times.now.com/foobar?quux=123';
  expect(utils.extractHostname(multipartUrl)).toEqual('app.times.now.com');
});
