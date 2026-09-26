import React from 'react';
import { Minus, Plus, ShoppingBag, Trash2, ArrowRight } from 'lucide-react';

const CartPanel = ({ cart, onUpdateQuantity, onCheckout, onClear }) => {
  const total = cart.reduce((a, b) => a + (b.price * b.quantity), 0);
  const itemCount = cart.reduce((a, b) => a + b.quantity, 0);

  return (
    <div className="h-full flex flex-col bg-surface shadow-[-4px_0_24px_rgba(74,59,50,0.04)] overflow-hidden w-full relative sm:rounded-l-[40px] border-l border-accent/30">
      <div className="p-6 pb-4 flex justify-between items-center relative z-10">
        <div>
          <h2 className="text-xl font-bold flex items-center gap-2 text-textDark">
            <ShoppingBag className="text-primary" size={24} />
            Your Order
          </h2>
        </div>
        <div className="w-10 h-10 bg-accent rounded-full flex items-center justify-center text-textDark font-bold shadow-sm">
          {itemCount}
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-6 pt-2 space-y-4 hide-scrollbar z-10">
        {cart.length === 0 ? (
          <div className="h-full flex flex-col items-center justify-center text-textMuted space-y-4">
            <div className="w-24 h-24 rounded-full border-2 border-dashed border-accent flex items-center justify-center bg-background/50">
               <ShoppingBag size={32} className="opacity-40" />
            </div>
            <p className="font-medium tracking-wide">Your cart is empty.</p>
          </div>
        ) : (
          cart.map((item, idx) => (
            <div key={idx} className="bg-background p-4 rounded-[24px] flex items-center justify-between shadow-sm animate-fade-in border border-accent/20">
              <div className="flex items-center gap-3">
                 <div className="w-12 h-12 bg-white rounded-[16px] p-2 shadow-sm flex-shrink-0">
                    <img src={item.image} alt={item.name} className="w-full h-full object-contain" />
                 </div>
                 <div className="flex flex-col">
                   <span className="font-bold text-textDark capitalize text-sm">{item.name}</span>
                   <span className="text-primary font-bold text-sm">${(item.price * item.quantity).toFixed(2)}</span>
                 </div>
              </div>
              <div className="flex items-center gap-1.5 bg-white rounded-full p-1 shadow-sm border border-accent/30 flex-shrink-0">
                <button 
                  onClick={() => onUpdateQuantity(item, -1)}
                  className="w-7 h-7 rounded-full bg-background flex items-center justify-center text-textMuted hover:text-textDark transition-colors"
                >
                  <Minus size={14} />
                </button>
                <span className="text-sm font-bold w-4 text-center text-textDark">{item.quantity}</span>
                <button 
                  onClick={() => onUpdateQuantity(item, 1)}
                  className="w-7 h-7 rounded-full bg-primary flex items-center justify-center text-white hover:bg-primaryHover transition-colors shadow-sm"
                >
                  <Plus size={14} />
                </button>
              </div>
            </div>
          ))
        )}
      </div>

      {cart.length > 0 && (
        <div className="p-6 bg-background rounded-tl-[32px] shadow-[0_-10px_30px_rgba(74,59,50,0.03)] z-10 border-t border-accent/20 mt-[-10px]">
          <div className="flex justify-between items-center text-textMuted mb-6 px-2">
            <span className="font-semibold tracking-wide">Subtotal</span>
            <span className="text-3xl font-bold text-textDark tracking-tight">${total.toFixed(2)}</span>
          </div>
          <div className="flex gap-3">
            <button 
              onClick={onClear}
              className="p-4 rounded-2xl bg-white border border-accent text-textMuted hover:text-red-400 font-bold transition-colors shadow-sm"
              title="Clear Order"
            >
              <Trash2 size={20} />
            </button>
            <button 
              onClick={onCheckout}
              className="flex-1 py-4 rounded-2xl bg-primary text-white hover:bg-primaryHover font-bold transition-all shadow-medium flex items-center justify-center gap-2 group tracking-wide"
            >
              Checkout <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
export default CartPanel;
