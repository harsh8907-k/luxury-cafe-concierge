export const CATEGORIES = [
  '🥣 Soup', '🍢 Starters', '🍞 Indian Bread', '🥘 Bhaji Pav', '🥞 Dosa', 
  '🍚 Rice', '🥡 Chinese', '🍜 Noodles', '🍛 Punjabi', '🧾 Extras'
];

export const MAIN_MENU_OPTIONS = [...CATEGORIES, '🛒 Checkout'];

export const MENU_ITEMS = [
  // Soup
  { id: 'soup_manchow', name: 'Manchow Soup', price: 130, category: 'Soup' },
  { id: 'soup_minestrone', name: 'Minestrone Soup', price: 130, category: 'Soup' },
  { id: 'soup_manchurian', name: 'Mancurian Soup', price: 130, category: 'Soup' },
  { id: 'soup_sweetcorn', name: 'Sweet Corn Soup', price: 130, category: 'Soup' },
  { id: 'soup_hot_sour', name: 'Hot & Sour Soup', price: 130, category: 'Soup' },

  // Starters
  { id: 'start_paneer_tikka', name: 'Paneer Tikka Dry', price: 299, category: 'Starters' },
  { id: 'start_lasuni_paneer', name: 'Lasuni Paneer Tikka', price: 299, category: 'Starters' },
  { id: 'start_veg_crispy', name: 'Veg Crispy', price: 279, category: 'Starters' },

  // Indian Bread
  { id: 'bread_roti', name: 'Plain Roti', price: 25, category: 'Indian Bread' },
  { id: 'bread_butter_roti', name: 'Butter Roti', price: 30, category: 'Indian Bread' },
  { id: 'bread_naan', name: 'Plain Naan', price: 40, category: 'Indian Bread' },
  { id: 'bread_butter_naan', name: 'Butter Naan', price: 45, category: 'Indian Bread' },
  { id: 'bread_garlic_naan', name: 'Garlic Naan', price: 79, category: 'Indian Bread' },
  { id: 'bread_stuffed_naan', name: 'Stuffed Naan', price: 99, category: 'Indian Bread' },

  // Bhaji Pav
  { 
    id: 'bp_regular', name: 'Bhaji Pav', category: 'Bhaji Pav', hasVariants: true,
    variants: [
      { id: 'bp_regular_oil', name: 'Bhaji Pav (Oil)', price: 129, category: 'Bhaji Pav' },
      { id: 'bp_regular_butter', name: 'Bhaji Pav (Butter)', price: 150, category: 'Bhaji Pav' }
    ]
  },
  { 
    id: 'bp_jain', name: 'Jain Bhaji Pav', category: 'Bhaji Pav', hasVariants: true,
    variants: [
      { id: 'bp_jain_oil', name: 'Jain Bhaji Pav (Oil)', price: 149, category: 'Bhaji Pav' },
      { id: 'bp_jain_butter', name: 'Jain Bhaji Pav (Butter)', price: 160, category: 'Bhaji Pav' }
    ]
  },
  { 
    id: 'bp_cheese', name: 'Cheese Bhaji Pav', category: 'Bhaji Pav', hasVariants: true,
    variants: [
      { id: 'bp_cheese_oil', name: 'Cheese Bhaji Pav (Oil)', price: 179, category: 'Bhaji Pav' },
      { id: 'bp_cheese_butter', name: 'Cheese Bhaji Pav (Butter)', price: 200, category: 'Bhaji Pav' }
    ]
  },

  // Dosa
  {
    id: 'dosa_plain', name: 'Plain Dosa', category: 'Dosa', hasVariants: true,
    variants: [
      { id: 'dosa_plain_oil', name: 'Plain Dosa (Oil)', price: 120, category: 'Dosa' },
      { id: 'dosa_plain_butter', name: 'Plain Dosa (Butter)', price: 150, category: 'Dosa' }
    ]
  },
  {
    id: 'dosa_masala', name: 'Masala Dosa', category: 'Dosa', hasVariants: true,
    variants: [
      { id: 'dosa_masala_oil', name: 'Masala Dosa (Oil)', price: 180, category: 'Dosa' },
      { id: 'dosa_masala_butter', name: 'Masala Dosa (Butter)', price: 200, category: 'Dosa' }
    ]
  },
  { id: 'dosa_cheese_masala', name: 'Cheese Masala', price: 190, category: 'Dosa' },

  // Rice
  { id: 'rice_plain', name: 'Plain Rice', price: 149, category: 'Rice' },
  { id: 'rice_jeera', name: 'Jeera Rice', price: 179, category: 'Rice' },
  { id: 'rice_biryani', name: 'Veg Biryani', price: 199, category: 'Rice' },

  // Chinese
  { id: 'chn_manchurian', name: 'Veg Manchurian', price: 190, category: 'Chinese' },
  { id: 'chn_paneer_chilly', name: 'Paneer Chilly', price: 220, category: 'Chinese' },

  // Noodles
  { id: 'ndl_hakka', name: 'Veg Hakka Noodles', price: 180, category: 'Noodles' },
  { id: 'ndl_schezwan', name: 'Schezwan Noodles', price: 210, category: 'Noodles' },

  // Punjabi
  { id: 'pun_mutter', name: 'Mutter Paneer', price: 249, category: 'Punjabi' },
  { id: 'pun_palak', name: 'Palak Paneer', price: 249, category: 'Punjabi' },
  { id: 'pun_butter', name: 'Paneer Butter Masala', price: 279, category: 'Punjabi' },

  // Extras
  { id: 'ext_pav', name: 'Extra Pav', price: 20, category: 'Extras' },
  { id: 'ext_masala', name: 'Masala Pav', price: 120, category: 'Extras' }
];

export const parseMessage = (message) => {
  const lowerMsg = message.toLowerCase();
  
  if (lowerMsg.match(/(hi|hello|hey|start)/)) return { intent: 'GREETING' };
  if (lowerMsg.match(/(switch category|categories|menu|list)/)) return { intent: 'SHOW_CATEGORIES' };
  
  if (lowerMsg.includes('soup')) return { intent: 'SHOW_MENU', category: 'Soup' };
  if (lowerMsg.includes('starter')) return { intent: 'SHOW_MENU', category: 'Starters' };
  if (lowerMsg.includes('bread')) return { intent: 'SHOW_MENU', category: 'Indian Bread' };
  if (lowerMsg.includes('bhaji pav')) return { intent: 'SHOW_MENU', category: 'Bhaji Pav' };
  if (lowerMsg.includes('dosa')) return { intent: 'SHOW_MENU', category: 'Dosa' };
  if (lowerMsg.includes('rice')) return { intent: 'SHOW_MENU', category: 'Rice' };
  if (lowerMsg.includes('chinese')) return { intent: 'SHOW_MENU', category: 'Chinese' };
  if (lowerMsg.includes('noodle')) return { intent: 'SHOW_MENU', category: 'Noodles' };
  if (lowerMsg.includes('punjabi')) return { intent: 'SHOW_MENU', category: 'Punjabi' };
  if (lowerMsg.includes('extra')) return { intent: 'SHOW_MENU', category: 'Extras' };

  if (lowerMsg.includes('checkout') || lowerMsg.includes('order')) return { intent: 'CHECKOUT' };

  if (lowerMsg.startsWith('options for ')) {
     const itemName = message.replace('Options for ', '').trim();
     return { intent: 'SHOW_VARIANTS', itemName };
  }

  return { intent: 'SHOW_CATEGORIES' };
}

export const generateResponse = (intentData, cart) => {
  switch (intentData.intent) {
      case 'GREETING':
      case 'SHOW_CATEGORIES':
        return {
           text: "What would you like to explore today?",
           interactiveType: 'categories',
           options: MAIN_MENU_OPTIONS
        };
      case 'SHOW_MENU':
         const items = MENU_ITEMS.filter(i => i.category === intentData.category);
         return {
            text: `Here are our ${intentData.category} options:`,
            interactiveType: 'menu_list',
            menuItems: items,
            options: ['🔄 Switch Category', '🛒 Checkout']
         };
      case 'SHOW_VARIANTS':
         const baseItem = MENU_ITEMS.find(i => i.name.toLowerCase() === intentData.itemName.toLowerCase());
         if (baseItem && baseItem.hasVariants) {
            return {
               text: `Choose type for ${baseItem.name}:`,
               interactiveType: 'menu_list',
               menuItems: baseItem.variants,
               options: [`Add more ${baseItem.category}`, '🔄 Switch Category', '🛒 Checkout']
            };
         }
         return { text: "Item not found.", interactiveType: 'categories', options: MAIN_MENU_OPTIONS };
      case 'CHECKOUT':
         if (cart.length === 0) {
            return { 
               text: "Your order is empty! Browse the menu to add some items.", 
               interactiveType: 'categories', 
               options: MAIN_MENU_OPTIONS 
            };
         }
         return {
            text: "Here is your order summary:",
            interactiveType: 'checkout',
            cartSnapshot: [...cart],
            options: ['🔄 Switch Category'] // Options after checkout summary
         };
      default:
        return {
           text: "What would you like to explore today?",
           interactiveType: 'categories',
           options: MAIN_MENU_OPTIONS
        };
  }
};
