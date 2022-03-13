import React from 'react';

import Meta from '../Meta';
import Footer from './Footer';
import Header from './Header';

type Props = {
  children: React.ReactNode;
  pageTitle?: string;
};

const Layout: React.FC<Props> = ({ pageTitle, children }) => {
  return (
    <>
      <Meta pageTitle={pageTitle} />

      <div className="max-w-prose mx-auto px-4">
        <Header />
        <main className="pt-4 pb-12">{children}</main>
        <Footer />
      </div>
    </>
  );
};

export default Layout;
