import React from "react";
import Header from "./Header";

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className="flex flex-col min-h-screen bg-gray-100">
      <Header />
      <main className="flex-grow container mx-auto px-4 py-8">{children}</main>
      <footer className="bg-cyan-600 text-white p-4 text-center">
        <p>© 2024 VibeCast. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default Layout;

// This could be a general layout component, possibly used in conjunction with ClientLayout.
// It might define the overall structure of your pages