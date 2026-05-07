import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { 
  Plus, 
  MessageCircle, 
  ThumbsUp, 
  Share2, 
  MoreHorizontal, 
  AlertCircle,
  Search,
  Filter
} from 'lucide-react';
import { db, handleFirestoreError, OperationType } from '../lib/firebase';
import { collection, query, orderBy, onSnapshot, addDoc, serverTimestamp, increment, updateDoc, doc } from 'firebase/firestore';
import { useUser } from '../contexts/UserContext';
import { motion, AnimatePresence } from 'motion/react';

export default function Forum() {
  const { t } = useTranslation();
  const { user } = useUser();
  const [posts, setPosts] = useState<any[]>([]);
  const [isNewPostModalOpen, setIsNewPostModalOpen] = useState(false);
  const [newPost, setNewPost] = useState({ title: '', content: '', category: 'General' });
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    const q = query(collection(db, 'posts'), orderBy('createdAt', 'desc'));
    const unsub = onSnapshot(q, (snap) => {
      setPosts(snap.docs.map(d => ({ id: d.id, ...d.data() })));
      setIsLoading(false);
    }, (error) => {
      handleFirestoreError(error, OperationType.LIST, 'posts');
    });
    return unsub;
  }, []);

  const handleCreatePost = async () => {
    if (!user) return;
    if (!newPost.title.trim() || !newPost.content.trim()) {
      alert("Please provide both a title and content for your post.");
      return;
    }

    setIsSubmitting(true);
    try {
      await addDoc(collection(db, 'posts'), {
        title: newPost.title.trim(),
        content: newPost.content.trim(),
        category: newPost.category,
        authorId: user.uid,
        authorName: user.displayName || 'Anonymous Investor',
        likesCount: 0,
        createdAt: serverTimestamp(),
      });
      setIsNewPostModalOpen(false);
      setNewPost({ title: '', content: '', category: 'General' });
    } catch (err) {
      console.error("Error creating post:", err);
      handleFirestoreError(err, OperationType.CREATE, 'posts');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleLike = async (postId: string) => {
    if (!user) return;
    try {
      const postRef = doc(db, 'posts', postId);
      await updateDoc(postRef, {
        likesCount: increment(1)
      });
    } catch (err) {
      handleFirestoreError(err, OperationType.UPDATE, `posts/${postId}`);
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-12">
      {/* Header */}
      <div className="flex justify-between items-center bg-white p-8 rounded-[3rem] border border-[#1a1a1a]/5">
         <div className="space-y-1">
            <h1 className="text-4xl font-serif font-bold">{t('forum.title')}</h1>
            <p className="text-gray-400 font-medium">{t('forum.subtitle')}</p>
         </div>
         <button 
           onClick={() => setIsNewPostModalOpen(true)}
           className="w-14 h-14 bg-[#1a1a1a] text-white rounded-2xl flex items-center justify-center hover:bg-orange-600 transition-colors shadow-lg shadow-orange-600/10"
         >
           <Plus className="w-6 h-6" />
         </button>
      </div>

      {/* Filters */}
      <div className="flex gap-4 overflow-x-auto pb-4 scrollbar-hide">
         {['All Topics', t('forum.categories.stocks'), t('forum.categories.crypto'), 'Real Estate', 'Success Stories', 'Questions'].map((c, i) => (
           <button 
            key={i} 
            className={`px-6 py-2.5 rounded-full text-xs font-bold whitespace-nowrap transition-all border ${i === 0 ? 'bg-orange-600 text-white border-transparent' : 'bg-white border-[#1a1a1a]/5 hover:border-orange-200'}`}
           >
             {c}
           </button>
         ))}
      </div>

      {/* Feed */}
      <div className="space-y-6">
        {isLoading ? (
          <div className="text-center py-20 opacity-20"><RefreshCcw className="w-12 h-12 animate-spin mx-auto" /></div>
        ) : posts.map((post) => (
          <motion.div 
            layout
            key={post.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white p-8 rounded-[2.5rem] border border-[#1a1a1a]/5 hover:shadow-xl hover:shadow-[#1a1a1a]/5 transition-all space-y-6"
          >
             <div className="flex justify-between items-start">
                <div className="flex items-center gap-4">
                   <div className="w-12 h-12 bg-gray-100 rounded-2xl overflow-hidden">
                      <img src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${post.authorId}`} alt="Avatar" referrerPolicy="no-referrer" />
                   </div>
                   <div>
                      <h4 className="font-bold text-[#1a1a1a]">{post.authorName}</h4>
                      <div className="flex items-center gap-2 text-xs text-gray-400 font-medium">
                         <span className="px-2 py-0.5 bg-gray-100 rounded-md text-[10px] font-bold text-gray-500">{post.category}</span>
                         <span className="w-1 h-1 bg-gray-300 rounded-full" />
                         <span>{post.createdAt?.toDate ? new Date(post.createdAt.toDate()).toLocaleDateString() : 'Just now'}</span>
                      </div>
                   </div>
                </div>
                <button className="p-2 hover:bg-gray-50 rounded-full text-gray-400">
                   <MoreHorizontal className="w-5 h-5" />
                </button>
             </div>

             <div className="space-y-3">
                <h3 className="text-2xl font-serif font-bold text-[#1a1a1a] leading-tight cursor-pointer hover:text-orange-600 transition-colors">
                  {post.title}
                </h3>
                <p className="text-gray-500 leading-relaxed line-clamp-3">
                  {post.content}
                </p>
             </div>

             <div className="flex items-center justify-between pt-4 border-t border-gray-50">
                <div className="flex items-center gap-6">
                   <button 
                     onClick={() => handleLike(post.id)}
                     className="flex items-center gap-2 text-sm font-bold text-gray-400 hover:text-orange-600 group"
                   >
                     <div className="p-2 rounded-full group-hover:bg-orange-50 transition-colors">
                        <ThumbsUp className="w-4 h-4" />
                     </div>
                     {post.likesCount || 0}
                   </button>
                   <button className="flex items-center gap-2 text-sm font-bold text-gray-400 hover:text-blue-600 group">
                     <div className="p-2 rounded-full group-hover:bg-blue-50 transition-colors">
                        <MessageCircle className="w-4 h-4" />
                     </div>
                     {t('forum.reply')}
                   </button>
                </div>
                <button className="flex items-center gap-2 text-sm font-bold text-gray-400 hover:text-gray-900 transition-colors">
                   <Share2 className="w-4 h-4" />
                   {t('forum.share')}
                </button>
             </div>
          </motion.div>
        ))}
      </div>

      {/* New Post Modal */}
      <AnimatePresence>
        {isNewPostModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
             <motion.div 
               initial={{ opacity: 0 }} 
               animate={{ opacity: 1 }} 
               exit={{ opacity: 0 }}
               onClick={() => setIsNewPostModalOpen(false)}
               className="absolute inset-0 bg-[#000]/60 backdrop-blur-sm" 
             />
             <motion.div 
               initial={{ opacity: 0, scale: 0.9, y: 20 }}
               animate={{ opacity: 1, scale: 1, y: 0 }}
               exit={{ opacity: 0, scale: 0.9, y: 20 }}
               className="relative bg-white w-full max-w-xl rounded-[3rem] p-10 shadow-2xl space-y-8"
             >
                <div className="space-y-2">
                   <h2 className="text-3xl font-serif font-bold">{t('forum.new_post')}</h2>
                   <p className="text-gray-400 text-sm">{t('forum.post_desc')}</p>
                </div>

                <div className="space-y-4">
                   <input 
                    type="text" 
                    placeholder={t('forum.subject')} 
                    className="w-full px-8 py-5 bg-gray-50 rounded-2xl font-bold focus:outline-none focus:ring-2 focus:ring-orange-500/20"
                    onChange={(e) => setNewPost({...newPost, title: e.target.value})}
                   />
                   <select 
                    className="w-full px-8 py-5 bg-gray-50 rounded-2xl font-bold focus:outline-none appearance-none"
                    onChange={(e) => setNewPost({...newPost, category: e.target.value})}
                   >
                      <option value="General">{t('forum.categories.general')}</option>
                      <option value="Stocks">{t('forum.categories.stocks')}</option>
                      <option value="Crypto">{t('forum.categories.crypto')}</option>
                      <option value="Strategy">{t('forum.categories.strategy')}</option>
                   </select>
                   <textarea 
                    placeholder={t('forum.content_placeholder')} 
                    rows={6}
                    className="w-full px-8 py-5 bg-gray-50 rounded-2xl font-medium focus:outline-none focus:ring-2 focus:ring-orange-500/20 resize-none"
                    onChange={(e) => setNewPost({...newPost, content: e.target.value})}
                   />
                </div>

                <div className="flex gap-4">
                   <button 
                     onClick={() => setIsNewPostModalOpen(false)}
                     className="flex-1 py-5 rounded-2xl font-bold text-gray-400 hover:bg-gray-50 transition-colors"
                   >
                     {t('forum.discard')}
                   </button>
                   <button 
                     onClick={handleCreatePost}
                     disabled={isSubmitting}
                     className="flex-1 py-5 bg-[#1a1a1a] text-white rounded-2xl font-bold hover:bg-orange-600 transition-colors shadow-xl shadow-orange-600/20 disabled:opacity-50 disabled:cursor-not-allowed"
                   >
                     {isSubmitting ? (
                       <RefreshCcw className="w-5 h-5 animate-spin mx-auto" />
                     ) : (
                       t('forum.publish')
                     )}
                   </button>
                </div>
             </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}

function RefreshCcw(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M21 12a9 9 0 0 0-9-9 9.75 9.75 0 0 0-6.74 2.74L3 8" />
      <path d="M3 3v5h5" />
      <path d="M3 12a9 9 0 0 0 9 9 9.75 9.75 0 0 0 6.74-2.74L21 16" />
      <path d="M16 16h5v5" />
    </svg>
  );
}
