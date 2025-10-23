
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

// Detailed summaries for each trick
const trickSummaries: Record<string, string> = {
  // Card Tricks - Beginner
  'The Four Aces': 'A classic card trick where all four aces magically appear together after being lost in the deck. The spectator shuffles the deck, yet you can still locate all four aces instantly. This is a perfect opener that demonstrates your control over the cards and sets the tone for more advanced tricks.',
  'Simple Card Prediction': 'You write down a prediction before the trick begins, then have a spectator freely select a card. When they reveal their choice, your prediction matches perfectly. This trick teaches the fundamentals of forcing and prediction reveals, essential skills for any card magician.',
  'Card to Pocket': 'A spectator selects and signs a card, which is then lost in the deck. With a snap of your fingers, their signed card vanishes from the deck and appears in your pocket. This trick combines sleight of hand with misdirection to create an impossible moment. The card-to-pocket trick typically uses a sleight-of-hand technique called "palming" to secretly get a chosen card into your pocket. A version that does not require palming is possible by using a distraction technique.',
  'The Rising Card': 'A selected card mysteriously rises from the deck on command. The spectator chooses any card, returns it to the deck, and watches as it slowly rises up as if controlled by an invisible force. This visual trick creates a haunting, supernatural effect.',
  'Color Change': 'With a simple wave of your hand, one card instantly transforms into another right before the spectator\'s eyes. This lightning-fast visual change happens in plain sight and can be repeated multiple times. It\'s one of the most visually stunning moves in card magic.',
  
  // Card Tricks - Intermediate
  'Ambitious Card': 'The spectator\'s signed card repeatedly jumps to the top of the deck no matter how many times it\'s placed in the middle. Each time it rises, the impossibility increases. This multi-phase routine builds in intensity and is a favorite among professional magicians.',
  'Card Through Window': 'A signed card vanishes from the deck and appears pressed against a window from the outside. The spectator can see their signature through the glass. This trick takes card magic beyond the table and creates a moment of pure astonishment.',
  'Invisible Deck': 'You ask a spectator to merely think of any card. You then pull out a deck and spread it face-up, revealing that one card is face-down - and it\'s their thought-of card. This powerful mentalism effect requires minimal sleight of hand but maximum presentation.',
  'Triumph': 'After the deck is shuffled face-up into face-down, you cause all the cards to magically right themselves - except for the spectator\'s selected card. This trick demonstrates impossible control and is considered one of the greatest card tricks ever invented.',
  'Out of This World': 'A spectator separates a shuffled deck into red and black cards while the cards are face-down, achieving perfect separation. This self-working miracle requires no sleight of hand but creates an effect that seems genuinely impossible.',
  
  // Card Tricks - Advanced
  'ACAAN': 'Any Card At Any Number - the holy grail of card magic. A spectator names any card and any number. You count down to that exact number in the deck and find their named card. This requires advanced technique and perfect execution.',
  'Card Warp': 'A card visibly warps and bends, turning face-up in the middle of face-down cards. The card appears to exist in two states simultaneously. This optical illusion combined with sleight of hand creates a mind-bending visual effect.',
  'Hofzinser Ace Problem': 'Four aces are placed in different parts of the deck, yet they all gather together in an impossible location. This classic problem has been solved in many ways, and mastering it demonstrates true card handling expertise.',
  'The Berglas Effect': 'Considered by many as the ultimate card trick. A spectator names any card and any number before you even touch the deck. The deck is spread and their card is at their number. This requires years of practice and perfect psychological technique.',
  'Memorized Deck Routine': 'Using a memorized deck system, you can perform miracles that seem impossible. Instantly name any card at any position, spell to cards, and perform mathematical impossibilities. This requires dedication to memorize the stack but opens unlimited possibilities.',
  
  // Coin Tricks - Beginner
  'Coin Vanish': 'A coin completely disappears from your hand in an instant. One moment it\'s there, the next it\'s gone. This fundamental technique is the building block for countless coin tricks and teaches the basics of palming and misdirection.',
  'Coin Through Table': 'A coin penetrates through a solid table surface, appearing underneath. The spectator can hear and see the coin pass through the impossible barrier. This trick teaches timing and the art of creating a convincing illusion.',
  'French Drop': 'The classic coin vanish technique where you appear to take a coin from one hand to the other, but it secretly remains in the original hand. This foundational move is used in countless coin routines and must be mastered for smooth, natural-looking vanishes.',
  'Coin Behind Ear': 'The classic production where a coin appears from behind someone\'s ear. While simple, when performed with proper misdirection and showmanship, this creates a delightful moment of surprise, especially for younger audiences.',
  'Coin Roll': 'A coin visibly rolls across your knuckles in a mesmerizing display of dexterity. While not a trick in itself, this flourish demonstrates skill and serves as excellent misdirection for other coin moves. It\'s a beautiful display of coin manipulation.',
  
  // Coin Tricks - Intermediate
  'Coin Matrix': 'Four coins are placed at the corners of a mat. One by one, they invisibly travel to gather under a single card. This classic close-up trick combines multiple sleights and creates a visual journey that spectators can follow.',
  'Spellbound': 'A silver coin transforms into a copper coin repeatedly in your open hand. The changes happen in full view with no cover. This visual trick requires smooth technique and creates a stunning color-changing effect.',
  'Coins Across': 'Coins invisibly travel from one hand to the other. The spectator can count the coins before and after, witnessing the impossible journey. This trick teaches advanced palming and timing while creating a clear, impossible effect.',
  'Coin in Bottle': 'A signed coin penetrates through the bottom of a sealed bottle. The spectator can see and hear their coin inside the bottle, yet the bottle remains intact. This trick creates a permanent impossible object they can examine.',
  'Hanging Coin': 'A coin appears to defy gravity, hanging suspended in mid-air or balanced in impossible positions. This visual illusion combined with clever technique creates a moment that seems to break the laws of physics.',
  
  // Coin Tricks - Advanced
  'Coin Assembly': 'Four coins placed under four cards gather together under one card in increasingly impossible ways. This advanced routine requires perfect timing, multiple palming techniques, and smooth handling to create a seamless impossible assembly.',
  'Copper Silver Brass': 'Three different coins repeatedly change places in impossible ways. The routine builds in complexity with each phase, demonstrating complete mastery over the coins. This classic requires advanced palming and perfect timing.',
  'Coin Cascade': 'Multiple coins appear to cascade from your fingertips in an endless stream. This production technique creates a visual spectacle and demonstrates advanced manipulation skills. The coins seem to multiply from thin air.',
  'Coin Through Glass': 'A coin penetrates through the bottom of a solid glass in full view. The spectator can see the coin pass through the impossible barrier. This requires perfect timing and angle management to create a visual miracle.',
  'Misers Dream': 'Coins are produced from thin air and dropped into a bucket, creating an audible and visual production. This classic stage trick can be performed close-up and demonstrates advanced production techniques and showmanship.',
  
  // Mind Reading - Beginner
  'Number Prediction': 'You predict a number that a spectator will think of before they even choose it. When revealed, your prediction matches perfectly. This introduces the concept of forcing and prediction in mentalism.',
  'Color Divination': 'A spectator thinks of a color, and you reveal their thought. This simple effect teaches the basics of psychological forcing and reading subtle cues. It\'s a perfect introduction to mentalism.',
  'Book Test Basic': 'A spectator opens a book to any page and thinks of a word. You reveal the exact word they\'re thinking of. This classic mentalism effect teaches the fundamentals of book tests and verbal reveals.',
  'Name Reveal': 'A spectator thinks of a name - someone important to them. Through apparent mind reading, you reveal the name they\'re thinking of. This personal effect creates an emotional connection with your audience.',
  'Drawing Duplication': 'A spectator draws a simple picture, and you duplicate it without seeing their drawing. This visual mentalism effect teaches the basics of peek techniques and psychological principles.',
  
  // Mind Reading - Intermediate
  'Center Tear': 'A spectator writes something secret on paper, tears it up, and you reveal what they wrote. This classic mentalism technique allows you to secretly glimpse information while appearing to destroy it. It\'s a fundamental skill for mentalists.',
  'Psychological Force': 'You influence a spectator to make a specific choice while they believe they have complete free will. This teaches advanced psychological principles and subtle influence techniques used by professional mentalists.',
  'Dual Reality': 'Different spectators experience different realities of the same event, allowing you to create impossible predictions. This advanced principle opens up new possibilities in mentalism and requires careful scripting.',
  'Propless Prediction': 'You make predictions without any props, using only your words and psychological techniques. This teaches pure mentalism principles and how to create strong effects with nothing but your mind and presentation.',
  'Instant Stooge': 'You secretly recruit a spectator to help you during the performance without them realizing they\'re helping. This advanced technique teaches subtle communication and how to create impossible effects through collaboration.',
  
  // Mind Reading - Advanced
  'Acidus Novus': 'An advanced book test where multiple spectators choose different words, and you reveal all of them in increasingly impossible ways. This requires perfect memory work and multiple techniques working together.',
  'Pegasus Page': 'A sophisticated book test system that allows for completely free choices and clean reveals. This advanced technique requires preparation and perfect execution but creates a truly impossible effect.',
  'Thought Transmission': 'You transmit a thought directly into a spectator\'s mind, causing them to think of exactly what you want. This advanced mentalism effect requires deep understanding of psychology and perfect presentation.',
  'Multiple Out System': 'You make multiple predictions that can be revealed in different ways depending on the spectator\'s choices. This advanced system allows you to always be correct no matter what happens.',
  'Anagram Revelation': 'A spectator thinks of a word, and you reveal it through an anagram system that appears completely fair. This linguistic mentalism effect requires quick thinking and advanced technique.',
  
  // Close Up Magic - Beginner
  'Rubber Band Magic': 'A rubber band jumps from one finger to another, or links with another rubber band in impossible ways. This accessible trick teaches the basics of close-up magic using everyday objects.',
  'Sponge Balls': 'Soft sponge balls multiply, vanish, and appear in spectators\' hands. This tactile magic creates a playful, interactive experience. The soft nature of sponge balls makes them perfect for learning palming techniques.',
  'Cups and Balls Basic': 'The oldest trick in magic - balls appear, vanish, and travel under cups. This foundational routine teaches the core principles of misdirection, timing, and audience management that apply to all magic.',
  'Ring on String': 'A borrowed ring penetrates onto a string in impossible ways. The spectator can examine everything before and after. This teaches the principles of penetration effects and how to use borrowed objects.',
  'Linking Paperclips': 'Ordinary paperclips link together in impossible ways. This impromptu trick can be performed anywhere with office supplies and teaches the basics of linking effects and natural handling.',
  
  // Close Up Magic - Intermediate
  'Linking Rings': 'Solid metal rings link and unlink in impossible ways. This classic of magic requires smooth handling and creates beautiful visual moments. It\'s a staple of close-up and parlor magic.',
  'Rope Through Neck': 'A rope appears to pass through your neck in a visual and slightly disturbing effect. This teaches advanced rope handling and creates a memorable moment that audiences won\'t forget.',
  'Bill in Lemon': 'A signed bill vanishes and appears inside an ordinary lemon. The spectator can cut open the lemon and find their bill inside. This requires preparation but creates an impossible object they can keep.',
  'Torn and Restored': 'A piece of paper or napkin is torn into pieces and visibly restored to its original state. This visual restoration effect teaches important principles about restoration magic and misdirection.',
  'Multiplying Sponges': 'Sponge balls multiply in your hands and in spectators\' hands. This routine builds on basic sponge ball work and creates an escalating series of impossibilities that build to a climax.',
  
  // Close Up Magic - Advanced
  'Chop Cup Routine': 'A ball appears, vanishes, and travels under a cup in increasingly impossible ways, culminating in a final surprise load. This advanced routine requires perfect timing and multiple techniques.',
  'Ring Flight': 'A borrowed ring vanishes and appears in an impossible location - often inside a nested set of boxes or containers. This requires advanced preparation and creates a powerful souvenir effect.',
  'Cigarette Through Coin': 'A cigarette visibly penetrates through the center of a solid coin. This visual penetration effect requires a special gimmick and perfect angle management to create a stunning visual moment.',
  'Needle Through Arm': 'A needle appears to penetrate through your arm with no harm. This shocking effect requires perfect technique and presentation to create a safe but disturbing illusion.',
  'Salt Pour': 'Salt is poured into your closed fist and vanishes completely. This classic effect requires advanced palming and perfect timing to create a clean vanish of a granular substance.',
  
  // Illusions - Beginner
  'Floating Card': 'A playing card floats mysteriously in the air, moving at your command. This introduces the basics of levitation effects and thread work, creating an eerie, supernatural moment.',
  'Levitating Ring': 'A borrowed ring floats and moves around your hands. This teaches the fundamentals of levitation and creates an intimate impossible moment with a borrowed object.',
  'Balancing Act': 'Objects balance in impossible positions, defying gravity. This teaches the principles of balance illusions and how to create impossible-looking moments with everyday objects.',
  'Gravity Defying Bottle': 'A bottle balances at an impossible angle or appears to defy gravity. This visual illusion teaches the principles of center of gravity and creates a photograph-worthy moment.',
  'Floating Bill': 'A dollar bill floats and dances in the air at your command. This teaches basic levitation technique and creates a visual effect that can be performed impromptu.',
  
  // Illusions - Intermediate
  'Zombie Ball': 'A ball floats mysteriously under a cloth, moving in impossible ways. This classic parlor illusion creates an eerie, supernatural effect and teaches advanced manipulation under cover.',
  'Floating Table': 'A small table levitates and floats around you. This larger illusion teaches the principles of stage levitation and creates a dramatic visual effect for parlor or stage performance.',
  'Sword Suspension': 'A person appears to be suspended on the point of a sword. This dramatic illusion teaches the principles of suspension effects and creates a dangerous-looking moment.',
  'Levitation Basic': 'A person appears to float in the air. This teaches the fundamentals of levitation illusions and how to create the appearance of defying gravity with a human subject.',
  'Penetration Frame': 'Objects or people appear to penetrate through a solid frame. This teaches the principles of penetration illusions and how to create impossible moments with larger props.',
  
  // Illusions - Advanced
  'Full Body Levitation': 'A person floats high in the air with no visible support. This advanced illusion requires careful setup and perfect presentation to create a truly impossible levitation effect.',
  'Sawing in Half': 'A person is placed in a box and apparently sawed in half, yet emerges unharmed. This classic illusion teaches the principles of division effects and requires an assistant and special apparatus.',
  'Metamorphosis': 'Two people instantly switch places in a locked trunk. This lightning-fast illusion requires perfect timing and coordination between performer and assistant to create an instant transposition.',
  'Sub Trunk': 'A person is locked in a trunk, covered with a curtain, and instantly switches places with the magician. This classic illusion requires two trunks and perfect timing for the switch.',
  'Origami Illusion': 'A person appears to be folded into an impossibly small space. This modern illusion creates a visual impossibility and requires special construction and perfect presentation.'
};

// Detailed methods for each trick
const trickMethods: Record<string, string> = {
  // Card Tricks - Beginner
  'The Four Aces': 'This trick uses a simple setup where the four aces are secretly positioned on top of the deck before you begin. When you perform a false shuffle, the aces remain in position. You then use a basic double lift technique to show cards while keeping the aces hidden. The key is to make your false shuffle look natural and casual. Practice the double lift until it\'s smooth and indistinguishable from turning over a single card. The misdirection comes from your patter about the spectator shuffling, while you maintain control of the aces throughout.',
  'Simple Card Prediction': 'This method relies on a classic force - you control which card the spectator "freely" chooses. Before the trick, you glimpse the bottom card of the deck and write it as your prediction. During the selection process, you use a riffle force or Hindu shuffle force to ensure the spectator takes the card you want. The force must look completely fair and natural. Practice the force until you can do it smoothly without hesitation. Your confidence in the force is what sells the trick.',
  'Card to Pocket': 'The method uses a palm and switch technique. When the spectator signs their card, you secretly palm a duplicate card. The signed card goes into your pocket during a natural gesture. You then show the duplicate card and make it "vanish" using a simple vanish technique. The key is to have a natural reason to put your hand in your pocket early in the trick. Practice palming until the card is invisible in your hand and your hand looks natural.',
  'The Rising Card': 'This uses a simple thread or invisible thread attached to the card. The thread runs from the card, behind the deck, and to a point you can control (often your button or belt). By moving slightly, you create tension that makes the card rise. The key is to set up the thread beforehand and keep the deck angled so the thread isn\'t visible. Practice the setup until you can do it quickly and naturally.',
  'Color Change': 'The method uses a technique called the "snap change" or "erdnase color change." You hold one card on top of the deck, and with a quick motion, you snap your fingers while secretly sliding the top card over the face card. The motion must be quick and decisive. Practice in front of a mirror to ensure the change is invisible from the spectator\'s angle. The key is to make the motion look like a simple wave rather than a deliberate move.',
  
  // Card Tricks - Intermediate
  'Ambitious Card': 'This routine combines multiple techniques: double lifts, top palms, and the classic pass. Each time the card appears on top, you use a different method to create variety. The first phase uses a simple double lift. The second phase uses a top palm to secretly keep the card on top while appearing to place it in the middle. Later phases use more advanced techniques like the pass or side steal. Practice each phase separately until smooth, then combine them into a flowing routine.',
  'Card Through Window': 'This requires advance preparation. Before the performance, you stick a duplicate of the force card to the outside of a window using a special adhesive. During the trick, you force this card on the spectator and have them sign it. You then switch their signed card for another card using a palm and switch. The "signed" card they see on the window is actually the duplicate you prepared. The key is choosing a window location that makes sense in your performance context.',
  'Invisible Deck': 'This uses a special deck where the cards are lightly stuck together in pairs, face to face. When you spread the deck, all cards appear face-up except for one face-down card. The deck is arranged so that every card has its mate next to it. When the spectator names a card, you know its mate is next to it. You carefully separate that pair and show the named card face-down. The key is to handle the deck smoothly so the stuck cards don\'t separate accidentally.',
  'Triumph': 'The method uses a combination of a zarrow shuffle (which maintains the order of cards while appearing to mix them) and a special handling. After apparently shuffling cards face-up into face-down, you actually have all cards facing the same direction. You then use a special spread to show them face-up while hiding the selected card, which you\'ve secretly turned face-down. The key is mastering the zarrow shuffle so it looks like a genuine mix.',
  'Out of This World': 'This is a self-working trick that uses a clever setup and dealing procedure. You secretly arrange the deck so the first half is all red cards and the second half is all black cards. Through a series of deals and false choices, you guide the spectator to deal the cards into two piles that end up separated by color. The method is in the presentation - you must make it seem like the spectator has complete free choice when you\'re actually controlling the outcome through the dealing procedure.',
  
  // Card Tricks - Advanced
  'ACAAN': 'This advanced effect requires a memorized deck system (like the Aronson or Mnemonica stack). You must memorize the position of every card in the deck. When a spectator names a card and number, you use advanced techniques like the classic pass, spread cull, or multiple shifts to secretly move the named card to the named position. Some versions use mathematical principles combined with false shuffles. The key is perfect memorization and smooth execution of multiple advanced moves.',
  'Card Warp': 'This uses a special folding technique combined with optical illusion. You fold a card lengthwise and insert another card into the fold. Through careful handling and angles, you create the illusion that the inserted card is face-up when it\'s actually face-down, or vice versa. The method relies on precise folding and perfect angle control. Practice in front of a mirror to find the exact angles where the illusion works best.',
  'Hofzinser Ace Problem': 'This classic uses a combination of palming, false counts, and the classic pass. The four aces are controlled throughout the trick using advanced techniques. Some versions use the Elmsley count to hide extra cards, while others use perfect palming to keep aces hidden. The method requires mastery of multiple advanced techniques working together seamlessly. Each phase builds on the previous one, requiring perfect timing and smooth handling.',
  'The Berglas Effect': 'This legendary effect uses a combination of a memorized deck, psychological forcing, and perfect presentation. You must memorize the deck order and use subtle psychological techniques to influence the spectator\'s choices. Some versions use a confederate or dual reality principles. The method requires years of practice in psychology, memorization, and presentation. The key is making the spectator believe they had complete free choice when you\'ve actually guided them through subtle influence.',
  'Memorized Deck Routine': 'This uses a memorized stack system like Aronson or Mnemonica. You must memorize the exact position of all 52 cards. Once memorized, you can instantly know what card is at any position or what position any card is at. You can perform mathematical calculations, spell to cards, and create impossible predictions. The method is pure memory work - you must practice daily until the stack is permanently memorized. The key is making the effects seem magical rather than mathematical.',
  
  // Coin Tricks - Beginner
  'Coin Vanish': 'The basic method uses a classic palm - you appear to take the coin with one hand while secretly retaining it in the other hand. The key is to make the "taking" hand move naturally as if it contains the coin, while the hand with the coin remains relaxed and natural. Practice in front of a mirror until your empty hand looks exactly like it contains a coin. The misdirection comes from following the empty hand with your eyes while the hand with the coin moves naturally to a resting position.',
  'Coin Through Table': 'This uses a lap technique combined with misdirection. You secretly drop the coin into your lap while appearing to place it on the table. Your other hand then produces a duplicate coin from underneath the table. The key is to have a natural reason to bring your hand to the edge of the table. Practice the lap move until it\'s silent and invisible. The sound of the coin hitting underneath the table (created by clicking your fingernail) sells the illusion.',
  'French Drop': 'This classic technique involves appearing to take a coin from your palm with your other hand, but actually retaining it in the original hand. The taking hand closes as if it contains the coin, while the original hand naturally drops to your side with the coin palmed. The key is to make the taking motion look exactly like you actually took the coin. Practice until the retention is invisible and your hands move naturally.',
  'Coin Behind Ear': 'The method uses a simple finger palm or classic palm. You have the coin hidden in your hand, then reach behind the spectator\'s ear and produce it. The key is to have a natural reason to bring your hand near their ear. Practice the production so the coin appears smoothly and naturally. The misdirection comes from your patter about finding something behind their ear, which directs attention away from your hand.',
  'Coin Roll': 'This flourish uses gravity and finger dexterity. The coin rolls across your knuckles using a series of small movements. Each finger lifts slightly to allow the coin to roll to the next knuckle. The key is to keep your hand tilted at the right angle and make small, controlled movements. Practice slowly at first, then gradually increase speed. This takes time to master but creates a beautiful visual effect.',
  
  // Coin Tricks - Intermediate
  'Coin Matrix': 'This uses a combination of palming techniques and misdirection. You secretly palm coins and load them under cards while appearing to show your hands empty. The method involves classic palms, finger palms, and perfect timing. Each phase uses a different technique to move the coins. The key is to make each move look natural and to use the cards as cover for your palming. Practice each phase separately until smooth.',
  'Spellbound': 'This uses a technique where you hold a copper coin in finger palm while showing a silver coin. With a quick motion, you switch the coins while making it appear the silver coin transforms. The method requires perfect finger palm technique and smooth switching. The key is to make the switch during a natural motion like turning your hand over. Practice until the switch is invisible and the transformation looks magical.',
  'Coins Across': 'This routine uses a combination of palming techniques. You secretly palm coins in one hand while appearing to show both hands empty. Through a series of moves, you transfer the palmed coins to the other hand. The method involves classic palms, finger palms, and perfect timing. The key is to make each transfer invisible and to use misdirection to cover the moves. Practice until you can palm multiple coins smoothly.',
  'Coin in Bottle': 'This requires a special gimmicked bottle with a hidden opening in the bottom. You force a coin to be signed, then switch it for a duplicate. The duplicate goes into the bottle through the hidden opening. The signed coin is palmed away. The key is to have a natural reason to handle the bottle and to make the switch invisible. Practice the switch and loading until smooth.',
  'Hanging Coin': 'This uses a combination of balance points and hidden support. Some versions use a hidden thread or wire, while others use clever balance techniques. The coin appears to defy gravity by balancing on an edge or hanging in mid-air. The key is to find the exact balance point or to set up the hidden support invisibly. Practice until you can set up the effect quickly and naturally.',
  
  // Coin Tricks - Advanced
  'Coin Assembly': 'This advanced routine uses multiple palming techniques including classic palm, finger palm, and thumb palm. You must palm multiple coins simultaneously while appearing to show your hands empty. The method involves perfect timing, smooth palming, and natural misdirection. Each phase builds on the previous one, requiring increasingly difficult palming. The key is to make each move look effortless and natural. Practice until you can palm four coins smoothly.',
  'Copper Silver Brass': 'This uses three coins of different metals and requires perfect palming and switching techniques. You must be able to palm any coin at any time while showing the others. The method involves classic palms, finger palms, and perfect timing. Each phase uses different combinations of palming and switching. The key is to make each change look magical and impossible. Practice until you can switch any coin smoothly.',
  'Coin Cascade': 'This production technique uses a special holder called a "coin dropper" or relies on perfect back palming. Coins are hidden in a holder or palmed position and produced one at a time in rapid succession. The method requires smooth production technique and perfect timing. The key is to make each coin appear from nowhere and to maintain a steady rhythm. Practice until you can produce multiple coins smoothly.',
  'Coin Through Glass': 'This uses a combination of palming and misdirection. You secretly palm the coin and make it appear to penetrate the glass by producing it underneath. Some versions use a duplicate coin or a special gimmicked glass. The method requires perfect timing and angle management. The key is to make the penetration look visual and impossible. Practice until the move is invisible from all angles.',
  'Misers Dream': 'This classic uses a combination of production techniques and palming. Coins are hidden in various locations (coin dropper, finger palm, classic palm) and produced one at a time. The method requires smooth production technique and perfect timing. The key is to make each production look effortless and to create a rhythm with the coins dropping into the bucket. Practice until you can produce multiple coins smoothly and maintain the rhythm.',
  
  // Mind Reading - Beginner
  'Number Prediction': 'This uses a simple mathematical force or psychological force. You guide the spectator to think of a specific number through a series of questions or calculations. The method relies on understanding how people naturally think and choose numbers. The key is to make the force seem completely fair while actually controlling the outcome. Practice your presentation until the force is invisible.',
  'Color Divination': 'This uses a psychological force where you influence the spectator to choose a specific color. Most people choose certain colors when given free choice. The method involves understanding color psychology and using subtle verbal cues. The key is to make the choice seem completely free while actually guiding it. Practice your presentation until the influence is subtle and natural.',
  'Book Test Basic': 'This uses a simple peek technique or a forced page. You either glimpse the word the spectator is thinking of, or you force them to a specific page and word. The method involves either a center tear peek or a riffle force to a specific page. The key is to make the peek invisible or the force seem fair. Practice until you can execute the peek or force smoothly.',
  'Name Reveal': 'This uses a combination of cold reading, psychological principles, and sometimes a peek technique. You either force a specific name or use a multiple out system where you can reveal different names. The method involves understanding common names and using verbal cues to narrow down possibilities. The key is to make the reveal seem like genuine mind reading. Practice your cold reading skills.',
  'Drawing Duplication': 'This uses a simple peek technique where you secretly glimpse the spectator\'s drawing. The method involves either a center tear, a peek through a window envelope, or a reflection technique. The key is to make the peek invisible while appearing to never see the drawing. Practice until you can peek smoothly and naturally.',
  
  // Mind Reading - Intermediate
  'Center Tear': 'This classic technique involves having the spectator write something on paper, fold it, and tear it into pieces. During the tearing process, you secretly retain the center piece which contains the writing. The method requires perfect handling to make the tear look natural while secretly keeping the center. The key is to make the tearing process look casual and to peek at the center piece naturally. Practice until the tear and peek are invisible.',
  'Psychological Force': 'This advanced technique uses verbal and non-verbal cues to influence a spectator\'s choice. You use timing, emphasis, body language, and word choice to guide them to a specific selection. The method requires deep understanding of psychology and human behavior. The key is to make the influence subtle and invisible. Practice with different spectators to understand how people respond to different cues.',
  'Dual Reality': 'This principle involves creating different experiences for different spectators. One spectator sees or hears something different than another, allowing you to create impossible predictions. The method requires careful scripting and perfect presentation. The key is to manage what each spectator perceives without them realizing others had different experiences. Practice your scripting until it flows naturally.',
  'Propless Prediction': 'This uses pure psychological principles and verbal techniques. You make predictions using only your words, relying on psychological forces, dual reality, or multiple outs. The method requires perfect presentation and understanding of psychology. The key is to make your predictions seem specific while actually being flexible. Practice your verbal techniques until they\'re smooth and convincing.',
  'Instant Stooge': 'This technique involves secretly recruiting a spectator to help you without them realizing it. You give them information or instructions that they follow, creating an impossible effect. The method requires subtle communication and perfect presentation. The key is to make the spectator believe they\'re acting independently while actually following your guidance. Practice your subtle communication techniques.',
  
  // Mind Reading - Advanced
  'Acidus Novus': 'This advanced book test uses multiple techniques including peek methods, memory work, and psychological principles. You must be able to secretly learn multiple words and reveal them in impressive ways. The method requires perfect execution of multiple peeks and strong memory skills. The key is to make each reveal seem impossible while actually using different methods for each. Practice until you can execute multiple peeks smoothly.',
  'Pegasus Page': 'This sophisticated system uses a combination of forcing, peek techniques, and psychological principles. You create the illusion of complete free choice while actually controlling or learning the outcome. The method requires perfect handling and strong presentation. The key is to make every aspect seem fair and impossible. Practice until the system flows naturally.',
  'Thought Transmission': 'This uses a combination of psychological forcing, dual reality, and perfect presentation. You create the illusion of transmitting a thought directly into the spectator\'s mind. The method requires deep understanding of psychology and perfect timing. The key is to make the spectator believe the thought came from you rather than being their own choice. Practice your psychological techniques.',
  'Multiple Out System': 'This advanced system involves making multiple predictions that can be revealed in different ways depending on what happens. You have several possible outcomes prepared and reveal the one that matches. The method requires careful preparation and perfect presentation. The key is to make the reveal seem like you predicted exactly what would happen. Practice until you can switch between outs smoothly.',
  'Anagram Revelation': 'This uses a linguistic system where you can reveal a thought-of word through anagrams. You either force a specific word or use a system that works with multiple words. The method requires quick thinking and strong linguistic skills. The key is to make the anagram reveal seem magical rather than mathematical. Practice your anagram skills until you can work quickly.',
  
  // Close Up Magic - Beginner
  'Rubber Band Magic': 'This uses the natural elasticity of rubber bands combined with simple finger positions. The band appears to jump from one set of fingers to another by secretly hooking it around all fingers before showing it on just two. When you open your hand, the band jumps. The method requires understanding the finger positions and making the setup invisible. Practice until the jump looks instantaneous.',
  'Sponge Balls': 'This uses the compressible nature of sponge balls combined with palming techniques. You can hide multiple balls in your hand while showing just one. The method involves finger palming and natural hand positions. The key is to keep your hand relaxed and natural while hiding balls. Practice until you can palm multiple balls invisibly.',
  'Cups and Balls Basic': 'This ancient trick uses a combination of palming, loading, and misdirection. Balls are secretly loaded under cups while appearing to vanish or travel. The method involves finger palming balls and loading them during natural movements. The key is to make each load invisible and to use the cups as cover. Practice each move separately until smooth.',
  'Ring on String': 'This uses a simple loop technique where the string is secretly doubled. The ring appears to penetrate onto the string but actually goes through a loop. The method requires setting up the loop invisibly and making the penetration look magical. Practice until you can set up and execute the effect smoothly.',
  'Linking Paperclips': 'This uses the natural shape of paperclips and a clever setup. The clips are positioned so they link when you pull a bill or paper. The method requires understanding the exact positioning and making the setup look casual. Practice until you can set up and execute the link smoothly.',
  
  // Close Up Magic - Intermediate
  'Linking Rings': 'This classic uses specially gapped rings combined with perfect handling. Some rings have hidden gaps that allow them to link and unlink. The method requires understanding which rings are gapped and making the gaps invisible. The key is to handle the rings smoothly and to use sound to convince the audience they\'re solid. Practice until you can handle the rings naturally.',
  'Rope Through Neck': 'This uses a clever loop technique combined with misdirection. The rope appears to pass through your neck but actually goes around it in a hidden loop. The method requires setting up the loop invisibly and making the penetration look real. Practice until you can execute the effect smoothly and safely.',
  'Bill in Lemon': 'This requires advance preparation where you insert a duplicate bill into a lemon using a special tool. During the trick, you force a bill to be signed and switch it for the duplicate. The signed bill is hidden while the spectator finds the duplicate in the lemon. The method requires perfect preparation and smooth switching. Practice the switch until invisible.',
  'Torn and Restored': 'This uses a hidden duplicate piece combined with palming. You tear a piece of paper but secretly keep one piece hidden. You then show the torn pieces while hiding the duplicate, then switch them to show the restored piece. The method requires perfect palming and smooth switching. Practice until the restoration looks magical.',
  'Multiplying Sponges': 'This builds on basic sponge ball technique with multiple balls and more advanced palming. You palm multiple balls while showing fewer, then produce them one at a time. The method requires perfect finger palming and natural hand positions. Practice until you can palm and produce multiple balls smoothly.',
  
  // Close Up Magic - Advanced
  'Chop Cup Routine': 'This uses a special cup with a magnetic or mechanical device that can hold a ball. Combined with regular palming and loading techniques, you create increasingly impossible appearances. The method requires understanding how the gimmicked cup works and perfect timing. Practice until you can use the cup naturally and create smooth loads.',
  'Ring Flight': 'This requires a special gimmick that allows a ring to vanish and appear in a nested set of boxes. The ring is switched for a duplicate that\'s already in the boxes. The method requires perfect switching and handling of the gimmick. Practice until the switch is invisible and the reveal is dramatic.',
  'Cigarette Through Coin': 'This uses a special gimmicked coin with a hidden slot. The cigarette appears to penetrate through the coin but actually goes through the slot. The method requires perfect angle management to hide the slot. Practice until you can handle the gimmick naturally and keep the slot hidden.',
  'Needle Through Arm': 'This uses a special collapsible needle or a clever angle technique. The needle appears to penetrate your arm but actually collapses or goes around it. The method requires perfect handling and presentation to make it look dangerous. Practice until you can execute the effect safely and convincingly.',
  'Salt Pour': 'This uses a special thumb tip or perfect palming technique. The salt is poured into your fist but actually goes into a hidden thumb tip or is palmed away. The method requires perfect handling to make the vanish clean. Practice until you can handle the thumb tip or palm invisibly.',
  
  // Illusions - Beginner
  'Floating Card': 'This uses invisible thread attached to the card. The thread runs from the card to a point you can control, creating the illusion of floating. The method requires setting up the thread invisibly and controlling it smoothly. Practice until you can make the card move naturally and keep the thread invisible.',
  'Levitating Ring': 'This uses invisible thread or a special gimmick attached to the ring. The ring appears to float by controlling the thread or gimmick. The method requires perfect setup and smooth control. Practice until you can make the ring float naturally and keep the method hidden.',
  'Balancing Act': 'This uses hidden support points or clever balance techniques. Objects balance in impossible positions by using hidden wires, magnets, or perfect balance points. The method requires understanding physics and perfect setup. Practice until you can set up the balance quickly and naturally.',
  'Gravity Defying Bottle': 'This uses a hidden support or clever balance point. The bottle appears to defy gravity by balancing on an edge or hanging in mid-air. The method requires finding the exact balance point or setting up hidden support. Practice until you can create the illusion smoothly.',
  'Floating Bill': 'This uses invisible thread attached to the bill. The thread runs from the bill to a point you can control, creating the illusion of floating. The method requires setting up the thread invisibly and controlling it smoothly. Practice until you can make the bill float naturally.',
  
  // Illusions - Intermediate
  'Zombie Ball': 'This uses a special gimmick hidden under a cloth. The gimmick allows you to control the ball\'s movement while your hands appear to be away from it. The method requires perfect handling of the gimmick and smooth movements. Practice until you can control the ball naturally and keep the gimmick hidden.',
  'Floating Table': 'This uses a special gimmick attached to the table that allows it to appear to float. The gimmick is hidden by your body position and the table\'s design. The method requires perfect handling and angle management. Practice until you can make the table float convincingly.',
  'Sword Suspension': 'This uses a special harness or support system hidden under clothing. The person appears to be suspended on the sword but is actually supported by the hidden system. The method requires perfect setup and presentation. Practice until the illusion looks dangerous and impossible.',
  'Levitation Basic': 'This uses a special support system hidden by angles and positioning. The person appears to float but is actually supported by a hidden platform or harness. The method requires perfect angle management and presentation. Practice until the levitation looks smooth and impossible.',
  'Penetration Frame': 'This uses a special frame with hidden openings or a clever design. Objects or people appear to penetrate through the frame but actually go through hidden openings. The method requires perfect handling and angle management. Practice until the penetration looks impossible.',
  
  // Illusions - Advanced
  'Full Body Levitation': 'This uses a sophisticated support system hidden by angles, lighting, and positioning. The person appears to float high in the air but is actually supported by a hidden platform or harness. The method requires perfect setup, angle management, and presentation. Practice until the levitation looks smooth and impossible from all viewing angles.',
  'Sawing in Half': 'This uses a special box with hidden compartments. The person appears to be sawed in half but actually contorts into a hidden space. The method requires a specially built box and a flexible assistant. Practice until the illusion looks convincing and the assistant can get into position quickly.',
  'Metamorphosis': 'This uses a special trunk with a hidden opening and perfect timing. The two people switch positions through the hidden opening in seconds. The method requires a specially built trunk and perfect coordination between performers. Practice until the switch is instantaneous and smooth.',
  'Sub Trunk': 'This uses two trunks with hidden openings and perfect timing. The person escapes from one trunk and appears in the other through coordinated movements. The method requires specially built trunks and perfect timing. Practice until the switch is smooth and convincing.',
  'Origami Illusion': 'This uses a special box with mirrors or hidden compartments. The person appears to be folded into an impossibly small space but actually uses the hidden space cleverly. The method requires a specially built box and perfect positioning. Practice until the illusion looks impossible and the person can get into position quickly.'
};

// Special steps for Card to Pocket trick
const cardToPocketSteps = [
  {
    id: 'step-1',
    stepNumber: 1,
    instruction: 'Choose a target card (e.g., the top card of the deck).',
    completed: false
  },
  {
    id: 'step-2',
    stepNumber: 2,
    instruction: 'Casually place the target card at the top of the deck before you begin.',
    completed: false
  },
  {
    id: 'step-3',
    stepNumber: 3,
    instruction: 'Overhand Force: Hold the deck and perform an overhand shuffle, but retain the top card by injogging it with your thumb as you shuffle. Complete the shuffle, keeping the injogged card on top.',
    completed: false
  },
  {
    id: 'step-4',
    stepNumber: 4,
    instruction: 'Ask the spectator to say "stop" at any time as you flip through the cards. Stop at the injogged card, and reveal it as their selection.',
    completed: false
  },
  {
    id: 'step-5',
    stepNumber: 5,
    instruction: 'As the spectator looks at the card, casually take the card back, seemingly placing it in the middle of the deck, but secretly keep it palmed in your hand.',
    completed: false
  },
  {
    id: 'step-6',
    stepNumber: 6,
    instruction: 'Once the card is in your palm, discreetly put your hand in your pocket and leave the card there.',
    completed: false
  },
  {
    id: 'step-7',
    stepNumber: 7,
    instruction: 'Make a magical gesture (snap your fingers, wave your hand over the deck, etc.).',
    completed: false
  },
  {
    id: 'step-8',
    stepNumber: 8,
    instruction: 'Announce that their selected card has magically traveled to your pocket.',
    completed: false
  },
  {
    id: 'step-9',
    stepNumber: 9,
    instruction: 'Reach into your pocket and dramatically produce the card.',
    completed: false
  }
];

function generateSteps(difficulty: DifficultyLevel, trickName: string): any[] {
  // Special case for Card to Pocket
  if (trickName === 'Card to Pocket') {
    return cardToPocketSteps;
  }
  
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
          summary: trickSummaries[trickName] || `Master the ${trickName} trick and amaze your audience with this ${difficulty.toLowerCase()} level effect.`,
          method: trickMethods[trickName] || `This trick uses fundamental ${difficulty.toLowerCase()} level techniques. Practice each move slowly and carefully before performing.`,
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
