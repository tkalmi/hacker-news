import React, { useState, useRef, useEffect } from 'react';

import { getTimeDiff } from '../utils';

const NEXT_CHECK_DELAYS = { s: 1_000, m: 1_000, h: 60_000, d: 3_600_000 };

const PublishTime = ({ time }) => {
  const [timeSince, setTimeSince] = useState(getTimeDiff(time));
  const timeoutRef = useRef();

  useEffect(() => {
    setTime();

    function setTime() {
      clearTimeout(timeoutRef.current);
      const newTimeSince = getTimeDiff(time);
      setTimeSince(newTimeSince);
      const timeUnit = newTimeSince.slice(-1)[0];

      const delay = NEXT_CHECK_DELAYS[timeUnit];
      if (!delay) {
        return;
      }

      // Update timeSince after suitable delay
      timeoutRef.current = setTimeout(() => {
        setTime();
      }, delay);
    }

    // Clear timeout
    return () => clearTimeout(timeoutRef.current);
  }, [time]);

  return (
    <time dateTime={new Date(time * 1_000).toString()} style={{ minWidth: 24 }}>
      {timeSince}
    </time>
  );
};

export default PublishTime;
