import React, { useState, useEffect } from 'react';
import { db, storage } from '../firebase/config';
import { collection, addDoc, query, orderBy, onSnapshot, serverTimestamp } from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { useAuth } from '../firebase/auth';
import { motion } from 'framer-motion';
import { Upload, ImageIcon } from 'lucide-react';

const GalleryPage = () => {
    const [images, setImages] = useState([]);
    const [uploading, setUploading] = useState(false);
    const { user } = useAuth();

    useEffect(() => {
        const q = query(collection(db, 'gallery'), orderBy('createdAt', 'desc'));
        const unsubscribe = onSnapshot(q, (snapshot) => {
            setImages(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
        });
        return unsubscribe;
    }, []);

    const handleUpload = async (e) => {
        const file = e.target.files[0];
        if (!file) return;

        setUploading(true);
        try {
            const storageRef = ref(storage, `gallery/${Date.now()}_${file.name}`);
            await uploadBytes(storageRef, file);
            const url = await getDownloadURL(storageRef);

            await addDoc(collection(db, 'gallery'), {
                url,
                author: user.displayName,
                createdAt: serverTimestamp()
            });
        } catch (err) {
            console.error(err);
        } finally {
            setUploading(false);
        }
    };

    return (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
                <h1 className="title-gradient">📸 갤러리</h1>
                <label className="btn-primary" style={{ cursor: 'pointer', display: 'flex', alignItems: 'center' }}>
                    <Upload size={20} style={{ marginRight: '8px' }} />
                    {uploading ? '업로드 중...' : '사진 올리기'}
                    <input type="file" hidden onChange={handleUpload} disabled={uploading} accept="image/*" />
                </label>
            </div>

            <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))',
                gap: '20px'
            }}>
                {images.map((img) => (
                    <motion.div
                        key={img.id}
                        whileHover={{ scale: 1.05 }}
                        className="glass-card"
                        style={{ overflow: 'hidden', height: '300px', display: 'flex', flexDirection: 'column' }}
                    >
                        <img
                            src={img.url}
                            alt="gallery"
                            style={{ width: '100%', height: '220px', objectFit: 'cover' }}
                        />
                        <div style={{ padding: '15px', flex: 1 }}>
                            <p style={{ fontWeight: 600, fontSize: '0.9rem' }}>{img.author}</p>
                            <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                                {img.createdAt?.toDate().toLocaleDateString()}
                            </p>
                        </div>
                    </motion.div>
                ))}
            </div>
        </motion.div>
    );
};

export default GalleryPage;
