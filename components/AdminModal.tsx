
import React, { useState } from 'react';
import { X, Plus, ImageIcon, FileText } from 'lucide-react';
import { Project } from '../types';

interface AdminModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAdd: (project: Project) => void;
}

const AdminModal: React.FC<AdminModalProps> = ({ isOpen, onClose, onAdd }) => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    longDescription: '',
    tags: '',
    liveLink: '',
    githubLink: '',
    imageUrls: '',
  });

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newProject: Project = {
      id: Date.now().toString(),
      title: formData.title,
      description: formData.description,
      longDescription: formData.longDescription,
      images: formData.imageUrls.split(',').map(url => url.trim()).filter(url => url !== ''),
      tags: formData.tags.split(',').map(t => t.trim()),
      liveLink: formData.liveLink || undefined,
      githubLink: formData.githubLink || undefined,
      type: 'web'
    };
    onAdd(newProject);
    onClose();
    setFormData({
      title: '',
      description: '',
      longDescription: '',
      tags: '',
      liveLink: '',
      githubLink: '',
      imageUrls: ''
    });
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-6">
      <div
        className="absolute inset-0 bg-black/80 backdrop-blur-md"
        onClick={onClose}
      />

      <div className="relative w-full max-w-2xl bg-zinc-900 border border-white/10 rounded-[2rem] p-5 sm:p-8 md:p-12 shadow-2xl max-h-[90vh] overflow-y-auto custom-scrollbar">
        <div className="flex justify-between items-center mb-10">
          <div>
            <h2 className="text-xl sm:text-3xl font-bold tracking-tight">Expand Portfolio</h2>
            <p className="text-zinc-500 mt-1 text-sm">Add a high-impact project to your showcase.</p>
          </div>
          <button onClick={onClose} className="p-3 hover:bg-white/5 rounded-full text-zinc-500 transition-colors">
            <X size={24} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="md:col-span-2">
              <label className="block text-xs font-black text-zinc-500 uppercase tracking-widest mb-3">Project Identity</label>
              <input
                required
                className="w-full bg-white/5 border border-white/10 rounded-2xl px-4 py-3 sm:px-6 sm:py-4 focus:outline-none focus:border-white/30 transition-all font-medium text-base sm:text-lg"
                value={formData.title}
                onChange={e => setFormData({ ...formData, title: e.target.value })}
                placeholder="Name of the venture"
              />
            </div>

            <div>
              <label className="block text-xs font-black text-zinc-500 uppercase tracking-widest mb-3">Core Tagline</label>
              <input
                required
                className="w-full bg-white/5 border border-white/10 rounded-2xl px-4 py-3 sm:px-6 sm:py-4 focus:outline-none focus:border-white/30 transition-all"
                value={formData.description}
                onChange={e => setFormData({ ...formData, description: e.target.value })}
                placeholder="Brief value proposition"
              />
            </div>

            <div>
              <label className="block text-xs font-black text-zinc-500 uppercase tracking-widest mb-3">Tech Stack (comma separated)</label>
              <input
                className="w-full bg-white/5 border border-white/10 rounded-2xl px-4 py-3 sm:px-6 sm:py-4 focus:outline-none focus:border-white/30 transition-all"
                value={formData.tags}
                onChange={e => setFormData({ ...formData, tags: e.target.value })}
                placeholder="React, Next.js, Python..."
              />
            </div>
          </div>

          <div>
            <label className="flex items-center gap-2 text-xs font-black text-zinc-500 uppercase tracking-widest mb-3">
              <FileText size={14} />
              The Deep Dive (Long Description)
            </label>
            <textarea
              className="w-full bg-white/5 border border-white/10 rounded-2xl px-4 py-3 sm:px-6 sm:py-4 focus:outline-none focus:border-white/30 transition-all h-32 sm:h-40 resize-none text-zinc-300"
              value={formData.longDescription}
              onChange={e => setFormData({ ...formData, longDescription: e.target.value })}
              placeholder="Tell the story of how you built it, the challenges, and the results..."
            />
          </div>

          <div>
            <label className="flex items-center gap-2 text-xs font-black text-zinc-500 uppercase tracking-widest mb-3">
              <ImageIcon size={14} />
              Visual Assets (URLs, comma separated)
            </label>
            <input
              className="w-full bg-white/5 border border-white/10 rounded-2xl px-4 py-3 sm:px-6 sm:py-4 focus:outline-none focus:border-white/30 transition-all"
              value={formData.imageUrls}
              onChange={e => setFormData({ ...formData, imageUrls: e.target.value })}
              placeholder="https://image1.jpg, https://image2.jpg..."
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-xs font-black text-zinc-500 uppercase tracking-widest mb-3">GitHub Repository</label>
              <input
                className="w-full bg-white/5 border border-white/10 rounded-2xl px-4 py-3 sm:px-6 sm:py-4 focus:outline-none focus:border-white/30 transition-all"
                value={formData.githubLink}
                onChange={e => setFormData({ ...formData, githubLink: e.target.value })}
                placeholder="Link to source"
              />
            </div>
            <div>
              <label className="block text-xs font-black text-zinc-500 uppercase tracking-widest mb-3">Production URL</label>
              <input
                className="w-full bg-white/5 border border-white/10 rounded-2xl px-4 py-3 sm:px-6 sm:py-4 focus:outline-none focus:border-white/30 transition-all"
                value={formData.liveLink}
                onChange={e => setFormData({ ...formData, liveLink: e.target.value })}
                placeholder="Link to live site"
              />
            </div>
          </div>

          <button
            type="submit"
            className="w-full py-4 sm:py-6 bg-white text-black rounded-2xl font-black text-base sm:text-lg hover:bg-zinc-200 transition-all flex items-center justify-center gap-3 active:scale-[0.98]"
          >
            <Plus size={24} />
            Publish to Portfolio
          </button>
        </form>
      </div>
    </div>
  );
};

export default AdminModal;
