import { Post, PostLeaning } from '../types/social';

/**
 * Pre-seeded posts with different political leanings
 */
export const SEED_POSTS: Post[] = [
  // LEFT-LEANING POSTS
  {
    id: 'post_1',
    authorId: 'system',
    authorName: 'Climate Action Network',
    content: 'We need urgent action on climate change! Renewable energy investments should be our top priority. The science is clear - we must transition away from fossil fuels now. 🌍💚',
    leaning: PostLeaning.LEFT,
    leaningScore: -0.8,
    timestamp: Date.now() - 7200000,
    likes: [],
    comments: []
  },
  {
    id: 'post_2',
    authorId: 'system',
    authorName: 'Progressive Policy Institute',
    content: 'Universal healthcare is a human right. No one should go bankrupt because of medical bills. Other developed nations prove it works! 🏥',
    leaning: PostLeaning.LEFT,
    leaningScore: -0.9,
    timestamp: Date.now() - 6400000,
    likes: [],
    comments: []
  },
  {
    id: 'post_3',
    authorId: 'system',
    authorName: 'Education for All',
    content: 'Student debt is crushing an entire generation. We need to make public universities tuition-free and forgive existing student loans. 📚✊',
    leaning: PostLeaning.LEFT,
    leaningScore: -0.7,
    timestamp: Date.now() - 5400000,
    likes: [],
    comments: []
  },
  {
    id: 'post_4',
    authorId: 'system',
    authorName: 'Workers United',
    content: 'The minimum wage hasn\'t kept up with inflation. Workers deserve a living wage - $15/hour should be the baseline. Fight for fair pay! 💪',
    leaning: PostLeaning.LEFT,
    leaningScore: -0.75,
    timestamp: Date.now() - 4800000,
    likes: [],
    comments: []
  },
  {
    id: 'post_16',
    authorId: 'system',
    authorName: 'LGBTQ+ Rights Coalition',
    content: 'Love is love! Everyone deserves equal rights and protection under the law. Pride month reminds us how far we\'ve come and how far we still need to go. 🏳️‍🌈',
    leaning: PostLeaning.LEFT,
    leaningScore: -0.85,
    timestamp: Date.now() - 4600000,
    likes: [],
    comments: []
  },
  {
    id: 'post_17',
    authorId: 'system',
    authorName: 'Green Justice',
    content: 'Environmental racism is real. Communities of color disproportionately suffer from pollution and toxic waste. Climate justice is social justice! ✊🌱',
    leaning: PostLeaning.LEFT,
    leaningScore: -0.8,
    timestamp: Date.now() - 4400000,
    likes: [],
    comments: []
  },
  {
    id: 'post_18',
    authorId: 'system',
    authorName: 'Women Empowerment',
    content: 'The wage gap still exists - women earn 82 cents for every dollar men make. Equal work deserves equal pay. We won\'t stop fighting! 💪👩',
    leaning: PostLeaning.LEFT,
    leaningScore: -0.75,
    timestamp: Date.now() - 4100000,
    likes: [],
    comments: []
  },
  {
    id: 'post_19',
    authorId: 'system',
    authorName: 'Criminal Justice Reform',
    content: 'Mass incarceration destroys families and communities. We need prison reform, end mandatory minimums, and invest in rehabilitation not punishment. ⚖️',
    leaning: PostLeaning.LEFT,
    leaningScore: -0.7,
    timestamp: Date.now() - 3900000,
    likes: [],
    comments: []
  },
  {
    id: 'post_20',
    authorId: 'system',
    authorName: 'Housing For All',
    content: 'Housing is a human right! We need rent control, affordable housing initiatives, and protections for tenants. No one should be homeless in the richest country. 🏠',
    leaning: PostLeaning.LEFT,
    leaningScore: -0.8,
    timestamp: Date.now() - 3700000,
    likes: [],
    comments: []
  },
  {
    id: 'post_21',
    authorId: 'system',
    authorName: 'Immigration Advocates',
    content: 'Immigrants make America stronger! Dreamers deserve a path to citizenship. We are all descendants of immigrants. Give me your tired, your poor... 🗽',
    leaning: PostLeaning.LEFT,
    leaningScore: -0.85,
    timestamp: Date.now() - 3500000,
    likes: [],
    comments: []
  },
  
  // NEUTRAL POSTS
  {
    id: 'post_5',
    authorId: 'system',
    authorName: 'Tech News Daily',
    content: 'New smartphones released this quarter show 20% better battery life. Technology continues to advance rapidly. What features do you look for in a phone? 📱',
    leaning: PostLeaning.NEUTRAL,
    leaningScore: 0,
    timestamp: Date.now() - 4200000,
    likes: [],
    comments: []
  },
  {
    id: 'post_6',
    authorId: 'system',
    authorName: 'Science Weekly',
    content: 'Researchers discover new species of deep-sea fish. The ocean continues to surprise us with its biodiversity. 🐠🌊',
    leaning: PostLeaning.NEUTRAL,
    leaningScore: 0,
    timestamp: Date.now() - 3600000,
    likes: [],
    comments: []
  },
  {
    id: 'post_7',
    authorId: 'system',
    authorName: 'Food & Culture',
    content: 'The best recipes for homemade pizza! 🍕 From dough to toppings, here\'s how to make restaurant-quality pizza at home.',
    leaning: PostLeaning.NEUTRAL,
    leaningScore: 0,
    timestamp: Date.now() - 3000000,
    likes: [],
    comments: []
  },
  {
    id: 'post_8',
    authorId: 'system',
    authorName: 'Sports Central',
    content: 'Championship game this weekend! Who do you think will win? Drop your predictions below. 🏆',
    leaning: PostLeaning.NEUTRAL,
    leaningScore: 0.05,
    timestamp: Date.now() - 2400000,
    likes: [],
    comments: []
  },
  {
    id: 'post_22',
    authorId: 'system',
    authorName: 'Travel Guide',
    content: 'Top 10 travel destinations for 2026! From beaches to mountains, where will you explore this year? ✈️🌎',
    leaning: PostLeaning.NEUTRAL,
    leaningScore: 0,
    timestamp: Date.now() - 2200000,
    likes: [],
    comments: []
  },
  {
    id: 'post_23',
    authorId: 'system',
    authorName: 'Pet Lovers',
    content: 'Adopting a pet can change your life! Check out these adorable rescue dogs looking for forever homes. 🐶❤️',
    leaning: PostLeaning.NEUTRAL,
    leaningScore: 0,
    timestamp: Date.now() - 2100000,
    likes: [],
    comments: []
  },
  {
    id: 'post_24',
    authorId: 'system',
    authorName: 'Fitness Tips',
    content: '5 simple exercises you can do at home with no equipment. Stay healthy and active! 💪🏃',
    leaning: PostLeaning.NEUTRAL,
    leaningScore: 0,
    timestamp: Date.now() - 2000000,
    likes: [],
    comments: []
  },
  {
    id: 'post_25',
    authorId: 'system',
    authorName: 'Music Fest',
    content: 'Summer music festival lineup announced! Which artists are you most excited to see live? 🎵🎸',
    leaning: PostLeaning.NEUTRAL,
    leaningScore: 0,
    timestamp: Date.now() - 1900000,
    likes: [],
    comments: []
  },

  // RIGHT-LEANING POSTS
  {
    id: 'post_9',
    authorId: 'system',
    authorName: 'Free Market Institute',
    content: 'Lower taxes and less regulation have historically led to economic growth. Government should step back and let businesses thrive! 📈💼',
    leaning: PostLeaning.RIGHT,
    leaningScore: 0.8,
    timestamp: Date.now() - 1800000,
    likes: [],
    comments: []
  },
  {
    id: 'post_10',
    authorId: 'system',
    authorName: 'Constitutional Rights',
    content: 'The Second Amendment protects our fundamental right to self-defense. Law-abiding citizens should have the freedom to protect their families. 🇺🇸',
    leaning: PostLeaning.RIGHT,
    leaningScore: 0.85,
    timestamp: Date.now() - 1200000,
    likes: [],
    comments: []
  },
  {
    id: 'post_11',
    authorId: 'system',
    authorName: 'Strong Borders',
    content: 'Border security is national security. We need to protect our sovereignty and enforce immigration laws properly. 🛡️',
    leaning: PostLeaning.RIGHT,
    leaningScore: 0.9,
    timestamp: Date.now() - 900000,
    likes: [],
    comments: []
  },
  {
    id: 'post_12',
    authorId: 'system',
    authorName: 'Traditional Values',
    content: 'Family values and personal responsibility are the foundation of a strong society. We need to return to time-tested principles.',
    leaning: PostLeaning.RIGHT,
    leaningScore: 0.7,
    timestamp: Date.now() - 600000,
    likes: [],
    comments: []
  },
  {
    id: 'post_13',
    authorId: 'system',
    authorName: 'Energy Independence',
    content: 'We should prioritize domestic oil and gas production for energy independence. American energy jobs matter! ⚡',
    leaning: PostLeaning.RIGHT,
    leaningScore: 0.75,
    timestamp: Date.now() - 300000,
    likes: [],
    comments: []
  },
  {
    id: 'post_26',
    authorId: 'system',
    authorName: 'Small Business Coalition',
    content: 'Government regulations are crushing small businesses! We need less red tape and more freedom to innovate and grow. Let entrepreneurs thrive! 🏢',
    leaning: PostLeaning.RIGHT,
    leaningScore: 0.8,
    timestamp: Date.now() - 250000,
    likes: [],
    comments: []
  },
  {
    id: 'post_27',
    authorId: 'system',
    authorName: 'School Choice Advocates',
    content: 'Parents should have the freedom to choose the best education for their kids. School vouchers and charter schools give families options! 📖',
    leaning: PostLeaning.RIGHT,
    leaningScore: 0.7,
    timestamp: Date.now() - 240000,
    likes: [],
    comments: []
  },
  {
    id: 'post_28',
    authorId: 'system',
    authorName: 'Fiscal Responsibility',
    content: 'National debt is out of control! We need a balanced budget amendment and spending cuts. Our children shouldn\'t inherit this burden. 💰',
    leaning: PostLeaning.RIGHT,
    leaningScore: 0.75,
    timestamp: Date.now() - 230000,
    likes: [],
    comments: []
  },
  {
    id: 'post_29',
    authorId: 'system',
    authorName: 'Law & Order',
    content: 'Support our police! They put their lives on line every day to keep us safe. We need to fund law enforcement, not defund it. 👮🚔',
    leaning: PostLeaning.RIGHT,
    leaningScore: 0.85,
    timestamp: Date.now() - 220000,
    likes: [],
    comments: []
  },
  {
    id: 'post_30',
    authorId: 'system',
    authorName: 'Religious Freedom',
    content: 'Faith and religious liberty are cornerstones of our nation. We must protect the right to practice religion freely without government interference. 🙏',
    leaning: PostLeaning.RIGHT,
    leaningScore: 0.8,
    timestamp: Date.now() - 210000,
    likes: [],
    comments: []
  },

  // MORE NEUTRAL/MIXED
  {
    id: 'post_14',
    authorId: 'system',
    authorName: 'Community News',
    content: 'Local farmers market opens this Saturday! Support local businesses and enjoy fresh produce. 🥬🍎',
    leaning: PostLeaning.NEUTRAL,
    leaningScore: 0,
    timestamp: Date.now() - 180000,
    likes: [],
    comments: []
  },
  {
    id: 'post_15',
    authorId: 'system',
    authorName: 'Movie Reviews',
    content: 'The new sci-fi movie is getting great reviews! Have you seen it yet? Share your thoughts! 🎬',
    leaning: PostLeaning.NEUTRAL,
    leaningScore: 0,
    timestamp: Date.now() - 120000,
    likes: [],
    comments: []
  }
];

const STORAGE_KEY_POSTS = 'social_media_posts';

/**
 * Initialize posts in localStorage
 * Always resets to latest seed posts to ensure new posts are loaded
 */
export function initializePosts(): void {
  localStorage.setItem(STORAGE_KEY_POSTS, JSON.stringify(SEED_POSTS));
}

/**
 * Get all posts from localStorage
 */
export function getPosts(): Post[] {
  const stored = localStorage.getItem(STORAGE_KEY_POSTS);
  return stored ? JSON.parse(stored) : SEED_POSTS;
}

/**
 * Save posts to localStorage
 */
export function savePosts(posts: Post[]): void {
  localStorage.setItem(STORAGE_KEY_POSTS, JSON.stringify(posts));
}
