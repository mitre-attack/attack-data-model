import React from 'react';
import Admonition from '@theme/Admonition';

export default function WorkInProgressNotice() {
  return (
    <Admonition type="warning" title="🚧 Work in Progress" icon="⚠️">
      This document is a work in progress. Content may change, and some sections may be incomplete.
    </Admonition>
  );
}
