/**
 * TALENTLINK - Data Store & Mock Data Repository
 * Co-Curricular Tracking and Talent Scouting Platform
 */

const TALENT_DATA = {
  school: {
    name: "St. Jude Senior High School",
    code: "STJ-KE-042",
    region: "Rift Valley / Nakuru County",
    principal: "Dr. Margaret Kosgey (Mediation Officer)",
    sportsPatron: "Coach Evans Ochieng (Licensed CAF-B)",
    dramaPatron: "Ms. Beatrice Mwangi (National Adjudicator)"
  },

  students: [
    {
      id: "STU-8821",
      name: "Dennis Kipruto",
      age: 15,
      gender: "Male",
      grade: "Form 2 (Grade 10)",
      category: "Athletics",
      discipline: "Long-Distance Running (3000m / 5000m)",
      verifiedRating: 96,
      academicConduct: 93,
      avatar: "assets/athlete_marathon.jpg",
      status: "Active Pool",
      guardianMediation: "School Principal & Coach Evans Ochieng",
      maskedAddress: "Nakuru County, Rift Valley [Masked - Minor Protection]",
      keyStats: {
        pb5000m: "14m 42s",
        pb3000m: "8m 19s",
        vo2max: "74 ml/kg/min",
        attendanceRate: "98%"
      },
      radar: {
        endurance: 98,
        speedPace: 92,
        tacticalDiscipline: 94,
        resilience: 96,
        academicBalance: 93
      },
      badges: [
        {
          id: "BDG-ATH-01",
          title: "Regional 5000m Record Holder",
          category: "Athletics",
          date: "2026-03-12",
          issuer: "Coach Evans Ochieng (STJ-PAT-01)",
          hash: "e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855",
          verified: true
        },
        {
          id: "BDG-ATH-02",
          title: "County Cross-Country Gold Medalist",
          category: "Athletics",
          date: "2026-06-18",
          issuer: "Principal Dr. Margaret Kosgey",
          hash: "a4f89d3118ef612349bf4c8996fb92427ae41e4649b934ca495991b78912ef01",
          verified: true
        }
      ],
      timeline: [
        {
          date: "2026-08-24",
          event: "Inter-County Championship 5000m Finals",
          result: "1st Place (Gold)",
          verifiedBy: "Coach Evans Ochieng",
          notes: "Broke school record by 4 seconds. Negative split executed flawlessly."
        },
        {
          date: "2026-06-18",
          event: "Rift Valley Cross-Country 8km Trial",
          result: "Gold Medal (23m 15s)",
          verifiedBy: "Principal Dr. Margaret Kosgey",
          notes: "Official qualification time for National High School Trials."
        }
      ],
      media: [
        {
          title: "5000m Sprint Finish Final Lap",
          type: "video",
          thumbnail: "assets/athlete_marathon.jpg",
          duration: "1m 14s",
          size: "4.8 MB (Compressed locally)"
        }
      ]
    },
    {
      id: "STU-9104",
      name: "Brian Omondi",
      age: 16,
      gender: "Male",
      grade: "Form 3 (Grade 11)",
      category: "Football",
      discipline: "Striker / Attacking Playmaker",
      verifiedRating: 94,
      academicConduct: 88,
      avatar: "assets/football_star.jpg",
      status: "Active Pool",
      guardianMediation: "School Principal & Coach Evans Ochieng",
      maskedAddress: "Nakuru East Sub-County [Masked - Minor Protection]",
      keyStats: {
        goalsThisSeason: 18,
        assists: 12,
        sprint100m: "11.2s",
        matchesPlayed: 14
      },
      radar: {
        endurance: 89,
        speedPace: 96,
        tacticalDiscipline: 91,
        resilience: 90,
        academicBalance: 88
      },
      badges: [
        {
          id: "BDG-FTB-01",
          title: "County Football MVP",
          category: "Football",
          date: "2026-05-30",
          issuer: "Coach Evans Ochieng (STJ-PAT-01)",
          hash: "c2810f9b36e88941bb380536c4b998cfb61394f4c80327f311c62f2756a1622b",
          verified: true
        },
        {
          id: "BDG-FTB-02",
          title: "Golden Boot Winner - Sub-County League",
          category: "Football",
          date: "2026-07-14",
          issuer: "Principal Dr. Margaret Kosgey",
          hash: "7f83b1657ff1fc53b92dc18148a1d65dfc2d4b1fa3d677284addd200126d9069",
          verified: true
        }
      ],
      timeline: [
        {
          date: "2026-09-02",
          event: "Sub-County Finals vs. Menengai High",
          result: "Scored 2 Goals, 1 Assist (Won 3-1)",
          verifiedBy: "Coach Evans Ochieng",
          notes: "Man of the Match. Exceptional off-the-ball movement."
        },
        {
          date: "2026-07-14",
          event: "Regional Youth Tournament",
          result: "Top Scorer Award",
          verifiedBy: "Coach Evans Ochieng",
          notes: "Maintained 0 disciplinary infractions across all 6 fixtures."
        }
      ],
      media: [
        {
          title: "Match Highlights: Free-Kick & Assist Reel",
          type: "video",
          thumbnail: "assets/football_star.jpg",
          duration: "2m 10s",
          size: "6.2 MB (Compressed locally)"
        }
      ]
    },
    {
      id: "STU-7432",
      name: "Amina Wanjiku",
      age: 15,
      gender: "Female",
      grade: "Form 2 (Grade 10)",
      category: "Drama",
      discipline: "Theatrical Drama & Solo Verse",
      verifiedRating: 98,
      academicConduct: 96,
      avatar: "assets/drama_performer.jpg",
      status: "Active Pool",
      guardianMediation: "School Principal & Ms. Beatrice Mwangi",
      maskedAddress: "Rift Valley Region [Masked - Minor Protection]",
      keyStats: {
        stagePerformances: 16,
        vocalProjectionScore: "99/100",
        emotionalRangeScore: "97/100",
        academicRank: "Top 5%"
      },
      radar: {
        endurance: 92,
        speedPace: 88,
        tacticalDiscipline: 97,
        resilience: 99,
        academicBalance: 96
      },
      badges: [
        {
          id: "BDG-DRM-01",
          title: "National Drama Gold Medalist",
          category: "Performing Arts",
          date: "2026-04-10",
          issuer: "Ms. Beatrice Mwangi (STJ-PAT-03)",
          hash: "5e884898da28047151d0e56f8dc6292773603d0d6aabbdd62a11ef721d1542d8",
          verified: true
        },
        {
          id: "BDG-DRM-02",
          title: "Best Solo Orator of the Year",
          category: "Performing Arts",
          date: "2026-08-05",
          issuer: "Principal Dr. Margaret Kosgey",
          hash: "4b227777d4dd1fc61c6f884f48641d02b4d121d3fd328cb08b5531fcacdabf8a",
          verified: true
        }
      ],
      timeline: [
        {
          date: "2026-08-05",
          event: "Kenya National Drama Festival - Gala Performance",
          result: "1st Trophy & National Commendation",
          verifiedBy: "Ms. Beatrice Mwangi",
          notes: "Audience standing ovation for original theatrical poem 'Echoes of tomorrow'."
        },
        {
          date: "2026-04-10",
          event: "County Creative Monologue Showcase",
          result: "Gold Medal Honors",
          verifiedBy: "Principal Dr. Margaret Kosgey",
          notes: "Adjudicated with highest mark in vocal articulation and stagecraft."
        }
      ],
      media: [
        {
          title: "National Gala Monologue Recording",
          type: "audio/video",
          thumbnail: "assets/drama_performer.jpg",
          duration: "3m 45s",
          size: "7.1 MB (Compressed locally)"
        }
      ]
    },
    {
      id: "STU-6520",
      name: "Faith Chepkemoi",
      age: 14,
      gender: "Female",
      grade: "Form 1 (Grade 9)",
      category: "Athletics",
      discipline: "Middle-Distance Running (800m / 1500m)",
      verifiedRating: 92,
      academicConduct: 95,
      avatar: "assets/athlete_marathon.jpg",
      status: "Active Pool",
      guardianMediation: "School Principal & Coach Evans Ochieng",
      maskedAddress: "Nakuru County [Masked - Minor Protection]",
      keyStats: {
        pb800m: "2m 06s",
        pb1500m: "4m 21s",
        cadence: "192 spm",
        attendanceRate: "100%"
      },
      radar: {
        endurance: 94,
        speedPace: 93,
        tacticalDiscipline: 90,
        resilience: 91,
        academicBalance: 95
      },
      badges: [
        {
          id: "BDG-ATH-03",
          title: "Junior Cross-Country Champion",
          category: "Athletics",
          date: "2026-07-20",
          issuer: "Coach Evans Ochieng (STJ-PAT-01)",
          hash: "8f434346648f6b96df89dda901c5176b10a6d83961dd3c1ac88b59b2dc327aa4",
          verified: true
        }
      ],
      timeline: [
        {
          date: "2026-07-20",
          event: "Sub-County 800m Junior Championship",
          result: "1st Place Gold",
          verifiedBy: "Coach Evans Ochieng",
          notes: "Clocked 2:06.12 at age 14. High potential for elite scholarship program."
        }
      ],
      media: [
        {
          title: "800m Heat 2 Video Breakdown",
          type: "video",
          thumbnail: "assets/athlete_marathon.jpg",
          duration: "2m 08s",
          size: "5.1 MB (Compressed locally)"
        }
      ]
    }
  ],

  // Pre-configured fixtures for Coaches to log offline
  fixtures: [
    {
      id: "FIX-2026-09",
      competition: "County Interschool Football Championship",
      opponent: "Rift Valley Science Academy",
      date: "2026-09-17",
      location: "Keringet Remote Pitch (0 Cellular Coverage)",
      type: "Football"
    },
    {
      id: "FIX-2026-10",
      competition: "Regional Athletics Trials",
      opponent: "Regional Invitational",
      date: "2026-09-19",
      location: "Afraha Stadium Ground",
      type: "Athletics"
    }
  ],

  // Initial Transaction Log (SQLite simulation with Pending_Sync state)
  transactions: [
    {
      txId: "TX-1048",
      timestamp: "2026-09-16 16:30:22",
      studentId: "STU-9104",
      studentName: "Brian Omondi",
      event: "Football: 2 Goals, 1 Assist vs Rift Valley Academy",
      patron: "Coach Evans Ochieng",
      status: "Synced",
      ledgerHash: "4a5b6c7d8e9f0123...verified",
      offlineRecorded: false
    },
    {
      txId: "TX-1049",
      timestamp: "2026-09-17 14:15:10",
      studentId: "STU-8821",
      studentName: "Dennis Kipruto",
      event: "Athletics: 5000m Time Trial (14m 41s)",
      patron: "Coach Evans Ochieng",
      status: "Pending_Sync",
      ledgerHash: "Queued in Local SQLite",
      offlineRecorded: true
    }
  ],

  // Outreach inquiries mediated through Principal & Patron
  inquiries: [
    {
      id: "INQ-2026-01",
      studentId: "STU-8821",
      studentName: "Dennis Kipruto",
      scoutName: "Elite High-Altitude Running Academy",
      scoutRep: "Marcus Vance (Recruitment Director)",
      scoutType: "Sports Scholarship Body",
      message: "We have reviewed Dennis's verified 5000m timeline and sub-15m times. We offer a full high-school sports scholarship covering tuition, specialized coaching, and Olympic-grade nutrition.",
      terms: "Full Scholarship + Sports Kit + High Performance Training",
      date: "2026-09-16",
      status: "Pending Principal Review",
      principalApproved: false,
      patronReviewed: true
    },
    {
      id: "INQ-2026-02",
      studentId: "STU-7432",
      studentName: "Amina Wanjiku",
      scoutName: "National Youth Performing Arts Trust",
      scoutRep: "Dr. Clara Ndung'u",
      scoutType: "Cultural Partnership",
      message: "Requesting permission to invite Amina to audition for the African Youth Theatre Fellowship in Nairobi.",
      terms: "Fully Funded Fellowship & Mentorship",
      date: "2026-09-15",
      status: "Approved by Principal",
      principalApproved: true,
      patronReviewed: true
    }
  ]
};

// Expose on window for easy access
window.TALENT_DATA = TALENT_DATA;
