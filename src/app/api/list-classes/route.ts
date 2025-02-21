// src/app/api/list-classes/route.ts
export async function POST(req: Request) {
    const defaultSessions = [
        {
            id: 1,
            category_name: "Bioenergetics & Frequency",
            instructor_name: "Dr. Leila Moon",
            instructor_image: "/images/dr-moon.jpg",
            title: "Harnessing Quantum Energy for Healing",
            description: "Learn how to align your frequency for optimal health using quantum healing techniques.",
            date_time: "2024-02-23T13:00:00",
            current_participants: 8,
            max_participants: 25,
            specialty_focus: "energy_healing quantum alignment",
            token_cost: 45, // Cost in HealPass Coin tokens
          },
          {
            id: 2,
            category_name: "Functional & Longevity Medicine",
            instructor_name: "Dr. Alex Carter",
            //%instructor_image: "/images/dr-moon.jpg", 
            instructor_image: "/images/dr-carter.jpg",
            title: "Detox & Cellular Repair 101",
            description:
              "Understand the science of detoxification and how to optimize cellular repair for longevity.",
            date_time: "2024-02-25T17:00:00",
            current_participants: 15,
            max_participants: 30,
            specialty_focus: "detox cellular_health longevity",
            token_cost: 50,
          },
          {
            id: 3,
            category_name: "Peak Human Performance",
            instructor_name: "Coach Ryan Blake",
            instructor_image: "/images/coach-blake.jpg",
            title: "Sleep Optimization for High Performers",
            description:
              "Master deep sleep cycles and wake up more refreshed and productive.",
            date_time: "2024-02-27T19:00:00",
            current_participants: 20,
            max_participants: 20,
            specialty_focus: "sleep_hacks performance biohacking",
            token_cost: 35,
          },
          {
            id: 4,
            category_name: "Self-Mastery & Emotional Intelligence",
            instructor_name: "Dr. Emily Sage",
            instructor_image: "/images/dr-sage.jpg",
            title: "Emotional Resilience & Productivity",
            description:
              "Learn how emotional intelligence impacts productivity and how to master your emotions for success.",
            date_time: "2024-02-28T18:00:00",
            current_participants: 10,
            max_participants: 15,
            specialty_focus: "emotional_health self_mastery productivity",
            token_cost: 30,
          },
          {
            id: 5,
            category_name: "Neuro & Mind Science",
            instructor_name: "Dr. Nash",
            instructor_image: "/images/dr-nash.jpg",
            title: "Overcome Anxiety Patterns",
            description: "Break anxiety loops and rewire your nervous system.",
            date_time: "2024-03-01T14:00:00",
            current_participants: 10,
            max_participants: 30,
            specialty_focus: "anxiety rewire calm",
            token_cost: 45,
          },
          {
            id: 6,
            category_name: "Bioenergetics & Frequency",
            instructor_name: "Dr. Leila Moon",
            instructor_image: "/images/dr-moon.jpg",
            title: "Daily Energy Reset",
            description: "Simple practices to boost energy and balance your system.",
            date_time: "2024-03-03T11:00:00",
            current_participants: 18,
            max_participants: 25,
            specialty_focus: "energy balance bioenergetics",
            token_cost: 20, // Cost in HealPass Coin tokens
          }
    ];
  
    return new Response(JSON.stringify({ classes: defaultSessions }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  }