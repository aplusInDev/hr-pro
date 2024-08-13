import React from 'react';
import { useLoaderData, Outlet } from 'react-router-dom';
import { LandingPage } from '.';
import { Header, Sidebar } from '../layouts';

export default function PrivateRoute() {
  const isConnected = useLoaderData();

  return (
    <>
      <Header isConnected={isConnected} />
      {isConnected ? (
        <>
          <Outlet />
          <Sidebar />
        </>
        ) : <LandingPage />}
    </>
  );
}
