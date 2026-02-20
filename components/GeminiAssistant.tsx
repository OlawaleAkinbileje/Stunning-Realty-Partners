
// import React, { useState, useRef, useEffect } from 'react';
// import { getAdvisorResponse } from '../services/geminiService';
// import { Message } from '../types';

// const GeminiAssistant: React.FC = () => {
//   const [isOpen, setIsOpen] = useState(false);
//   const [messages, setMessages] = useState<Message[]>([
//     { role: 'model', text: 'Welcome to SRP. I am Stellar, your partner advisor. Are you looking to find a premium property or interested in growing your real estate business with our network?' }
//   ]);
//   const [input, setInput] = useState('');
//   const [isLoading, setIsLoading] = useState(false);
//   const scrollRef = useRef<HTMLDivElement>(null);

//   useEffect(() => {
//     if (scrollRef.current) {
//       scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
//     }
//   }, [messages]);

//   const handleSend = async () => {
//     if (!input.trim() || isLoading) return;

//     const userMsg = input.trim();
//     setInput('');
//     setMessages(prev => [...prev, { role: 'user', text: userMsg }]);
//     setIsLoading(true);

//     const response = await getAdvisorResponse(userMsg, messages);
    
//     setMessages(prev => [...prev, { role: 'model', text: response }]);
//     setIsLoading(false);
//   };

//   return (
//     <div className="fixed bottom-6 right-6 z-[60]">
//       {isOpen ? (
//         <div className="bg-white w-80 sm:w-96 h-[500px] rounded-3xl shadow-2xl border border-slate-200 flex flex-col overflow-hidden animate-in fade-in slide-in-from-bottom-4 duration-300">
//           {/* Header */}
//           <div className="bg-black text-white p-5 flex justify-between items-center">
//             <div className="flex items-center gap-3">
//               <div className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center border border-slate-700">
//                 <i className="fas fa-star text-sm"></i>
//               </div>
//               <div>
//                 <h4 className="font-black text-xs uppercase tracking-widest">Stellar Advisor</h4>
//                 <p className="text-[10px] text-slate-400 font-bold">SRP Network Concierge</p>
//               </div>
//             </div>
//             <button onClick={() => setIsOpen(false)} className="text-slate-400 hover:text-white">
//               <i className="fas fa-times"></i>
//             </button>
//           </div>

//           {/* Chat area */}
//           <div ref={scrollRef} className="flex-1 overflow-y-auto p-5 space-y-4 bg-slate-50">
//             {messages.map((msg, idx) => (
//               <div key={idx} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
//                 <div className={`max-w-[85%] p-4 rounded-2xl text-sm leading-relaxed ${
//                   msg.role === 'user' 
//                     ? 'bg-black text-white rounded-br-none shadow-md' 
//                     : 'bg-white border border-slate-200 text-slate-700 rounded-bl-none shadow-sm'
//                 }`}>
//                   {msg.text}
//                 </div>
//               </div>
//             ))}
//             {isLoading && (
//               <div className="flex justify-start">
//                 <div className="bg-white border border-slate-200 p-4 rounded-2xl rounded-bl-none shadow-sm">
//                   <div className="flex gap-1.5">
//                     <div className="w-2 h-2 bg-slate-400 rounded-full animate-bounce"></div>
//                     <div className="w-2 h-2 bg-slate-400 rounded-full animate-bounce [animation-delay:-0.15s]"></div>
//                     <div className="w-2 h-2 bg-slate-400 rounded-full animate-bounce [animation-delay:-0.3s]"></div>
//                   </div>
//                 </div>
//               </div>
//             )}
//           </div>

//           {/* Input */}
//           <div className="p-5 bg-white border-t border-slate-100">
//             <div className="flex gap-2">
//               <input
//                 type="text"
//                 value={input}
//                 onChange={(e) => setInput(e.target.value)}
//                 onKeyDown={(e) => e.key === 'Enter' && handleSend()}
//                 placeholder="Ask about properties or joining SRP..."
//                 className="flex-1 bg-slate-100 border-none rounded-2xl px-5 py-3 text-sm focus:ring-1 focus:ring-black outline-none"
//               />
//               <button 
//                 onClick={handleSend}
//                 disabled={isLoading}
//                 className="w-12 h-12 bg-black text-white rounded-2xl flex items-center justify-center hover:bg-slate-800 transition-colors disabled:opacity-50 shadow-md"
//               >
//                 <i className="fas fa-paper-plane text-xs"></i>
//               </button>
//             </div>
//             <p className="text-[9px] font-bold uppercase tracking-widest text-center text-slate-400 mt-4">Stunning Realty Partners AI</p>
//           </div>
//         </div>
//       ) : (
//         <button 
//           onClick={() => setIsOpen(true)}
//           className="w-16 h-16 bg-black text-white rounded-2xl shadow-xl flex items-center justify-center hover:scale-105 transition-all transform group"
//         >
//           <i className="fas fa-star text-xl group-hover:rotate-45 transition-transform duration-500"></i>
//           <span className="absolute -top-1 -right-1 flex h-4 w-4">
//             <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-slate-400 opacity-75"></span>
//             <span className="relative inline-flex rounded-full h-4 w-4 bg-white border-2 border-black"></span>
//           </span>
//         </button>
//       )}
//     </div>
//   );
// };

// export default GeminiAssistant;
