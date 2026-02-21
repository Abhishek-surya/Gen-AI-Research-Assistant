import { BookOpen, Upload, Lightbulb, BrainCircuit } from 'lucide-react';
import FileUploadModal from './FileUploadModal';
import { useState } from 'react';

export default function WelcomeScreen() {
    const [isUploadOpen, setIsUploadOpen] = useState(false);

    return (
        <div className="flex flex-col items-center justify-center h-full w-full px-4">
            <div className="text-[#7c3aed] mb-6">
                <BrainCircuit size={56} strokeWidth={1.5} />
            </div>

            <h1 className="text-3xl font-bold text-[#111827] dark:text-white mb-3 tracking-tight">
                Research Assistant
            </h1>

            <p className="text-slate-500 dark:text-slate-400 mb-8 text-[15px] font-medium text-center max-w-[500px]">
                Ask questions, upload documents, and get AI-generated summaries with structured answers.
            </p>

            <div className="grid grid-cols-1 gap-3 w-full max-w-[600px]">
                <button className="flex items-center text-left gap-4 p-4 rounded-xl border border-slate-200 dark:border-slate-700/50 bg-[#fefefe] dark:bg-slate-800/40 hover:border-[#ddd6fe] dark:hover:border-slate-600 hover:shadow-sm transition-all group">
                    <div className="p-3 rounded-lg bg-[#f8f5ff] dark:bg-[#4c1d95]/20 text-[#7c3aed] transition-colors">
                        <BookOpen size={20} strokeWidth={2} />
                    </div>
                    <div className="flex-col">
                        <h3 className="font-semibold text-slate-800 dark:text-slate-100 mb-0.5 text-[15px]">Ask a research question</h3>
                        <p className="text-[13px] text-slate-500 dark:text-slate-400 font-medium tracking-tight">Get AI-powered summaries and analysis</p>
                    </div>
                </button>

                <button
                    onClick={() => setIsUploadOpen(true)}
                    className="flex items-center text-left gap-4 p-4 rounded-xl border border-slate-200 dark:border-slate-700/50 bg-[#fefefe] dark:bg-slate-800/40 hover:border-[#ddd6fe] dark:hover:border-slate-600 hover:shadow-sm transition-all group"
                >
                    <div className="p-3 rounded-lg bg-[#f8f5ff] dark:bg-[#4c1d95]/20 text-[#7c3aed] transition-colors">
                        <Upload size={20} strokeWidth={2} />
                    </div>
                    <div className="flex-col">
                        <h3 className="font-semibold text-slate-800 dark:text-slate-100 mb-0.5 text-[15px]">Upload a document</h3>
                        <p className="text-[13px] text-slate-500 dark:text-slate-400 font-medium tracking-tight">Analyze PDFs and text files</p>
                    </div>
                </button>

                <button className="flex items-center text-left gap-4 p-4 rounded-xl border border-slate-200 dark:border-slate-700/50 bg-[#fefefe] dark:bg-slate-800/40 hover:border-[#ddd6fe] dark:hover:border-slate-600 hover:shadow-sm transition-all group">
                    <div className="p-3 rounded-lg bg-[#f8f5ff] dark:bg-[#4c1d95]/20 text-[#7c3aed] transition-colors">
                        <Lightbulb size={20} strokeWidth={2} />
                    </div>
                    <div className="flex-col">
                        <h3 className="font-semibold text-slate-800 dark:text-slate-100 mb-0.5 text-[15px]">Explore key insights</h3>
                        <p className="text-[13px] text-slate-500 dark:text-slate-400 font-medium tracking-tight">Get structured outlines and key points</p>
                    </div>
                </button>
            </div>

            <FileUploadModal isOpen={isUploadOpen} onClose={() => setIsUploadOpen(false)} />
        </div>
    );
}
