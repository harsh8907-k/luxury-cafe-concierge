import React, { useState, useEffect, useRef } from 'react';
import { Send, Coffee, ReceiptText } from 'lucide-react';
import ChatMessage from './components/ChatMessage';
import { parseMessage, generateResponse, MAIN_MENU_OPTIONS } from './services/botLogic';

function App() {
  const [messages, setMessages] = useState([
    { text: "Welcome to Ajay Intercontinental. 🍽️\nWe're delighted to serve you today. What would you like to explore?", interactiveType: 'categories', options: MAIN_MENU_OPTIONS, sender: 'bot', time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [cart, setCart] = useState([]);
  const [isTyping, setIsTyping] = useState(false);
  
  const messagesEndRef = useRef(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping, cart]);

  const updateCart = (item, quantityDelta) => {
    setCart(prev => {
      const newCart = [...prev];
      const existingIdx = newCart.findIndex(i => i.id === item.id);
      let isFirstTimeAdd = false;

      if (existingIdx >= 0) {
        newCart[existingIdx].quantity += quantityDelta;
        if (newCart[existingIdx].quantity <= 0) newCart.splice(existingIdx, 1);
      } else if (quantityDelta > 0) {
        newCart.push({ ...item, quantity: quantityDelta });
        isFirstTimeAdd = true;
      }

      if (isFirstTimeAdd) {
         const newTotal = newCart.reduce((a, b) => a + (b.price * b.quantity), 0);
         setMessages(msgs => {
            if (msgs.length === 0) return msgs;
            const newMsgs = [...msgs];
            const lastMsg = newMsgs[newMsgs.length - 1];
            newMsgs[newMsgs.length - 1] = {
               ...lastMsg,
               confirmation: `Added ${item.name}`,
               totalSnapshot: newTotal,
               options: [`Add more ${item.category}`, '🔄 Switch Category', '🛒 Checkout']
            };
            return newMsgs;
         });
      }

      return newCart;
    });
  };

  const handleSendMessage = (text) => {
    if (!text.trim()) return;

    const userMsg = { text, sender: 'user', time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) };

    if (text === 'Confirm Order') {
       setMessages(prev => [...prev, userMsg, { text: "Order Confirmed! Your items will be prepared and ready soon. 🤎", sender: 'bot', time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) }]);
       setCart([]);
       return;
    }

    setMessages(prev => [...prev, userMsg]);
    setInputValue('');
    setIsTyping(true);

    setTimeout(() => {
      let intentData = parseMessage(text);
      const response = generateResponse(intentData, cart);
      
      setIsTyping(false);
      const botTime = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
      setMessages(prev => [...prev, { ...response, sender: 'bot', time: botTime }]);

    }, 800);
  };

  const currentTotal = cart.reduce((a, b) => a + (b.price * b.quantity), 0);
  const totalItems = cart.reduce((a, b) => a + b.quantity, 0);

  return (
    <div className="flex justify-center h-[100dvh] w-screen bg-transparent relative selection:bg-primary/20">
      
      <div className="w-full max-w-[800px] h-full flex flex-col relative bg-transparent shadow-[0_0_120px_rgba(212,175,55,0.1)] border-x border-primary/20">
        
        {/* Sticky Header with integrated Cart peek */}
        <header className="pt-8 pb-4 px-6 sm:px-8 bg-transparent z-30 sticky top-0 flex items-center justify-between border-b border-[#E5E0D8] bg-[#F8F5F0]/90 backdrop-blur-sm">
           <div className="flex items-center gap-3">
             <div className="w-12 h-12 bg-[#FFFFFF] rounded-full flex items-center justify-center text-[#C9A962] shadow-sm border border-[#E5E0D8]">
               <span className="font-serif text-2xl leading-none">A</span>
             </div>
             <div>
                <h1 className="text-xl font-serif font-bold text-[#2B2B2B] tracking-tight">Ajay Intercontinental</h1>
                <p className="text-[10px] font-bold text-[#C9A962] tracking-[0.2em] mt-0.5">PREMIUM DINING</p>
             </div>
           </div>
           
           {totalItems > 0 && (
              <button onClick={() => handleSendMessage("Checkout")} className="bg-[#FFFFFF] rounded-full py-2 px-4 shadow-sm border border-[#E5E0D8] flex items-center gap-2 hover:border-[#C9A962] transition-colors animate-fade-in group">
                 <ReceiptText size={18} className="text-[#C9A962]" />
                 <span className="font-bold text-[15px] text-[#2B2B2B]">₹{currentTotal}</span>
                 <span className="text-[12px] font-semibold text-[#6B6B6B] opacity-0 group-hover:opacity-100 transition-opacity w-0 group-hover:w-[50px] overflow-hidden whitespace-nowrap">Order</span>
              </button>
           )}
        </header>

        {/* Chat Feed Canvas */}
        <div className="flex-1 overflow-y-auto px-3 sm:px-6 py-4 chat-scroll flex flex-col">
          {messages.map((msg, index) => (
            <ChatMessage 
               key={index} 
               message={msg} 
               onOptionClick={handleSendMessage} 
               cart={cart}
               onUpdateQuantity={updateCart}
            />
          ))}
          {isTyping && <ChatMessage isTyping={true} />}
          <div ref={messagesEndRef} className="pb-4" />
        </div>

        {/* Floating Input Area */}
        <div className="p-3 pb-4 sm:px-6 sm:pb-6 pt-2 bg-gradient-to-t from-[#F8F5F0] via-[#F8F5F0] to-transparent">
           <div className="relative flex items-center bg-[#FFFFFF] rounded-[32px] p-2 shadow-md border border-[#E5E0D8] focus-within:border-[#C9A962] focus-within:shadow-[0_8px_24px_rgba(201,169,98,0.15)] transition-all">
              <input
                 type="text"
                 value={inputValue}
                 onChange={(e) => setInputValue(e.target.value)}
                 onKeyDown={(e) => e.key === 'Enter' && handleSendMessage(inputValue)}
                 placeholder="Search menu or type..."
                 className="flex-1 bg-transparent border-none outline-none px-6 text-[#2B2B2B] font-medium placeholder-[#6B6B6B]/60 text-[16px]"
              />
              <button 
                 onClick={() => handleSendMessage(inputValue)}
                 className="w-12 h-12 rounded-full bg-[#8B2635] text-white flex items-center justify-center hover:bg-[#6E1F2B] transition-all shadow-md flex-shrink-0"
              >
                 <Send size={20} className="-ml-0.5" />
              </button>
           </div>
        </div>
      </div>
    </div>
  );
}

export default App;
