import { Post, PostLeaning } from '../types/social';

/**
 * Fuzzify a political leaning score into left/neutral/right distribution
 */
function toFuzzy(score: number) {

  // neutral peaks at 0 and drops off as we move towards extremes, using a Gaussian-like curve
  const neutral = Math.exp(-Math.pow(score * 2.5, 2));

  // left and right are zero at 0 and increase towards their respective extremes, using a power function for sharper increase
  const left = score < 0 ? Math.pow(-score, 0.7) : 0;
  const right = score > 0 ? Math.pow(score, 0.7) : 0;

  const sum = left + neutral + right;

  return {
    left: left / sum,
    neutral: neutral / sum,
    right: right / sum,
  };
}

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
    fuzzyLeaning: toFuzzy(-0.8),
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
    fuzzyLeaning: toFuzzy(-0.9),
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
    fuzzyLeaning: toFuzzy(-0.7),
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
    fuzzyLeaning: toFuzzy(-0.75),
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
    fuzzyLeaning: toFuzzy(-0.85),
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
    fuzzyLeaning: toFuzzy(-0.8),
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
    fuzzyLeaning: toFuzzy(-0.75),
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
    fuzzyLeaning: toFuzzy(-0.7),
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
    fuzzyLeaning: toFuzzy(-0.8),
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
    fuzzyLeaning: toFuzzy(-0.85),
    timestamp: Date.now() - 3500000,
    likes: [],
    comments: []
  },

  {
    id: 'ch_left_1',
    authorId: 'system',
    authorName: 'Swiss Climate Alliance',
    content: 'Switzerland should phase out fossil fuel subsidies and accelerate renewable energy investment.',
    leaning: PostLeaning.LEFT,
    leaningScore: -0.8,
    fuzzyLeaning: toFuzzy(-0.8),
    timestamp: Date.now(),
    likes: [],
    comments: []
  },
  {
    id: 'ch_left_2',
    authorId: 'system',
    authorName: 'Green Switzerland',
    content: 'Climate targets are not ambitious enough. Switzerland must reduce emissions faster.',
    leaning: PostLeaning.LEFT,
    leaningScore: -0.85,
    fuzzyLeaning: toFuzzy(-0.85),
    timestamp: Date.now(),
    likes: [],
    comments: []
  },
  {
    id: 'ch_left_3',
    authorId: 'system',
    authorName: 'Public Transport Initiative',
    content: 'Train fares should be reduced to make public transport accessible to everyone.',
    leaning: PostLeaning.LEFT,
    leaningScore: -0.7,
    fuzzyLeaning: toFuzzy(-0.7),
    timestamp: Date.now(),
    likes: [],
    comments: []
  },
  {
    id: 'ch_left_4',
    authorId: 'system',
    authorName: 'Housing Rights CH',
    content: 'Rent prices in Swiss cities are becoming unsustainable. Stronger rent regulation is needed.',
    leaning: PostLeaning.LEFT,
    leaningScore: -0.9,
    fuzzyLeaning: toFuzzy(-0.9),
    timestamp: Date.now(),
    likes: [],
    comments: []
  },
  {
    id: 'ch_left_5',
    authorId: 'system',
    authorName: 'Education Equality CH',
    content: 'Higher education should be more affordable to reduce inequality.',
    leaning: PostLeaning.LEFT,
    leaningScore: -0.75,
    fuzzyLeaning: toFuzzy(-0.75),
    timestamp: Date.now(),
    likes: [],
    comments: []
  },
  {
    id: 'ch_left_6',
    authorId: 'system',
    authorName: 'Swiss Social Justice Forum',
    content: 'Income inequality in Switzerland is increasing and needs policy intervention.',
    leaning: PostLeaning.LEFT,
    leaningScore: -0.8,
    fuzzyLeaning: toFuzzy(-0.8),
    timestamp: Date.now(),
    likes: [],
    comments: []
  },
  {
    id: 'ch_left_7',
    authorId: 'system',
    authorName: 'Health Access CH',
    content: 'Healthcare costs are too high and should be better regulated.',
    leaning: PostLeaning.LEFT,
    leaningScore: -0.85,
    fuzzyLeaning: toFuzzy(-0.85),
    timestamp: Date.now(),
    likes: [],
    comments: []
  },
  {
    id: 'ch_left_8',
    authorId: 'system',
    authorName: 'Youth Voice Switzerland',
    content: 'Young people should have more influence in climate and political decisions.',
    leaning: PostLeaning.LEFT,
    leaningScore: -0.7,
    fuzzyLeaning: toFuzzy(-0.7),
    timestamp: Date.now(),
    likes: [],
    comments: []
  },
  {
    id: 'ch_left_9',
    authorId: 'system',
    authorName: 'Swiss Equality Network',
    content: 'Gender equality policies should be strengthened in workplaces.',
    leaning: PostLeaning.LEFT,
    leaningScore: -0.75,
    fuzzyLeaning: toFuzzy(-0.75),
    timestamp: Date.now(),
    likes: [],
    comments: []
  },
  {
    id: 'ch_left_10',
    authorId: 'system',
    authorName: 'Urban Sustainability CH',
    content: 'Cities like Zurich should invest more in green infrastructure.',
    leaning: PostLeaning.LEFT,
    leaningScore: -0.8,
    fuzzyLeaning: toFuzzy(-0.8),
    timestamp: Date.now(),
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
    fuzzyLeaning: toFuzzy(0),
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
    fuzzyLeaning: toFuzzy(0),
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
    fuzzyLeaning: toFuzzy(0),
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
    fuzzyLeaning: toFuzzy(0.05),
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
    fuzzyLeaning: toFuzzy(0),
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
    fuzzyLeaning: toFuzzy(0),
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
    fuzzyLeaning: toFuzzy(0),
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
    fuzzyLeaning: toFuzzy(0),
    timestamp: Date.now() - 1900000,
    likes: [],
    comments: []
  },

  {
    id: 'ch_neutral_1',
    authorId: 'system',
    authorName: 'Swiss Tech Watch',
    content: 'Swiss startups continue to grow in fintech and AI sectors.',
    leaning: PostLeaning.NEUTRAL,
    leaningScore: 0,
    fuzzyLeaning: toFuzzy(0),
    timestamp: Date.now(),
    likes: [],
    comments: []
  },
  {
    id: 'ch_neutral_2',
    authorId: 'system',
    authorName: 'Alpine Tourism Board',
    content: 'Tourism in the Swiss Alps is expected to increase this winter.',
    leaning: PostLeaning.NEUTRAL,
    leaningScore: 0,
    fuzzyLeaning: toFuzzy(0),
    timestamp: Date.now(),
    likes: [],
    comments: []
  },
  {
    id: 'ch_neutral_3',
    authorId: 'system',
    authorName: 'Swiss Economy Report',
    content: 'Switzerland maintains stable economic growth compared to EU countries.',
    leaning: PostLeaning.NEUTRAL,
    leaningScore: 0,
    fuzzyLeaning: toFuzzy(0),
    timestamp: Date.now(),
    likes: [],
    comments: []
  },
  {
    id: 'ch_neutral_4',
    authorId: 'system',
    authorName: 'Science Weekly CH',
    content: 'Researchers discovered new patterns in glacier melting rates.',
    leaning: PostLeaning.NEUTRAL,
    leaningScore: 0,
    fuzzyLeaning: toFuzzy(0),
    timestamp: Date.now(),
    likes: [],
    comments: []
  },
  {
    id: 'ch_neutral_5',
    authorId: 'system',
    authorName: 'Swiss Culture Daily',
    content: 'Local festivals continue to attract visitors across different cantons.',
    leaning: PostLeaning.NEUTRAL,
    leaningScore: 0,
    fuzzyLeaning: toFuzzy(0),
    timestamp: Date.now(),
    likes: [],
    comments: []
  },
  {
    id: 'ch_neutral_6',
    authorId: 'system',
    authorName: 'Swiss Innovation Hub',
    content: 'Zurich remains one of Europe’s top innovation centers.',
    leaning: PostLeaning.NEUTRAL,
    leaningScore: 0,
    fuzzyLeaning: toFuzzy(0),
    timestamp: Date.now(),
    likes: [],
    comments: []
  },
  {
    id: 'ch_neutral_7',
    authorId: 'system',
    authorName: 'Public Data CH',
    content: 'Swiss population growth remains steady this year.',
    leaning: PostLeaning.NEUTRAL,
    leaningScore: 0,
    fuzzyLeaning: toFuzzy(0),
    timestamp: Date.now(),
    likes: [],
    comments: []
  },
  {
    id: 'ch_neutral_8',
    authorId: 'system',
    authorName: 'Transport Analytics',
    content: 'Train punctuality in Switzerland remains among the highest in Europe.',
    leaning: PostLeaning.NEUTRAL,
    leaningScore: 0,
    fuzzyLeaning: toFuzzy(0),
    timestamp: Date.now(),
    likes: [],
    comments: []
  },
  {
    id: 'ch_neutral_9',
    authorId: 'system',
    authorName: 'Swiss Lifestyle Magazine',
    content: 'Outdoor activities remain popular across all age groups.',
    leaning: PostLeaning.NEUTRAL,
    leaningScore: 0,
    fuzzyLeaning: toFuzzy(0),
    timestamp: Date.now(),
    likes: [],
    comments: []
  },
  {
    id: 'ch_neutral_10',
    authorId: 'system',
    authorName: 'Food Culture CH',
    content: 'Swiss cuisine continues to evolve with international influences.',
    leaning: PostLeaning.NEUTRAL,
    leaningScore: 0,
    fuzzyLeaning: toFuzzy(0),
    timestamp: Date.now(),
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
    fuzzyLeaning: toFuzzy(0.8),
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
    fuzzyLeaning: toFuzzy(0.85),
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
    fuzzyLeaning: toFuzzy(0.9),
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
    fuzzyLeaning: toFuzzy(0.7),
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
    fuzzyLeaning: toFuzzy(0.75),
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
    fuzzyLeaning: toFuzzy(0.8),
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
    fuzzyLeaning: toFuzzy(0.7),
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
    fuzzyLeaning: toFuzzy(0.75),
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
    fuzzyLeaning: toFuzzy(0.85),
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
    fuzzyLeaning: toFuzzy(0.8),
    timestamp: Date.now() - 210000,
    likes: [],
    comments: []
  },

  {
    id: 'ch_right_1',
    authorId: 'system',
    authorName: 'Swiss Fiscal Watch',
    content: 'Switzerland must maintain strict control over public spending.',
    leaning: PostLeaning.RIGHT,
    leaningScore: 0.8,
    fuzzyLeaning: toFuzzy(0.8),
    timestamp: Date.now(),
    likes: [],
    comments: []
  },
  {
    id: 'ch_right_2',
    authorId: 'system',
    authorName: 'Border Security CH',
    content: 'Stronger border control is necessary to maintain national security.',
    leaning: PostLeaning.RIGHT,
    leaningScore: 0.85,
    fuzzyLeaning: toFuzzy(0.85),
    timestamp: Date.now(),
    likes: [],
    comments: []
  },
  {
    id: 'ch_right_3',
    authorId: 'system',
    authorName: 'Swiss Sovereignty Group',
    content: 'Switzerland should preserve its political independence and neutrality.',
    leaning: PostLeaning.RIGHT,
    leaningScore: 0.75,
    fuzzyLeaning: toFuzzy(0.75),
    timestamp: Date.now(),
    likes: [],
    comments: []
  },
  {
    id: 'ch_right_4',
    authorId: 'system',
    authorName: 'Tax Responsibility Forum',
    content: 'Lower taxes are essential to maintain economic competitiveness.',
    leaning: PostLeaning.RIGHT,
    leaningScore: 0.8,
    fuzzyLeaning: toFuzzy(0.8),
    timestamp: Date.now(),
    likes: [],
    comments: []
  },
  {
    id: 'ch_right_5',
    authorId: 'system',
    authorName: 'Swiss Law & Order',
    content: 'Public safety requires strong enforcement of laws.',
    leaning: PostLeaning.RIGHT,
    leaningScore: 0.85,
    fuzzyLeaning: toFuzzy(0.85),
    timestamp: Date.now(),
    likes: [],
    comments: []
  },
  {
    id: 'ch_right_6',
    authorId: 'system',
    authorName: 'Energy Independence CH',
    content: 'Domestic energy production should remain a priority.',
    leaning: PostLeaning.RIGHT,
    leaningScore: 0.75,
    fuzzyLeaning: toFuzzy(0.75),
    timestamp: Date.now(),
    likes: [],
    comments: []
  },
  {
    id: 'ch_right_7',
    authorId: 'system',
    authorName: 'Traditional Values CH',
    content: 'Family and cultural traditions remain essential to Swiss society.',
    leaning: PostLeaning.RIGHT,
    leaningScore: 0.7,
    fuzzyLeaning: toFuzzy(0.7),
    timestamp: Date.now(),
    likes: [],
    comments: []
  },
  {
    id: 'ch_right_8',
    authorId: 'system',
    authorName: 'Economic Freedom Forum',
    content: 'Regulation should be minimized to support business growth.',
    leaning: PostLeaning.RIGHT,
    leaningScore: 0.8,
    fuzzyLeaning: toFuzzy(0.8),
    timestamp: Date.now(),
    likes: [],
    comments: []
  },
  {
    id: 'ch_right_9',
    authorId: 'system',
    authorName: 'Swiss Stability Coalition',
    content: 'Financial stability depends on conservative fiscal policies.',
    leaning: PostLeaning.RIGHT,
    leaningScore: 0.75,
    fuzzyLeaning: toFuzzy(0.75),
    timestamp: Date.now(),
    likes: [],
    comments: []
  },
  {
    id: 'ch_right_10',
    authorId: 'system',
    authorName: 'National Identity CH',
    content: 'Swiss cultural identity should be strongly preserved.',
    leaning: PostLeaning.RIGHT,
    leaningScore: 0.8,
    fuzzyLeaning: toFuzzy(0.8),
    timestamp: Date.now(),
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
    fuzzyLeaning: toFuzzy(0),
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
    fuzzyLeaning: toFuzzy(0),
    timestamp: Date.now() - 120000,
    likes: [],
    comments: []
  },

// Neutral/mixed post with leaning score close to zero

{
    id: 'ch_mix_1',
    authorId: 'system',
    authorName: 'Swiss Economy Update',
    content: 'Switzerland reports stable inflation, though housing costs continue to rise slightly in major cities.',
    leaning: PostLeaning.NEUTRAL,
    leaningScore: 0.15,
    fuzzyLeaning: toFuzzy(0.15),
    timestamp: Date.now(),
    likes: [],
    comments: []
  },
  {
    id: 'ch_mix_2',
    authorId: 'system',
    authorName: 'Public Transit CH',
    content: 'Train punctuality remains excellent overall, but regional delays are increasing in some areas.',
    leaning: PostLeaning.NEUTRAL,
    leaningScore: -0.1,
    fuzzyLeaning: toFuzzy(-0.1),
    timestamp: Date.now(),
    likes: [],
    comments: []
  },
  {
    id: 'ch_mix_3',
    authorId: 'system',
    authorName: 'Swiss Tech Monitor',
    content: 'AI startups in Zurich are growing rapidly, though access to funding remains competitive.',
    leaning: PostLeaning.NEUTRAL,
    leaningScore: 0.2,
    fuzzyLeaning: toFuzzy(0.2),
    timestamp: Date.now(),
    likes: [],
    comments: []
  },
  {
    id: 'ch_mix_4',
    authorId: 'system',
    authorName: 'Health Policy CH',
    content: 'Healthcare system remains high quality, but premiums continue to increase slightly each year.',
    leaning: PostLeaning.NEUTRAL,
    leaningScore: -0.15,
    fuzzyLeaning: toFuzzy(-0.15),
    timestamp: Date.now(),
    likes: [],
    comments: []
  },
  {
    id: 'ch_mix_5',
    authorId: 'system',
    authorName: 'Education Watch CH',
    content: 'Swiss universities maintain strong rankings globally, though tuition concerns persist among students.',
    leaning: PostLeaning.NEUTRAL,
    leaningScore: 0.1,
    fuzzyLeaning: toFuzzy(0.1),
    timestamp: Date.now(),
    likes: [],
    comments: []
  },
  {
    id: 'ch_mix_6',
    authorId: 'system',
    authorName: 'Climate Report CH',
    content: 'Glacier melting continues, but recent policies have slightly slowed emission growth.',
    leaning: PostLeaning.NEUTRAL,
    leaningScore: -0.2,
    fuzzyLeaning: toFuzzy(-0.2),
    timestamp: Date.now(),
    likes: [],
    comments: []
  },
  {
    id: 'ch_mix_7',
    authorId: 'system',
    authorName: 'Swiss Tourism Insight',
    content: 'Tourism in alpine regions is strong this season, with some concerns about overcrowding.',
    leaning: PostLeaning.NEUTRAL,
    leaningScore: 0.05,
    fuzzyLeaning: toFuzzy(0.05),
    timestamp: Date.now(),
    likes: [],
    comments: []
  },
  {
    id: 'ch_mix_8',
    authorId: 'system',
    authorName: 'Swiss Housing Trends',
    content: 'Rental prices remain high in Zurich and Geneva, while suburban areas stay relatively stable.',
    leaning: PostLeaning.NEUTRAL,
    leaningScore: -0.2,
    fuzzyLeaning: toFuzzy(-0.2),
    timestamp: Date.now(),
    likes: [],
    comments: []
  },
  {
    id: 'ch_mix_9',
    authorId: 'system',
    authorName: 'Swiss Innovation Hub',
    content: 'Switzerland continues to rank high in innovation indexes, though competition from EU neighbors is increasing.',
    leaning: PostLeaning.NEUTRAL,
    leaningScore: 0.2,
    fuzzyLeaning: toFuzzy(0.2),
    timestamp: Date.now(),
    likes: [],
    comments: []
  },
  {
    id: 'ch_mix_10',
    authorId: 'system',
    authorName: 'Swiss Transport Review',
    content: 'Public transport remains efficient, but rural connectivity still shows room for improvement.',
    leaning: PostLeaning.NEUTRAL,
    leaningScore: -0.1,
    fuzzyLeaning: toFuzzy(-0.1),
    timestamp: Date.now(),
    likes: [],
    comments: []
  },
  {
    id: 'ch_mix_11',
    authorId: 'system',
    authorName: 'Swiss Economy Brief',
    content: 'Economic growth remains stable, though export demand shows mild fluctuations.',
    leaning: PostLeaning.NEUTRAL,
    leaningScore: 0.1,
    fuzzyLeaning: toFuzzy(0.1),
    timestamp: Date.now(),
    likes: [],
    comments: []
  },
  {
    id: 'ch_mix_12',
    authorId: 'system',
    authorName: 'Digital Switzerland',
    content: 'Digitalization of public services is progressing, but adoption varies across cantons.',
    leaning: PostLeaning.NEUTRAL,
    leaningScore: 0.15,
    fuzzyLeaning: toFuzzy(0.15),
    timestamp: Date.now(),
    likes: [],
    comments: []
  },
  {
    id: 'ch_mix_13',
    authorId: 'system',
    authorName: 'Swiss Culture Desk',
    content: 'Local cultural events are gaining popularity, especially among younger generations.',
    leaning: PostLeaning.NEUTRAL,
    leaningScore: 0.1,
    fuzzyLeaning: toFuzzy(0.1),
    timestamp: Date.now(),
    likes: [],
    comments: []
  },
  {
    id: 'ch_mix_14',
    authorId: 'system',
    authorName: 'Swiss Environment Agency',
    content: 'Recycling rates remain high, though plastic waste reduction is still a challenge.',
    leaning: PostLeaning.NEUTRAL,
    leaningScore: -0.05,
    fuzzyLeaning: toFuzzy(-0.05),
    timestamp: Date.now(),
    likes: [],
    comments: []
  },
  {
    id: 'ch_mix_15',
    authorId: 'system',
    authorName: 'Swiss Labor Report',
    content: 'Employment remains strong overall, though youth unemployment shows slight variation.',
    leaning: PostLeaning.NEUTRAL,
    leaningScore: 0.1,
    fuzzyLeaning: toFuzzy(0.1),
    timestamp: Date.now(),
    likes: [],
    comments: []
  },
  {
    id: 'ch_mix_16',
    authorId: 'system',
    authorName: 'Swiss Digital Health',
    content: 'Telemedicine adoption is increasing, but traditional consultations still dominate.',
    leaning: PostLeaning.NEUTRAL,
    leaningScore: -0.1,
    fuzzyLeaning: toFuzzy(-0.1),
    timestamp: Date.now(),
    likes: [],
    comments: []
  },
  {
    id: 'ch_mix_17',
    authorId: 'system',
    authorName: 'Swiss Security Monitor',
    content: 'Public safety remains high, though cybercrime incidents are gradually increasing.',
    leaning: PostLeaning.NEUTRAL,
    leaningScore: 0.15,
    fuzzyLeaning: toFuzzy(0.15),
    timestamp: Date.now(),
    likes: [],
    comments: []
  },
  {
    id: 'ch_mix_18',
    authorId: 'system',
    authorName: 'Swiss Food Trends',
    content: 'Plant-based diets are becoming more popular, while traditional cuisine remains strong.',
    leaning: PostLeaning.NEUTRAL,
    leaningScore: -0.05,
    fuzzyLeaning: toFuzzy(-0.05),
    timestamp: Date.now(),
    likes: [],
    comments: []
  },
  {
    id: 'ch_mix_19',
    authorId: 'system',
    authorName: 'Swiss Urban Planning',
    content: 'Cities are expanding sustainable infrastructure, but housing demand continues to rise.',
    leaning: PostLeaning.NEUTRAL,
    leaningScore: 0.2,
    fuzzyLeaning: toFuzzy(0.2),
    timestamp: Date.now(),
    likes: [],
    comments: []
  },
  {
    id: 'ch_mix_20',
    authorId: 'system',
    authorName: 'Swiss Data Insights',
    content: 'Data shows stable quality of life, though inequality indicators show slight divergence.',
    leaning: PostLeaning.NEUTRAL,
    leaningScore: -0.2,
    fuzzyLeaning: toFuzzy(-0.2),
    timestamp: Date.now(),
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
