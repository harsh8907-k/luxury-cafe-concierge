import React, { useState } from 'react';
import { Plus, Minus, Check } from 'lucide-react';

const ChatMessage = ({ message, isTyping, onOptionClick, cart, onUpdateQuantity }) => {
  const [selectedVariants, setSelectedVariants] = useState({});

  const getQuantity = (id) => cart?.find(i => i.id === id)?.quantity || 0;
  
  if (message?.sender === 'user') {
    return (
      <div className="flex w-full justify-end mb-6 animate-fade-up px-4">
        <div className="max-w-[75%] bg-[#FFFFFF] text-[#2B2B2B] rounded-[20px] rounded-tr-sm px-5 py-3 shadow-md font-sans border border-[#E5E0D8]">
          {message.text}
        </div>
      </div>
    );
  }

  return (
    <div className="flex w-full justify-start mb-6 animate-fade-up px-4">
      <div className="w-full max-w-[420px] bg-[#FFFFFF] border border-[#C9A962]/40 rounded-[20px] rounded-tl-sm shadow-[0_8px_24px_rgba(0,0,0,0.08)] relative overflow-hidden flex flex-col" style={{ maxHeight: '65vh' }}>
        
        {/* Subtle decorative header line */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-1/3 h-[2px] bg-[#C9A962] rounded-b-full opacity-60 z-20 shadow-[0_0_8px_rgba(201,169,98,0.4)]"></div>

        {isTyping ? (
          <div className="flex justify-center space-x-2 h-8 items-center p-8">
            <div className="w-2.5 h-2.5 bg-[#C9A962]/60 rounded-full animate-bounce-soft" style={{ animationDelay: '-0.32s' }} />
            <div className="w-2.5 h-2.5 bg-[#C9A962]/60 rounded-full animate-bounce-soft" style={{ animationDelay: '-0.16s' }} />
            <div className="w-2.5 h-2.5 bg-[#C9A962]/60 rounded-full animate-bounce-soft" />
          </div>
        ) : (
          <div className="flex flex-col h-full overflow-hidden">
            {/* Header (Text) */}
            {message.text && (
              <div className="shrink-0 px-5 pt-6 pb-3 bg-[#FFFFFF] z-10 relative">
                <div className="text-center font-serif text-[20px] text-[#2B2B2B] leading-snug font-bold">
                  {message.text.split('\n').map((line, idx) => (
                    <React.Fragment key={idx}>
                      {line}
                      {idx !== message.text.split('\n').length - 1 && <br />}
                    </React.Fragment>
                  ))}
                </div>
              </div>
            )}

            {/* Scrollable Body */}
            <div className={`flex-1 overflow-y-auto chat-scroll px-5 pb-2 ${message.text ? 'pt-1' : 'pt-5'}`}>
              {/* Interactive: Menu List */}
              {message.interactiveType === 'menu_list' && message.menuItems && (
                 <div className="flex flex-col gap-5">
                    {message.menuItems.map(baseItem => {
                       const isVariantItem = baseItem.hasVariants;
                       const activeVariantId = selectedVariants[baseItem.id] || (isVariantItem ? baseItem.variants[0].id : null);
                       const activeItem = isVariantItem ? baseItem.variants.find(v => v.id === activeVariantId) : baseItem;
                       const q = getQuantity(activeItem.id);

                       return (
                       <div key={baseItem.id} className="flex flex-col border-b border-[#E5E0D8] pb-4 last:border-0 last:pb-0">
                          <div className="flex items-center justify-between gap-4">
                             <div className="flex-1">
                                <div className="font-serif font-bold text-[18px] text-[#2B2B2B] tracking-wide">{baseItem.name}</div>
                                <div className="text-[16px] font-bold text-[#C9A962] mt-0.5 font-sans">₹{activeItem.price}</div>
                             </div>
                             
                             <div className="flex items-center gap-4 bg-[#FFFFFF] rounded-full p-1.5 border border-[#E5E0D8] shadow-sm shrink-0">
                                <button onClick={() => onUpdateQuantity(activeItem, -1)} className="w-10 h-10 rounded-full bg-[#F0F0F0] flex items-center justify-center text-[#2B2B2B] transition-all duration-300 disabled:opacity-40 hover:bg-[#E0E0E0]" disabled={q===0}>
                                   <Minus size={18}/>
                                </button>
                                <span className="font-bold text-[16px] w-4 text-center text-[#2B2B2B]">{q}</span>
                                <button onClick={() => onUpdateQuantity(activeItem, 1)} className="w-10 h-10 rounded-full bg-[#8B2635] text-white flex items-center justify-center shadow-sm hover:brightness-110 transition-all duration-300">
                                   <Plus size={18}/>
                                </button>
                             </div>
                          </div>

                          {/* Inline Variant Selection */}
                          {isVariantItem && (
                             <div className="mt-3 flex gap-2">
                                {baseItem.variants.map(v => {
                                   const variantLabel = v.name.includes('Oil') ? 'Oil' : 'Butter';
                                   const isSelected = activeVariantId === v.id;
                                   return (
                                      <button 
                                         key={v.id}
                                         onClick={() => setSelectedVariants(prev => ({...prev, [baseItem.id]: v.id}))}
                                         className={`px-4 py-2 rounded-full text-[13px] font-bold border transition-all duration-300 ${isSelected ? 'bg-[#FFFFFF] text-[#C9A962] border-[#C9A962] shadow-sm' : 'bg-transparent text-[#6B6B6B] border-[#E5E0D8] hover:border-[#C9A962] hover:text-[#C9A962]'}`}
                                      >
                                         {variantLabel}
                                      </button>
                                   );
                                })}
                             </div>
                          )}
                       </div>
                       )
                    })}
                 </div>
              )}

              {/* Interactive: Checkout Summary */}
              {message.interactiveType === 'checkout' && message.cartSnapshot && (
                 <div className="mt-2">
                     <div className="space-y-3 mb-5">
                       {message.cartSnapshot.map(item => (
                          <div key={item.id} className="flex justify-between text-[16px] text-[#2B2B2B] border-b border-dashed border-[#E5E0D8] pb-2 font-sans">
                             <span>{item.name} <span className="text-[#6B6B6B] text-sm ml-1">x{item.quantity}</span></span>
                             <span className="font-bold text-[#C9A962]">₹{item.price * item.quantity}</span>
                          </div>
                       ))}
                    </div>
                    <div className="flex justify-between border-t border-[#E5E0D8] pt-3 pb-4">
                       <span className="font-serif font-bold text-lg text-[#2B2B2B]">Total Amount</span>
                       <span className="font-bold text-xl text-[#C9A962] font-sans">₹{message.cartSnapshot.reduce((a,b)=>a+(b.price*b.quantity), 0)}</span>
                    </div>
                    <button onClick={() => onOptionClick("Confirm Order")} className="w-full py-3.5 rounded-xl bg-[#8B2635] text-white font-display uppercase tracking-[0.1em] text-sm font-bold flex items-center justify-center gap-2 hover:bg-[#6E1F2B] transition-all duration-300 shadow-md">
                       <Check size={18} /> Confirm Order
                    </button>
                 </div>
              )}

              {/* In-Card Confirmation Footer */}
              {message.confirmation && (
                 <div className="mt-4 mb-2 bg-[#F8F5F0] border border-[#E5E0D8] rounded-xl p-4 text-center animate-fade-in">
                    <p className="text-[#2B2B2B] font-serif font-bold text-lg">{message.confirmation}</p>
                    <p className="text-[#6B6B6B] font-bold mt-1 font-sans">Cart Total: <span className="text-[#C9A962]">₹{message.totalSnapshot}</span></p>
                 </div>
              )}

              {/* Interactive: Categories List */}
              {message.interactiveType === 'categories' && message.options && (
                 <div className="mt-2 mb-4">
                    <div className="flex flex-col gap-2.5">
                       {message.options.map((opt, i) => (
                          <button
                             key={opt}
                             onClick={() => onOptionClick(opt)}
                             className="w-full py-3 px-5 rounded-full font-display uppercase tracking-[0.08em] text-sm font-bold transition-all duration-300 shadow-sm flex justify-between items-center group bg-[#FFFFFF] border border-[#C9A962] text-[#2B2B2B] hover:bg-[#C9A962] hover:text-[#2B2B2B]"
                          >
                             <span>{opt}</span>
                             <span className="opacity-0 group-hover:opacity-100 transition-opacity">→</span>
                          </button>
                       ))}
                    </div>
                 </div>
              )}
            </div>

            {/* Common Options List (Sticky Actions) */}
            {message.options && message.options.length > 0 && message.interactiveType !== 'categories' && (
               <div className="shrink-0 px-5 py-4 bg-[#FFFFFF] border-t border-[#E5E0D8] z-10 relative shadow-[0_-4px_16px_rgba(0,0,0,0.04)]">
                  <div className="flex flex-col gap-2.5">
                     {message.options.map((opt, i) => {
                        const isPrimary = opt.includes('Checkout') || opt.includes('Confirm');
                        return (
                           <button
                              key={opt}
                              onClick={() => onOptionClick(opt)}
                              className={`w-full py-3 px-5 rounded-full font-display uppercase tracking-[0.08em] text-sm font-bold transition-all duration-300 shadow-sm flex justify-between items-center group ${isPrimary ? 'bg-[#8B2635] text-white hover:bg-[#6E1F2B]' : 'bg-[#FFFFFF] border border-[#C9A962] text-[#2B2B2B] hover:bg-[#C9A962] hover:text-[#2B2B2B]'}`}
                           >
                              <span>{opt}</span>
                              <span className="opacity-0 group-hover:opacity-100 transition-opacity">→</span>
                           </button>
                        )
                     })}
                  </div>
               </div>
            )}
            
            {/* Bottom padding if no options */}
            {!(message.options && message.options.length > 0 && message.interactiveType !== 'categories') && (
               <div className="shrink-0 h-5 bg-[#FFFFFF]"></div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
export default ChatMessage;
