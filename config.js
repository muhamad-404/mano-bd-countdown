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
    {
      id: "B",
      start: "2026-09-28",
      end: "2026-10-04",
      timerHeadline: "Mano… thori si yaad",
      paragraph1: [
        "Mano, mujhe tumhari bohat si choti choti aadatein yaad hain.",
        "Tum kaise baat karti thi, kis baat pe hasti thi,",
        "aur kab gossip shuru kar deti thi."
      ],
      paragraph2: [
        "Woh expressions jo tum bina kuch kahe bana deti thi —",
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
        "Hum dono ne thori space li hai — aur shayad ab uski zaroorat bhi hai.",
        "Lekin space ka matlab yeh nahi ke feelings khatam ho gayi hain."
      ],
      paragraph3: [
        "Main tumhein ab bhi miss karta hoon, Mano — narmi se, bina pressure ke.",
        "Tumhara din qareeb aa raha hai,",
        "aur main chahta hoon tumhein pata chale: tum yaad ho."
      ]
    },
    {
      id: "D",
      start: "2026-10-12",
      end: "2026-10-18",
      timerHeadline: "Tum ab bhi special ho",
      paragraph1: [
        "Graduation ke baad zindagi alag si lagti hai.",
        "University wali rozmarra ki duniya ab peeche hai —",
        "sab kuch thora different ho gaya hai."
      ],
      paragraph2: [
        "Tumne mujhe beinteha care diya tha; main bhi tumhara khayal rakhta tha.",
        "Tum meri baby si thi — zabardasti nahi, sirf pyar se.",
        "Aur tumhari unconditional mohabbat… woh bhoolne wali nahi."
      ],
      paragraph3: [
        "Ab hum pehle jaisi daily closeness mein nahi,",
        "lekin tum mere liye ab bhi bohat special ho.",
        "Yeh choti si cheez tumhare birthday ke liye hai — quietly, from me."
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
  seedText: "For Mano"
};
