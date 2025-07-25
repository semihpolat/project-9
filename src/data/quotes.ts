export interface Quote {
  id: string;
  text: string;
  author: string;
}

export const creativityQuotes: Quote[] = [
  {
    id: 'einstein-imagination',
    text: 'Imagination is more important than knowledge.',
    author: 'Einstein'
  },
  {
    id: 'jobs-think-different',
    text: 'Think different.',
    author: 'Jobs'
  },
  {
    id: 'wilde-gutter',
    text: 'We are all in the gutter, but some of us are looking at the stars.',
    author: 'Wilde'
  },
  {
    id: 'da-vinci-learning',
    text: 'Learning never exhausts the mind.',
    author: 'da Vinci'
  },
  {
    id: 'curie-nothing',
    text: 'Nothing in life is to be feared, it is only to be understood.',
    author: 'Curie'
  },
  {
    id: 'dali-madness',
    text: 'The only difference between me and a madman is that I am not mad.',
    author: 'Dalí'
  },
  {
    id: 'kahlo-pain',
    text: 'I paint my own reality.',
    author: 'Kahlo'
  },
  {
    id: 'tesla-future',
    text: 'The present is theirs; the future, for which I really worked, is mine.',
    author: 'Tesla'
  }
];

// Get random quote
export const getRandomQuote = (): Quote => {
  const randomIndex = Math.floor(Math.random() * creativityQuotes.length);
  return creativityQuotes[randomIndex];
}; 