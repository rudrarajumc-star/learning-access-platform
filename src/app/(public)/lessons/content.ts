export interface LessonSection {
  heading: string;
  body: string;
  examples?: string[];
}

export interface Practice {
  q: string;
  a: string;
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
      { q: "Is this a complete sentence? — \"Running down the street\"", a: "No. It has no subject and no complete thought. A complete version: \"The boy was running down the street.\"" },
      { q: "Name the kind: \"Shut the window.\"", a: "Imperative — it gives a command." },
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
        heading: "Countable and uncountable nouns",
        body: "Countable nouns can be counted (one, two, three). Uncountable nouns cannot be counted; we measure them instead.",
        examples: ["Countable: two apples, five books", "Uncountable: water, milk, rice, honesty"],
      },
    ],
    practice: [
      { q: "Common or proper? — \"mountain\" and \"Himalayas\"", a: "\"mountain\" is a common noun; \"Himalayas\" is a proper noun." },
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
      { q: "Fill in: \"___ honest man kept ___ umbrella by ___ door.\"", a: "An honest man kept an umbrella by the door. (\"honest\" starts with a vowel sound; the door is specific)" },
    ],
  },
  {
    id: "adjectives",
    title: "Adjectives",
    summary: "An adjective is a word that describes a noun.",
    sections: [
      {
        heading: "What adjectives do",
        body: "An adjective adds something to the meaning of a noun — its quality, quantity, or number.",
        examples: ["a tall tree", "some water", "five mangoes"],
      },
      {
        heading: "Degrees of comparison",
        body: "Adjectives have three degrees. Positive describes one thing. Comparative compares two. Superlative compares three or more.",
        examples: ["Positive: tall", "Comparative: taller (than)", "Superlative: tallest (of all)"],
      },
    ],
    practice: [
      { q: "Give the comparative and superlative of \"good\".", a: "good → better → best (these are irregular forms)." },
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
      { q: "Find the verb: \"The children played in the park.\"", a: "\"played\" — it shows the action." },
    ],
  },
  {
    id: "tenses",
    title: "Tenses",
    summary: "Tense tells us the time of an action — present, past, or future.",
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
    title: "Subject–Verb Agreement",
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
      { q: "Choose: \"One of the windows (is / are) open.\"", a: "is — the subject is \"One\" (singular), not \"windows\"." },
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
        heading: "The comma",
        body: "A comma (,) shows a short pause. Use it to separate items in a list and after an introductory word or phrase.",
        examples: ["I bought apples, bananas, and grapes.", "After the rain, the sky cleared."],
      },
      {
        heading: "Capital letters",
        body: "Begin every sentence with a capital letter. Also capitalise names of people, places, days, and months.",
        examples: ["Ravi visited Mumbai in July."],
      },
    ],
  },
];

export const MATH_BANDS: GradeBand[] = [
  {
    id: "g1-2",
    grade: "Grades 1–2",
    ages: "Ages 6–8",
    book: "NCERT Math-Magic (Class 1–2)",
    topics: [
      { title: "Counting & number names", explanation: "We count things one by one and learn the names and order of numbers up to 100. The number that comes just after is one more; the number just before is one less.", example: "After 7 comes 8 (one more). Before 7 comes 6 (one less)." },
      { title: "Addition", explanation: "Addition means putting groups together to find how many in all. The symbol is +.", example: "3 apples + 2 apples = 5 apples, so 3 + 2 = 5." },
      { title: "Subtraction", explanation: "Subtraction means taking away to find how many are left. The symbol is −.", example: "You have 5 toffees and eat 2. Left = 5 − 2 = 3." },
      { title: "Shapes around us", explanation: "We see flat shapes everywhere — circle, square, triangle, rectangle. We name them by their sides and corners.", example: "A square has 4 equal sides and 4 corners; a triangle has 3 sides." },
    ],
  },
  {
    id: "g3-4",
    grade: "Grades 3–4",
    ages: "Ages 8–10",
    book: "NCERT Math-Magic (Class 3–4)",
    topics: [
      { title: "Multiplication tables", explanation: "Multiplication is repeated addition. The tables (2 to 10) help us add equal groups quickly.", example: "4 × 3 means 3 groups of 4: 4 + 4 + 4 = 12." },
      { title: "Division", explanation: "Division means sharing equally into groups, or making equal groups. The symbol is ÷.", example: "12 sweets shared among 3 children: 12 ÷ 3 = 4 each." },
      { title: "Fractions (first idea)", explanation: "A fraction is a part of a whole. The bottom number tells how many equal parts; the top number tells how many we take.", example: "If a chapati is cut into 4 equal parts and you eat 1, you ate 1/4 of it." },
      { title: "Measurement", explanation: "We measure length in centimetres and metres, weight in grams and kilograms, and liquid in millilitres and litres.", example: "1 metre = 100 centimetres; 1 kilogram = 1000 grams." },
    ],
  },
  {
    id: "g5-6",
    grade: "Grades 5–6",
    ages: "Ages 10–12",
    book: "NCERT Mathematics (Class 5–6)",
    topics: [
      { title: "Fractions & decimals", explanation: "Decimals are another way to write fractions with tenths, hundredths, and so on. The dot is the decimal point.", example: "1/2 = 0.5, and 3/4 = 0.75." },
      { title: "Factors & multiples", explanation: "A factor divides a number exactly. A multiple is the result of multiplying by whole numbers.", example: "Factors of 6: 1, 2, 3, 6. Multiples of 6: 6, 12, 18, 24…" },
      { title: "Ratio", explanation: "A ratio compares two quantities of the same kind. We read 2:3 as \"2 to 3\".", example: "If there are 2 pens for every 3 pencils, the ratio of pens to pencils is 2 : 3." },
      { title: "Perimeter & area", explanation: "Perimeter is the distance around a shape. Area is the space inside it.", example: "A rectangle 5 cm by 3 cm: perimeter = 2(5+3) = 16 cm; area = 5 × 3 = 15 cm²." },
    ],
  },
  {
    id: "g7-8",
    grade: "Grades 7–8",
    ages: "Ages 12–14",
    book: "NCERT Mathematics (Class 7–8)",
    topics: [
      { title: "Integers", explanation: "Integers include positive numbers, negative numbers, and zero. On a number line, numbers grow to the right and shrink to the left.", example: "−3 + 5 = 2; and −2 − 4 = −6." },
      { title: "Algebraic expressions", explanation: "Algebra uses letters (variables) to stand for numbers. We can combine like terms.", example: "3x + 2x = 5x; and 4a + 3 − a = 3a + 3." },
      { title: "Linear equations", explanation: "An equation says two things are equal. We solve it by doing the same operation to both sides until the variable is alone.", example: "2x + 3 = 11 → 2x = 8 → x = 4." },
      { title: "Percentages", explanation: "Percent means \"out of 100\". To find a percent of a number, multiply by the percent written as a fraction or decimal.", example: "20% of 150 = (20/100) × 150 = 30." },
    ],
  },
  {
    id: "g9-10",
    grade: "Grades 9–10",
    ages: "Ages 14–16",
    book: "NCERT Mathematics (Class 9–10)",
    topics: [
      { title: "Polynomials", explanation: "A polynomial is an expression with terms like ax² + bx + c. We can add, subtract, and factorise them.", example: "x² + 5x + 6 = (x + 2)(x + 3)." },
      { title: "Linear equations in two variables", explanation: "An equation like ax + by = c has many solutions that form a straight line. Two such equations can be solved together.", example: "x + y = 10 and x − y = 4 give x = 7, y = 3." },
      { title: "Quadratic equations", explanation: "A quadratic equation has the form ax² + bx + c = 0. We can solve by factorising or with the quadratic formula.", example: "x² − 5x + 6 = 0 → (x − 2)(x − 3) = 0 → x = 2 or x = 3." },
      { title: "Trigonometry (basics)", explanation: "In a right triangle, the ratios of sides have names: sin, cos, and tan of an angle.", example: "sin θ = opposite / hypotenuse; for a 3-4-5 triangle, sin = 3/5 = 0.6." },
    ],
  },
];
