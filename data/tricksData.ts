
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

const summaries: Record<DifficultyLevel, string[]> = {
  Beginner: [
    'This classic trick is perfect for beginners and creates an amazing visual effect. The secret lies in simple sleight of hand that anyone can master with practice.',
    'A straightforward yet impressive trick that will leave your audience wondering how you did it. The method is easy to learn but powerful in execution.',
    'An excellent starting point for aspiring magicians. This trick teaches fundamental techniques while delivering a strong magical moment.',
    'One of the most popular beginner tricks that never fails to amaze. The secret is simple, but the impact is profound.',
    'A visual masterpiece that requires minimal setup but maximum practice. Perfect for close-up performances.'
  ],
  Intermediate: [
    'This intermediate-level trick builds on basic techniques and introduces more complex handling. The effect is stunning and worth the extra practice required.',
    'A step up from beginner material, this trick requires good timing and misdirection. When performed well, it creates an impossible moment.',
    'This classic effect has fooled magicians for decades. The method is clever and the presentation possibilities are endless.',
    'An intermediate trick that combines multiple techniques into one seamless routine. Practice each phase separately before putting it all together.',
    'This effect requires confidence and smooth handling. The payoff is a trick that looks truly impossible to your audience.'
  ],
  Advanced: [
    'A masterpiece of magic that requires dedication to master. This trick combines advanced sleight of hand with psychological principles for a devastating effect.',
    'One of the most challenging tricks in magic, but also one of the most rewarding. Every detail matters in this sophisticated routine.',
    'This advanced effect pushes the boundaries of what seems possible. Mastering this trick will elevate your magic to a professional level.',
    'A complex routine that requires perfect timing, misdirection, and technical skill. This is magic at its finest.',
    'The holy grail of this category. This trick has fooled experts and laypeople alike. Prepare to invest significant time in mastering every nuance.'
  ]
};

const methods: Record<DifficultyLevel, string[]> = {
  Beginner: [
    'The method relies on a simple palm technique. Hold the object naturally in your hand, keeping your fingers relaxed. Practice in front of a mirror until the move looks effortless.',
    'This uses a basic force technique. Guide the spectator\'s choice subtly while making them feel they have complete freedom. The key is confidence.',
    'The secret involves a clever setup that takes just seconds. Position everything naturally before you begin, and the trick practically works itself.',
    'This method uses misdirection at the perfect moment. When you draw attention to one hand, the other hand does the secret work.',
    'A simple gimmick does most of the work here. The gimmick is easy to make and even easier to use, but practice your handling to keep it hidden.'
  ],
  Intermediate: [
    'The method combines a double lift with a color change. Master each technique separately, then blend them together smoothly. Timing is everything.',
    'This uses a clever switch at a critical moment. The switch happens when the audience is focused elsewhere. Practice the timing until it becomes second nature.',
    'The method involves a special preparation that must be done in advance. Once prepared, the trick flows naturally, but the setup is crucial.',
    'This technique uses a combination of palming and misdirection. Your patter and presentation are just as important as the physical technique.',
    'The secret is a sophisticated handling that requires muscle memory. Practice the moves slowly at first, gradually building up speed and smoothness.'
  ],
  Advanced: [
    'This method requires mastery of multiple advanced techniques executed in perfect sequence. Each move must be invisible, and the timing must be flawless.',
    'The secret involves a complex system that must be memorized completely. There are no shortcuts - you must know every detail by heart.',
    'This uses an advanced principle that few magicians understand. Study the theory carefully before attempting the practical application.',
    'The method combines physical technique with psychological manipulation. You must control not just the props, but also the audience\'s perception and memory.',
    'This requires perfect execution of an extremely difficult sleight. Even small mistakes will be noticed. Practice thousands of times before performing.'
  ]
};

function generateSteps(difficulty: DifficultyLevel, trickName: string): any[] {
  const stepCounts = { Beginner: 5, Intermediate: 7, Advanced: 10 };
  const count = stepCounts[difficulty];
  
  return Array.from({ length: count }, (_, i) => ({
    id: `step-${i + 1}`,
    stepNumber: i + 1,
    instruction: `Step ${i + 1}: ${trickName} - ${difficulty} level instruction. Practice this movement carefully and ensure smooth execution.`,
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

    difficulties.forEach((difficulty, diffIndex) => {
      const tricksForDifficulty = names[difficulty];
      
      tricksForDifficulty.forEach((trickName, nameIndex) => {
        tricks.push({
          id: `trick-${trickId}`,
          title: trickName,
          category,
          difficulty,
          description: `Learn the amazing ${trickName} trick. This ${difficulty.toLowerCase()} level ${category.toLowerCase()} trick will amaze your audience!`,
          summary: summaries[difficulty][nameIndex % summaries[difficulty].length],
          method: methods[difficulty][nameIndex % methods[difficulty].length],
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
