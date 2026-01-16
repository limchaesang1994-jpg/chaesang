import React, { useState, useEffect } from 'react';
import { db } from '../firebase/config';
import { collection, addDoc, query, orderBy, onSnapshot, serverTimestamp } from 'firebase/firestore';
import { useAuth } from '../firebase/auth';
import { motion } from 'framer-motion';
import { Plus, Bell } from 'lucide-react';

const NoticeBoard = () => {
    const [notices, setNotices] = useState([]);
    const [newNotice, setNewNotice] = useState('');
    const { user } = useAuth();

    useEffect(() => {
        const q = query(collection(db, 'notices'), orderBy('createdAt', 'desc'));
        const unsubscribe = onSnapshot(q, (snapshot) => {
            setNotices(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
        });
        return unsubscribe;
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!newNotice.trim()) return;
        try {
            await addDoc(collection(db, 'notices'), {
                content: newNotice,
                author: user.displayName,
                createdAt: serverTimestamp()
            });
            setNewNotice('');
        } catch (err) {
            console.error(err);
        }
    };

    return (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            <h1 className="title-gradient" style={{ marginBottom: '2rem' }}>📢 알림장</h1>

            <div className="glass-card" style={{ padding: '24px', marginBottom: '30px' }}>
                <form onSubmit={handleSubmit} style={{ display: 'flex', gap: '12px' }}>
                    <input
                        type="text"
                        placeholder="새로운 알림을 입력하세요..."
                        value={newNotice}
                        onChange={(e) => setNewNotice(e.target.value)}
                        style={{
                            flex: 1,
                            background: 'rgba(255,255,255,0.05)',
                            border: '1px solid var(--glass-border)',
                            borderRadius: '12px',
                            padding: '12px 16px',
                            color: 'white',
                            outline: 'none'
                        }}
                    />
                    <button type="submit" className="btn-primary" style={{ display: 'flex', alignItems: 'center' }}>
                        <Plus size={20} style={{ marginRight: '8px' }} /> 작성하기
                    </button>
                </form>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                {notices.map((notice) => (
                    <div key={notice.id} className="glass-card" style={{ padding: '20px' }}>
                        <div style={{ display: 'flex', alignItems: 'center', marginBottom: '12px' }}>
                            <Bell size={16} style={{ color: 'var(--primary)', marginRight: '8px' }} />
                            <span style={{ fontWeight: 600 }}>{notice.author}</span>
                            <span style={{ marginLeft: 'auto', fontSize: '0.8rem', color: 'var(--text-muted)' }}>
                                {notice.createdAt?.toDate().toLocaleDateString()}
                            </span>
                        </div>
                        <p>{notice.content}</p>
                    </div>
                ))}
            </div>
        </motion.div>
    );
};

export default NoticeBoard;
