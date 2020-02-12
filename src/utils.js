export const getTimeDiff = time => {
  const currentTime = new Date().getTime() / 1000;
  const diff = currentTime - time;
  if (diff < 60) {
    return `${Math.round(diff)} seconds ago`;
  } else if (diff < 3_600) {
    return `${Math.round(diff / 60)} minutes ago`;
  } else if (diff < 86_400) {
    return `${Math.round(diff / 3_600)} hours ago`;
  } else if (diff < 31_536_000) {
    return `${Math.round(diff / 86_400)} days ago`;
  }
  return `${Math.round(diff / 31_536_000)} years ago`;
};

export const ensureHonestLinks = htmlStr => {
  // Change links like <a href="malicious.com">Cute Video</a> to <a href="malicious.com">malicious.com</a>
  let honestStr = htmlStr;

  [
    ...htmlStr.matchAll(
      /<a\s+(?:[^>]*?\s+)?href=["'](.*?)["']\>(.*?)\<\/a\>/gim
    )
  ].forEach(([aTag, href, linkStr]) => {
    const honestLink = aTag.replace(linkStr, href);
    honestStr = honestStr.replace(aTag, honestLink);
  });

  return honestStr;
};

export const addBlockQuotes = htmlStr => {
  // Wrap quotes (denoted by '>', a.k.a. '&gt;') in <blockquote> tags
  let quotedStr = htmlStr;

  [...htmlStr.matchAll(/&gt;(\s*.*?)<\/?p>/gim)].forEach(
    ([fullQuote, quote]) => {
      const blockQuote = `<blockquote>${quote}</blockquote>`;
      quotedStr = quotedStr.replace(`&gt;${quote}`, blockQuote);
    }
  );

  return quotedStr;
};
