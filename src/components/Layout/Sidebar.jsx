import React from 'react';
import { NavLink } from 'react-router-dom';
import {
    Home,
    Bell,
    Image as ImageIcon,
    MessageSquare,
    LogOut,
    User
} from 'lucide-react';
import { useAuth } from '../../firebase/auth';

const Sidebar = () => {
    const { user, logout } = useAuth();

    const navItems = [
        { path: '/', icon: <Home size={20} />, label: '홈' },
        { path: '/notices', icon: <Bell size={20} />, label: '알림장' },
        { path: '/gallery', icon: <ImageIcon size={20} />, label: '갤러리' },
        { path: '/chat', icon: <MessageSquare size={20} />, label: '채팅방' },
    ];

    return (
        <div className="glass-card" style={{
            width: '280px',
            height: 'calc(100vh - 40px)',
            margin: '20px',
            padding: '24px',
            display: 'flex',
            flexDirection: 'column',
            position: 'fixed',
            zIndex: 100
        }}>
            <div style={{ marginBottom: '40px' }}>
                <h2 className="title-gradient" style={{ fontSize: '1.8rem' }}>우리 교실</h2>
            </div>

            <nav style={{ flex: 1 }}>
                {navItems.map((item) => (
                    <NavLink
                        key={item.path}
                        to={item.path}
                        style={({ isActive }) => ({
                            display: 'flex',
                            alignItems: 'center',
                            padding: '12px 16px',
                            borderRadius: '12px',
                            textDecoration: 'none',
                            color: isActive ? '#fff' : 'var(--text-muted)',
                            background: isActive ? 'var(--glass)' : 'transparent',
                            marginBottom: '8px',
                            transition: 'all 0.3s'
                        })}
                    >
                        <span style={{ marginRight: '12px' }}>{item.icon}</span>
                        <span style={{ fontWeight: 500 }}>{item.label}</span>
                    </NavLink>
                ))}
            </nav>

            <div style={{ padding: '20px 0', borderTop: '1px solid var(--glass-border)' }}>
                {user && (
                    <div style={{ display: 'flex', alignItems: 'center', marginBottom: '20px' }}>
                        <div style={{
                            width: '40px',
                            height: '40px',
                            borderRadius: '50%',
                            marginRight: '12px',
                            background: 'var(--gradient)',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            overflow: 'hidden'
                        }}>
                            {user.photoURL ? (
                                <img src={user.photoURL} alt="profile" style={{ width: '100%', height: '100%' }} />
                            ) : (
                                <User size={24} color="white" />
                            )}
                        </div>
                        <div style={{ overflow: 'hidden' }}>
                            <p style={{ fontWeight: 600, fontSize: '0.9rem', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                                {user.displayName || '사용자'}
                            </p>
                            <p style={{ color: 'var(--text-muted)', fontSize: '0.8rem', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                                {user.isAnonymous ? '익명 접속 중' : user.email}
                            </p>
                        </div>
                    </div>
                )}
                <button
                    onClick={logout}
                    className="btn-primary"
                    style={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'rgba(239, 68, 68, 0.1)', color: '#ef4444', border: '1px solid rgba(239, 68, 68, 0.2)' }}
                >
                    <LogOut size={18} style={{ marginRight: '8px' }} /> 로그아웃
                </button>
            </div>
        </div>
    );
};

export default Sidebar;
