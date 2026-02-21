import { useState } from 'react';
import { Plus, MessageSquare, Upload, User, BrainCircuit } from 'lucide-react';
import FileUploadModal from './FileUploadModal';

export default function Sidebar({ isOpen, onNewChat }) {
    const [history] = useState([
        { id: 1, title: 'Quantum Computing Basics' },
        { id: 2, title: 'Neural Network Architectures' },
        { id: 3, title: 'Climate Change Research' },
    ]);
    const [isUploadOpen, setIsUploadOpen] = useState(false);

    return (
        <div className={`fixed inset-y-0 left-0 z-50 w-64 bg-slate-50 dark:bg-[#111218] border-r border-slate-200 dark:border-[#1e1f2b] transform transition-transform transition-colors duration-500 ease-in-out flex flex-col ${isOpen ? 'translate-x-0' : '-translate-x-full'} md:relative md:translate-x-0`}>
            {/* Header */}
            <div className="p-5 pb-2">
                <div className="flex items-center gap-2 mb-12">
                    <div className="w-8 h-8 bg-[#f3e8ff] dark:bg-[#e9d5ff]/10 text-[#7c3aed] rounded-lg flex items-center justify-center shadow-sm">
                        <BrainCircuit size={20} strokeWidth={2} />
                    </div>
                    <h2 className="text-xl font-bold text-slate-800 dark:text-white">Research AI</h2>
                </div>
                <button
                    onClick={onNewChat}
                    className="w-full flex items-center justify-center gap-2 bg-[#7c3aed] bg-opacity-90 hover:bg-opacity-100 text-white py-2.5 px-4 rounded-xl transition-all font-medium mb-6"
                >
                    <Plus size={18} />
                    <span>New Chat</span>
                </button>
            </div>

            {/* History List */}
            <div className="flex-1 overflow-y-auto px-3">
                <h3 className="text-[11px] font-bold text-slate-500 uppercase tracking-widest px-2 mb-3">History</h3>
                <ul className="space-y-0.5">
                    {history.map((item) => (
                        <li key={item.id}>
                            <button className="w-full flex items-center gap-3 px-3 py-2.5 text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-slate-200/50 dark:hover:bg-[#1e1f2b] rounded-lg transition-colors group text-left">
                                <MessageSquare size={16} className="text-slate-400 group-hover:text-slate-600 dark:group-hover:text-slate-300 flex-shrink-0" />
                                <span className="truncate text-[13px] font-medium">{item.title}</span>
                            </button>
                        </li>
                    ))}
                </ul>
            </div>

            {/* Footer Area */}
            <div className="p-4 space-y-1 bg-slate-50 dark:bg-[#111218] transition-colors">
                <button
                    onClick={() => setIsUploadOpen(true)}
                    className="w-full flex items-center gap-3 px-2 py-2.5 text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-slate-200/50 dark:hover:bg-[#1e1f2b] rounded-lg transition-colors"
                >
                    <Upload size={18} />
                    <span className="text-sm font-medium">Upload Document</span>
                </button>

                <div className="flex items-center gap-3 px-2 pt-4 pb-2 mt-2 border-t border-slate-200 dark:border-[#1e1f2b] transition-colors">
                    <div className="w-8 h-8 rounded-full bg-[#7c3aed] flex items-center justify-center text-white flex-shrink-0">
                        <User size={16} />
                    </div>
                    <div className="flex flex-col overflow-hidden">
                        <span className="text-sm font-medium text-slate-800 dark:text-white truncate">Researcher</span>
                        <span className="text-xs text-slate-500 truncate">researcher@uni.edu</span>
                    </div>
                </div>
            </div>

            <FileUploadModal
                isOpen={isUploadOpen}
                onClose={() => setIsUploadOpen(false)}
            />
        </div>
    );
}
