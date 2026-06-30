export interface LessonSection {
  heading: string;
  body: string;
  examples?: string[];
}

export interface Practice {
  q: string;
  a: string;
}

export interface QuizQ {
  q: string;
  choices: string[];
  answer: number;
}

export interface EnglishLesson {
  id: string;
  title: string;
  summary: string;
  sections: LessonSection[];
  practice?: Practice[];
}

export interface MathTopic {
  title: string;
  explanation: string;
  example: string;
  practice?: Practice[];
}

export interface GradeBand {
  id: string;
  grade: string;
  ages: string;
  book: string;
  topics: MathTopic[];
}

export const ENGLISH_LESSONS: EnglishLesson[] = [
  {
    id: "sentence",
    title: "The Sentence",
    summary: "A sentence is a group of words that makes complete sense.",
    sections: [
      {
        heading: "What is a sentence?",
        body: "A sentence is a group of words that gives a complete thought. It begins with a capital letter and ends with a full stop (.), a question mark (?), or an exclamation mark (!).",
        examples: ["The sun rises in the east.", "Where are you going?", "What a beautiful day!"],
      },
      {
        heading: "Subject and Predicate",
        body: "Every sentence has two parts. The subject is the person or thing we are talking about. The predicate is what we say about the subject.",
        examples: ["Rama | is reading a book.", "The little girl | sang a sweet song."],
      },
      {
        heading: "Four kinds of sentences",
        body: "Assertive sentences state a fact. Interrogative sentences ask a question. Imperative sentences give a command or request. Exclamatory sentences express strong feeling.",
        examples: [
          "Assertive: I like mangoes.",
          "Interrogative: Do you like mangoes?",
          "Imperative: Please close the door.",
          "Exclamatory: How sweet this mango is!",
        ],
      },
    ],
    practice: [
      { q: "Is this a complete sentence? - \"Running down the street\"", a: "No. It has no subject and no complete thought. A complete version: \"The boy was running down the street.\"" },
      { q: "Name the kind: \"Shut the window.\"", a: "Imperative - it gives a command." },
    ],
  },
  {
    id: "nouns",
    title: "Nouns",
    summary: "A noun is the name of a person, place, animal, thing, or idea.",
    sections: [
      {
        heading: "Common and Proper nouns",
        body: "A common noun is a general name given to every person or thing of the same kind. A proper noun is the name of a particular person or place and always begins with a capital letter.",
        examples: ["Common: boy, city, river", "Proper: Rama, Delhi, Ganga"],
      },
      {
        heading: "Collective nouns",
        body: "A collective noun is the name of a group of people or things taken together as one whole.",
        examples: ["a team of players", "a herd of cattle", "a bunch of keys"],
      },
      {
        heading: "Abstract nouns",
        body: "An abstract noun is the name of a quality, feeling, or idea - something we cannot touch or see.",
        examples: ["honesty, kindness, courage, childhood"],
      },
    ],
    practice: [
      { q: "Common or proper? - \"mountain\" and \"Himalayas\"", a: "\"mountain\" is a common noun; \"Himalayas\" is a proper noun." },
      { q: "Pick the abstract noun: book, bravery, table.", a: "bravery - it names a quality you cannot touch." },
    ],
  },
  {
    id: "number",
    title: "Singular & Plural",
    summary: "Number tells whether we mean one thing (singular) or more than one (plural).",
    sections: [
      {
        heading: "The usual rule",
        body: "Most nouns add -s to become plural. Nouns ending in -s, -ss, -sh, -ch, or -x add -es.",
        examples: ["book → books", "bus → buses", "box → boxes", "watch → watches"],
      },
      {
        heading: "Special plurals",
        body: "Some nouns change differently, and a few stay the same.",
        examples: ["baby → babies", "leaf → leaves", "man → men", "child → children", "sheep → sheep"],
      },
    ],
    practice: [
      { q: "Make plural: \"city\" and \"knife\".", a: "city → cities; knife → knives." },
    ],
  },
  {
    id: "gender",
    title: "Gender",
    summary: "Gender tells us whether a noun is masculine, feminine, or neither.",
    sections: [
      {
        heading: "Masculine and feminine",
        body: "Masculine nouns name males; feminine nouns name females. Many pairs simply use different words.",
        examples: ["king → queen", "boy → girl", "uncle → aunt", "lion → lioness"],
      },
      {
        heading: "Common and neuter",
        body: "A common-gender noun can be male or female. A neuter noun names things with no life.",
        examples: ["common: teacher, friend, child", "neuter: table, stone, book"],
      },
    ],
    practice: [
      { q: "Give the feminine of \"actor\" and \"prince\".", a: "actor → actress; prince → princess." },
    ],
  },
  {
    id: "pronouns",
    title: "Pronouns",
    summary: "A pronoun is a word used instead of a noun.",
    sections: [
      {
        heading: "Why we use pronouns",
        body: "We use pronouns so we do not have to repeat the same noun again and again.",
        examples: ["Instead of: Sita took Sita's book. → Sita took her book."],
      },
      {
        heading: "Kinds of pronouns",
        body: "Personal pronouns stand for people or things (I, you, he, she, it, we, they). Possessive pronouns show belonging (mine, yours, his, hers, ours, theirs).",
        examples: ["Personal: They are playing.", "Possessive: This book is mine."],
      },
    ],
    practice: [
      { q: "Replace the noun: \"Ravi lost Ravi's pen.\"", a: "Ravi lost his pen. (\"his\" replaces \"Ravi's\")" },
    ],
  },
  {
    id: "articles",
    title: "Articles (a, an, the)",
    summary: "Articles are small words that come before nouns: a, an, and the.",
    sections: [
      {
        heading: "A and An",
        body: "Use \"a\" before a word that begins with a consonant sound, and \"an\" before a word that begins with a vowel sound (a, e, i, o, u). It is the sound that matters, not the letter.",
        examples: ["a book, a cat, a university (yoo-sound)", "an apple, an hour (silent h), an umbrella"],
      },
      {
        heading: "The",
        body: "Use \"the\" when we talk about a particular person or thing, or one already mentioned. \"A/an\" point to any one; \"the\" points to a specific one.",
        examples: ["I saw a dog. The dog was barking.", "The sun is bright today."],
      },
    ],
    practice: [
      { q: "Fill in: \"___ honest man kept ___ umbrella by ___ door.\"", a: "An honest man kept an umbrella by the door." },
    ],
  },
  {
    id: "adjectives",
    title: "Adjectives",
    summary: "An adjective is a word that describes a noun.",
    sections: [
      {
        heading: "What adjectives do",
        body: "An adjective adds something to the meaning of a noun - its quality, quantity, or number.",
        examples: ["a tall tree", "some water", "five mangoes"],
      },
      {
        heading: "Degrees of comparison",
        body: "Adjectives have three degrees. Positive describes one thing. Comparative compares two. Superlative compares three or more.",
        examples: ["Positive: tall", "Comparative: taller (than)", "Superlative: tallest (of all)"],
      },
    ],
    practice: [
      { q: "Give the comparative and superlative of \"good\".", a: "good → better → best (irregular forms)." },
      { q: "Comparative of \"happy\"?", a: "happier (y changes to i before -er)." },
    ],
  },
  {
    id: "verbs",
    title: "Verbs",
    summary: "A verb is a word that shows an action or a state of being.",
    sections: [
      {
        heading: "Action and being",
        body: "Most verbs name an action (run, eat, write). Some verbs show a state of being (is, am, are, was, were).",
        examples: ["Action: She writes a letter.", "Being: He is happy."],
      },
      {
        heading: "Helping verbs",
        body: "Helping (auxiliary) verbs work with a main verb to form tenses and questions. Common ones: is, am, are, has, have, will, do.",
        examples: ["She is writing.", "They have finished.", "Will you come?"],
      },
    ],
    practice: [
      { q: "Find the verb: \"The children played in the park.\"", a: "\"played\" - it shows the action." },
    ],
  },
  {
    id: "adverbs",
    title: "Adverbs",
    summary: "An adverb tells us more about a verb, an adjective, or another adverb.",
    sections: [
      {
        heading: "What adverbs do",
        body: "An adverb usually tells how, when, where, or how often something happens.",
        examples: ["She sang sweetly. (how)", "He came late. (when)", "Look here. (where)", "They often play. (how often)"],
      },
      {
        heading: "Adverbs with adjectives",
        body: "Adverbs can also make an adjective or another adverb stronger or weaker.",
        examples: ["It is very hot.", "She is quite tall.", "He ran too fast."],
      },
    ],
    practice: [
      { q: "Find the adverb: \"The tortoise moved slowly.\"", a: "\"slowly\" - it tells how the tortoise moved." },
    ],
  },
  {
    id: "prepositions",
    title: "Prepositions",
    summary: "A preposition shows how a noun or pronoun is related to another word - often place or time.",
    sections: [
      {
        heading: "Prepositions of place",
        body: "These show where something is.",
        examples: ["The cat is on the table.", "The ball is under the chair.", "She sat between us."],
      },
      {
        heading: "Prepositions of time",
        body: "These show when something happens. Use \"at\" for clock time, \"on\" for days and dates, and \"in\" for months and years.",
        examples: ["at 9 o'clock", "on Monday", "in July", "in 2026"],
      },
    ],
    practice: [
      { q: "Choose: \"School starts ___ 8 a.m.\" (at / on / in)", a: "at - we use \"at\" with clock time." },
    ],
  },
  {
    id: "conjunctions",
    title: "Conjunctions",
    summary: "A conjunction is a word that joins words or sentences together.",
    sections: [
      {
        heading: "Joining words",
        body: "Words like and, but, or join words or ideas of the same kind.",
        examples: ["Rama and Sita", "slow but steady", "tea or coffee"],
      },
      {
        heading: "Joining sentences",
        body: "Conjunctions can join two sentences into one, often showing a reason or contrast.",
        examples: ["It was raining, so we stayed inside.", "He is poor but honest.", "Wait here until I return."],
      },
    ],
    practice: [
      { q: "Join with one conjunction: \"She was tired. She finished the work.\"", a: "She was tired, but she finished the work." },
    ],
  },
  {
    id: "interjections",
    title: "Interjections",
    summary: "An interjection is a word that expresses sudden, strong feeling.",
    sections: [
      {
        heading: "Showing feeling",
        body: "An interjection stands apart from the rest of the sentence and is often followed by an exclamation mark.",
        examples: ["Hurray! We won.", "Alas! He failed.", "Oh! What a surprise.", "Bravo! Well done."],
      },
    ],
    practice: [
      { q: "Add an interjection: \"___! The vase is broken.\"", a: "Any of: Oh! / Alas! / Oops! - each shows sudden feeling." },
    ],
  },
  {
    id: "tenses",
    title: "Tenses",
    summary: "Tense tells us the time of an action - present, past, or future.",
    sections: [
      {
        heading: "The three times",
        body: "Present tense shows what happens now. Past tense shows what already happened. Future tense shows what will happen.",
        examples: ["Present: I write a letter.", "Past: I wrote a letter.", "Future: I will write a letter."],
      },
      {
        heading: "Simple and continuous",
        body: "The simple form states the action. The continuous form (be + verb-ing) shows an action going on.",
        examples: ["Simple present: She reads.", "Present continuous: She is reading."],
      },
    ],
    practice: [
      { q: "Change to past tense: \"They go to school.\"", a: "They went to school. (\"go\" → \"went\")" },
    ],
  },
  {
    id: "agreement",
    title: "Subject-Verb Agreement",
    summary: "The verb must agree with its subject in number.",
    sections: [
      {
        heading: "The basic rule",
        body: "A singular subject takes a singular verb; a plural subject takes a plural verb.",
        examples: ["The boy runs fast.", "The boys run fast."],
      },
      {
        heading: "Tricky cases",
        body: "Words between the subject and verb do not change agreement. With \"each,\" \"every,\" and \"either,\" use a singular verb.",
        examples: ["The list of items is long. (subject = list)", "Each student has a book."],
      },
    ],
    practice: [
      { q: "Choose: \"One of the windows (is / are) open.\"", a: "is - the subject is \"One\" (singular), not \"windows\"." },
    ],
  },
  {
    id: "voice",
    title: "Active & Passive Voice",
    summary: "Voice tells whether the subject does the action or has it done to it.",
    sections: [
      {
        heading: "Active voice",
        body: "In the active voice, the subject does the action. It is direct and usually shorter.",
        examples: ["Rama wrote a letter.", "The cat caught a mouse."],
      },
      {
        heading: "Passive voice",
        body: "In the passive voice, the action is done to the subject. We use a form of \"be\" + the past participle, and often the word \"by\".",
        examples: ["A letter was written by Rama.", "A mouse was caught by the cat."],
      },
    ],
    practice: [
      { q: "Make passive: \"The boy kicked the ball.\"", a: "The ball was kicked by the boy." },
    ],
  },
  {
    id: "speech",
    title: "Direct & Indirect Speech",
    summary: "There are two ways to report what someone said.",
    sections: [
      {
        heading: "Direct speech",
        body: "Direct speech gives the exact words inside quotation marks.",
        examples: ["Ravi said, \"I am tired.\"", "She said, \"I will come tomorrow.\""],
      },
      {
        heading: "Indirect speech",
        body: "Indirect speech reports the meaning without quotation marks. Tenses and some words often change.",
        examples: ["Ravi said that he was tired.", "She said that she would come the next day."],
      },
    ],
    practice: [
      { q: "Report it: She said, \"I am happy.\"", a: "She said that she was happy. (\"am\" → \"was\", \"I\" → \"she\")" },
    ],
  },
  {
    id: "punctuation",
    title: "Punctuation",
    summary: "Punctuation marks make writing clear and easy to read.",
    sections: [
      {
        heading: "End marks",
        body: "Use a full stop (.) at the end of a statement, a question mark (?) after a question, and an exclamation mark (!) after a strong feeling.",
        examples: ["We won the match.", "Did we win?", "We won!"],
      },
      {
        heading: "The comma and capital letters",
        body: "A comma (,) shows a short pause and separates items in a list. Begin every sentence and every name with a capital letter.",
        examples: ["I bought apples, bananas, and grapes.", "Ravi visited Mumbai in July."],
      },
    ],
    practice: [
      { q: "Punctuate: \"do you like tea or coffee\"", a: "Do you like tea or coffee? (capital D, question mark)" },
    ],
  },
  {
    id: "confusions",
    title: "Words People Mix Up",
    summary: "Some words sound alike but are spelled differently and mean different things.",
    sections: [
      {
        heading: "its vs it's",
        body: "\"its\" shows belonging; \"it's\" is short for \"it is\".",
        examples: ["The dog wagged its tail.", "It's raining outside."],
      },
      {
        heading: "your / you're and there / their / they're",
        body: "\"your\" shows belonging, \"you're\" = you are. \"there\" = a place, \"their\" = belonging, \"they're\" = they are.",
        examples: ["Your bag is here. You're early.", "Put it there. Their car. They're late."],
      },
    ],
    practice: [
      { q: "Choose: \"(Your / You're) going to love this.\"", a: "You're - it means \"you are\"." },
    ],
  },
  {
    id: "vocab",
    title: "Synonyms & Antonyms",
    summary: "Synonyms mean nearly the same; antonyms mean the opposite.",
    sections: [
      {
        heading: "Synonyms",
        body: "Synonyms are words with a similar meaning. Knowing them makes your writing richer.",
        examples: ["big → large, huge", "happy → glad, joyful", "fast → quick, rapid"],
      },
      {
        heading: "Antonyms",
        body: "Antonyms are words with opposite meanings.",
        examples: ["hot ↔ cold", "begin ↔ end", "ancient ↔ modern"],
      },
    ],
    practice: [
      { q: "Give a synonym and an antonym for \"brave\".", a: "Synonym: bold/courageous. Antonym: cowardly/timid." },
    ],
  },
  {
    id: "comprehension",
    title: "Reading Comprehension",
    summary: "How to understand a passage and answer questions about it.",
    sections: [
      {
        heading: "Read in two passes",
        body: "First read the whole passage to get the general idea. Then read the questions, and look back to find the exact answer.",
        examples: ["Pass 1: What is this passage mainly about?", "Pass 2: Find the line that answers each question."],
      },
      {
        heading: "Answer in your own words",
        body: "Use the passage as proof, but write the answer in a full sentence. Do not copy long lines blindly.",
        examples: ["Q: Why did Maya bring an umbrella?  A: Because it looked like it would rain."],
      },
    ],
    practice: [
      { q: "Read: \"The library now opens on weekends, and visits rose by a third.\" Did the change help?", a: "Yes - more people visited after the new weekend hours, so it helped." },
    ],
  },
  {
    id: "letter",
    title: "Letter Writing",
    summary: "The basic shape of a formal and an informal letter.",
    sections: [
      {
        heading: "Informal letter (to family or friends)",
        body: "Start with your address and date, a warm greeting, the body, and a friendly closing.",
        examples: ["Dear Amma,", "… (your news) …", "With love,  Ravi"],
      },
      {
        heading: "Formal letter (to officials)",
        body: "Use a polite greeting, a clear subject, short paragraphs, and a formal closing. Keep it brief and respectful.",
        examples: ["To the Principal,", "Subject: Request for leave", "Yours faithfully,  (name)"],
      },
    ],
    practice: [
      { q: "Which closing is formal: \"With love\" or \"Yours faithfully\"?", a: "\"Yours faithfully\" is formal; \"With love\" is informal." },
    ],
  },
];

export const MATH_BANDS: GradeBand[] = [
  {
    id: "g1-2",
    grade: "Grades 1-2",
    ages: "Ages 6-8",
    book: "NCERT Math-Magic (Class 1-2)",
    topics: [
      { title: "Counting & number names", explanation: "We count things one by one and learn the order of numbers up to 100. The number just after is one more; the number just before is one less.", example: "After 7 comes 8 (one more). Before 7 comes 6 (one less).", practice: [{ q: "What is one more than 9?", a: "10." }] },
      { title: "Place value (tens & ones)", explanation: "A two-digit number is made of tens and ones. The left digit shows tens, the right digit shows ones.", example: "34 = 3 tens + 4 ones = 30 + 4.", practice: [{ q: "How many tens and ones are in 52?", a: "5 tens and 2 ones." }] },
      { title: "Addition", explanation: "Addition means putting groups together to find how many in all. The symbol is +.", example: "3 apples + 2 apples = 5, so 3 + 2 = 5.", practice: [{ q: "Add: 6 + 5", a: "11." }] },
      { title: "Subtraction", explanation: "Subtraction means taking away to find how many are left. The symbol is −.", example: "You have 5 toffees and eat 2. Left = 5 − 2 = 3.", practice: [{ q: "Subtract: 8 − 3", a: "5." }] },
      { title: "Shapes around us", explanation: "We name flat shapes by their sides and corners - circle, triangle, square, rectangle.", example: "A square has 4 equal sides and 4 corners; a triangle has 3 sides.", practice: [{ q: "How many corners does a triangle have?", a: "3 corners." }] },
      { title: "Patterns", explanation: "A pattern repeats in a fixed way. We find the rule and continue it.", example: "2, 4, 6, 8, … the rule is +2, so next is 10.", practice: [{ q: "Continue: 5, 10, 15, __", a: "20 (rule is +5)." }] },
      { title: "Money", explanation: "We add and subtract rupees to pay and get change.", example: "A pen costs ₹7. You pay ₹10. Change = 10 − 7 = ₹3.", practice: [{ q: "You buy a ₹4 sweet with a ₹5 coin. Change?", a: "₹1." }] },
      { title: "Telling time", explanation: "A clock has an hour hand and a minute hand. We read o'clock and half past.", example: "When the long hand points to 12 and the short hand to 3, it is 3 o'clock.", practice: [{ q: "The hands show the short hand on 6 and long hand on 12. What time is it?", a: "6 o'clock." }] },
    ],
  },
  {
    id: "g3-4",
    grade: "Grades 3-4",
    ages: "Ages 8-10",
    book: "NCERT Math-Magic (Class 3-4)",
    topics: [
      { title: "Multiplication tables", explanation: "Multiplication is repeated addition. The tables (2 to 10) help us add equal groups quickly.", example: "4 × 3 means 3 groups of 4: 4 + 4 + 4 = 12.", practice: [{ q: "What is 6 × 3?", a: "18." }] },
      { title: "Division", explanation: "Division means sharing equally into groups. The symbol is ÷.", example: "12 sweets shared among 3 children: 12 ÷ 3 = 4 each.", practice: [{ q: "Share 15 among 5 equally.", a: "15 ÷ 5 = 3 each." }] },
      { title: "Fractions (first idea)", explanation: "A fraction is a part of a whole. The bottom number tells how many equal parts; the top tells how many we take.", example: "A chapati cut into 4 equal parts, eat 1 → you ate 1/4.", practice: [{ q: "Cake cut into 8 parts, eat 3. What fraction?", a: "3/8." }] },
      { title: "Measurement", explanation: "We measure length in cm and m, weight in g and kg, and liquid in mL and L.", example: "1 metre = 100 cm; 1 kilogram = 1000 g.", practice: [{ q: "How many grams in 2 kg?", a: "2000 g." }] },
      { title: "Multiplying larger numbers", explanation: "We multiply by breaking a number into tens and ones, then add the parts.", example: "23 × 4 = (20 × 4) + (3 × 4) = 80 + 12 = 92.", practice: [{ q: "Find 15 × 3.", a: "45." }] },
      { title: "Perimeter (first idea)", explanation: "Perimeter is the total distance around a shape. Add up all the sides.", example: "A square with side 5 cm: perimeter = 5 + 5 + 5 + 5 = 20 cm.", practice: [{ q: "Perimeter of a triangle with sides 3, 4, 5 cm?", a: "12 cm." }] },
      { title: "Reading simple data", explanation: "A tally or picture chart shows counts. We read it to compare amounts.", example: "If ●●● means 3 mangoes and ●●●●● means 5 apples, there are 2 more apples.", practice: [{ q: "Bar shows 7 cats and 4 dogs. How many more cats?", a: "3 more." }] },
    ],
  },
  {
    id: "g5-6",
    grade: "Grades 5-6",
    ages: "Ages 10-12",
    book: "NCERT Mathematics (Class 5-6)",
    topics: [
      { title: "Fractions & decimals", explanation: "Decimals are another way to write fractions with tenths, hundredths, and so on. The dot is the decimal point.", example: "1/2 = 0.5, and 3/4 = 0.75.", practice: [{ q: "Write 1/4 as a decimal.", a: "0.25." }] },
      { title: "Factors & multiples", explanation: "A factor divides a number exactly. A multiple is the result of multiplying by whole numbers.", example: "Factors of 6: 1, 2, 3, 6. Multiples of 6: 6, 12, 18, 24…", practice: [{ q: "List the factors of 12.", a: "1, 2, 3, 4, 6, 12." }] },
      { title: "Ratio & proportion", explanation: "A ratio compares two quantities of the same kind. We read 2:3 as \"2 to 3\" and can simplify it.", example: "2 pens for every 3 pencils → ratio 2 : 3.", practice: [{ q: "Simplify the ratio 4 : 8.", a: "1 : 2." }] },
      { title: "Percentage (first idea)", explanation: "Percent means \"out of 100\". A fraction with denominator 100 is a percentage.", example: "50/100 = 50%, and 1/4 = 25/100 = 25%.", practice: [{ q: "Write 3/4 as a percent.", a: "75%." }] },
      { title: "Perimeter & area", explanation: "Perimeter is the distance around a shape; area is the space inside it.", example: "Rectangle 5 cm by 3 cm: perimeter = 2(5+3) = 16 cm; area = 5 × 3 = 15 cm².", practice: [{ q: "Area of a 6 cm by 4 cm rectangle?", a: "24 cm²." }] },
      { title: "Integers (first idea)", explanation: "Integers include positive numbers, negative numbers, and zero, shown on a number line.", example: "Below zero we write negatives: −1, −2, −3. A loss of 3 is −3.", practice: [{ q: "Which is greater: −2 or −5?", a: "−2 (it is closer to zero)." }] },
      { title: "Averages", explanation: "The average (mean) is the total divided by how many numbers there are.", example: "Average of 4, 6, 8 = (4 + 6 + 8) ÷ 3 = 18 ÷ 3 = 6.", practice: [{ q: "Average of 10 and 20?", a: "15." }] },
    ],
  },
  {
    id: "g7-8",
    grade: "Grades 7-8",
    ages: "Ages 12-14",
    book: "NCERT Mathematics (Class 7-8)",
    topics: [
      { title: "Integers", explanation: "We add, subtract, and multiply positive and negative numbers using the number line and sign rules.", example: "−3 + 5 = 2; and −2 − 4 = −6.", practice: [{ q: "Solve: −5 + 8.", a: "3." }] },
      { title: "Algebraic expressions", explanation: "Algebra uses letters (variables) for numbers. We combine like terms to simplify.", example: "3x + 2x = 5x; and 4a + 3 − a = 3a + 3.", practice: [{ q: "Simplify: 5x − 2x + 3.", a: "3x + 3." }] },
      { title: "Linear equations", explanation: "An equation says two things are equal. Do the same operation to both sides until the variable is alone.", example: "2x + 3 = 11 → 2x = 8 → x = 4.", practice: [{ q: "Solve: 3x − 6 = 9.", a: "x = 5." }] },
      { title: "Percentages", explanation: "Percent means out of 100. To find a percent of a number, multiply by the percent as a fraction or decimal.", example: "20% of 150 = (20/100) × 150 = 30.", practice: [{ q: "Find 25% of 80.", a: "20." }] },
      { title: "Exponents & powers", explanation: "A power is repeated multiplication. The small number (index) tells how many times.", example: "2⁴ = 2 × 2 × 2 × 2 = 16; and 10³ = 1000.", practice: [{ q: "What is 3³?", a: "27." }] },
      { title: "Ratio & proportion", explanation: "A proportion says two ratios are equal. We can find a missing value by cross-multiplying.", example: "If 2 : 5 = x : 20, then x = (2 × 20) ÷ 5 = 8.", practice: [{ q: "If 3 : 4 = 9 : x, find x.", a: "x = 12." }] },
      { title: "Area & volume", explanation: "Area covers a flat shape; volume fills a solid. A cuboid's volume is length × breadth × height.", example: "A box 3 × 4 × 2 cm has volume 3 × 4 × 2 = 24 cm³.", practice: [{ q: "Volume of a cube with side 5 cm?", a: "125 cm³." }] },
      { title: "Data & probability", explanation: "Probability measures how likely an event is, from 0 (impossible) to 1 (certain).", example: "A coin has 2 sides, so P(heads) = 1/2.", practice: [{ q: "Probability of rolling a 6 on a die?", a: "1/6." }] },
    ],
  },
  {
    id: "g9-10",
    grade: "Grades 9-10",
    ages: "Ages 14-16",
    book: "NCERT Mathematics (Class 9-10)",
    topics: [
      { title: "Polynomials", explanation: "A polynomial has terms like ax² + bx + c. We add, subtract, and factorise them.", example: "x² + 5x + 6 = (x + 2)(x + 3).", practice: [{ q: "Factorise: x² + 6x + 8.", a: "(x + 2)(x + 4)." }] },
      { title: "Linear equations in two variables", explanation: "An equation like ax + by = c has many solutions forming a line. Two such equations can be solved together.", example: "x + y = 10 and x − y = 4 give x = 7, y = 3.", practice: [{ q: "Solve x + y = 7, x − y = 1.", a: "x = 4, y = 3." }] },
      { title: "Quadratic equations", explanation: "A quadratic has the form ax² + bx + c = 0. Solve by factorising or the quadratic formula.", example: "x² − 5x + 6 = 0 → (x − 2)(x − 3) = 0 → x = 2 or 3.", practice: [{ q: "Solve: x² − 9 = 0.", a: "x = 3 or x = −3." }] },
      { title: "Trigonometry (basics)", explanation: "In a right triangle, the side ratios have names: sin, cos, and tan of an angle.", example: "sin θ = opposite / hypotenuse; for a 3-4-5 triangle, sin = 3/5 = 0.6.", practice: [{ q: "Opposite = 3, hypotenuse = 5. Find sin θ.", a: "3/5 = 0.6." }] },
      { title: "Coordinate geometry", explanation: "Points are located by (x, y). The distance between two points uses the distance formula.", example: "Distance from (0,0) to (3,4) = √(3² + 4²) = √25 = 5.", practice: [{ q: "Distance from (0,0) to (6,8)?", a: "10." }] },
      { title: "Arithmetic progressions", explanation: "An AP is a list where each term increases by the same amount, called the common difference.", example: "2, 5, 8, 11, … has common difference 3; the nth term = 2 + (n−1)×3.", practice: [{ q: "Next term after 7, 12, 17?", a: "22 (common difference 5)." }] },
      { title: "Surface area & volume", explanation: "We use formulas for solids. A sphere's volume is (4/3)πr³; a cylinder's is πr²h.", example: "A cylinder with r = 7, h = 10: volume = π × 7² × 10 ≈ 1540 cm³.", practice: [{ q: "Volume of a cube with edge 4 cm?", a: "64 cm³." }] },
      { title: "Statistics", explanation: "We summarise data using mean, median, and mode.", example: "For 3, 5, 5, 7: mean = 5, median = 5, mode = 5.", practice: [{ q: "Find the mode of 2, 3, 3, 4, 5.", a: "3 (it appears most)." }] },
    ],
  },
];

export const SCIENCE_BANDS: GradeBand[] = [
  {
    id: "s1-2",
    grade: "Grades 1-2",
    ages: "Ages 6-8",
    book: "NCERT Science (Class 1-2)",
    topics: [
      { title: "Living and non-living", explanation: "Living things grow, eat, breathe, and move on their own. Non-living things do not.", example: "A plant and a dog are living; a stone and a chair are non-living.", practice: [{ q: "Living or non-living: a fish?", a: "Living - it grows, eats, and moves." }] },
      { title: "Plants around us", explanation: "Plants have roots, a stem, leaves, and often flowers. They make their own food using sunlight.", example: "Roots hold the plant and drink water; leaves catch sunlight.", practice: [{ q: "Which part of a plant holds it in the soil?", a: "The roots." }] },
      { title: "Our body", explanation: "We use our five senses - sight, hearing, smell, taste, and touch - to learn about the world.", example: "We see with our eyes and hear with our ears.", practice: [{ q: "Which sense do we use to enjoy music?", a: "Hearing (ears)." }] },
      { title: "Weather & seasons", explanation: "Weather is how it is outside - sunny, rainy, or windy. The main seasons are summer, the rainy season, and winter.", example: "We carry an umbrella in the rainy season.", practice: [{ q: "Which season is the hottest?", a: "Summer." }] },
    ],
  },
  {
    id: "s3-4",
    grade: "Grades 3-4",
    ages: "Ages 8-10",
    book: "NCERT Science (Class 3-4)",
    topics: [
      { title: "Parts of a plant", explanation: "Each plant part has a job: roots absorb water, the stem carries it, leaves make food, and flowers make seeds.", example: "A mango tree's leaves make food; its flowers become mangoes with seeds.", practice: [{ q: "Which part makes the plant's food?", a: "The leaves." }] },
      { title: "Animals and their food", explanation: "Herbivores eat plants, carnivores eat other animals, and omnivores eat both.", example: "A cow is a herbivore; a tiger is a carnivore; a crow is an omnivore.", practice: [{ q: "What do we call an animal that eats only plants?", a: "A herbivore." }] },
      { title: "Water", explanation: "Water can be a solid (ice), a liquid (water), or a gas (steam). Heating and cooling change its form.", example: "Ice melts into water; water boils into steam.", practice: [{ q: "What do we call water in its solid form?", a: "Ice." }] },
      { title: "Materials around us", explanation: "Things are made of materials like wood, metal, plastic, and glass. We choose materials by their properties.", example: "A window is glass because it is transparent; a spoon is metal because it is strong.", practice: [{ q: "Why are cooking pots usually made of metal?", a: "Metal is strong and carries heat well." }] },
    ],
  },
  {
    id: "s5-6",
    grade: "Grades 5-6",
    ages: "Ages 10-12",
    book: "NCERT Science (Class 5-6)",
    topics: [
      { title: "The human body", explanation: "Organs work in systems. The digestive system breaks down food; the respiratory system takes in oxygen.", example: "We breathe in oxygen with our lungs and breathe out carbon dioxide.", practice: [{ q: "Which organ helps us breathe?", a: "The lungs." }] },
      { title: "Food & nutrition", explanation: "A balanced diet has carbohydrates for energy, proteins for growth, fats, vitamins, and minerals.", example: "Rice gives energy; dal and eggs give protein for growth.", practice: [{ q: "Which nutrient mainly helps the body grow?", a: "Protein." }] },
      { title: "Light & shadow", explanation: "Light travels in straight lines. A shadow forms when an opaque object blocks light.", example: "Your shadow is long in the morning and short at noon.", practice: [{ q: "What kind of object makes a clear shadow?", a: "An opaque object (one light cannot pass through)." }] },
      { title: "States of matter", explanation: "Matter is solid, liquid, or gas. Solids keep their shape; liquids take the shape of the container; gases spread out.", example: "A rock is solid, milk is liquid, and air is a gas.", practice: [{ q: "Which state takes the shape of its container but keeps its volume?", a: "A liquid." }] },
    ],
  },
  {
    id: "s7-8",
    grade: "Grades 7-8",
    ages: "Ages 12-14",
    book: "NCERT Science (Class 7-8)",
    topics: [
      { title: "Photosynthesis", explanation: "Green plants make food in their leaves using sunlight, water, and carbon dioxide, giving out oxygen.", example: "Sunlight + water + CO₂ → glucose (food) + oxygen.", practice: [{ q: "What gas do plants release during photosynthesis?", a: "Oxygen." }] },
      { title: "Cells", explanation: "The cell is the basic unit of life. Plant cells have a cell wall; animal cells do not.", example: "Your body is made of trillions of tiny cells.", practice: [{ q: "Which feature do plant cells have that animal cells lack?", a: "A cell wall." }] },
      { title: "Force & motion", explanation: "A force is a push or a pull. It can start, stop, speed up, slow down, or change the direction of motion.", example: "Kicking a ball applies a force that makes it move.", practice: [{ q: "Name a force that slows a moving object down.", a: "Friction." }] },
      { title: "Electric current", explanation: "Electric current flows in a closed circuit. A switch opens or closes the path.", example: "A bulb lights only when the circuit is closed (switch on).", practice: [{ q: "Will a bulb glow if the circuit is open?", a: "No - current cannot flow in an open circuit." }] },
      { title: "Acids & bases", explanation: "Acids taste sour, bases taste bitter and feel soapy. An indicator like litmus tells them apart.", example: "Lemon juice is acidic (turns blue litmus red); soap is basic.", practice: [{ q: "What colour does blue litmus turn in an acid?", a: "Red." }] },
    ],
  },
  {
    id: "s9-10",
    grade: "Grades 9-10",
    ages: "Ages 14-16",
    book: "NCERT Science (Class 9-10)",
    topics: [
      { title: "Atoms & molecules", explanation: "All matter is made of atoms. Atoms join to form molecules; a chemical formula shows how many of each.", example: "Water is H₂O - two hydrogen atoms and one oxygen atom.", practice: [{ q: "How many atoms are in one molecule of CO₂?", a: "Three - one carbon and two oxygen." }] },
      { title: "Newton's laws of motion", explanation: "An object stays at rest or moves steadily unless a force acts (1st law). Force = mass × acceleration (2nd law). Every action has an equal, opposite reaction (3rd law).", example: "A rocket pushes gas down, and the gas pushes the rocket up (3rd law).", practice: [{ q: "Find the force: mass 2 kg, acceleration 3 m/s².", a: "F = m × a = 2 × 3 = 6 N." }] },
      { title: "Chemical reactions", explanation: "In a reaction, substances change into new ones. Matter is conserved - atoms are rearranged, not lost.", example: "Iron + oxygen → rust (iron oxide).", practice: [{ q: "In a balanced reaction, is the total mass before and after the same?", a: "Yes - mass is conserved." }] },
      { title: "Life processes", explanation: "Living things carry out nutrition, respiration, transport, and excretion to stay alive.", example: "Respiration releases energy from food: glucose + oxygen → energy + CO₂ + water.", practice: [{ q: "Which life process releases energy from food?", a: "Respiration." }] },
      { title: "Electricity & circuits", explanation: "Voltage drives current through resistance. Ohm's law links them: V = I × R.", example: "If V = 12 V and R = 4 Ω, then I = V/R = 12/4 = 3 A.", practice: [{ q: "Find the current: V = 10 V, R = 5 Ω.", a: "I = V/R = 10/5 = 2 A." }] },
    ],
  },
];

export const CODING_LESSONS: EnglishLesson[] = [
  {
    id: "code-what",
    title: "What is Code?",
    summary: "Code is a set of step-by-step instructions we give a computer.",
    sections: [
      { heading: "Instructions for a computer", body: "Computers cannot think for themselves. They follow the exact instructions we write, called code.", examples: ["A recipe is like code for cooking.", "\"Turn on the light\" is one instruction."] },
      { heading: "Be exact", body: "A computer does exactly what you say, not what you mean. A small mistake gives a wrong result.", examples: ["Say \"add 2 and 3\", not just \"add some numbers\"."] },
    ],
    practice: [{ q: "Why must instructions be exact?", a: "The computer follows them literally - it cannot guess what you meant." }],
  },
  {
    id: "code-sequence",
    title: "Step by Step (Sequencing)",
    summary: "Sequencing means the computer runs steps in order, one after another.",
    sections: [
      { heading: "Order matters", body: "Steps happen from top to bottom. The wrong order gives the wrong result.", examples: ["1) Put on socks  2) Put on shoes - not the other way!"] },
      { heading: "A simple sequence", body: "Each line runs after the one before it.", examples: ["1) get bread  2) add butter  3) eat"] },
    ],
    practice: [{ q: "Put in order: \"eat\", \"cook\", \"buy vegetables\".", a: "buy vegetables → cook → eat." }],
  },
  {
    id: "code-variables",
    title: "Variables",
    summary: "A variable is a named box that stores a value you can use and change.",
    sections: [
      { heading: "Storing a value", body: "We give the box a name and put a value inside it.", examples: ["score = 0", "name = \"Ravi\""] },
      { heading: "Changing it", body: "We can update the value later in the program.", examples: ["score = score + 10   (score goes up by 10)"] },
    ],
    practice: [{ q: "If x = 4 and then x = x + 3, what is x?", a: "7." }],
  },
  {
    id: "code-input",
    title: "Input & Output",
    summary: "Input is what goes into a program; output is what comes out.",
    sections: [
      { heading: "Input", body: "Input is data the program receives, often from the user.", examples: ["A number you type in", "A button you click"] },
      { heading: "Output", body: "Output is what the program shows or returns.", examples: ["print(\"Hello!\")  shows Hello! on the screen"] },
    ],
    practice: [{ q: "Is typing your name input or output?", a: "Input - it goes into the program." }],
  },
  {
    id: "code-conditionals",
    title: "Making Decisions (if / else)",
    summary: "Conditionals let a program choose what to do based on a condition.",
    sections: [
      { heading: "if / else", body: "If a condition is true, do one thing; otherwise do another.", examples: ["if raining: take umbrella   else: wear a cap"] },
      { heading: "Comparisons", body: "We compare values using >, <, and == (equals).", examples: ["if marks >= 35: print \"Pass\"   else: print \"Fail\""] },
    ],
    practice: [{ q: "if age >= 18 print \"adult\" else \"minor\". What prints for age 20?", a: "adult." }],
  },
  {
    id: "code-loops",
    title: "Repeating (Loops)",
    summary: "A loop repeats a set of steps without writing them again and again.",
    sections: [
      { heading: "Why loops", body: "Loops let us do the same thing many times with little code.", examples: ["repeat 5 times: print \"hi\"   → prints hi five times"] },
      { heading: "Be careful", body: "A loop with no stopping point runs forever - that is an infinite loop.", examples: ["Always make sure the loop can end."] },
    ],
    practice: [{ q: "How many times does \"repeat 3 times: clap\" clap?", a: "3 times." }],
  },
  {
    id: "code-functions",
    title: "Functions",
    summary: "A function is a named block of steps you can reuse whenever you need it.",
    sections: [
      { heading: "Reuse", body: "Write the steps once, then call the name to run them again.", examples: ["function greet(): print \"Hello!\"", "greet()   → runs the steps"] },
      { heading: "Inputs and outputs", body: "Functions can take values and give a result back.", examples: ["function area(l, w): return l * w", "area(5, 3)   → 15"] },
    ],
    practice: [{ q: "Why use functions?", a: "To reuse code and avoid writing the same steps again and again." }],
  },
  {
    id: "code-debug",
    title: "Finding Bugs (Debugging)",
    summary: "A bug is a mistake in code; debugging is finding and fixing it.",
    sections: [
      { heading: "What is a bug?", body: "A bug is any error that makes the program behave wrongly.", examples: ["Using + instead of − gives the wrong total."] },
      { heading: "How to debug", body: "Read the code slowly, check each step, and test small parts.", examples: ["Print values to see where it goes wrong."] },
    ],
    practice: [{ q: "Your add function returns 1 for 2 + 3. What is likely wrong?", a: "It probably uses the wrong operator (maybe − instead of +). Check the math step." }],
  },
];

export const SOCIAL_BANDS: GradeBand[] = [
  {
    id: "so1-2",
    grade: "Grades 1-2",
    ages: "Ages 6-8",
    book: "NCERT EVS (Class 1-2)",
    topics: [
      { title: "My family", explanation: "A family is the people who live together and care for one another.", example: "Parents, brothers, sisters, and grandparents are part of a family.", practice: [{ q: "Name two members of a family.", a: "Any two: mother, father, sister, brother, grandparent." }] },
      { title: "Our neighbourhood", explanation: "Our neighbourhood is the places and people around our home.", example: "The shopkeeper, doctor, and teacher all help our neighbourhood.", practice: [{ q: "Who teaches children at school?", a: "A teacher." }] },
      { title: "Our country, India", explanation: "We live in India. Its capital is New Delhi and its flag has three colours.", example: "The tricolour: saffron, white, and green, with a blue wheel in the middle.", practice: [{ q: "What is the capital of India?", a: "New Delhi." }] },
      { title: "Festivals", explanation: "India has many festivals celebrated by different communities together.", example: "Diwali, Eid, Christmas, and Pongal are all celebrated in India.", practice: [{ q: "Name one Indian festival.", a: "Any: Diwali, Eid, Christmas, Pongal, Holi…" }] },
    ],
  },
  {
    id: "so3-4",
    grade: "Grades 3-4",
    ages: "Ages 8-10",
    book: "NCERT EVS (Class 3-4)",
    topics: [
      { title: "States and capitals", explanation: "India is divided into states, and each state has a capital city.", example: "Telangana's capital is Hyderabad; Maharashtra's is Mumbai.", practice: [{ q: "What is the capital of Telangana?", a: "Hyderabad." }] },
      { title: "Maps & directions", explanation: "A map shows places from above. The four main directions are North, South, East, and West.", example: "The sun rises in the East and sets in the West.", practice: [{ q: "In which direction does the sun rise?", a: "East." }] },
      { title: "People who help us", explanation: "Many people serve the community - doctors, farmers, police, and postmen.", example: "Farmers grow the food we eat every day.", practice: [{ q: "Who grows our food?", a: "Farmers." }] },
      { title: "Transport & communication", explanation: "We travel by road, rail, water, and air, and we communicate by phone, post, and internet.", example: "A train runs on rails; a letter is sent by post.", practice: [{ q: "Name one way to communicate over a distance.", a: "Phone, letter/post, or email." }] },
    ],
  },
  {
    id: "so5-6",
    grade: "Grades 5-6",
    ages: "Ages 10-12",
    book: "NCERT Social Science (Class 5-6)",
    topics: [
      { title: "Continents & oceans", explanation: "The Earth has 7 continents and 5 oceans.", example: "Asia is the largest continent and the Pacific is the largest ocean. India is in Asia.", practice: [{ q: "Which continent is India in?", a: "Asia." }] },
      { title: "Rivers & mountains of India", explanation: "India has great rivers and high mountain ranges.", example: "The Ganga is a major river; the Himalayas are the highest mountains.", practice: [{ q: "Name the highest mountain range in India.", a: "The Himalayas." }] },
      { title: "Ancient India", explanation: "Long ago, the Indus Valley Civilisation built well-planned cities.", example: "Harappa and Mohenjo-daro had brick houses and covered drains.", practice: [{ q: "Name one Indus Valley city.", a: "Harappa or Mohenjo-daro." }] },
      { title: "Our Constitution", explanation: "The Constitution is the set of rules by which India is governed. It came into effect on 26 January 1950.", example: "We celebrate Republic Day on 26 January.", practice: [{ q: "When did the Constitution of India come into effect?", a: "26 January 1950." }] },
    ],
  },
  {
    id: "so7-8",
    grade: "Grades 7-8",
    ages: "Ages 12-14",
    book: "NCERT Social Science (Class 7-8)",
    topics: [
      { title: "Medieval India", explanation: "After ancient times, many kingdoms and empires ruled different parts of India.", example: "The Mughals built the Taj Mahal in Agra.", practice: [{ q: "Who built the Taj Mahal?", a: "The Mughal emperor Shah Jahan." }] },
      { title: "Climate & resources", explanation: "India has many climates and natural resources such as water, soil, and minerals.", example: "The monsoon brings the rain that farmers depend on.", practice: [{ q: "Which seasonal wind brings most of India's rain?", a: "The monsoon." }] },
      { title: "Democracy & government", explanation: "India is a democracy - the people elect their leaders by voting.", example: "Citizens vote to choose their Members of Parliament.", practice: [{ q: "How do citizens choose leaders in a democracy?", a: "By voting in elections." }] },
      { title: "Sectors of work", explanation: "People earn a living through farming, industry, and services.", example: "A farmer (primary), a factory worker (secondary), a teacher (tertiary).", practice: [{ q: "Farming belongs to which sector?", a: "The primary sector." }] },
    ],
  },
  {
    id: "so9-10",
    grade: "Grades 9-10",
    ages: "Ages 14-16",
    book: "NCERT Social Science (Class 9-10)",
    topics: [
      { title: "India's freedom struggle", explanation: "India became free from British rule on 15 August 1947 after a long struggle.", example: "Mahatma Gandhi led non-violent movements such as the Salt March.", practice: [{ q: "On what date did India gain independence?", a: "15 August 1947." }] },
      { title: "Latitudes & longitudes", explanation: "Imaginary lines help us locate places on the globe. Latitudes run east-west; longitudes run north-south.", example: "The Equator is 0° latitude; the Prime Meridian is 0° longitude.", practice: [{ q: "What is the 0° latitude line called?", a: "The Equator." }] },
      { title: "Fundamental Rights", explanation: "The Constitution gives citizens rights such as equality, freedom, and education.", example: "The Right to Equality means no discrimination by caste, religion, or gender.", practice: [{ q: "Name one Fundamental Right.", a: "Any: equality, freedom, against exploitation, education…" }] },
      { title: "Sectors of the economy", explanation: "The economy has primary (farming), secondary (industry), and tertiary (services) sectors.", example: "Banking and teaching are tertiary-sector services.", practice: [{ q: "Which sector does manufacturing belong to?", a: "The secondary sector." }] },
    ],
  },
];

export const QUIZZES: Record<string, QuizQ[]> = {
  sentence: [
    { q: "Which is a complete sentence?", choices: ["Under the big tree", "The dog barked loudly.", "Running very fast"], answer: 1 },
    { q: "What kind of sentence is \"Please sit down.\"?", choices: ["Assertive", "Imperative", "Exclamatory"], answer: 1 },
  ],
  nouns: [
    { q: "Which is a proper noun?", choices: ["river", "Ganga", "water"], answer: 1 },
    { q: "Which is a collective noun?", choices: ["team", "player", "ball"], answer: 0 },
  ],
  number: [
    { q: "What is the plural of \"box\"?", choices: ["boxs", "boxes", "boxen"], answer: 1 },
    { q: "What is the plural of \"child\"?", choices: ["childs", "children", "childes"], answer: 1 },
  ],
  gender: [
    { q: "What is the feminine of \"king\"?", choices: ["queen", "prince", "lord"], answer: 0 },
    { q: "Which word is neuter?", choices: ["boy", "table", "aunt"], answer: 1 },
  ],
  pronouns: [
    { q: "Replace \"Ravi\": \"Ravi is tall.\"", choices: ["He", "Him", "His"], answer: 0 },
    { q: "Which is a possessive pronoun?", choices: ["they", "mine", "you"], answer: 1 },
  ],
  articles: [
    { q: "Choose: \"___ apple a day.\"", choices: ["A", "An", "The"], answer: 1 },
    { q: "Choose: \"He is ___ honest boy.\"", choices: ["a", "an", "the"], answer: 1 },
  ],
  adjectives: [
    { q: "What is the superlative of \"big\"?", choices: ["bigger", "biggest", "more big"], answer: 1 },
    { q: "Which word is the adjective in \"a red car\"?", choices: ["a", "red", "car"], answer: 1 },
  ],
  verbs: [
    { q: "Find the verb: \"She sings well.\"", choices: ["She", "sings", "well"], answer: 1 },
    { q: "Which is a helping verb?", choices: ["run", "is", "quickly"], answer: 1 },
  ],
  adverbs: [
    { q: "Find the adverb: \"He runs quickly.\"", choices: ["He", "runs", "quickly"], answer: 2 },
    { q: "An adverb can describe a ___.", choices: ["noun", "verb", "article"], answer: 1 },
  ],
  prepositions: [
    { q: "Choose: \"The cat is ___ the table.\"", choices: ["on", "and", "run"], answer: 0 },
    { q: "Which word is a preposition?", choices: ["under", "happy", "jump"], answer: 0 },
  ],
  conjunctions: [
    { q: "Which word joins: \"tea ___ coffee\"?", choices: ["or", "run", "blue"], answer: 0 },
    { q: "Which is a conjunction?", choices: ["but", "fast", "table"], answer: 0 },
  ],
  interjections: [
    { q: "Which is an interjection?", choices: ["Hurray!", "table", "slowly"], answer: 0 },
    { q: "Interjections express ___.", choices: ["actions", "sudden feelings", "numbers"], answer: 1 },
  ],
  tenses: [
    { q: "What is the past tense of \"go\"?", choices: ["goed", "went", "gone"], answer: 1 },
    { q: "\"She is reading\" is in the ___ tense.", choices: ["simple past", "present continuous", "future"], answer: 1 },
  ],
  agreement: [
    { q: "Choose: \"The dogs ___ barking.\"", choices: ["is", "are", "am"], answer: 1 },
    { q: "Choose: \"Each boy ___ a bag.\"", choices: ["have", "has", "are"], answer: 1 },
  ],
  voice: [
    { q: "Passive of \"He ate the apple.\"", choices: ["The apple was eaten by him.", "He is eating.", "The apple eats him."], answer: 0 },
    { q: "In the active voice, the subject ___.", choices: ["receives the action", "does the action", "is removed"], answer: 1 },
  ],
  speech: [
    { q: "Indirect form of: She said, \"I am tired.\"", choices: ["She said she is tired.", "She said that she was tired.", "She say tired."], answer: 1 },
    { q: "Direct speech uses ___.", choices: ["quotation marks", "no punctuation", "only commas"], answer: 0 },
  ],
  punctuation: [
    { q: "Which mark ends a question?", choices: [".", "?", "!"], answer: 1 },
    { q: "Which needs a capital letter?", choices: ["the word \"dog\"", "the name \"Delhi\"", "the word \"and\""], answer: 1 },
  ],
  confusions: [
    { q: "Choose: \"___ raining outside.\"", choices: ["It's", "Its"], answer: 0 },
    { q: "Choose: \"___ going to win.\"", choices: ["Your", "You're"], answer: 1 },
  ],
  vocab: [
    { q: "Which is a synonym for \"happy\"?", choices: ["sad", "glad", "tall"], answer: 1 },
    { q: "Which is an antonym for \"hot\"?", choices: ["warm", "cold", "fire"], answer: 1 },
  ],
  comprehension: [
    { q: "What is the first step in comprehension?", choices: ["Answer before reading", "Read the whole passage", "Copy random lines"], answer: 1 },
    { q: "The best way to answer is to ___.", choices: ["copy long lines", "use a full sentence with proof", "guess"], answer: 1 },
  ],
  letter: [
    { q: "Which closing is formal?", choices: ["With love", "Yours faithfully", "Bye"], answer: 1 },
    { q: "A formal letter should be ___.", choices: ["long and chatty", "brief and polite", "full of slang"], answer: 1 },
  ],
  "code-what": [
    { q: "Code is a set of ___ for a computer.", choices: ["pictures", "instructions", "feelings"], answer: 1 },
    { q: "A computer does ___.", choices: ["exactly what you tell it", "whatever it wants", "nothing"], answer: 0 },
  ],
  "code-sequence": [
    { q: "Sequencing means steps run ___.", choices: ["in any order", "in order, one by one", "backwards"], answer: 1 },
    { q: "If steps are in the wrong order, the program ___.", choices: ["still works perfectly", "may give a wrong result", "deletes itself"], answer: 1 },
  ],
  "code-variables": [
    { q: "A variable is like a ___ that stores a value.", choices: ["box", "cloud", "wall"], answer: 0 },
    { q: "After \"score = 5; score = score + 1\", score is ___.", choices: ["5", "6", "51"], answer: 1 },
  ],
  "code-input": [
    { q: "Input is information that ___.", choices: ["goes into the program", "comes out of the program", "is deleted"], answer: 0 },
    { q: "Showing a result on the screen is ___.", choices: ["input", "output", "a bug"], answer: 1 },
  ],
  "code-conditionals": [
    { q: "\"if / else\" lets a program ___.", choices: ["repeat forever", "make a decision", "store data"], answer: 1 },
    { q: "if age >= 18 print \"adult\" else \"minor\". For age 15?", choices: ["adult", "minor", "error"], answer: 1 },
  ],
  "code-loops": [
    { q: "A loop is used to ___.", choices: ["repeat steps", "make decisions", "stop the program"], answer: 0 },
    { q: "A loop that never ends is called an ___ loop.", choices: ["input", "infinite", "empty"], answer: 1 },
  ],
  "code-functions": [
    { q: "A function is a ___ block of steps you can reuse.", choices: ["named", "random", "broken"], answer: 0 },
    { q: "Functions help avoid ___.", choices: ["repeating code", "writing code", "using variables"], answer: 0 },
  ],
  "code-debug": [
    { q: "A bug is ___.", choices: ["an insect in the screen", "a mistake in the code", "a fast program"], answer: 1 },
    { q: "Debugging means ___.", choices: ["adding bugs", "finding and fixing mistakes", "deleting the file"], answer: 1 },
  ],
};
