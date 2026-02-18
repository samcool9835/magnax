import React from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from '../Navbar/Navbar'; // adjust path if needed
import Footer from '../Footer/Footer'; // adjust path if needed
import './Layout.scss';

const Layout: React.FC = () => {
  return (
    <div className="layout">
      <Navbar />
      
      <main className="main-content">
        <Outlet /> {/* All routed pages will render here */}
      </main>
      
      <Footer />
    </div>
  );
};

export default Layout;