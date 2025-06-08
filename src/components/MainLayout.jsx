import React from 'react';
import { Outlet } from 'react-router-dom'; // <-- The magic ingredient from React Router
import Header from './Header'; // Your existing Header component
import Footer from './Footer'; // Let's create a simple footer too

function MainLayout() {
  return (
    <>
      <Header />
      <main className="main-content-area">
        {/*
          The <Outlet> component renders the child route's element.
          So, if the route is /dashboard, <DashboardPage /> will be rendered here.
          If the route is /about, <AboutPage /> will be rendered here.
        */}
        <Outlet /> 
      </main>
      <Footer />
    </>
  );
}

export default MainLayout;