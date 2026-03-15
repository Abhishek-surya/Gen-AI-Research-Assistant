import { useState, useEffect, useRef } from 'react';
import { Send, Moon, Sun } from 'lucide-react';
import WelcomeScreen from './WelcomeScreen';
import api from '../services/api';

export default function ChatArea({ messages, setMessages, isDarkMode, onToggleDarkMode, currentChatId, setCurrentChatId }) {
    const [input, setInput] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const messagesEndRef = useRef(null);

    // Fetch messages when currentChatId changes
    useEffect(() => {
        const fetchMessages = async () => {
            if (!currentChatId) {
                setMessages([]);
                return;
            }
            try {
                const response = await api.get(`/history/${currentChatId}`);
                setMessages(response.data.messages || []);
            } catch (error) {
                console.error("Failed to fetch messages for chat", error);
            }
        };
        fetchMessages();
    }, [currentChatId, setMessages]);

    // Auto-scroll
    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [messages]);

    const handleSend = async (e) => {
        e.preventDefault();
        if (!input.trim() || isLoading) return;

        const userMessage = input;
        setInput('');
        setMessages(prev => [...prev, { role: 'user', content: userMessage }]);
        setIsLoading(true);

        try {
            const response = await api.post('/chat', {
                query: userMessage,
                chat_id: currentChatId
            });

            // Set new chat ID if we just created one
            if (!currentChatId && response.data.chat_id) {
                setCurrentChatId(response.data.chat_id);
            }

            setMessages(prev => [...prev, { role: 'assistant', content: response.data.response }]);

        } catch (error) {
            console.error("Failed to send message", error);
            setMessages(prev => [...prev, { role: 'assistant', content: 'An error occurred while reaching the server.' }]);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="flex-1 flex flex-col h-screen bg-[#fafafa] dark:bg-slate-900 relative">
            {/* Header */}
            <header className="h-[60px] flex items-center justify-between px-6 border-b border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 flex-shrink-0">
                <h1 className="font-bold text-slate-800 dark:text-white text-[15px]">Research Assistant</h1>
                <button
                    onClick={onToggleDarkMode}
                    className="p-2 rounded-full text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                >
                    {isDarkMode ? <Sun size={18} /> : <Moon size={18} />}
                </button>
            </header>

            {/* Main Content Area */}
            <main className="flex-1 overflow-y-auto pb-40">
                {messages.length === 0 ? (
                    <WelcomeScreen />
                ) : (
                    <div className="max-w-4xl mx-auto py-8 px-4 space-y-6">
                        {messages.map((msg, idx) => (
                            <div key={idx} className={`flex gap-4 ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                                <div className={`max-w-[80%] rounded-2xl p-4 ${msg.role === 'user'
                                    ? 'bg-[#7c3aed] text-white rounded-br-sm'
                                    : 'bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-200 border border-slate-200 dark:border-slate-700 rounded-bl-sm shadow-sm'
                                    }`}>
                                    <p className="leading-relaxed text-[15px] whitespace-pre-wrap">{msg.content}</p>
                                </div>
                            </div>
                        ))}
                        <div ref={messagesEndRef} />
                    </div>
                )}
            </main>

            {/* Input Area */}
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-[#fafafa] dark:from-slate-900 via-[#fafafa]/90 dark:via-slate-900/90 to-transparent pt-10 pb-8 px-4">
                <div className="max-w-[800px] mx-auto flex flex-col items-center">
                    <form
                        onSubmit={handleSend}
                        className="relative w-full max-w-[700px] flex items-center bg-white dark:bg-slate-800/60 rounded-[32px] shadow-[0_2px_12px_rgba(0,0,0,0.04)] border border-slate-200 dark:border-[#37384b] overflow-hidden focus-within:border-[#7c3aed] focus-within:bg-white dark:focus-within:bg-[#1a1b26]"
                    >
                        <textarea
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            placeholder="Ask a research question..."
                            className="w-full max-h-48 min-h-[52px] py-[15px] pl-[24px] pr-[56px] bg-transparent resize-none outline-none text-slate-900 dark:text-white placeholder-slate-400 font-medium text-[15px]"
                            rows={1}
                            onKeyDown={(e) => {
                                if (e.key === 'Enter' && !e.shiftKey) {
                                    e.preventDefault();
                                    handleSend(e);
                                }
                            }}
                        />
                        <button
                            type="submit"
                            disabled={!input.trim()}
                            className="absolute right-[6px] bottom-[6px] p-[10px] rounded-full bg-[#a78bfa] dark:bg-[#7c3aed] text-white hover:bg-[#8b5cf6] dark:hover:bg-[#6d28d9] disabled:opacity-50 disabled:hover:bg-[#a78bfa] transition-colors"
                        >
                            <Send size={16} strokeWidth={2.5} className="-ml-0.5 mt-0.5" />
                        </button>
                    </form>
                    <p className="text-center text-[13px] text-slate-400 mt-3 font-medium tracking-tight">
                        Press Enter to send. Shift+Enter for new line
                    </p>
                </div>
            </div>
        </div>
    );
}
