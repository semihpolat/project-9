export interface Category {
  slug: string;
  title: string;
  iconPath: string;
}

export interface Prompt {
  id: string;
  text: string;
  category: string;
}

export const categories: Category[] = [
  {
    slug: 'self-awareness',
    title: 'Self-Awareness',
    iconPath: 'M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z'
  },
  {
    slug: 'decision-making',
    title: 'Decision Making', 
    iconPath: 'M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z'
  },
  {
    slug: 'problem-solving',
    title: 'Problem Solving',
    iconPath: 'M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z'
  },
  {
    slug: 'creativity',
    title: 'Creativity',
    iconPath: 'M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zM7 21h10a2 2 0 002-2v-4a2 2 0 00-2-2H7M7 21V9a2 2 0 012-2h10'
  },
  {
    slug: 'communication',
    title: 'Communication',
    iconPath: 'M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z'
  }
];

export const prompts: Prompt[] = [
  // Self-Awareness
  {
    id: 'unconscious-pattern',
    text: "I'm going to describe a recurring problem in my life: [describe your situation]. Analyze this as if you're a world-class psychologist who specializes in unconscious patterns. What underlying belief, fear, or behavioral pattern might be creating this situation repeatedly? What am I not seeing about my own role in this?",
    category: 'self-awareness'
  },
  {
    id: 'values-archaeologist',
    text: "Look at how I actually spend my time and money: [describe your typical week and major expenses]. Don't tell me what I say I value — tell me what I actually value based on my behavior. What gaps do you see between my stated priorities and my revealed priorities?",
    category: 'self-awareness'
  },
  {
    id: 'blind-spot-detector',
    text: "I'm about to make this decision: [describe decision]. Before I decide, what are 3 blind spots I might have? What assumptions am I making that could be wrong? What would someone who disagrees with me say?",
    category: 'self-awareness'
  },

  // Decision Making
  {
    id: 'time-traveler',
    text: "I'm trying to decide: [describe your decision]. Imagine you're me, 10 years from now, looking back. What would Future Me wish Present Me knew before making this choice? What would I regret not considering?",
    category: 'decision-making'
  },
  {
    id: 'devil-advocate',
    text: "I'm leaning towards: [describe your preferred option]. Play devil's advocate. What's the strongest case against this choice? What could go wrong that I'm not seeing? Challenge my reasoning.",
    category: 'decision-making'
  },
  {
    id: 'opportunity-cost',
    text: "If I choose [option A], what am I really giving up? Don't just tell me the obvious costs — what are the hidden opportunity costs? What doors might close? What experiences might I miss?",
    category: 'decision-making'
  },

  // Problem Solving
  {
    id: 'constraint-removal',
    text: "Here's my problem: [describe problem]. If I had unlimited money, time, and resources, how would I solve this? Now, which elements of that 'impossible' solution could I actually implement on a smaller scale?",
    category: 'problem-solving'
  },
  {
    id: 'perspective-shift',
    text: "I'm stuck on: [describe problem]. How would a 5-year-old approach this? How would someone from a completely different culture? How would someone who loves this type of challenge think about it?",
    category: 'problem-solving'
  },
  {
    id: 'root-cause',
    text: "This problem keeps happening: [describe recurring issue]. Let's dig deeper. What's the problem behind the problem? Keep asking 'why' until we get to something fundamental I can actually change.",
    category: 'problem-solving'
  },

  // Creativity
  {
    id: 'random-connector',
    text: "I need a creative solution for: [describe challenge]. Give me 3 completely random words. Now help me connect those words to my challenge in unexpected ways. What new ideas emerge from these weird connections?",
    category: 'creativity'
  },
  {
    id: 'opposite-day',
    text: "Instead of trying to [achieve goal], what if I tried to achieve the exact opposite? What would that look like? Now, what can I learn from that opposite approach that might help with my original goal?",
    category: 'creativity'
  },
  {
    id: 'mashup-master',
    text: "Take [your field/industry] and combine it with [completely different field]. What would that hybrid look like? What problems could this weird combination solve that neither could solve alone?",
    category: 'creativity'
  },

  // Communication
  {
    id: 'empathy-bridge',
    text: "I need to communicate this difficult message: [describe situation]. Help me understand what the other person is really afraid of, what they need to feel safe, and how I can frame this message so they can actually hear it.",
    category: 'communication'
  },
  {
    id: 'story-translator',
    text: "I need to explain [complex topic] to [specific audience]. Turn this into a story they can relate to. What metaphors, analogies, or examples from their world would make this click for them?",
    category: 'communication'
  },
  {
    id: 'conflict-resolver',
    text: "I'm in conflict with someone about: [describe disagreement]. Help me find the underlying needs behind both positions. What do we both actually want? Where might there be hidden common ground?",
    category: 'communication'
  }
];