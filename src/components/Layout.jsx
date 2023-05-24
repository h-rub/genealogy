import { useState } from 'react';
import icons from '../assets/icons/icons';
import Header from '../partials/Header';

function Layout({ icon, nameRoute, nameSubRoute, children }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div>
        <Header
          sidebarOpen={sidebarOpen}
          setSidebarOpen={setSidebarOpen}
          icon={icon}
          nameRoute={nameRoute}
          nameSubRoute={nameSubRoute}
        />
        <main className='h-screen bg-white'>
          {/* <div className='lg:px-8 mt-5'>{children}</div> */}
          {children}
        </main>
    </div>
  );
}

export default Layout;