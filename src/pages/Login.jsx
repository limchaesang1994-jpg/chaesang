import React from 'react';
import { useAuth } from '../firebase/auth';
import { motion } from 'framer-motion';

const Login = () => {
    const { loginWithGoogle } = useAuth();

    return (
        <div style={{
            height: '100vh',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            background: 'radial-gradient(circle at top right, #6366f1, transparent), radial-gradient(circle at bottom left, #a855f7, transparent)'
        }}>
            <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                className="glass-card"
                style={{ padding: '50px', width: '400px', textAlign: 'center' }}
            >
                <h1 className="title-gradient" style={{ fontSize: '2.5rem', marginBottom: '10px' }}>우리 교실</h1>
                <p style={{ color: 'var(--text-muted)', marginBottom: '40px' }}>구글 계정으로 간편하게 시작하세요.</p>

                <button
                    onClick={loginWithGoogle}
                    className="btn-primary"
                    style={{ width: '100%', padding: '15px', fontSize: '1.1rem' }}
                >
                    Google로 로그인하기
                </button>
            </motion.div>
        </div>
    );
};

export default Login;
