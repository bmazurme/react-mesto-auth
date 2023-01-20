import React from 'react';
import type { PropsWithChildren } from 'react';

import Header from '../Header';
import Footer from '../Footer';

export default function Content({ children }: PropsWithChildren) {
  return (
    <main className="main">
      <Header />
      {children}
      <Footer />
    </main>
  );
}
