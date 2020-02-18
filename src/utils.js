export const getTimeDiff = time => {
  const currentTime = new Date().getTime() / 1000;
  const diff = currentTime - time;
  if (diff < 60) {
    const parsed = Math.round(diff);
    return `${parsed}s`;
  } else if (diff < 3_600) {
    const parsed = Math.round(diff / 60);
    return `${parsed}m`;
  } else if (diff < 86_400) {
    const parsed = Math.round(diff / 3_600);
    return `${parsed}h`;
  } else if (diff < 31_536_000) {
    const parsed = Math.round(diff / 86_400);
    return `${parsed}d`;
  }
  const parsed = Math.round(diff / 31_536_000);
  return `${parsed}y`;
};

export const ensureHonestLinks = htmlStr => {
  // Change links like <a href="malicious.com">Cute Video</a> to <a href="malicious.com">malicious.com</a>
  let honestStr = htmlStr;

  [
    ...htmlStr.matchAll(/<a\s+(?:[^>]*?\s+)?href=["'](.*?)["']>(.*?)<\/a>/gim)
  ].forEach(([aTag, href, linkStr]) => {
    const honestLink = aTag.replace(linkStr, href);
    honestStr = honestStr.replace(aTag, honestLink);
  });

  return honestStr;
};

export const addBlockQuotes = htmlStr => {
  // Wrap quotes (denoted by '>', a.k.a. '&gt;') in <blockquote> tags
  let quotedStr = htmlStr;

  [
    ...htmlStr.matchAll(
      /(?:<p>)(&gt;)(\s*.*?)(?:<\/?p>)|(?:^|\s)(&gt;)(\s*.*?)(<\/?p>|$)/gim
    )
  ].forEach(([fullQuote, gt1, quote1, gt2, quote2, p]) => {
    let blockQuote;
    if (quote1) {
      blockQuote = `<blockquote>${quote1.trim()}</blockquote>`;
    } else if (quote2) {
      blockQuote = `<blockquote>${quote2.trim()}</blockquote>`;
    }
    if (p) {
      blockQuote += p;
    }
    quotedStr = quotedStr.replace(fullQuote, blockQuote);
  });

  return quotedStr;
};

export const extractHostname = url => {
  if (!url) {
    return 'news.ycombinator.com';
  }
  // And strip possible 'www.' at the start
  try {
    return new URL(url).hostname.replace(/^www\./, '');
  } catch {
    return undefined;
  }
};
