import React, { useState, useEffect, useRef } from 'react';
import { db } from '../firebase/config';
import { collection, addDoc, query, orderBy, limit, onSnapshot, serverTimestamp } from 'firebase/firestore';
import { useAuth } from '../firebase/auth';
import { motion } from 'framer-motion';
import { Send, User } from 'lucide-react';

const ChatRoom = () => {
    const [messages, setMessages] = useState([]);
    const [newMessage, setNewMessage] = useState('');
    const { user } = useAuth();
    const scrollRef = useRef();

    useEffect(() => {
        const q = query(collection(db, 'messages'), orderBy('createdAt', 'asc'), limit(50));
        const unsubscribe = onSnapshot(q, (snapshot) => {
            setMessages(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
            setTimeout(() => scrollRef.current?.scrollIntoView({ behavior: 'smooth' }), 100);
        });
        return unsubscribe;
    }, []);

    const handleSend = async (e) => {
        e.preventDefault();
        if (!newMessage.trim()) return;

        try {
            await addDoc(collection(db, 'messages'), {
                text: newMessage,
                authorId: user.uid,
                authorName: user.displayName || '사용자',
                authorPhoto: user.photoURL || null,
                createdAt: serverTimestamp()
            });
            setNewMessage('');
        } catch (err) {
            console.error(err);
        }
    };

    return (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} style={{ height: 'calc(100vh - 80px)', display: 'flex', flexDirection: 'column' }}>
            <h1 className="title-gradient" style={{ marginBottom: '1.5rem' }}>💬 오픈 채팅방</h1>

            <div className="glass-card" style={{ flex: 1, marginBottom: '20px', padding: '20px', overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '16px' }}>
                {messages.map((msg) => (
                    <div
                        key={msg.id}
                        style={{
                            display: 'flex',
                            flexDirection: user.uid === msg.authorId ? 'row-reverse' : 'row',
                            alignItems: 'flex-end',
                            gap: '8px'
                        }}
                    >
                        <div style={{
                            width: '32px',
                            height: '32px',
                            borderRadius: '50%',
                            background: 'var(--glass)',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            overflow: 'hidden',
                            flexShrink: 0
                        }}>
                            {msg.authorPhoto ? (
                                <img src={msg.authorPhoto} alt="p" style={{ width: '100%', height: '100%' }} />
                            ) : (
                                <User size={18} color="white" />
                            )}
                        </div>
                        <div style={{ maxWidth: '70%' }}>
                            <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginBottom: '4px', textAlign: user.uid === msg.authorId ? 'right' : 'left' }}>
                                {msg.authorName}
                            </p>
                            <div style={{
                                padding: '10px 16px',
                                borderRadius: '16px',
                                background: user.uid === msg.authorId ? 'var(--primary)' : 'rgba(255,255,255,0.1)',
                                color: 'white',
                                fontSize: '0.95rem',
                                wordBreak: 'break-all'
                            }}>
                                {msg.text}
                            </div>
                        </div>
                    </div>
                ))}
                <div ref={scrollRef} />
            </div>

            <form onSubmit={handleSend} style={{ display: 'flex', gap: '12px' }}>
                <input
                    type="text"
                    placeholder="메시지를 입력하세요..."
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    style={{
                        flex: 1,
                        background: 'var(--glass)',
                        border: '1px solid var(--glass-border)',
                        borderRadius: '12px',
                        padding: '15px',
                        color: 'white',
                        outline: 'none'
                    }}
                />
                <button type="submit" className="btn-primary" style={{ padding: '0 25px' }}>
                    <Send size={20} />
                </button>
            </form>
        </motion.div>
    );
};

export default ChatRoom;
