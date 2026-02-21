import { useState, useRef } from 'react';
import { Upload, X, FileText, CheckCircle2 } from 'lucide-react';

export default function FileUploadModal({ isOpen, onClose }) {
    const [isDragging, setIsDragging] = useState(false);
    const [file, setFile] = useState(null);
    const [uploadState, setUploadState] = useState('idle'); // idle | uploading | success
    const fileInputRef = useRef(null);

    if (!isOpen) return null;

    const handleDragOver = (e) => {
        e.preventDefault();
        setIsDragging(true);
    };

    const handleDragLeave = (e) => {
        e.preventDefault();
        setIsDragging(false);
    };

    const handleDrop = (e) => {
        e.preventDefault();
        setIsDragging(false);

        if (e.dataTransfer.files && e.dataTransfer.files[0]) {
            handleFileSelected(e.dataTransfer.files[0]);
        }
    };

    const handleFileSelected = (selectedFile) => {
        // Basic validation for PDFs or text
        if (selectedFile.type !== 'application/pdf' && selectedFile.type !== 'text/plain') {
            alert('Please upload a valid PDF or TXT file.');
            return;
        }
        setFile(selectedFile);
    };

    const simulateUpload = () => {
        setUploadState('uploading');

        // Simulate network request
        setTimeout(() => {
            setUploadState('success');

            // Auto close after success
            setTimeout(() => {
                onClose();
                setUploadState('idle');
                setFile(null);
            }, 1500);
        }, 2000);
    };

    const resetState = () => {
        setFile(null);
        setUploadState('idle');
    };

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/50 backdrop-blur-sm p-4 animate-in fade-in duration-200">
            <div className="bg-white dark:bg-slate-900 rounded-2xl w-full max-w-md shadow-2xl border border-slate-200 dark:border-slate-800 overflow-hidden relative">

                {/* Header */}
                <div className="flex items-center justify-between p-4 border-b border-slate-100 dark:border-slate-800">
                    <h2 className="text-lg font-semibold text-slate-800 dark:text-white">Upload Document</h2>
                    <button
                        onClick={onClose}
                        className="p-1 rounded-lg text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors disabled:opacity-50"
                        disabled={uploadState === 'uploading'}
                    >
                        <X size={20} />
                    </button>
                </div>

                {/* Content */}
                <div className="p-6">
                    {uploadState === 'success' ? (
                        <div className="flex flex-col items-center justify-center py-8 text-emerald-500">
                            <CheckCircle2 size={48} className="mb-4" />
                            <p className="text-lg font-medium text-slate-800 dark:text-white">Upload Complete</p>
                            <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">{file?.name}</p>
                        </div>
                    ) : (
                        <>
                            {/* Dropzone */}
                            <div
                                className={`border-2 border-dashed rounded-xl p-8 flex flex-col items-center justify-center text-center transition-all cursor-pointer
                  ${isDragging
                                        ? 'border-indigo-500 bg-indigo-50 dark:bg-indigo-500/10'
                                        : file
                                            ? 'border-indigo-300 dark:border-indigo-700 bg-indigo-50/50 dark:bg-indigo-900/10'
                                            : 'border-slate-200 dark:border-slate-700 hover:border-indigo-400 dark:hover:border-indigo-500 hover:bg-slate-50 dark:hover:bg-slate-800/50'
                                    }
                `}
                                onDragOver={handleDragOver}
                                onDragLeave={handleDragLeave}
                                onDrop={handleDrop}
                                onClick={() => !file && fileInputRef.current?.click()}
                            >
                                <input
                                    type="file"
                                    ref={fileInputRef}
                                    className="hidden"
                                    accept=".pdf,.txt"
                                    onChange={(e) => e.target.files && handleFileSelected(e.target.files[0])}
                                />

                                {file ? (
                                    <div className="flex flex-col items-center w-full relative">
                                        <button
                                            onClick={(e) => { e.stopPropagation(); resetState(); }}
                                            className="absolute -top-4 -right-4 p-1 bg-white dark:bg-slate-800 rounded-full text-slate-400 hover:text-red-500 shadow-sm border border-slate-200 dark:border-slate-700"
                                            disabled={uploadState === 'uploading'}
                                        >
                                            <X size={16} />
                                        </button>
                                        <FileText size={32} className="text-indigo-500 mb-3" />
                                        <p className="text-sm font-medium text-slate-800 dark:text-white truncate max-w-full px-4 mb-1">
                                            {file.name}
                                        </p>
                                        <p className="text-xs text-slate-500">
                                            {(file.size / 1024 / 1024).toFixed(2)} MB
                                        </p>
                                    </div>
                                ) : (
                                    <>
                                        <div className="w-12 h-12 rounded-full bg-indigo-100 dark:bg-indigo-900/30 flex items-center justify-center text-indigo-600 mb-4">
                                            <Upload size={24} />
                                        </div>
                                        <p className="text-sm font-medium text-slate-800 dark:text-white mb-1">
                                            Click to upload or drag and drop
                                        </p>
                                        <p className="text-xs text-slate-500">
                                            PDF or TXT (Max 10MB)
                                        </p>
                                    </>
                                )}
                            </div>

                            {/* Actions */}
                            <div className="mt-6 flex justify-end gap-3">
                                <button
                                    onClick={onClose}
                                    disabled={uploadState === 'uploading'}
                                    className="px-4 py-2 text-sm font-medium text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition-colors"
                                >
                                    Cancel
                                </button>
                                <button
                                    onClick={simulateUpload}
                                    disabled={!file || uploadState === 'uploading'}
                                    className="flex items-center gap-2 px-6 py-2 bg-indigo-600 hover:bg-indigo-700 disabled:bg-indigo-400 dark:disabled:bg-indigo-800 disabled:cursor-not-allowed text-white text-sm font-medium rounded-lg transition-colors"
                                >
                                    {uploadState === 'uploading' ? (
                                        <>
                                            <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                                            Uploading...
                                        </>
                                    ) : (
                                        'Upload'
                                    )}
                                </button>
                            </div>
                        </>
                    )}
                </div>
            </div>
        </div>
    );
}
