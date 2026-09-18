/**
 * TALENTLINK & SCOUTING PLATFORM
 * Seed Data & Domain Models
 * Categories:
 * 1. Sports (Indoor): Table Tennis, Badminton, Lawn Tennis, Chess, Basketball
 * 2. Sports (Outdoor): Football, Rugby, Volleyball, Hockey, Athletics, Handball
 * 3. Music and Drama: Choral & Solo Singing, Instrumental, Spoken Word & Poetry, Stage Drama, Cultural Dance
 * Feeders: Referee (Sports), Adjudicator (Music & Drama), Judge (Music & Drama)
 */

const TL_DATA = {
  categories: {
    indoorSports: {
      id: "indoor_sports",
      name: "Sports (Indoor Category)",
      badge: "Indoor Arena",
      icon: "🏸",
      activities: [
        { id: "table_tennis", name: "Table Tennis", type: "Racket Sport", icon: "🏓" },
        { id: "badminton", name: "Badminton", type: "Racket Sport", icon: "🏸" },
        { id: "lawn_tennis", name: "Lawn Tennis", type: "Racket Sport (Indoor Court)", icon: "🎾" },
        { id: "chess", name: "Chess", type: "Board & Strategy", icon: "♟️" },
        { id: "basketball", name: "Basketball", type: "Court Sport", icon: "🏀" }
      ]
    },
    outdoorSports: {
      id: "outdoor_sports",
      name: "Sports (Outdoor Category)",
      badge: "Outdoor Field",
      icon: "⚽",
      activities: [
        { id: "football", name: "Football", type: "Pitch Sport", icon: "⚽" },
        { id: "rugby", name: "Rugby", type: "Contact Pitch Sport", icon: "🏉" },
        { id: "volleyball", name: "Volleyball", type: "Court/Sand Sport", icon: "🏐" },
        { id: "hockey", name: "Hockey", type: "Turf Sport", icon: "🏑" },
        { id: "athletics", name: "Athletics", type: "Track & Field", icon: "🏃" },
        { id: "handball", name: "Handball", type: "Team Field Sport", icon: "🤾" }
      ]
    },
    musicAndDrama: {
      id: "music_drama",
      name: "Music and Drama",
      badge: "Performing Arts",
      icon: "🎭",
      activities: [
        { id: "choral_vocal", name: "Choral & Solo Singing", type: "Vocal Arts", icon: "🎤" },
        { id: "instrumental", name: "Instrumental & Ensembles", type: "Music Performance", icon: "🎻" },
        { id: "spoken_word", name: "Spoken Word & Poetry", type: "Literary Performing Art", icon: "📜" },
        { id: "stage_drama", name: "Stage Drama & Plays", type: "Theatrical Arts", icon: "🎭" },
        { id: "cultural_dance", name: "Cultural Dance & Movement", type: "Folk & Creative Dance", icon: "💃" }
      ]
    }
  },

  // Role profiles and credentials
  defaultUsers: [
    {
      id: "ref_1",
      role: "referee",
      roleName: "Sports Referee",
      name: "Coach Benson Makau",
      title: "Senior Sports Referee & Match Commissioner",
      badge: "Official Referee (Sports)",
      institution: "Metropolitan Interschool Athletic Union",
      assignedScope: "All Indoor & Outdoor Sports",
      avatar: "👨‍⚖️"
    },
    {
      id: "adj_1",
      role: "adjudicator",
      roleName: "Music & Drama Adjudicator",
      name: "Dr. Evelyn Wanjiku",
      title: "Senior Arts Adjudicator & Performance Critic",
      badge: "Official Adjudicator (Music & Drama)",
      institution: "National Performing Arts & Music Festival Board",
      assignedScope: "Music & Drama Rubrics",
      avatar: "👩‍🏫"
    },
    {
      id: "judge_1",
      role: "judge",
      roleName: "Festival Judge",
      name: "Justice Michael Kioko",
      title: "Chief Competition Judge & Awards Assessor",
      badge: "Official Judge (Music & Drama)",
      institution: "All-County Drama & Music Championship",
      assignedScope: "Competitive Ranking & Badges",
      avatar: "⚖️"
    },
    {
      id: "scout_1",
      role: "scout",
      roleName: "Talent Scout",
      name: "Marcus Vance",
      title: "Head Scout & Athletic Director",
      badge: "Verified Scout / Recruiter",
      institution: "Apex Collegiate Talent & Academy",
      assignedScope: "Talent Identification & Outreach",
      avatar: "🔍"
    },
    {
      id: "stu_1",
      role: "student",
      roleName: "Student Talent",
      name: "Tariq Omari",
      title: "Multi-Disciplinary Athlete & Performer",
      badge: "Active Student Talent",
      institution: "St. Jude Senior Academy",
      assignedScope: "Basketball (Indoor) & Stage Drama",
      avatar: "⭐"
    },
    {
      id: "admin_1",
      role: "admin",
      roleName: "School Administrator",
      name: "Principal Florence Adhiambo",
      title: "School Principal & Institutional Verifier",
      badge: "Institutional Admin",
      institution: "St. Jude Senior Academy",
      assignedScope: "Compliance, Badges & Scout Permissions",
      avatar: "🏛️"
    }
  ],

  // Talents / Students catalog
  talents: [
    {
      id: "TL-STU-101",
      name: "Tariq Omari",
      age: 16,
      grade: "Grade 11",
      school: "St. Jude Senior Academy",
      primaryCategory: "indoor_sports",
      activityId: "basketball",
      activityName: "Basketball",
      secondaryActivity: "Stage Drama & Plays",
      position: "Point Guard / Theatrical Lead",
      overallRating: 94,
      verifiedMatches: 18,
      verifiedBadges: ["County MVP 2025", "Best Stage Actor Silver", "State Playmaker"],
      metrics: {
        agility: 92,
        technique: 95,
        stamina: 89,
        leadership: 96,
        discipline: 98
      },
      statsSummary: "18.4 PPG, 8.2 APG, 3.1 SPG • County Drama Finals Lead Actor",
      bio: "High basketball IQ with exceptional court vision and natural stage charisma. Strong academic standing with exemplary conduct.",
      videoReel: {
        title: "County Semifinals Highlights & Drama Monologue",
        duration: "02:45",
        verifiedBy: "Referee Benson Makau & Adjudicator Evelyn Wanjiku",
        thumbnailBg: "linear-gradient(135deg, #1e3a8a, #0f766e)"
      }
    },
    {
      id: "TL-STU-102",
      name: "Amina Cherotich",
      age: 15,
      grade: "Grade 10",
      school: "Rift Valley High",
      primaryCategory: "outdoor_sports",
      activityId: "athletics",
      activityName: "Athletics",
      secondaryActivity: "Cultural Dance",
      position: "Middle Distance (800m / 1500m)",
      overallRating: 97,
      verifiedMatches: 14,
      verifiedBadges: ["National Gold 800m", "Endurance Standard Exceeded"],
      metrics: {
        agility: 94,
        technique: 98,
        stamina: 99,
        leadership: 88,
        discipline: 100
      },
      statsSummary: "800m PB: 2:02.14 • 1500m PB: 4:18.30 • Sub-County Record Holder",
      bio: "Elite pace judgment and finishing kick. Coached under high-altitude training program with flawless attendance.",
      videoReel: {
        title: "800m Interschool Championship Final Lap Sprint",
        duration: "03:10",
        verifiedBy: "Referee Benson Makau",
        thumbnailBg: "linear-gradient(135deg, #065f46, #047857)"
      }
    },
    {
      id: "TL-STU-103",
      name: "Kaelen Zhao",
      age: 16,
      grade: "Grade 11",
      school: "Metropolitan Academy",
      primaryCategory: "indoor_sports",
      activityId: "table_tennis",
      activityName: "Table Tennis",
      secondaryActivity: "Chess",
      position: "Singles Seed #1",
      overallRating: 92,
      verifiedMatches: 22,
      verifiedBadges: ["Regional Seed #1", "Precision Spin Master"],
      metrics: {
        agility: 96,
        technique: 94,
        stamina: 87,
        leadership: 85,
        discipline: 97
      },
      statsSummary: "Win Rate: 88% (22-3) • FIDE Chess Rating: 1840",
      bio: "Unorthodox penhold grip with blistering forehand counter-drives. Exceptional analytical depth and composure under pressure.",
      videoReel: {
        title: "Topspin Rally Highlights & Deceptive Serve Compilation",
        duration: "02:15",
        verifiedBy: "Referee Benson Makau",
        thumbnailBg: "linear-gradient(135deg, #1e293b, #3b82f6)"
      }
    },
    {
      id: "TL-STU-104",
      name: "Zahara Nyambura",
      age: 15,
      grade: "Grade 10",
      school: "Alliance Girls High",
      primaryCategory: "music_drama",
      activityId: "choral_vocal",
      activityName: "Choral & Solo Singing",
      secondaryActivity: "Instrumental (Violin)",
      position: "Soprano Soloist / Concertmistress",
      overallRating: 96,
      verifiedMatches: 12,
      verifiedBadges: ["Festival Soprano Gold", "Perfect Pitch Commendation"],
      metrics: {
        agility: 90,
        technique: 98,
        stamina: 92,
        leadership: 95,
        discipline: 99
      },
      statsSummary: "Vocal Range: G3 to E6 • Grade 7 ABRSM Violin with Distinction",
      bio: "Remarkable vocal resonance, diction, and expressive range. Led the school chamber choir to regional festival championship.",
      videoReel: {
        title: "National Festival Solo Recital & Classical Violin Concerto",
        duration: "04:20",
        verifiedBy: "Dr. Evelyn Wanjiku & Justice Michael Kioko",
        thumbnailBg: "linear-gradient(135deg, #831843, #be185d)"
      }
    },
    {
      id: "TL-STU-105",
      name: "Devon Omondi",
      age: 17,
      grade: "Grade 12",
      school: "Highway Secondary",
      primaryCategory: "outdoor_sports",
      activityId: "football",
      activityName: "Football",
      secondaryActivity: "Athletics (Sprints)",
      position: "Central Midfielder (#8)",
      overallRating: 95,
      verifiedMatches: 26,
      verifiedBadges: ["Captains Armband Honor", "Tournament Top Playmaker"],
      metrics: {
        agility: 91,
        technique: 96,
        stamina: 95,
        leadership: 97,
        discipline: 94
      },
      statsSummary: "11 Goals, 19 Assists, 89% Pass Accuracy over 26 Matches",
      bio: "Box-to-box midfielder with sublime passing range, defensive tenacity, and inspiring leadership on the pitch.",
      videoReel: {
        title: "Match Decider Goal & Midfield Distribution Masterclass",
        duration: "03:40",
        verifiedBy: "Referee Benson Makau",
        thumbnailBg: "linear-gradient(135deg, #15803d, #047857)"
      }
    },
    {
      id: "TL-STU-106",
      name: "Sipho Khumalo",
      age: 16,
      grade: "Grade 11",
      school: "Greenwood College",
      primaryCategory: "outdoor_sports",
      activityId: "rugby",
      activityName: "Rugby",
      secondaryActivity: "Handball",
      position: "Fly-half / First Receiver",
      overallRating: 93,
      verifiedMatches: 15,
      verifiedBadges: ["Kicking Accuracy 87%", "Sportsmanship Award"],
      metrics: {
        agility: 92,
        technique: 94,
        stamina: 93,
        leadership: 93,
        discipline: 96
      },
      statsSummary: "84 Points Scored • 98% Tackle Completion Rate",
      bio: "Tactical kicking specialist with supreme game management and defensive courage.",
      videoReel: {
        title: "Tactical Clearance Kicks & Try-Saving Defensive Stops",
        duration: "02:50",
        verifiedBy: "Referee Benson Makau",
        thumbnailBg: "linear-gradient(135deg, #78350f, #b45309)"
      }
    },
    {
      id: "TL-STU-107",
      name: "Brian Kipchumba",
      age: 15,
      grade: "Grade 10",
      school: "Highland Academy",
      primaryCategory: "outdoor_sports",
      activityId: "hockey",
      activityName: "Hockey",
      secondaryActivity: "Table Tennis",
      position: "Forward / Striker",
      overallRating: 90,
      verifiedMatches: 16,
      verifiedBadges: ["Fastest Penalty Strike", "Regional Finalist"],
      metrics: {
        agility: 94,
        technique: 92,
        stamina: 89,
        leadership: 84,
        discipline: 93
      },
      statsSummary: "14 Field Goals, 8 Penalty Corner Conversions",
      bio: "Lightning acceleration and clinical finishing in the circle. Strong team player with disciplined positioning.",
      videoReel: {
        title: "Reverse Stick Goals & Counter-Attacking Speed",
        duration: "02:30",
        verifiedBy: "Referee Benson Makau",
        thumbnailBg: "linear-gradient(135deg, #0369a1, #0284c7)"
      }
    },
    {
      id: "TL-STU-108",
      name: "Farida Hassan",
      age: 16,
      grade: "Grade 11",
      school: "Coastal Academy",
      primaryCategory: "music_drama",
      activityId: "spoken_word",
      activityName: "Spoken Word & Poetry",
      secondaryActivity: "Stage Drama",
      position: "Solo Poet / Dramatist",
      overallRating: 95,
      verifiedMatches: 11,
      verifiedBadges: ["Grand Slam Poetry Laureate", "Originality Honors"],
      metrics: {
        agility: 88,
        technique: 97,
        stamina: 91,
        leadership: 94,
        discipline: 98
      },
      statsSummary: "1st Place National Verse Competition • 3 Published School Anthologies",
      bio: "Electric stage presence, thought-provoking metaphorical depth, and impeccable rhythmic delivery.",
      videoReel: {
        title: "Winning Performance: 'Voices Across The Ocean'",
        duration: "03:55",
        verifiedBy: "Dr. Evelyn Wanjiku & Justice Michael Kioko",
        thumbnailBg: "linear-gradient(135deg, #4c1d95, #6d28d9)"
      }
    },
    {
      id: "TL-STU-109",
      name: "Natasha Mutua",
      age: 15,
      grade: "Grade 10",
      school: "Riverdale High",
      primaryCategory: "indoor_sports",
      activityId: "badminton",
      activityName: "Badminton",
      secondaryActivity: "Lawn Tennis",
      position: "Singles & Mixed Doubles Captain",
      overallRating: 91,
      verifiedMatches: 19,
      verifiedBadges: ["Smash Velocity Record", "All-Court Champion"],
      metrics: {
        agility: 98,
        technique: 93,
        stamina: 89,
        leadership: 89,
        discipline: 95
      },
      statsSummary: "Smash Speed: 260 km/h • Interschool Gold Medalist",
      bio: "Explosive footwork, swift wrist snap, and great defensive court recovery.",
      videoReel: {
        title: "Badminton Tournament Final Deciding Set Highlights",
        duration: "02:40",
        verifiedBy: "Referee Benson Makau",
        thumbnailBg: "linear-gradient(135deg, #0e7490, #06b6d4)"
      }
    },
    {
      id: "TL-STU-110",
      name: "George Kariuki",
      age: 17,
      grade: "Grade 12",
      school: "Valley Technical",
      primaryCategory: "outdoor_sports",
      activityId: "volleyball",
      activityName: "Volleyball",
      secondaryActivity: "Handball",
      position: "Outside Hitter / Spiker",
      overallRating: 93,
      verifiedMatches: 21,
      verifiedBadges: ["Best Spiker 2025", "County Tournament MVP"],
      metrics: {
        agility: 92,
        technique: 95,
        stamina: 94,
        leadership: 92,
        discipline: 97
      },
      statsSummary: "Vertical Leap: 88cm • 186 Spike Kills in 21 Games",
      bio: "Tremendous elevation and power behind the spike line. Reliable serve receiver under high pressure.",
      videoReel: {
        title: "Dominant Spike Kills & Triple-Block Highlights",
        duration: "03:00",
        verifiedBy: "Referee Benson Makau",
        thumbnailBg: "linear-gradient(135deg, #c2410c, #ea580c)"
      }
    },
    {
      id: "TL-STU-111",
      name: "Maya Patel",
      age: 16,
      grade: "Grade 11",
      school: "Horizon International",
      primaryCategory: "indoor_sports",
      activityId: "chess",
      activityName: "Chess",
      secondaryActivity: "Table Tennis",
      position: "Board 1 Captain",
      overallRating: 96,
      verifiedMatches: 25,
      verifiedBadges: ["FIDE Master Candidate", "National Schools Champion"],
      metrics: {
        agility: 86,
        technique: 99,
        stamina: 95,
        leadership: 92,
        discipline: 100
      },
      statsSummary: "FIDE 2045 Rating • 25 Consecutive Undefeated Interschool Games",
      bio: "Deep positional intuition, aggressive king-side attacking repertoire, and rigorous preparation.",
      videoReel: {
        title: "Annotated Queen's Gambit Masterclass vs. Regional Seed #2",
        duration: "04:10",
        verifiedBy: "Referee Benson Makau",
        thumbnailBg: "linear-gradient(135deg, #312e81, #4338ca)"
      }
    },
    {
      id: "TL-STU-112",
      name: "Lucas Otieno",
      age: 15,
      grade: "Grade 10",
      school: "Lakeview Academy",
      primaryCategory: "music_drama",
      activityId: "cultural_dance",
      activityName: "Cultural Dance & Movement",
      secondaryActivity: "Choral & Solo Singing",
      position: "Lead Dancer & Percussionist",
      overallRating: 94,
      verifiedMatches: 13,
      verifiedBadges: ["Folk Dance Choreography Gold", "Heritage Art Ambassador"],
      metrics: {
        agility: 97,
        technique: 95,
        stamina: 96,
        leadership: 90,
        discipline: 98
      },
      statsSummary: "Gold Award National Folk Festival • Master of 4 Traditional Instruments",
      bio: "Extraordinary rhythmic precision, acrobatic dynamism, and authentic preservation of cultural expression.",
      videoReel: {
        title: "National Cultural Dance Gala Winning Showcase",
        duration: "03:30",
        verifiedBy: "Dr. Evelyn Wanjiku & Justice Michael Kioko",
        thumbnailBg: "linear-gradient(135deg, #991b1b, #dc2626)"
      }
    }
  ],

  // Recent official logs submitted by Referee, Adjudicator, Judge
  officialLogs: [
    {
      id: "LOG-REF-2026-01",
      feederType: "Referee",
      feederName: "Coach Benson Makau",
      disciplineCategory: "Sports (Outdoor Category)",
      activity: "Football",
      matchOrEvent: "Inter-School Finals: St. Jude vs Highway Secondary",
      date: "2026-03-12",
      scoreline: "St. Jude 3 - 2 Highway Secondary",
      keyMetrics: "Goals: Tariq Omari (2), Devon Omondi (1) • Cards: 1 Yellow",
      mvpCandidate: "Devon Omondi (#8 Central Midfield)",
      videoStatus: "Video Linked (Verified Match Tape)",
      videoUrl: "https://talentlink.edu/match/ft-stj-hwy-2026",
      officialVerdict: "Certified Match Result • Final Whistle Validated",
      status: "Verified & Locked"
    },
    {
      id: "LOG-ADJ-2026-02",
      feederType: "Adjudicator",
      feederName: "Dr. Evelyn Wanjiku",
      disciplineCategory: "Music and Drama",
      activity: "Stage Drama & Plays",
      matchOrEvent: "Regional Drama Gala: 'Shadows of the Savannah'",
      date: "2026-03-14",
      scoreline: "Score: 94/100 (Distinction)",
      keyMetrics: "Vocal Tone: 19/20 | Articulation: 19/20 | Stage Presence: 20/20 | Timing: 18/20 | Delivery: 18/20",
      mvpCandidate: "Tariq Omari (Lead Actor)",
      videoStatus: "4K HD Video Clip Attached",
      videoUrl: "https://talentlink.edu/drama/shadows-savannah-act2",
      officialVerdict: "Exceptional dramatic cadence, commanding stage presence, highly recommended for national honors.",
      status: "Verified & Locked"
    },
    {
      id: "LOG-JDG-2026-03",
      feederType: "Judge",
      feederName: "Justice Michael Kioko",
      disciplineCategory: "Music and Drama",
      activity: "Choral & Solo Singing",
      matchOrEvent: "All-County Music Championship: Operatic Solo",
      date: "2026-03-15",
      scoreline: "Rank: 1st Place (Gold Medal)",
      keyMetrics: "Pitch Accuracy: 10/10 | Dynamic Control: 10/10 | Emotional Resonance: 9.8/10",
      mvpCandidate: "Zahara Nyambura (Soprano Soloist)",
      videoStatus: "Concert Recording Verified",
      videoUrl: "https://talentlink.edu/music/recital-zahara-soprano",
      officialVerdict: "Flawless timbre and extraordinary dynamic mastery. Official Gold Certificate issued.",
      status: "Verified & Locked"
    },
    {
      id: "LOG-REF-2026-04",
      feederType: "Referee",
      feederName: "Coach Benson Makau",
      disciplineCategory: "Sports (Indoor Category)",
      activity: "Basketball",
      matchOrEvent: "Metropolitan League Round 4: St. Jude vs Coastal Raptors",
      date: "2026-03-16",
      scoreline: "St. Jude 78 - 71 Coastal Raptors",
      keyMetrics: "Fast Breaks: 14 | Steals: 9 | Fouls: 12 Team Fouls",
      mvpCandidate: "Tariq Omari (24 Pts, 11 Ast, 4 Stl)",
      videoStatus: "Broadcast Stream Uploaded",
      videoUrl: "https://talentlink.edu/hoops/stj-vs-cr-r4",
      officialVerdict: "Full regulation game concluded without technical violations.",
      status: "Verified & Locked"
    }
  ],

  // Adjudication Rubric Criteria for Music & Drama
  rubricCriteria: [
    { id: "vocal_tone", label: "Vocal Tone & Intonation", max: 20, desc: "Purity of sound, pitch center, acoustic resonance" },
    { id: "diction", label: "Diction & Articulation", max: 20, desc: "Clarity of text, expressive projection, linguistic nuances" },
    { id: "rhythm", label: "Rhythm, Tempo & Timing", max: 20, desc: "Beat consistency, syncopation accuracy, dynamic pacing" },
    { id: "stage_presence", label: "Stage Presence & Characterization", max: 20, desc: "Physical spatial command, emotional connection, posture" },
    { id: "technique", label: "Artistic Technique & Musicality", max: 20, desc: "Execution mastery, dynamic contrast, creative interpretation" }
  ],

  // System Stats
  stats: {
    totalStudents: 342,
    verifiedAthletes: 198,
    verifiedPerformers: 144,
    officialReferees: 16,
    officialAdjudicators: 12,
    officialJudges: 8,
    scoutInquiriesPending: 3,
    badgesIssued: 840,
    videoClipsArchived: 520
  },

  // Pending scout inquiries (for Institutional Admin review)
  pendingInquiries: [
    {
      id: "INQ-2026-801",
      scoutName: "Marcus Vance",
      organization: "Apex Collegiate Talent & Academy",
      studentId: "TL-STU-101",
      studentName: "Tariq Omari",
      category: "Basketball (Indoor) & Stage Drama",
      purpose: "Athletic-Artistic Dual Scholarship Evaluation for 2027 Entry",
      dateSubmitted: "2026-03-17",
      status: "Pending Principal Review",
      confidentialityMode: "COPPA / Minor Privacy Guard (PII Masked)"
    },
    {
      id: "INQ-2026-802",
      scoutName: "Helena Lindqvist",
      organization: "Nordic Athletic High Performance Center",
      studentId: "TL-STU-102",
      studentName: "Amina Cherotich",
      category: "Athletics (Middle Distance 800m)",
      purpose: "Invitation to Youth Track & Field International Invitational",
      dateSubmitted: "2026-03-18",
      status: "Pending Principal Review",
      confidentialityMode: "COPPA / Minor Privacy Guard (PII Masked)"
    }
  ]
};

// Expose to window for browser access
if (typeof window !== "undefined") {
  window.TL_DATA = TL_DATA;
}
