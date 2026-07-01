export interface LocalizedQuestionStrings {
  question: string;
  options: string[];
  answer: string;
  hint?: string;
}

export const QUESTIONS_EN: Record<number, LocalizedQuestionStrings> = {
  1: {
    question: "Who is Luffy's very first crew member?",
    options: ["Zoro", "Nami", "Usopp", "Sanji"],
    answer: "Zoro",
    hint: "A swordsman once known as the Pirate Hunter."
  },
  2: {
    question: "What is Ryuk's favorite fruit in the anime Death Note?",
    options: ["Banana", "Strawberry", "Apple", "Grape"],
    answer: "Apple",
    hint: "Red and juicy, he says Earth's apples are far more delicious."
  },
  3: {
    question: "Who is Naruto's very first teacher?",
    options: ["Kakashi", "Jiraiya", "Iruka", "Third Hokage"],
    answer: "Iruka",
    hint: "Has a horizontal scar across his nose, and was the first to accept Naruto."
  },
  4: {
    question: "What is the name of the main character in Demon Slayer?",
    options: ["Zenitsu", "Tanjiro", "Inosuke", "Giyu"],
    answer: "Tanjiro",
    hint: "He fights demons to turn his sister Nezuko back into a human."
  },
  5: {
    question: "Which is Hayao Miyazaki's most famous, Oscar-winning masterpiece?",
    options: ["My Neighbor Totoro", "Howl's Moving Castle", "Spirited Away", "Princess Mononoke"],
    answer: "Spirited Away",
    hint: "The story of young Chihiro in a strange spirit bathhouse."
  },
  6: {
    question: "Who is the strongest sorcerer in Jujutsu Kaisen?",
    options: ["Yuji Itadori", "Megumi", "Gojo Satoru", "Nanami"],
    answer: "Gojo Satoru",
    hint: "Wears a blindfold, master of the Infinite Void."
  },
  7: {
    question: "Why did One Punch Man's main character Saitama lose his hair and go bald?",
    options: ["Due to a divine curse", "Due to intense and hard training", "Due to a villain's special beam", "Hereditary baldness"],
    answer: "Due to intense and hard training",
    hint: "100 push-ups, 100 squats, and a 10km run every single day."
  },
  8: {
    question: "What is the outermost wall protecting humanity in Attack on Titan?",
    options: ["Wall Maria", "Wall Rose", "Wall Sina", "Wall Titan"],
    answer: "Wall Maria",
    hint: "The wall that fell during the Colossal Titan's attack in the first episode."
  },
  9: {
    question: "What is the name of Son Goku's home Saiyan planet in Dragon Ball?",
    options: ["Planet Namek", "Planet Vegeta", "Planet Frieza", "Earth"],
    answer: "Planet Vegeta",
    hint: "Named after his rival prince."
  },
  10: {
    question: "Who is the best friend of Hunter x Hunter's main character Gon?",
    options: ["Kurapika", "Leorio", "Killua", "Hisoka"],
    answer: "Killua",
    hint: "From the Zoldyck assassin family, uses electricity."
  },
  11: {
    question: "What are the Elric brothers searching for in Fullmetal Alchemist to get their bodies back?",
    options: ["Elixir of Life", "Philosopher's Stone", "Steel Plate", "Transmutation Circle"],
    answer: "Philosopher's Stone",
    hint: "A legendary stone capable of bypassing the law of Equivalent Exchange."
  },
  12: {
    question: "What is the name of the powerful quirk Deku receives in My Hero Academia?",
    options: ["All for One", "One for All", "Explosion", "Half-Cold Half-Hot"],
    answer: "One for All",
    hint: "Passed down from generation to generation, one power for all."
  },
  13: {
    question: "What is the name of the main boy in Bleach?",
    options: ["Ichigo Kurosaki", "Renji Abarai", "Uryu Ishida", "Yasutora Sado"],
    answer: "Ichigo Kurosaki",
    hint: "Carrot orange hair, gained the powers of a Soul Reaper (Shinigami)."
  },
  14: {
    question: "How does Tokyo Ghoul's main character Ken Kaneki become a half-ghoul?",
    options: ["Bitten by a ghoul and survived", "Organ transplant from a ghoul", "Drinking a special potion", "Born with ghoul genetics"],
    answer: "Organ transplant from a ghoul",
    hint: "After being attacked by a ghoul named Rize, her organs were transplanted into him in the hospital."
  },
  15: {
    question: "What is the name of Kirito's primary black sword in Sword Art Online?",
    options: ["Elucidator", "Dark Repulser", "Excalibur", "Lambent Light"],
    answer: "Elucidator",
    hint: "Dropped by the 50th-floor boss, worn in his right hand."
  },
  16: {
    question: "What is the name of the chainsaw demon dog in Chainsaw Man who contracted with Denji?",
    options: ["Koni", "Pochita", "Kurama", "Aki"],
    answer: "Pochita",
    hint: "Orange cute demon dog with a chainsaw on his forehead."
  },
  17: {
    question: "What is the real name of the main girl in Sailor Moon?",
    options: ["Usagi Tsukino", "Rei Hino", "Ami Mizuno", "Minako Aino"],
    answer: "Usagi Tsukino",
    hint: "Her name translates to 'Rabbit of the Moon' in Japanese."
  },
  18: {
    question: "What pseudonym does Okabe Rintaro use to refer to himself in Steins;Gate?",
    options: ["Hououin Kyouma", "John Titor", "Christina", "Mayuri"],
    answer: "Hououin Kyouma",
    hint: "His self-proclaimed mad scientist alter-ego."
  },
  19: {
    question: "What kind of magic does Natsu Dragneel use in Fairy Tail?",
    options: ["Ice Make", "Fire Dragon Slayer", "Sky Magic", "Letter Magic"],
    answer: "Fire Dragon Slayer",
    hint: "Magic he learned from the fire dragon Igneel who raised him."
  },
  20: {
    question: "Which Evangelion unit does Shinji Ikari pilot in Neon Genesis Evangelion?",
    options: ["Eva-00", "Eva-01", "Eva-02", "Eva-05"],
    answer: "Eva-01",
    hint: "Purple/green prototype containing his mother's soul."
  },
  21: {
    question: "Why can't Black Clover's protagonist Asta use magic?",
    options: ["Born without magic (Mana)", "His magic was stolen", "Injured as a child", "Banned by country's law"],
    answer: "Born without magic (Mana)",
    hint: "Despite having no mana, he trains his physical body to the extreme."
  },
  22: {
    question: "What position does Hinata Shoyo play in Haikyuu!!?",
    options: ["Setter", "Libero", "Middle Blocker", "Wing Spiker"],
    answer: "Middle Blocker",
    hint: "Played as a blocker because of his insane jumping ability despite being short."
  },
  23: {
    question: "Who is Shigeo Kageyama's (Mob) mentor, a self-proclaimed psychic but actually a con-artist, in Mob Psycho 100?",
    options: ["Reigen Arataka", "Ritsu", "Teruki", "Dimple"],
    answer: "Reigen Arataka",
    hint: "Captivates clients with massage and talk therapy despite having zero psychic powers."
  },
  24: {
    question: "In One Piece, what is the massive continent that intersects the Grand Line?",
    options: ["Red Line", "Calm Belt", "Skypiea", "New World"],
    answer: "Red Line",
    hint: "A giant ring of red rock encircling the entire globe."
  },
  25: {
    question: "In Naruto, what was Sasuke Uchiha's main goal that led him to leave the team and join Orochimaru?",
    options: ["To get revenge on his brother Itachi", "To destroy Konoha village", "To become Hokage", "To attract Sakura"],
    answer: "To get revenge on his brother Itachi",
    hint: "Desired power to kill the brother who annihilated their family and clan."
  },
  26: {
    question: "Why does Nezuko carry a bamboo muzzle in Demon Slayer?",
    options: ["To prevent her from biting humans or consuming blood", "To stop her from speaking", "Because she loves bamboo", "To preserve her magic"],
    answer: "To prevent her from biting humans or consuming blood",
    hint: "Placed by Giyu Tomioka to help her suppress her demonic impulses."
  },
  27: {
    question: "In Attack on Titan, who was the first person to obtain the Founding Titan power?",
    options: ["Ymir Fritz", "Historia Reiss", "Mikasa", "Carla"],
    answer: "Ymir Fritz",
    hint: "A slave girl who connected with the source of titan power 2000 years ago."
  },
  28: {
    question: "What is the power to command obedience that Lelouch Lamperouge receives in Code Geass?",
    options: ["Geass", "Sharingan", "Byakugan", "Death Eye"],
    answer: "Geass",
    hint: "Absolute authority that can command anyone once."
  },
  29: {
    question: "In Death Note, who is L's successor, a white-haired boy who eventually catches Kira?",
    options: ["Near", "Mello", "Matsuda", "Misa"],
    answer: "Near",
    hint: "Loves solving puzzles and playing with toys, leader of the SPK."
  },
  30: {
    question: "In Spy x Family, what is the name of Loid Forger's undercover mission?",
    options: ["Operation Strix", "Operation Owl", "Operation Eclipse", "Operation Twilight"],
    answer: "Operation Strix",
    hint: "A plan to build a family and infiltrate the target to maintain peace."
  },
  31: {
    question: "In Your Name, what cosmic event caused Taki and Mitsuha's bodies to switch?",
    options: ["Comet Passing", "Solar Eclipse", "Lunar Eclipse", "Space Storm"],
    answer: "Comet Passing",
    hint: "The passing of the Comet Tiamat which occurs once every 1200 years."
  },
  32: {
    question: "What is the name of Ichigo's sword in Bleach?",
    options: ["Zangetsu", "Senbonzakura", "Hyorinmaru", "Zabimaru"],
    answer: "Zangetsu",
    hint: "Translates to 'Slaying Moon', a massive black cleaver-like sword."
  },
  33: {
    question: "In Jujutsu Kaisen, what cursed object does Yuji Itadori swallow to become the vessel of Sukuna?",
    options: ["Sukuna's Finger", "Red Eye", "Magic Needle", "Cursed Bone"],
    answer: "Sukuna's Finger",
    hint: "One of Sukuna's twenty cursed fingers."
  },
  34: {
    question: "What kind of creature is Totoro from My Neighbor Totoro?",
    options: ["Forest Spirit", "Bear", "Cat", "Rabbit"],
    answer: "Forest Spirit",
    hint: "Giant, soft protector of the forest living deep in the woods."
  },
  35: {
    question: "In Vinland Saga, who ambushes and kills Thorfinn's father Thors?",
    options: ["Askeladd", "Floki", "Thorkell", "Canute"],
    answer: "Askeladd",
    hint: "A cunning, intelligent Viking leader whom Thorfinn vows to defeat in a duel."
  },
  36: {
    question: "In Hunter x Hunter, where do Gon and Killua get the rare 'Greed Island' game to play?",
    options: ["From a memory card left by Gon's father", "At an auction", "In a secret cave", "From the Hunter Association headquarters"],
    answer: "From a memory card left by Gon's father",
    hint: "Played using a memory card and JoyStation console left by Ging Freecss."
  },
  37: {
    question: "In Dr. Stone, what drink does Senku Ishigami make first for his friends?",
    options: ["Cola", "Beer", "Lemonade", "Milk"],
    answer: "Cola",
    hint: "Carbonated beverage made using natural ingredients like coriander and honey."
  },
  38: {
    question: "In Cyberpunk: Edgerunners, what military-grade cybernetic implant does David Martinez install on his spine?",
    options: ["Sandevistan", "Kerenzikov", "Mantis Blades", "Monowire"],
    answer: "Sandevistan",
    hint: "A spinal implant that grants superhuman speed and reaction time."
  },
  39: {
    question: "In Fullmetal Alchemist, who is the State Alchemist known as the 'Flame Alchemist'?",
    options: ["Roy Mustang", "Edward", "Armstrong", "Hughes"],
    answer: "Roy Mustang",
    hint: "A colonel who triggers powerful explosions by snapping his fingers with special ignition gloves."
  },
  40: {
    question: "What is the name of Megumi Fushiguro's strongest, untamable shikigami in Jujutsu Kaisen?",
    options: ["Mahoraga", "Sadaharu", "Kurama", "Heavenly Gatekeeper"],
    answer: "Mahoraga",
    hint: "An elite general shikigami that can adapt to any and all phenomena."
  },
  41: {
    question: "In One Piece, what is the name of Portgas D. Ace's Devil Fruit?",
    options: ["Mera Mera no Mi", "Gomu Gomu no Mi", "Gura Gura no Mi", "Hie Hie no Mi"],
    answer: "Mera Mera no Mi",
    hint: "A Logia-type fruit that grants the power to control and transform into fire."
  },
  42: {
    question: "In Fate/Stay Night, what is Saber's true identity?",
    options: ["Artoria Pendragon", "Jeanne d'Arc", "Gilgamesh", "King Alexander"],
    answer: "Artoria Pendragon",
    hint: "Legendary King of Britain, wielder of the sword Excalibur."
  },
  43: {
    question: "Who dwells in the 5-leaf clover grimoire obtained by Asta in Black Clover?",
    options: ["Devil", "Elf", "Spirit", "Ancient King"],
    answer: "Devil",
    hint: "It is said that inside the fifth leaf lies a devil."
  },
  44: {
    question: "In No Game No Life, who are the gamer siblings known as 'Blank'?",
    options: ["Sora & Shiro", "Koto & Natsu", "Kirito & Asuna", "Ichigo & Rukia"],
    answer: "Sora & Shiro",
    hint: "Two siblings who have never lost a game in any world."
  },
  45: {
    question: "In Re:Zero, what is the name of Subaru's ability that rewinds time upon death?",
    options: ["Return by Death", "Time Flow", "Spirit Shift", "Dark Pact"],
    answer: "Return by Death",
    hint: "A curse given by the Witch of Envy that returns him to a 'save point' when he dies."
  },
  46: {
    question: "Why is Shinra Kusakabe in Fire Force nicknamed 'Devil's Footprints'?",
    options: ["He emits fire from his feet to fly", "He has a devil-like face", "He leaves black footprints on the ground", "He has devil blood"],
    answer: "He emits fire from his feet to fly",
    hint: "A third-generation pyrokinetic who can ignite his feet to travel at high speeds."
  },
  47: {
    question: "In Blue Lock, what is the main goal of the training facility?",
    options: ["To produce the world's best striker", "To produce the best defender", "To train goalkeepers", "To improve teamwork"],
    answer: "To produce the world's best striker",
    hint: "To cultivate a single egoistic striker capable of leading Japan to World Cup victory."
  },
  48: {
    question: "In Gintama, what is the name of Gintoki's odd-jobs business?",
    options: ["Yorozuya", "Kabuki House", "Shinsengumi", "Sadaharu"],
    answer: "Yorozuya",
    hint: "An agency that takes on any request for money, from cleaning to space travel."
  },
  49: {
    question: "In Overlord, what MMORPG game world is Momonga (Ainz Ooal Gown) trapped in?",
    options: ["Yggdrasil", "Sword Art Online", "Elder Tale", "The World"],
    answer: "Yggdrasil",
    hint: "A popular DMMO-RPG whose servers were about to shut down."
  },
  50: {
    question: "Who leads the Homunculi in Fullmetal Alchemist: Brotherhood?",
    options: ["Father", "Death", "Dante", "King Bradley"],
    answer: "Father",
    hint: "The primary antagonist born as the dwarf in the flask, who plans to sacrifice the nation."
  }
};

export const uiTranslations = {
  mn: {
    title: "Anime Guesser",
    subtitle: "Аниме сонирхогчдын сорилт",
    beta: "Бетта",
    soundOn: "Дууг нээх",
    soundOff: "Дууг хаах",
    startTitle: "Аниме Таагч Тоглоом",
    startSubtitle: "Та аниме ертөнцийг хэр сайн мэдэх вэ? Өөрийгөө сориод рекорд оноо тогтоогоорой!",
    rulesTitle: "ТОГЛООМЫН ДҮРЭМ:",
    ruleTime: "Асуултын хугацаа",
    ruleTimeValue: "15 секунд",
    ruleLives: "Тоглогчийн амь",
    ruleLivesValue: "5 амь ❤️",
    ruleCorrect: "Зөв хариулт",
    ruleCorrectValue: "+15 оноо",
    ruleCombo: "3 дараалж зөв хариулбал",
    ruleComboValue: "+10 BONUS 🔥",
    startButton: "ТОГЛООМЫГ ЭХЛЭХ",
    score: "Оноо",
    combo: "Combo",
    questionNum: "Асуулт",
    hint: "Санамж",
    correctFeedback: "Тийм ээ, зөв хариуллаа! 🎉 +15 оноо",
    incorrectFeedback: "Буруу хариуллаа! 😢 Зөв хариулт",
    gameOverTitle: "Тоглоом дууслаа! 💔",
    gameOverSubtitle: "Та амиа бүгдийг алдлаа. Дахин үзээд өмнөх оноогоо ахиулаарай!",
    totalScore: "Нийт оноо",
    maxStreak: "Хамгийн урт цуврал",
    playAgain: "ДАХИН ТОГЛОХ",
    victoryTitle: "Ялалт! Баяр хүргэе! 🏆🎉",
    victorySubtitle: "Та манай бүх асуултад амжилттай хариулж, аниме таагч аваргын цолыг хүртлээ!",
    victoryButton: "ДАХИН ЭХЛҮҮЛЭХ",
    settings: "Тохиргоо",
    language: "Хэл сонгох",
    close: "Хаах",
    correctOverlay: "Амжилттай илрүүллээ!",
  },
  en: {
    title: "Anime Guesser",
    subtitle: "The Anime Fan Challenge",
    beta: "Beta",
    soundOn: "Unmute",
    soundOff: "Mute",
    startTitle: "Anime Guesser Game",
    startSubtitle: "How well do you know the anime world? Test yourself and set a record high score!",
    rulesTitle: "GAME RULES:",
    ruleTime: "Question timer",
    ruleTimeValue: "15 seconds",
    ruleLives: "Player lives",
    ruleLivesValue: "5 lives ❤️",
    ruleCorrect: "Correct answer",
    ruleCorrectValue: "+15 points",
    ruleCombo: "3 consecutive correct",
    ruleComboValue: "+10 BONUS 🔥",
    startButton: "START GAME",
    score: "Score",
    combo: "Combo",
    questionNum: "Question",
    hint: "Hint",
    correctFeedback: "Yes, that's correct! 🎉 +15 pts",
    incorrectFeedback: "Wrong answer! 😢 Correct answer",
    gameOverTitle: "Game Over! 💔",
    gameOverSubtitle: "You lost all your lives. Try again and beat your high score!",
    totalScore: "Total Score",
    maxStreak: "Max Streak",
    playAgain: "PLAY AGAIN",
    victoryTitle: "Victory! Congratulations! 🏆🎉",
    victorySubtitle: "You successfully answered all questions and won the title of Anime Guesser Champion!",
    victoryButton: "PLAY AGAIN",
    settings: "Settings",
    language: "Select Language",
    close: "Close",
    correctOverlay: "Successfully identified!",
  }
};
