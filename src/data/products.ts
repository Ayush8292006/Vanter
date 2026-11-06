import { Product, FragranceSize, JournalArticle, Testimonial } from '../types';

export const calculatePriceBySize = (price100ml: number, size: FragranceSize): number => {
  switch (size) {
    case '30ml':
      return Math.round(price100ml * 0.4);
    case '50ml':
      return Math.round(price100ml * 0.65);
    case '100ml':
    default:
      return price100ml;
  }
};

export const formatPrice = (amount: number): string => {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0,
  }).format(amount);
};

export const PRODUCTS: Product[] = [
  {
    id: 'vanter-01-noir-absolu',
    number: 'N°01',
    name: 'NOIR ABSOLU',
    slug: 'noir-absolu',
    tagline: 'A nocturnal meditation on shadow, smoke, and raw animalic warmth.',
    shortDescription: 'Oud Wood, Smoked Leather, and Madagascar Black Pepper in a hypnotic embrace.',
    fullDescription: 'Composed around rare wild agarwood harvested from the mist-veiled forests of Assam, Noir Absolu is a dark, commanding extrait de parfum. A piercing opening of crushed black pepper and Italian bergamot yields to an opulent heart of distressed leather and dried labdanum, settling into a lingering base of smoky oud, bourbon vetiver, and midnight amber.',
    gender: 'Unisex',
    family: 'Woody',
    price100ml: 6900,
    mood: 'Deep Charcoal & Smoky Opulence',
    moodTint: '#171618',
    gradient: 'from-[#171618] via-[#222026] to-[#0d0c0e]',
    keyNotes: ['Wild Assam Oud', 'Black Pepper', 'Smoked Leather', 'Ambergris'],
    concentration: 'Extrait de Parfum (28%)',
    maceration: '48 Hours Cold Maceration',
    origin: 'Grasse & Assam',
    rating: 4.95,
    reviewsCount: 84,
    isBestseller: true,
    isNew: false,
    images: {
      primary: 'https://images.unsplash.com/photo-1523293182086-7651a899d37f?auto=format&fit=crop&w=1200&q=85',
      secondary: 'https://images.unsplash.com/photo-1541643600914-78b084683601?auto=format&fit=crop&w=1200&q=85',
      ingredients: 'https://images.unsplash.com/photo-1608571423902-eed4a5ad8108?auto=format&fit=crop&w=1200&q=85',
      lifestyle: 'https://images.unsplash.com/photo-1547887537-6158d64c35b3?auto=format&fit=crop&w=1200&q=85',
    },
    notes: {
      top: [
        { name: 'Black Pepper', origin: 'Madagascar', description: 'Crushed and steam distilled for an electric, crackling piquancy.' },
        { name: 'Bergamot Reggio', origin: 'Calabria, Italy', description: 'Cold-pressed sparkling citrus with bitter green undertones.' },
        { name: 'Incense Tear', origin: 'Oman', description: 'Smoky sacred resin providing an immediate spiritual lift.' },
      ],
      heart: [
        { name: 'Smoked Leather', origin: 'Grasse', description: 'Birch tar and cade oil accord recalling vintage saddle leather.' },
        { name: 'Cistus Labdanum', origin: 'Andalusia', description: 'Sticky, balsamy resin offering rich amber warmth.' },
        { name: 'Saffron Threads', origin: 'Kashmir', description: 'Dry, bittersweet crimson luxury that crowns the heart.' },
      ],
      base: [
        { name: 'Wild Assam Oud', origin: 'Assam, India', description: 'Ancient resinous wood aged 12 years for unparalleled depth.' },
        { name: 'Bourbon Vetiver', origin: 'Réunion Island', description: 'Earthy, dark smoked roots anchoring the drydown.' },
        { name: 'Dark Amber', origin: 'Baltic Coast', description: 'Golden fossilized resin melted with mineral musk.' },
      ],
    },
  },
  {
    id: 'vanter-02-ambre-dore',
    number: 'N°02',
    name: 'AMBRE DORÉ',
    slug: 'ambre-dore',
    tagline: 'Liquid sunset captured in hand-polished flacon of gold.',
    shortDescription: 'Golden Amber, Bourbon Vanilla, and Persian Saffron spun into golden velvet.',
    fullDescription: 'Ambre Doré is an homage to the golden hour in the desert dunes. The fragrance opens with glowing threads of saffron and bitter almond, giving way to an intoxicating heart of Bulgarian damask rose bathed in benzoin tears. The drydown is an unforgettable tapestry of aged bourbon vanilla beans and fossilized amber.',
    gender: 'Unisex',
    family: 'Amber',
    price100ml: 6500,
    mood: 'Warm Gold & Luminous Cashmere',
    moodTint: '#3A2711',
    gradient: 'from-[#3A2711] via-[#2A1D0E] to-[#140D05]',
    keyNotes: ['Baltic Amber', 'Bourbon Vanilla', 'Persian Saffron', 'Benzoin Siam'],
    concentration: 'Eau de Parfum Intense (24%)',
    maceration: '48 Hours Cold Maceration',
    origin: 'Grasse & Isfahan',
    rating: 4.92,
    reviewsCount: 67,
    isBestseller: true,
    isNew: false,
    images: {
      primary: 'https://images.unsplash.com/photo-1588405748880-12d1d2a59f75?auto=format&fit=crop&w=1200&q=85',
      secondary: 'https://images.unsplash.com/photo-1541643600914-78b084683601?auto=format&fit=crop&w=1200&q=85',
      ingredients: 'https://images.unsplash.com/photo-1509358271058-acd22cc93898?auto=format&fit=crop&w=1200&q=85',
      lifestyle: 'https://images.unsplash.com/photo-1512290900672-1f02e6040854?auto=format&fit=crop&w=1200&q=85',
    },
    notes: {
      top: [
        { name: 'Persian Saffron', origin: 'Isfahan', description: 'Hand-picked stigma threads lending metallic honey glow.' },
        { name: 'Bitter Almond', origin: 'Morocco', description: 'Creamy marzipan facet that softens the spice entry.' },
        { name: 'Cinnamon Bark', origin: 'Ceylon', description: 'Warm woody dusting that sparks the golden accord.' },
      ],
      heart: [
        { name: 'Benzoin Siam', origin: 'Laos', description: 'Sweet, balsamic tear gum with warm caramel facets.' },
        { name: 'Damask Rose', origin: 'Kazanlak', description: 'Velvety crimson petals soaked in resin.' },
        { name: 'Heliotrope', origin: 'Provence', description: 'Powdery almond-floral cloud bridging sweetness and skin.' },
      ],
      base: [
        { name: 'Bourbon Vanilla', origin: 'Madagascar', description: 'Whole split cured vanilla pods, deep and unctuous.' },
        { name: 'Golden Amber', origin: 'Baltic', description: 'Radiant solar resin that holds for 16+ hours.' },
        { name: 'Sandalwood', origin: 'Mysore', description: 'Creamy sacred wood that wraps the trail in silk.' },
      ],
    },
  },
  {
    id: 'vanter-03-ivoire-santal',
    number: 'N°03',
    name: 'IVOIRE SANTAL',
    slug: 'ivoire-santal',
    tagline: 'The quiet authority of pristine sandalwood draped in powdery iris.',
    shortDescription: 'Mysore Sandalwood, Cardamom Pods, and Florentine Orris Butter.',
    fullDescription: 'Ivoire Santal whispers where others shout. An architectural composition built around rare sustainably cultivated Mysore sandalwood, kissed by green cardamom from Guatemala and the precious butter of Florentine orris. It wears like a bespoke cashmere coat: impeccably tailored, tactile, and unforgettable.',
    gender: 'For Him',
    family: 'Woody',
    price100ml: 5900,
    mood: 'Ivory Marble & Cashmere Softness',
    moodTint: '#2E2B25',
    gradient: 'from-[#2E2B25] via-[#211E1A] to-[#12110E]',
    keyNotes: ['Mysore Sandalwood', 'Green Cardamom', 'Florentine Orris', 'Cedar Atlas'],
    concentration: 'Extrait de Parfum (26%)',
    maceration: '48 Hours Cold Maceration',
    origin: 'Grasse & Florence',
    rating: 4.88,
    reviewsCount: 52,
    isBestseller: false,
    isNew: false,
    images: {
      primary: 'https://images.unsplash.com/photo-1592945403244-b3fbafd7f539?auto=format&fit=crop&w=1200&q=85',
      secondary: 'https://images.unsplash.com/photo-1615397349754-cfa2066a298e?auto=format&fit=crop&w=1200&q=85',
      ingredients: 'https://images.unsplash.com/photo-1518531933037-91b2f5f229cc?auto=format&fit=crop&w=1200&q=85',
      lifestyle: 'https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&w=1200&q=85',
    },
    notes: {
      top: [
        { name: 'Green Cardamom', origin: 'Guatemala', description: 'Aromatic, cool camphoraceous spice of immense clarity.' },
        { name: 'Pink Peppercorn', origin: 'Brazil', description: 'Fruity dry warmth that bridges wood and air.' },
        { name: 'White Sage', origin: 'Grasse', description: 'Subtle herbal serenity creating mindful space.' },
      ],
      heart: [
        { name: 'Florentine Orris', origin: 'Tuscany', description: 'Aged 3-year iris rhizomes yielding powdery butter.' },
        { name: 'Papyrus', origin: 'Nile Delta', description: 'Dry parchment texture bringing intellect to the wood.' },
        { name: 'Violet Leaf', origin: 'Egypt', description: 'Dewy metallic green that keeps the composition crisp.' },
      ],
      base: [
        { name: 'Mysore Sandalwood', origin: 'Karnataka', description: 'Sensual, buttery holy wood with milky resonance.' },
        { name: 'Cedar Atlas', origin: 'Morocco', description: 'Chiseled pencil-shavings dryness for elegance.' },
        { name: 'White Musk', origin: 'Switzerland', description: 'Clean second-skin aura that lingers invisibly.' },
      ],
    },
  },
  {
    id: 'vanter-04-rose-velours',
    number: 'N°04',
    name: 'ROSE VELOURS',
    slug: 'rose-velours',
    tagline: 'May roses picked at dawn, drenched in chilled lychee and velvet musk.',
    shortDescription: 'Grasse Centifolia Rose, Sparkling Lychee, and Silk Cashmeran.',
    fullDescription: 'Neither dusty nor naive, Rose Velours captures the May Rose (Rose de Mai) in its prime at 6:00 AM before the sun touches the petals. Dewy green nuances blend with translucent pink lychee and blackcurrant bud before settling into a sensual base of clean cashmeran, white cedar, and feathered musk.',
    gender: 'For Her',
    family: 'Floral',
    price100ml: 5900,
    mood: 'Blush Beige & Petal Dew',
    moodTint: '#382527',
    gradient: 'from-[#382527] via-[#241719] to-[#120B0C]',
    keyNotes: ['Rose de Mai', 'Pink Lychee', 'Cashmeran', 'White Musk'],
    concentration: 'Eau de Parfum Intense (22%)',
    maceration: '48 Hours Cold Maceration',
    origin: 'Grasse, France',
    rating: 4.96,
    reviewsCount: 91,
    isBestseller: true,
    isNew: false,
    images: {
      primary: 'https://images.unsplash.com/photo-1592945403407-9c8646b5d92e?auto=format&fit=crop&w=1200&q=85',
      secondary: 'https://images.unsplash.com/photo-1563178406-4cdc2923acbc?auto=format&fit=crop&w=1200&q=85',
      ingredients: 'https://images.unsplash.com/photo-1559563458-527698bf5295?auto=format&fit=crop&w=1200&q=85',
      lifestyle: 'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&w=1200&q=85',
    },
    notes: {
      top: [
        { name: 'Sparkling Lychee', origin: 'Madagascar', description: 'Crisp, sweet translucent fruit brimming with dew.' },
        { name: 'Italian Mandarin', origin: 'Sicily', description: 'Sun-drenched zest that illuminates the opening.' },
        { name: 'Blackcurrant Bud', origin: 'Burgundy', description: 'Tantalizing green acidity adding depth.' },
      ],
      heart: [
        { name: 'Rose de Mai', origin: 'Grasse', description: 'Centifolia petals gathered at dawn, pure romantic bliss.' },
        { name: 'Damascena Absolute', origin: 'Bulgaria', description: 'Deep jammy undertones creating lush velvet texture.' },
        { name: 'Pink Peony', origin: 'Kyoto', description: 'Airy floral freshness that blooms on the skin.' },
      ],
      base: [
        { name: 'Cashmeran', origin: 'IFF France', description: 'Tactile sensation of cocooning fine wool.' },
        { name: 'White Amber', origin: 'Norway', description: 'Clean warmth that glows without heaviness.' },
        { name: 'Feathered Musk', origin: 'France', description: 'Intimate skin veil that feels like clean linen.' },
      ],
    },
  },
  {
    id: 'vanter-05-vetiver-blanc',
    number: 'N°05',
    name: 'VÉTIVER BLANC',
    slug: 'vetiver-blanc',
    tagline: 'A sharp morning breeze over wet limestone and high-altitude tea gardens.',
    shortDescription: 'Haitian Vetiver, Calabrian Bergamot, and Silver Needle White Tea.',
    fullDescription: 'An essay in pristine clarity and aristocratic restraint. Vétiver Blanc strips Haitian vetiver of its usual heavy soot, purifying it with sparkling Calabrian bergamot, grapefruit flower, and delicate silver needle white tea leaves. It is clean, modern, and quietly formidable.',
    gender: 'For Him',
    family: 'Fresh',
    price100ml: 5500,
    mood: 'Sage-Beige & Crisp Mineral Breeze',
    moodTint: '#212A26',
    gradient: 'from-[#212A26] via-[#161D1A] to-[#0D1210]',
    keyNotes: ['Haitian Vetiver', 'Calabrian Bergamot', 'White Tea', 'Grapefruit Flower'],
    concentration: 'Eau de Parfum (20%)',
    maceration: '48 Hours Cold Maceration',
    origin: 'Les Cayes & Calabria',
    rating: 4.89,
    reviewsCount: 46,
    isBestseller: false,
    isNew: true,
    images: {
      primary: 'https://images.unsplash.com/photo-1523293182086-7651a899d37f?auto=format&fit=crop&w=1200&q=85',
      secondary: 'https://images.unsplash.com/photo-1615397349754-cfa2066a298e?auto=format&fit=crop&w=1200&q=85',
      ingredients: 'https://images.unsplash.com/photo-1576092768241-dec231879fc3?auto=format&fit=crop&w=1200&q=85',
      lifestyle: 'https://images.unsplash.com/photo-1506152983158-b4a74a01c721?auto=format&fit=crop&w=1200&q=85',
    },
    notes: {
      top: [
        { name: 'Calabrian Bergamot', origin: 'Reggio', description: 'Luminously bright and zesty cold-press oils.' },
        { name: 'Grapefruit Flower', origin: 'Corsica', description: 'Sparkling bitter-citrus floral note.' },
        { name: 'Crushed Mint Leaf', origin: 'Morocco', description: 'Crisp aromatic rush of dawn freshness.' },
      ],
      heart: [
        { name: 'Silver Needle White Tea', origin: 'Fujian', description: 'Steeped porcelain purity with delicate floral steam.' },
        { name: 'Neroli Petals', origin: 'Tunisia', description: 'Green orange blossoms of noble lineage.' },
        { name: 'Ginger Root', origin: 'Kerala', description: 'Fresh spicy electricity driving projection.' },
      ],
      base: [
        { name: 'Haitian Vetiver', origin: 'Les Cayes', description: 'Fractionated earthy root, crisp and smoky.' },
        { name: 'Atlas Cedar', origin: 'Morocco', description: 'Structure and clean architectural poise.' },
        { name: 'Mineral Ambroxan', origin: 'France', description: 'Oceanic mineral radiance that amplifies longevity.' },
      ],
    },
  },
  {
    id: 'vanter-06-nuit-de-jasmin',
    number: 'N°06',
    name: 'NUIT DE JASMIN',
    slug: 'nuit-de-jasmin',
    tagline: 'Night-blooming white petals intoxicated with buttery tuberose and roasted tonka.',
    shortDescription: 'Jasmine Sambac, Indian Tuberose, and Venezuelan Tonka Bean.',
    fullDescription: 'Nuit de Jasmin is inspired by a Parisian courtyard at midnight in midsummer. When the night air cools, jasmine sambac releases its intoxicating indolic nectar. Blended with buttery tuberose, roasted Venezuelan tonka bean, and a whisper of dark patchouli, this scent is dangerously magnetic.',
    gender: 'For Her',
    family: 'Floral',
    price100ml: 6200,
    mood: 'Soft Black & White Petal Allure',
    moodTint: '#1F1B24',
    gradient: 'from-[#1F1B24] via-[#16131A] to-[#0A090D]',
    keyNotes: ['Jasmine Sambac', 'Tuberose Absolue', 'Tonka Bean', 'Dark Patchouli'],
    concentration: 'Extrait de Parfum (27%)',
    maceration: '48 Hours Cold Maceration',
    origin: 'Madurai & Grasse',
    rating: 4.97,
    reviewsCount: 78,
    isBestseller: true,
    isNew: false,
    images: {
      primary: 'https://images.unsplash.com/photo-1541643600914-78b084683601?auto=format&fit=crop&w=1200&q=85',
      secondary: 'https://images.unsplash.com/photo-1588405748880-12d1d2a59f75?auto=format&fit=crop&w=1200&q=85',
      ingredients: 'https://images.unsplash.com/photo-1518531933037-91b2f5f229cc?auto=format&fit=crop&w=1200&q=85',
      lifestyle: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=1200&q=85',
    },
    notes: {
      top: [
        { name: 'Green Pear Nectar', origin: 'Anjou', description: 'Luminous fruity moisture that glistens on entry.' },
        { name: 'Star Anise', origin: 'Vietnam', description: 'Subtle licorice spice introducing seductive mystery.' },
        { name: 'Solar Aldehydes', origin: 'Grasse', description: 'Effervescent lift mimicking starlight on velvet.' },
      ],
      heart: [
        { name: 'Jasmine Sambac', origin: 'Madurai', description: 'Night-harvested flowers offering raw intoxicating narcotic bloom.' },
        { name: 'Tuberose Absolue', origin: 'Grasse', description: 'Creamy, rich lactonic petals that mesmerize.' },
        { name: 'Orange Blossom', origin: 'Seville', description: 'Honeyed floral embrace of royal elegance.' },
      ],
      base: [
        { name: 'Roasted Tonka Bean', origin: 'Venezuela', description: 'Warm almond-tobacco sweetness with dark depth.' },
        { name: 'Indonesian Patchouli', origin: 'Sumatra', description: 'Fractionated dark cocoa-earth foundation.' },
        { name: 'Black Vanilla', origin: 'Bourbon', description: 'Silky velvet sillage that lingers until morning.' },
      ],
    },
  },
];

export const DISCOVERY_COFFRET = {
  id: 'vanter-discovery-coffret',
  number: 'COFFRET',
  name: 'THE DISCOVERY COFFRET',
  slug: 'discovery-coffret',
  price: 2499,
  subtitle: 'Six signatures, 5 ml each. Find yours before you commit.',
  description: 'An invitation to experience the complete olfactive anthology of VANTÉR. Six 5 ml miniature flacons housed in our signature gold-embossed black linen coffret, accompanied by our Scent Ledger and testing blotters. The full purchase value is redeemable toward your first 100 ml flacon.',
  includes: [
    'N°01 Noir Absolu (5 ml)',
    'N°02 Ambre Doré (5 ml)',
    'N°03 Ivoire Santal (5 ml)',
    'N°04 Rose Velours (5 ml)',
    'N°05 Vétiver Blanc (5 ml)',
    'N°06 Nuit de Jasmin (5 ml)',
  ],
  perks: [
    'Full ₹2,499 redeemable against any 100 ml flacon within 60 days',
    'Complimentary artisanal brass engraving on coffret lid',
    'Hand-numbered certificate of batch authenticity',
    'Curated testing blotters & nose-cleansing coffee beans',
  ],
  image: 'https://images.unsplash.com/photo-1523293182086-7651a899d37f?auto=format&fit=crop&w=1200&q=85',
};

export const CRAFTSMANSHIP_STEPS = [
  {
    step: '01',
    title: 'Ethical Sourcing',
    subtitle: 'From Grasse to Assam',
    description: 'We partner directly with multi-generational botanists. Centifolia roses plucked at dawn in Grasse, wild oud from sustainable private reserves in Assam, and Mysore sandalwood harvested with government custody.',
    image: 'https://images.unsplash.com/photo-1509358271058-acd22cc93898?auto=format&fit=crop&w=1200&q=85',
  },
  {
    step: '02',
    title: 'Artisanal Distillation',
    subtitle: 'Slow steam & cold extraction',
    description: 'Ancient copper alembic stills running at calibrated temperatures yield fractions of unprecedented purity. No rushed shortcuts; the raw oils age in dark glass carboys for twelve weeks.',
    image: 'https://images.unsplash.com/photo-1608571423902-eed4a5ad8108?auto=format&fit=crop&w=1200&q=85',
  },
  {
    step: '03',
    title: '48h Cold Maceration',
    subtitle: 'The molecular alchemy',
    description: 'Unlike commercial perfumes diluted and bottled immediately, our concentrates undergo 48 hours of precise sub-zero thermal settling followed by 6 weeks of quiet barrel maceration.',
    image: 'https://images.unsplash.com/photo-1518531933037-91b2f5f229cc?auto=format&fit=crop&w=1200&q=85',
  },
  {
    step: '04',
    title: 'Hand-Finishing & Sealing',
    subtitle: 'Numbered flacons in heavy crystal',
    description: 'Each flacon is cast from lead-free heavyweight French glass, crowned with a magnetic zinc alloy cap, and hand-inspected under raking light before being sealed with the gold VANTÉR wax stamp.',
    image: 'https://images.unsplash.com/photo-1541643600914-78b084683601?auto=format&fit=crop&w=1200&q=85',
  },
];

export const TESTIMONIALS: Testimonial[] = [
  {
    id: 't-1',
    quote: 'Noir Absolu is hypnotic. It does not announce itself violently, but when you enter a room, heads turn as if pulled by gravity. The maceration quality is unmistakable.',
    author: 'Aurélien de Courcy',
    title: 'Fragrance Critic & Historian',
    location: 'Paris, France',
    rating: 5,
    fragrance: 'N°01 NOIR ABSOLU',
  },
  {
    id: 't-2',
    quote: 'Rose Velours is the first rose fragrance that doesn’t feel like my grandmother’s vanity. It is modern, fresh, slightly sharp, and deeply sensual after three hours.',
    author: 'Elena Rostova',
    title: 'Fashion Editor',
    location: 'Milan, Italy',
    rating: 5,
    fragrance: 'N°04 ROSE VELOURS',
  },
  {
    id: 't-3',
    quote: 'The craftsmanship of Ivoire Santal is extraordinary. The cardamom top note feels like cold silk against warm skin. An absolute masterpiece of quiet luxury.',
    author: 'Devendra Singhania',
    title: 'Architect & Collector',
    location: 'New Delhi, India',
    rating: 5,
    fragrance: 'N°03 IVOIRE SANTAL',
  },
  {
    id: 't-4',
    quote: 'I ordered the Discovery Coffret out of curiosity. Within 48 hours, I committed to Ambre Doré. The sillage lasts through an entire evening and into the next morning.',
    author: 'Clara Beaumont',
    title: 'Design Director',
    location: 'London, UK',
    rating: 5,
    fragrance: 'N°02 AMBRE DORÉ',
  },
];

export const JOURNAL_ARTICLES: JournalArticle[] = [
  {
    id: 'j-1',
    title: 'The Rituals of Layering Scent',
    slug: 'the-rituals-of-layering-scent',
    category: 'Savoir-Faire',
    date: 'OCTOBER 2026',
    readTime: '4 MIN READ',
    excerpt: 'How to harmonize woody bases with fresh floral crests to compose a bespoke sillage that belongs uniquely to your skin chemistry.',
    image: 'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&w=1200&q=85',
    author: 'Maison VANTÉR',
  },
  {
    id: 'j-2',
    title: 'Why Oud Is Liquid Gold',
    slug: 'why-oud-is-liquid-gold',
    category: 'Raw Materials',
    date: 'SEPTEMBER 2026',
    readTime: '6 MIN READ',
    excerpt: 'Journeying into the ancient forests of Assam to uncover why true Aquilaria resin commands greater value per ounce than fine bullion.',
    image: 'https://images.unsplash.com/photo-1608571423902-eed4a5ad8108?auto=format&fit=crop&w=1200&q=85',
    author: 'Nose & Formulator',
  },
  {
    id: 'j-3',
    title: 'A Note on Longevity & Maceration',
    slug: 'a-note-on-longevity-and-maceration',
    category: 'Craft & Science',
    date: 'AUGUST 2026',
    readTime: '5 MIN READ',
    excerpt: 'The critical difference between chemical boosters and authentic cold-cellar maturation: why our extraits endure without olfactory fatigue.',
    image: 'https://images.unsplash.com/photo-1547887537-6158d64c35b3?auto=format&fit=crop&w=1200&q=85',
    author: 'Master Perfumer',
  },
];

export const INSTAGRAM_POSTS = [
  {
    id: 'ig-1',
    image: 'https://images.unsplash.com/photo-1541643600914-78b084683601?auto=format&fit=crop&w=800&q=85',
    caption: 'Gold leaf and black glass. The tactile weight of N°01.',
  },
  {
    id: 'ig-2',
    image: 'https://images.unsplash.com/photo-1588405748880-12d1d2a59f75?auto=format&fit=crop&w=800&q=85',
    caption: 'Golden hour with Ambre Doré.',
  },
  {
    id: 'ig-3',
    image: 'https://images.unsplash.com/photo-1559563458-527698bf5295?auto=format&fit=crop&w=800&q=85',
    caption: 'Centifolia roses harvested at 06:14 AM in Grasse.',
  },
  {
    id: 'ig-4',
    image: 'https://images.unsplash.com/photo-1592945403244-b3fbafd7f539?auto=format&fit=crop&w=800&q=85',
    caption: 'Architectural serenity. Ivoire Santal.',
  },
  {
    id: 'ig-5',
    image: 'https://images.unsplash.com/photo-1615397349754-cfa2066a298e?auto=format&fit=crop&w=800&q=85',
    caption: 'Sub-zero thermal maceration in our glass cellars.',
  },
  {
    id: 'ig-6',
    image: 'https://images.unsplash.com/photo-1541643600914-78b084683601?auto=format&fit=crop&w=800&q=85',
    caption: 'The night blooms. N°06 flacon against velvet.',
  },
];

export const MARQUEE_WORDS = [
  'WILD ASSAM OUD',
  'BALTIC AMBER',
  'MYSORE SANDALWOOD',
  'ROSE DE MAI',
  'HAITIAN VETIVER',
  'CALABRIAN BERGAMOT',
  'FLORENTINE ORRIS',
  'MADAGASCAR VANILLA',
];

