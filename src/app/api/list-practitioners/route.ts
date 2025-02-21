// src/app/api/list-practitioners/route.ts
export async function POST(req: Request) {
    const body = await req.json();
    const { specialty, location, rating, availability, searchQuery } = body;
  
    // Simulate fetching practitioners (replace with real logic or database query)
    const defaultPractitioners = [
      {
        id: "demo-1",
        name: "DR. SARAH WINTERS, ND",
        image_url: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&q=80&w=300&h=300&sat=-100",
        specialties: ["FUNCTIONAL MEDICINE", "HOLISTIC HEALING"],
        achievements: ["NATUROPATHIC MEDICINE PIONEER", "INTEGRATIVE HEALTH SPECIALIST"],
        location: "SAN FRANCISCO, CA",
      },
      {
        id: "demo-2",
        name: "DR. MICHAEL CHEN",
        image_url:
          "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=300&h=300&sat=-100",
        specialties: ["LONGEVITY MEDICINE", "CELLULAR REGENERATION"],
        achievements: [
          "STANFORD REGENERATIVE MEDICINE",
          "BIOTECH INNOVATION AWARD 2024",
        ],
        location: "BOSTON, MA",
      },
      {
        id: "demo-3",
        name: "DR. AISHA PATEL, DMD",
        image_url:
          "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=300&h=300&sat=-100",
        specialties: [
          "MAXILLOFACIAL MEDICINE",
          "HOLISTIC AESTHETICS",
          "REGENERATIVE DENTISTRY",
        ],
        achievements: [
          "HARVARD MAXILLOFACIAL SURGERY",
          "PIONEER IN BIOESTHETIC DENTISTRY",
          "REGENERATIVE ORAL MEDICINE RESEARCHER",
        ],
        location: "AUSTIN, TX",
      },
      {
        id: "demo-4",
        name: "DR. JAMES WALKER",
        image_url:
          "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=300&h=300&sat=-100",
        specialties: ["BIOHACKING", "PEAK PERFORMANCE"],
        achievements: [
          "PERFORMANCE MEDICINE PIONEER",
          "HUMAN OPTIMIZATION EXPERT",
        ],
        location: "MIAMI, FL",
      },
      {
        id: "demo-5",
        name: "DR. ELENA RODRIGUEZ",
        image_url:
          "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=300&h=300&sat=-100",
        specialties: ["EPIGENETICS", "DNA OPTIMIZATION"],
        achievements: [
          "GENETIC MEDICINE SPECIALIST",
          "PERSONALIZED HEALING PIONEER",
        ],
        location: "SEATTLE, WA",
      },
      // ... (add other practitioners as in your defaultPractitioners array) ...
      {
        id: "demo-6",
        name: "DR. DAVID ANDERSON",
        image_url: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=300&h=300&sat=-100",
        specialties: ["ENERGY MEDICINE", "QUANTUM BIOLOGY"],
        achievements: ["INTEGRATIVE MEDICINE FELLOW", "QUANTUM HEALING RESEARCHER"],
        location: "DENVER, CO",
      },
    ];
  
    // Filter logic (simplified for demonstration)
    let filteredPractitioners = defaultPractitioners;
    if (specialty !== "all") filteredPractitioners = filteredPractitioners.filter(p => p.specialties.includes(specialty));
    if (location !== "all") filteredPractitioners = filteredPractitioners.filter(p => p.location === location);
    if (searchQuery) filteredPractitioners = filteredPractitioners.filter(p => p.name.toLowerCase().includes(searchQuery.toLowerCase()));
  
    return new Response(JSON.stringify({ practitioners: filteredPractitioners }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  }