
import { Trick, TrickCategory, DifficultyLevel } from '@/types/tricks';

const categories: TrickCategory[] = ['Card Tricks', 'Coin Tricks', 'Mind Reading', 'Close Up Magic', 'Illusions'];
const difficulties: DifficultyLevel[] = ['Beginner', 'Intermediate', 'Advanced'];

const cardTrickNames = {
  Beginner: ['The Four Aces', 'Simple Card Prediction', 'Card to Pocket', 'The Rising Card', 'Color Change'],
  Intermediate: ['Ambitious Card', 'Card Through Window', 'Invisible Deck', 'Triumph', 'Out of This World'],
  Advanced: ['ACAAN', 'Card Warp', 'Hofzinser Ace Problem', 'The Berglas Effect', 'Memorized Deck Routine']
};

const coinTrickNames = {
  Beginner: ['Coin Vanish', 'Coin Through Table', 'French Drop', 'Coin Behind Ear', 'Coin Roll'],
  Intermediate: ['Coin Matrix', 'Spellbound', 'Coins Across', 'Coin in Bottle', 'Hanging Coin'],
  Advanced: ['Coin Assembly', 'Copper Silver Brass', 'Coin Cascade', 'Coin Through Glass', 'Misers Dream']
};

const mindReadingNames = {
  Beginner: ['Number Prediction', 'Color Divination', 'Book Test Basic', 'Name Reveal', 'Drawing Duplication'],
  Intermediate: ['Center Tear', 'Psychological Force', 'Dual Reality', 'Propless Prediction', 'Instant Stooge'],
  Advanced: ['Acidus Novus', 'Pegasus Page', 'Thought Transmission', 'Multiple Out System', 'Anagram Revelation']
};

const closeUpMagicNames = {
  Beginner: ['Rubber Band Magic', 'Sponge Balls', 'Cups and Balls Basic', 'Ring on String', 'Linking Paperclips'],
  Intermediate: ['Linking Rings', 'Rope Through Neck', 'Bill in Lemon', 'Torn and Restored', 'Multiplying Sponges'],
  Advanced: ['Chop Cup Routine', 'Ring Flight', 'Cigarette Through Coin', 'Needle Through Arm', 'Salt Pour']
};

const illusionNames = {
  Beginner: ['Floating Card', 'Levitating Ring', 'Balancing Act', 'Gravity Defying Bottle', 'Floating Bill'],
  Intermediate: ['Zombie Ball', 'Floating Table', 'Sword Suspension', 'Levitation Basic', 'Penetration Frame'],
  Advanced: ['Full Body Levitation', 'Sawing in Half', 'Metamorphosis', 'Sub Trunk', 'Origami Illusion']
};

const itemsByCategory: Record<TrickCategory, string[][]> = {
  'Card Tricks': [
    ['Deck of cards'],
    ['Deck of cards', 'Table'],
    ['Deck of cards', 'Pocket'],
    ['Deck of cards', 'Thread'],
    ['Deck of cards', 'Double-sided card'],
    ['Deck of cards', 'Duplicate card'],
    ['Deck of cards', 'Window'],
    ['Special deck', 'Regular deck'],
    ['Deck of cards', 'Table'],
    ['Two decks of cards'],
    ['Deck of cards', 'Spectator'],
    ['Special gimmick', 'Deck of cards'],
    ['Memorized deck', 'Table'],
    ['Deck of cards', 'Preparation'],
    ['Memorized deck', 'Performance space']
  ],
  'Coin Tricks': [
    ['Coin', 'Hand'],
    ['Coin', 'Table'],
    ['Coin'],
    ['Coin'],
    ['Coin', 'Fingers'],
    ['Four coins', 'Mat'],
    ['Two coins', 'Different metals'],
    ['Three coins', 'Spectator'],
    ['Coin', 'Bottle'],
    ['Coin', 'String'],
    ['Four coins', 'Close-up mat'],
    ['Three coins', 'Different metals'],
    ['Multiple coins'],
    ['Coin', 'Glass'],
    ['Coins', 'Bag']
  ],
  'Mind Reading': [
    ['Paper', 'Pen'],
    ['Color swatches'],
    ['Book', 'Paper'],
    ['Paper', 'Pen'],
    ['Paper', 'Pen', 'Drawing pad'],
    ['Paper', 'Envelope'],
    ['Nothing required'],
    ['Nothing required'],
    ['Paper', 'Pen'],
    ['Spectator'],
    ['Special gimmick', 'Preparation'],
    ['Book', 'Special preparation'],
    ['Nothing required'],
    ['Multiple predictions', 'Envelopes'],
    ['Paper', 'Pen', 'Dictionary']
  ],
  'Close Up Magic': [
    ['Rubber band'],
    ['Sponge balls'],
    ['Cups', 'Balls'],
    ['Ring', 'String'],
    ['Paperclips'],
    ['Linking rings'],
    ['Rope'],
    ['Bill', 'Lemon', 'Preparation'],
    ['Paper', 'Napkin'],
    ['Sponge balls'],
    ['Chop cup', 'Ball'],
    ['Ring', 'Special gimmick'],
    ['Cigarette', 'Coin', 'Gimmick'],
    ['Needle', 'Thread'],
    ['Salt shaker', 'Gimmick']
  ],
  'Illusions': [
    ['Playing card', 'Thread'],
    ['Ring', 'Thread'],
    ['Object to balance'],
    ['Bottle', 'Special preparation'],
    ['Bill', 'Thread'],
    ['Ball', 'Gimmick'],
    ['Table', 'Special construction'],
    ['Sword', 'Box'],
    ['Assistant', 'Platform'],
    ['Frame', 'Object'],
    ['Assistant', 'Platform', 'Preparation'],
    ['Box', 'Assistant', 'Saw'],
    ['Assistant', 'Cabinet', 'Trunk'],
    ['Two trunks', 'Assistant'],
    ['Paper', 'Special construction']
  ]
};

const estimatedTimes = [5, 8, 10, 7, 6, 12, 15, 18, 14, 16, 20, 25, 22, 28, 30];

const summaries: Record<string, string> = {
  'Card Tricks': 'Master the art of card manipulation and sleight of hand. This trick will leave your audience wondering how you achieved the impossible with just a deck of cards.',
  'Coin Tricks': 'Learn the secrets of coin magic and misdirection. Watch as coins appear, disappear, and travel in ways that defy logic and physics.',
  'Mind Reading': 'Develop your mentalism skills and create the illusion of reading minds. This psychological trick will make your audience believe you have supernatural abilities.',
  'Close Up Magic': 'Perfect your close-up performance skills with everyday objects. These intimate tricks create powerful moments of wonder right in front of your audience.',
  'Illusions': 'Create stunning visual illusions that challenge perception. These larger-scale tricks will captivate audiences with their dramatic and impossible appearances.'
};

const methods: Record<string, string> = {
  'Beginner': 'This trick relies on basic sleight of hand and misdirection. Practice the fundamental moves slowly until they become second nature. The key is to make your movements look natural and effortless.',
  'Intermediate': 'This method combines multiple techniques including advanced palming, false shuffles, and psychological misdirection. Master each component separately before combining them into the full routine.',
  'Advanced': 'This sophisticated method requires precise timing, advanced sleight of hand, and deep understanding of audience psychology. Study the theory behind each move and practice extensively before performing.'
};

function generateSteps(difficulty: DifficultyLevel, trickName: string): any[] {
  const stepCounts = { Beginner: 5, Intermediate: 7, Advanced: 10 };
  const count = stepCounts[difficulty];
  
  return Array.from({ length: count }, (_, i) => ({
    id: `step-${i + 1}`,
    stepNumber: i + 1,
    instruction: `Step ${i + 1}: ${trickName} - ${difficulty} level instruction. Practice this movement carefully and ensure smooth execution. Focus on your timing and misdirection to create the perfect illusion.`,
    completed: false
  }));
}

export function generateAllTricks(): Trick[] {
  const tricks: Trick[] = [];
  let trickId = 1;
  let itemIndex = 0;

  categories.forEach((category) => {
    const names = category === 'Card Tricks' ? cardTrickNames :
                  category === 'Coin Tricks' ? coinTrickNames :
                  category === 'Mind Reading' ? mindReadingNames :
                  category === 'Close Up Magic' ? closeUpMagicNames :
                  illusionNames;

    difficulties.forEach((difficulty) => {
      const tricksForDifficulty = names[difficulty];
      
      tricksForDifficulty.forEach((trickName) => {
        tricks.push({
          id: `trick-${trickId}`,
          title: trickName,
          category,
          difficulty,
          description: `Learn the amazing ${trickName} trick. This ${difficulty.toLowerCase()} level ${category.toLowerCase()} trick will amaze your audience!`,
          summary: summaries[category],
          method: methods[difficulty],
          itemsNeeded: itemsByCategory[category][itemIndex % itemsByCategory[category].length],
          estimatedTime: estimatedTimes[itemIndex % estimatedTimes.length],
          steps: generateSteps(difficulty, trickName),
          isFavorite: false,
          progress: 0
        });
        trickId++;
        itemIndex++;
      });
    });
  });

  return tricks;
}
