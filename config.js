const CONFIG = {
  person: {
    name: "Mahnoor",
    nickname: "Mano"
  },
  // Absolute instant: 00:00 on 25 Oct 2026 in Pakistan (Asia/Karachi, UTC+5)
  targetDate: "2026-10-25T00:00:00+05:00",
  togetherSince: "2023-03-17",

  // Step 2: all weekly sets live here.
  // Step 3 will pick by Pakistan calendar date; until then the site uses letterSets[0] (Set A).
  letterSets: [
    {
      id: "A",
      start: "2026-09-21",
      end: "2026-09-27",
      timerHeadline: "Mano ki special day tak…",
      paragraph1: [
        "Mano, kabhi kabhi lagta hai hamari university apni hi choti si duniya thi.",
        "Sab ke saamne hum bas classmates the",
        "lekin woh hidden corners aur library ke moments sirf humare the."
      ],
      paragraph2: [
        "Tumhari gossip, tumhari expressions, tumhari smile, tumhari awaaz…",
        "pata nahi kab yeh sab meri daily life ka hissa ban gaye."
      ],
      paragraph3: [
        "Us waqt wo moments ordinary lagte the.",
        "Ab peeche dekh ke samajh ata hai kitne special the.",
        "Aur unhein yaad karke ab bhi dil garam ho jata hai."
      ]
    },
    {
      id: "B",
      start: "2026-09-28",
      end: "2026-10-04",
      timerHeadline: "Mano… thori si yaad",
      paragraph1: [
        "Mano, mujhe tumhari bohat si choti choti aadatein yaad hain.",
        "Tum kaise baat karti thi, kis baat pe hasti thi,",
        "aur kab rone lag jati thi or me Chup krwa rha hota tha."
      ],
      paragraph2: [
        "Woh expressions jo tum bina kuch kahe bana deti thi..",
        "shayad tumhein andaza bhi nahi ke main kitna notice karta tha."
      ],
      paragraph3: [
        "Tum mere liye sirf girlfriend nahi thi.",
        "Tum woh thi jiska mood chehre se samajh aata tha,",
        "jiski khushi meri khushi ban jati thi.",
        "Woh choti cheezein ab bhi yaad hain."
      ]
    },
    {
      id: "C",
      start: "2026-10-05",
      end: "2026-10-11",
      timerHeadline: "Door, lekin yaad mein",
      paragraph1: [
        "July ke baad roz ka milna peeche reh gaya.",
        "Na woh campus, na woh library,",
        "na woh chota sa bahana ke bas tumhein dekhne aa gaya."
      ],
      paragraph2: [
        "Hum dono ne thori space li hai.. aur shayad ab uski zaroorat bhi hai.",
        "Lekin space ka matlab yeh nahi ke feelings khatam ho gayi hain."
      ],
      paragraph3: [
        "Main tumhein ab bhi miss karta hoon,",
        "Tum sari Zindagi meri Special Person rho gi,",
        "or me tumhe Hamesha pyaar krta rhu ga."
      ]
    },
    {
      id: "D",
      start: "2026-10-12",
      end: "2026-10-18",
      timerHeadline: "Tum ab bhi special ho",
      paragraph1: [
        "Graduation ke baad zindagi alag si lagti hai.",
        "Halake k mujhe University Life Bilkyl bhi Pasand nhi thi",
        "Lekin Sirf ek hi reason thi Uni Ani ki or wo Tum, tumhari jhalak dekh kr Dil ko khushi milti thi."
      ],
      paragraph2: [
        "Class me last row me baith kr pure lecture bas tumhe hi Ghoorna",
        "Lecture ya Sir se zaida tum pr focus krna.",
        "or jab tumne mur kr dekhna to nazar tum se hata leni... hehe"
      ],
      paragraph3: [
        "Ab wo sab closeness to nhi,",
        "lekin tum mere liye ab bhi bohat special ho.",
        "Or Tum hamesha hi mere Dil me close rho gi."
      ]
    },
    {
      id: "E",
      start: "2026-10-19",
      end: "2026-10-24",
      timerHeadline: "Sirf kuch din…",
      paragraph1: [
        "Mano, ab 25 October qareeb hai — sirf kuch din.",
        "Itne saalon ki baatein, hasi, choti fights,",
        "secret meetings aur library ke waqt… sab yaad aa rahe hain."
      ],
      paragraph2: [
        "Woh memories perfect nahi thin — lekin humari thin.",
        "Classmates ke peeche chupi hui ek choti si duniya.",
        "Main unhein soft dil se yaad karta hoon."
      ],
      paragraph3: [
        "Aaj hum us waqt se different jagah par hain.",
        "Lekin ek cheez nahi badli — tum ab bhi special ho.",
        "Tumhara din aane wala hai, aur main uske liye genuinely khush hoon."
      ]
    }
  ],

  // Fallback if letterSets is missing/empty (Step 2 default = Set A content)
  timerHeadline: "Mano ki special day tak…",
  letter: {
    paragraph1: [
      "Mano, kabhi kabhi lagta hai hamari university apni hi choti si duniya thi.",
      "Sab ke saamne hum bas classmates thay —",
      "lekin woh hidden corners aur library ke moments sirf humare thay."
    ],
    paragraph2: [
      "Tumhari gossip, tumhari expressions, tumhari smile, tumhari awaaz…",
      "pata nahi kab yeh sab meri daily life ka hissa ban gaye."
    ],
    paragraph3: [
      "Us waqt woh moments ordinary lagte thay.",
      "Ab peeche dekh ke samajh aata hai — kitne special thay.",
      "Aur unhein yaad karke ab bhi dil garam ho jata hai."
    ]
  },

  time: {
    prefix: "Sirf ",
    day: "din",
    hour: "ghantay",
    minute: "minute",
    second: "second"
  },
  seedText: "For Mano",

  // Tree Awakening finale (fires when countdown hits 0)
  birthdayFinale: {
    timerHeadline: "Aaj tumhara din hai, Mano",
    letter: {
      paragraph1: [
        "Mano — aaj woh din aa gaya.",
        "Tree ne dil barsa diye, aur main sirf yeh kehna chahta hoon:",
        "tum meri zindagi ki sabse soft, sabse pyari yaad ho."
      ],
      paragraph2: [
        "University ke hidden corners, library ke moments,",
        "tumhari smile, tumhari awaaz, tumhari choti choti baatein —",
        "sab aaj bhi mere dil mein bilkul clear hain."
      ],
      paragraph3: [
        "Happy Birthday, Mahnoor.",
        "Khush raho, muskurati raho —",
        "aur jaano ke main tumhein ab bhi bohat pyar karta hoon, Mano."
      ]
    }
  }
};
