import React from 'react';
import Sidebar from './Sidebar';

const Layout = ({ children }) => {
    return (
        <div style={{ display: 'flex' }}>
            <Sidebar />
            <main style={{
                marginLeft: '320px',
                padding: '40px',
                flex: 1,
                minHeight: '100vh'
            }}>
                {children}
            </main>
        </div>
    );
};

export default Layout;
