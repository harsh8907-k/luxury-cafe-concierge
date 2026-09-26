import React, { useState, useRef, useEffect } from 'react';
import { MessageCircle, X, Send, Sparkles } from 'lucide-react';
import ChatMessage from './ChatMessage';
import { parseMessage, generateResponse, MENU_ITEMS } from '../services/botLogic';

const FloatingAssistant = ({ cart, onAddIntent, onRemoveIntent, onClearIntent, onCheckoutIntent }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { text: "Hi! How can I assist you today? Need recommendations?", sender: 'bot', time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);

  useEffect(() => {
    if (isOpen) messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping, isOpen]);

  const handleSendMessage = (text, directIntent = null) => {
    if (!text.trim() && !directIntent) return;

    if (text) {
      setMessages(prev => [...prev, { text, sender: 'user', time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) }]);
    }
    setInputValue('');
    setIsTyping(true);

    setTimeout(() => {
      let intentData = directIntent || parseMessage(text);
      if (intentData.intent === 'ADD_ITEM') {
        const item = MENU_ITEMS.find(i => i.id === intentData.item);
        if (item) onAddIntent(item, intentData.quantity);
      } else if (intentData.intent === 'REMOVE_ITEM') {
        const item = MENU_ITEMS.find(i => i.id === intentData.item);
        if (item) onRemoveIntent(item, intentData.quantity);
      } else if (intentData.intent === 'CLEAR_CART') onClearIntent();
      else if (intentData.intent === 'CHECKOUT') onCheckoutIntent();

      const responseText = generateResponse(intentData, cart);
      setIsTyping(false);
      setMessages(prev => [...prev, { text: responseText, sender: 'bot', time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) }]);
    }, 800);
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end">
      {isOpen && (
        <div className="mb-4 w-[340px] sm:w-[380px] h-[500px] bg-background border border-accent/40 rounded-[32px] overflow-hidden flex flex-col shadow-medium animate-fade-in origin-bottom-right transition-all backdrop-blur-md">
          <div className="bg-surface p-4 border-b border-accent/30 flex justify-between items-center shadow-sm z-10">
            <div className="flex items-center gap-2">
              <Sparkles className="text-primary w-5 h-5 flex-shrink-0" />
              <h3 className="font-bold text-textDark">AI Barista</h3>
            </div>
            <button onClick={() => setIsOpen(false)} className="text-textMuted hover:text-textDark transition bg-accent/30 rounded-full w-8 h-8 flex items-center justify-center">
              <X size={18} />
            </button>
          </div>
          
          <div className="flex-1 overflow-y-auto p-4 hide-scrollbar flex flex-col gap-2 bg-background/50">
             {messages.map((msg, i) => <ChatMessage key={i} message={msg} />)}
             {isTyping && <ChatMessage isTyping={true} />}
             <div ref={messagesEndRef} />
          </div>

          <div className="p-3 border-t border-accent/30 bg-surface">
            <div className="flex gap-2 overflow-x-auto hide-scrollbar mb-3 pb-1">
              {['Recommend dessert', 'Add Coffee'].map(action => (
                <button key={action} onClick={() => handleSendMessage(action)} className="px-3 py-1.5 whitespace-nowrap rounded-full bg-background border border-accent/50 shadow-sm text-xs font-semibold text-textMuted hover:text-primary hover:border-primary transition">
                  {action}
                </button>
              ))}
            </div>
            <div className="flex bg-background rounded-full p-1.5 border border-accent/40 focus-within:border-primary transition">
              <input 
                type="text" 
                value={inputValue} 
                onChange={e => setInputValue(e.target.value)}
                onKeyDown={e => e.key === 'Enter' && handleSendMessage(inputValue)}
                className="flex-1 bg-transparent border-none outline-none text-sm px-3 text-textDark placeholder-textMuted"
                placeholder="Ask for help..."
              />
              <button onClick={() => handleSendMessage(inputValue)} className="p-2 w-8 h-8 flex items-center justify-center bg-primary text-white rounded-full hover:bg-primaryHover transition shadow-sm">
                <Send size={14} className="-ml-0.5" />
              </button>
            </div>
          </div>
        </div>
      )}

      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-14 h-14 bg-surface border border-accent/50 text-textDark rounded-full flex items-center justify-center hover:scale-105 hover:bg-white transition-all shadow-medium relative group"
      >
        <div className="absolute inset-0 rounded-full border-2 border-primary border-t-transparent animate-spin opacity-0 group-hover:opacity-100 transition-opacity" style={{ animationDuration: '3s' }}></div>
        {isOpen ? <X size={24} /> : <MessageCircle size={24} className="text-primary" />}
      </button>
    </div>
  );
};
export default FloatingAssistant;
