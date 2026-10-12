/**
 * Siluzz Cafe - Menu Data
 * Extracted from the design HTML mockups
 */

import { MenuItem } from './types';

export const MENU_ITEMS: MenuItem[] = [
  {
    id: 'wrap',
    name: 'Grilled Vegetable & Hummus Wrap',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuArVqPEvj6bhHyvg6taGeQrYL_wEWcN3KFJvFKbPt923_3ej7A8m1nLks8i4TdL1SluKYO1_kFrbCOfB7c4j7aBEywMpKMFwWKKixkKFPvtyq0WQGXwFeDOS2lqQNKS4V43EYrhBfkC690ioaDdBWMnKui7j_PQ33jy52crzm8MKD-wVqmVUMNwQsmYOQMBXt-beKt3jaJZdOQA3pG3zBoDM_yNIUSWETjifyuvzIk3',
    price: 140,
    calories: 310,
    protein: 12,
    tags: ['VEGAN'],
    dietary: ['vegan'],
    description: 'Warm toasted multigrain flatbread packed with roasted zucchini, sweet bell peppers, crisp spinach, and velvety house-ground chickpeas hummus.',
  },
  {
    id: 'parfait',
    name: 'Greek Yogurt Parfait with Berries',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuC4fGgHeo17UWWxrfpBUDHnosmlzUKo80JpWpBLbxaCNOQiZ2cTX9bvPnxdzMA7rFx_JwkbLuwdrJX1dAa9-C50avBPKQgU5PGDwP8DuLxt55A_mJ6PFFmDJPGUwixn7c-1HbzIdzeku08AcvNoTPr8AIatOa3vbwEYrFwC5n-kfxq0SQ3nSGI5R1VQEpvhM_lIG96DmrdHeyKdnwrv6JoL6p3fYOzuNfW2PBqlkbkF',
    price: 150,
    calories: 240,
    protein: 18,
    tags: ['VEG', 'HIGH-PROTEIN'],
    dietary: ['vegetarian', 'high-protein'],
    description: 'Thick hung Greek yogurt layered with cold-macerated wild Nilgiri strawberries and blueberries, topped with golden toasted chia seeds and gluten-free oats crumble.',
  },
  {
    id: 'stirfry',
    name: 'Tofu & Veggie Stir-Fry with Brown Rice',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCWBR930xmiF0EFME5xtjlv9NFU2mOJ9LBPIUqW6biOZ6AqQK4uRXk2YEVZCMPpSWbo-ol3fzIGBKhxI-LbxtQfJnbThR5X4Zzoof5527pD9ip7pL-2Rev0xFp2_Yt1CxfRhOw6sN6cQLzBy1-UaeEQzO009wVdfXTMzG70ZVauoJCbDOlZMXvmlNAkInKTAbLdXO0GoTSWRABDBk1EdNCYF8wgIV8ahla-WjevMYjH',
    price: 210,
    calories: 420,
    protein: 24,
    tags: ['VEGAN', 'HIGH-PROTEIN'],
    dietary: ['vegan', 'high-protein'],
    description: 'Pan-seared organic firm tofu cubes with steamed broccoli florets, baby corn, edamame beans in a light tamari-ginger reduction over fragrant steamed brown rice.',
  },
  {
    id: 'juice',
    name: 'Cold-Pressed Detox Green Juice',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBHQAvc_-dW0RV0zQPtu1CsssqlquuC36gMkHRsdKWt2xg9PhVifhBPUlvkQIct7FLwnR5hvbZ2oQhpenqrmgHa1Vyf3Z9mwVqkgX7Cj05iyj4RSq_eQNK_lGfpMhyBk6nw7w5YEWKBD6EH17WF02kirWt_qVWavOwxPkS-OD2z_BvyUgg8_wPoCv271hMAi8eaq2H2ubBUmEYw5l4j_rvK19XQ3kMWH_sDNcOJi7q-',
    price: 110,
    calories: 95,
    protein: 3,
    tags: ['RAW', 'NO ADDED SUGAR'],
    dietary: ['raw', 'no-added-sugar', 'vegan', 'low-calorie'],
    description: 'Vibrant emerald green cold-pressed elixir with celery, green apple, fresh spinach, and lime. 300ml glass bottle.',
  },
  {
    id: 'salad',
    name: 'Avocado & Quinoa Power Salad',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCABMQZv2FuXhJb396Mf3hq2Mu5LQWCBlhdeFLvYz9eFzTv-_FkijjHQpi_BD4jOaoMHPRSUgbm76HoEGbp4U6nXh2u1tFE84CP_6wdR-RCFiD1LWyFjhPrCGMpONwWqfFiIEwZbRIz3f24SCtD2rHNGQ58_UDcNkSRYlxPqw1jLbnJj3GX-mmOuevE81Y7IcQSnQdRtLF-qJN4GCVIXpcDbMpkIbFJtjgaOFbJb4NG',
    price: 180,
    calories: 340,
    protein: 14,
    tags: ['VEGAN', 'GLUTEN-FREE'],
    dietary: ['vegan', 'gluten-free'],
    description: 'Sliced Hass avocado, fluffy tri-color quinoa, cherry tomatoes, baby arugula, pumpkin seeds with light lemon-herb emulsion.',
  },
  {
    id: 'pancake',
    name: 'Keto Almond Flour Pancake',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDDBZlst2uqyVH6ibeGJDsCWF8PqAiHcmDm5b2c5GuvM38MqbfZPpPHj1anEnysTSLUxa5ST83_iWkaSMiNOcED1soXR1-yFOkcA6dIfwfmGWaTsooOCsGLp4vSXIcjLM8R6aGYZ9F2-BzGSJShTn4UJpanq-bEMeNwtkl5yOl6gxYOZpjQng3DS9PmRM8OgwQGH7OnlH_ekknuYjesOwU1B0IMBVol9YKUrzoh8d9z',
    price: 160,
    calories: 290,
    protein: 16,
    tags: ['VEG', 'KETO / LOW CARB'],
    dietary: ['vegetarian', 'keto', 'low-carb'],
    description: 'Fluffy golden keto pancakes made from fine California almond flour, topped with grass-fed cultured butter and sugar-free monk fruit berry syrup.',
  },
];

export function getMenuItem(id: string): MenuItem | undefined {
  return MENU_ITEMS.find(item => item.id === id);
}

export function getFilteredMenuItems(
  category: string,
  searchQuery: string = '',
  sortBy: string = 'popular'
): MenuItem[] {
  let filtered = [...MENU_ITEMS];

  // Filter by category
  if (category !== 'all') {
    filtered = filtered.filter(item => {
      switch (category) {
        case 'low-calorie':
          return item.calories < 350;
        case 'high-protein':
          return item.protein >= 15;
        case 'vegan':
          return item.dietary.includes('vegan');
        case 'keto':
          return item.dietary.includes('keto') || item.dietary.includes('low-carb');
        case 'juices':
          return item.dietary.includes('raw') || item.name.toLowerCase().includes('juice');
        case 'bowls':
          return item.name.toLowerCase().includes('bowl') ||
                 item.name.toLowerCase().includes('salad') ||
                 item.name.toLowerCase().includes('stir-fry');
        default:
          return true;
      }
    });
  }

  // Filter by search query
  if (searchQuery.trim()) {
    const query = searchQuery.toLowerCase();
    filtered = filtered.filter(item =>
      item.name.toLowerCase().includes(query) ||
      item.description?.toLowerCase().includes(query) ||
      item.tags.some(tag => tag.toLowerCase().includes(query)) ||
      item.dietary.some(tag => tag.toLowerCase().includes(query))
    );
  }

  // Sort
  switch (sortBy) {
    case 'protein-desc':
      filtered.sort((a, b) => b.protein - a.protein);
      break;
    case 'cal-asc':
      filtered.sort((a, b) => a.calories - b.calories);
      break;
    case 'price-asc':
      filtered.sort((a, b) => a.price - b.price);
      break;
    case 'popular':
    default:
      // Keep original order for "popular"
      break;
  }

  return filtered;
}