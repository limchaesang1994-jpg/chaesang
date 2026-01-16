import React from 'react';
import { useAuth } from '../firebase/auth';
import { motion } from 'framer-motion';

const Home = () => {
    const { user } = useAuth();

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
        >
            <h1 className="title-gradient" style={{ fontSize: '3rem', marginBottom: '1rem' }}>
                환영합니다, {user?.displayName}님!
            </h1>
            <p style={{ color: 'var(--text-muted)', fontSize: '1.2rem', marginBottom: '3rem' }}>
                오늘도 우리 교실에서 즐거운 하루 보내세요.
            </p>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '24px' }}>
                <div className="glass-card" style={{ padding: '30px' }}>
                    <h3 style={{ marginBottom: '15px' }}>📌 최근 알림</h3>
                    <p style={{ color: 'var(--text-muted)' }}>새로운 알림이 없습니다.</p>
                </div>
                <div className="glass-card" style={{ padding: '30px' }}>
                    <h3 style={{ marginBottom: '15px' }}>📸 최근 사진</h3>
                    <p style={{ color: 'var(--text-muted)' }}>새로 올라온 사진이 없습니다.</p>
                </div>
                <div className="glass-card" style={{ padding: '30px' }}>
                    <h3 style={{ marginBottom: '15px' }}>💬 최근 대화</h3>
                    <p style={{ color: 'var(--text-muted)' }}>채팅방에 새로운 메시지가 없습니다.</p>
                </div>
            </div>
        </motion.div>
    );
};

export default Home;
