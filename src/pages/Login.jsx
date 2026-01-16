import React, { useState } from 'react';
import { useAuth } from '../firebase/auth';
import { motion } from 'framer-motion';

const Login = () => {
    const { loginWithEmail, signupWithEmail, loginAnonymously } = useAuth();
    const [isSignUp, setIsSignUp] = useState(false);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [displayName, setDisplayName] = useState('');
    const [error, setError] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        try {
            if (isSignUp) {
                await signupWithEmail(email, password, displayName);
            } else {
                await loginWithEmail(email, password);
            }
        } catch (err) {
            setError('로그인/회원가입에 실패했습니다: ' + err.message);
        }
    };

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
                style={{ padding: '40px', width: '400px', textAlign: 'center' }}
            >
                <h1 className="title-gradient" style={{ fontSize: '2.5rem', marginBottom: '10px' }}>우리 교실</h1>
                <p style={{ color: 'var(--text-muted)', marginBottom: '30px' }}>
                    {isSignUp ? '회원가입을 진행해 주세요.' : '이메일로 로그인해 주세요.'}
                </p>

                <form onSubmit={handleSubmit} style={{ textAlign: 'left', display: 'flex', flexDirection: 'column', gap: '15px' }}>
                    {isSignUp && (
                        <input
                            type="text"
                            placeholder="이름"
                            value={displayName}
                            onChange={(e) => setDisplayName(e.target.value)}
                            required
                            style={inputStyle}
                        />
                    )}
                    <input
                        type="email"
                        placeholder="이메일"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        style={inputStyle}
                    />
                    <input
                        type="password"
                        placeholder="비밀번호"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                        style={inputStyle}
                    />

                    {error && <p style={{ color: '#ef4444', fontSize: '0.85rem' }}>{error}</p>}

                    <button type="submit" className="btn-primary" style={{ marginTop: '10px', padding: '12px' }}>
                        {isSignUp ? '회원가입' : '로그인'}
                    </button>
                </form>

                <div style={{ marginTop: '20px', display: 'flex', flexDirection: 'column', gap: '10px' }}>
                    <button
                        onClick={() => setIsSignUp(!isSignUp)}
                        style={{ background: 'none', border: 'none', color: 'var(--primary)', cursor: 'pointer', fontSize: '0.9rem' }}
                    >
                        {isSignUp ? '이미 계정이 있으신가요? 로그인' : '처음이신가요? 회원가입'}
                    </button>

                    <div style={{ display: 'flex', alignItems: 'center', margin: '10px 0' }}>
                        <div style={{ flex: 1, height: '1px', background: 'var(--glass-border)' }}></div>
                        <span style={{ margin: '0 10px', color: 'var(--text-muted)', fontSize: '0.8rem' }}>OR</span>
                        <div style={{ flex: 1, height: '1px', background: 'var(--glass-border)' }}></div>
                    </div>

                    <button
                        onClick={loginAnonymously}
                        style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid var(--glass-border)', color: 'white', padding: '12px', borderRadius: '0.75rem', cursor: 'pointer' }}
                    >
                        익명으로 둘러보기
                    </button>
                </div>
            </motion.div>
        </div>
    );
};

const inputStyle = {
    width: '100%',
    padding: '12px',
    borderRadius: '8px',
    border: '1px solid var(--glass-border)',
    background: 'rgba(255,255,255,0.05)',
    color: 'white',
    outline: 'none'
};

export default Login;
