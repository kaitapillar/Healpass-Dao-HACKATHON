"use client";
import React, { useState, useEffect } from "react";
import { useAccount, useConnect } from "wagmi"; // Only needed if you want wallet integration here
import { coinbaseWallet } from "wagmi/connectors";
import Link from "next/link"; // For navigation

function MainComponent() {
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
      image_url: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=300&h=300&sat=-100",
      specialties: ["LONGEVITY MEDICINE", "CELLULAR REGENERATION"],
      achievements: ["STANFORD REGENERATIVE MEDICINE", "BIOTECH INNOVATION AWARD 2024"],
      location: "BOSTON, MA",
    },
    {
      id: "demo-3",
      name: "DR. AISHA PATEL, DMD",
      image_url: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=300&h=300&sat=-100",
      specialties: ["MAXILLOFACIAL MEDICINE", "HOLISTIC AESTHETICS", "REGENERATIVE DENTISTRY"],
      achievements: ["HARVARD MAXILLOFACIAL SURGERY", "PIONEER IN BIOESTHETIC DENTISTRY", "REGENERATIVE ORAL MEDICINE RESEARCHER"],
      location: "AUSTIN, TX",
    },
    {
      id: "demo-4",
      name: "DR. JAMES WALKER",
      image_url: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=300&h=300&sat=-100",
      specialties: ["BIOHACKING", "PEAK PERFORMANCE"],
      achievements: ["PERFORMANCE MEDICINE PIONEER", "HUMAN OPTIMIZATION EXPERT"],
      location: "MIAMI, FL",
    },
    {
      id: "demo-5",
      name: "DR. ELENA RODRIGUEZ",
      image_url: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=300&h=300&sat=-100",
      specialties: ["EPIGENETICS", "DNA OPTIMIZATION"],
      achievements: ["GENETIC MEDICINE SPECIALIST", "PERSONALIZED HEALING PIONEER"],
      location: "SEATTLE, WA",
    },
    {
      id: "demo-6",
      name: "DR. DAVID ANDERSON",
      image_url: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=300&h=300&sat=-100",
      specialties: ["ENERGY MEDICINE", "QUANTUM BIOLOGY"],
      achievements: ["INTEGRATIVE MEDICINE FELLOW", "QUANTUM HEALING RESEARCHER"],
      location: "DENVER, CO",
    },
  ];
  const [practitioners, setPractitioners] = useState(defaultPractitioners);
  const [loading, setLoading] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedSpecialty, setSelectedSpecialty] = useState("all");
  const [selectedLocation, setSelectedLocation] = useState("all");
  const [selectedRating, setSelectedRating] = useState("all");
  const [selectedAvailability, setSelectedAvailability] = useState("all");
  const { isConnected } = useAccount();
  const { connect } = useConnect();

  useEffect(() => {
    const fetchPractitioners = async () => {
      setLoading(true);
      try {
        console.log("Fetching practitioners with:", { specialty: selectedSpecialty, location: selectedLocation, rating: selectedRating, availability: selectedAvailability, searchQuery });
        const response = await fetch("/api/list-practitioners", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            specialty: selectedSpecialty,
            location: selectedLocation,
            rating: selectedRating,
            availability: selectedAvailability,
            searchQuery,
          }),
        });

        if (!response.ok) {
          throw new Error(`Error: ${response.status} - ${response.statusText}`);
        }

        const data = await response.json();
        console.log("API response:", data);
        if (data.practitioners && data.practitioners.length > 0) {
          setPractitioners(data.practitioners);
        } else {
          setPractitioners(defaultPractitioners);
        }
      } catch (error) {
        console.error("Error fetching practitioners:", error);
        setPractitioners(defaultPractitioners);
      } finally {
        setLoading(false);
      }
    };

    fetchPractitioners();
  }, [
    searchQuery,
    selectedSpecialty,
    selectedLocation,
    selectedRating,
    selectedAvailability,
  ]);

  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <div className="min-h-screen bg-[#000] text-[#C0C0C0] font-mono relative overflow-hidden">
      <div className="fixed top-0 left-0 right-0 z-20 bg-[#000]/80 backdrop-blur-sm border-b border-[#ffffff10] py-4">
        <div className="container mx-auto px-4">
          <Link href="/" className="chrome-button px-6 py-2 tracking-[0.2em] text-sm mr-4">Back to Home</Link> {/* Add Back Button */}
          <Link href="/practitioners" className="liquid-metal text-2xl tracking-[0.2em] hover:text-[#fff] transition-colors">
            FIND AN EXPERT
          </Link>
        </div>
      </div>
      <div className="fixed inset-0">
        <div className="absolute inset-0 bg-[#ffffff]/5"></div>
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-[#000]/90"></div>
      </div>

      <div className="relative z-10 container mx-auto px-4 pt-32">
        <div className="text-center mb-16">
          <h1 className="liquid-metal text-6xl md:text-7xl tracking-[0.2em] mb-8">
            HEALPASS DAO PRACTITIONER NETWORK
          </h1>
          <div className="max-w-2xl mx-auto mb-6">
            <div className="relative">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-[#000]/50 border-2 border-[#ffffff30] px-6 py-4 text-[#C0C0C0] focus:outline-none focus:border-[#ffffff50] liquid-metal-input"
                placeholder="SEARCH PRACTITIONERS..."
              />
              <i className="fas fa-search absolute right-6 top-1/2 transform -translate-y-1/2 text-[#C0C0C0]"></i>
            </div>
          </div>
          <div className="max-w-2xl mx-auto mb-12 px-6 py-4 border border-[#ffffff30] bg-[#ffffff05]">
            <p className="text-[#C0C0C0] text-xs tracking-[0.1em] leading-relaxed">
              <span className="chrome-text">
                THE HEALPASS DAO PRACTITIONER NETWORK
              </span>{" "}
              is a trusted, community-vetted collective of holistic healers and
              doctors. Practitioners are selected through community votes,
              ensuring quality and credibility. All medical services adhere to
              state licensing laws—book a session with a licensed practitioner
              in your area. To access an out-of-state doctor's expertise, join a
              live group session or a condition-based healing cohort designed to
              provide specialized guidance and education.
            </p>
          </div>
          <div className="flex justify-center space-x-4 mb-12">
            <select
              value={selectedSpecialty}
              onChange={(e) => setSelectedSpecialty(e.target.value)}
              className="liquid-metal-select"
            >
              <option value="all">ALL SPECIALTIES</option>
              <option value="functional">FUNCTIONAL MEDICINE</option>
              <option value="holistic">HOLISTIC HEALING</option>
              <option value="longevity">LONGEVITY</option>
              <option value="consciousness">CONSCIOUSNESS</option>
              <option value="biohacking">BIOHACKING</option>
              <option value="epigenetics">EPIGENETICS</option>
            </select>

            <select
              value={selectedLocation}
              onChange={(e) => setSelectedLocation(e.target.value)}
              className="liquid-metal-select"
            >
              <option value="all">ALL LOCATIONS</option>
              <option value="san-francisco">SAN FRANCISCO</option>
              <option value="boston">BOSTON</option>
              <option value="austin">AUSTIN</option>
              <option value="miami">MIAMI</option>
              <option value="seattle">SEATTLE</option>
              <option value="denver">DENVER</option>
            </select>

            <select
              value={selectedRating}
              onChange={(e) => setSelectedRating(e.target.value)}
              className="liquid-metal-select"
            >
              <option value="all">ALL RATINGS</option>
              <option value="5">5 STARS</option>
              <option value="4">4+ STARS</option>
            </select>

            <select
              value={selectedAvailability}
              onChange={(e) => setSelectedAvailability(e.target.value)}
              className="liquid-metal-select"
            >
              <option value="all">ALL AVAILABILITY</option>
              <option value="now">AVAILABLE NOW</option>
              <option value="today">TODAY</option>
              <option value="tomorrow">TOMORROW</option>
            </select>
          </div>
        </div>

        {loading ? (
          <div className="text-center py-20">
            <div className="liquid-metal text-xl">LOADING PRACTITIONERS...</div>
          </div>
        ) : practitioners.length === 0 ? (
          <div className="text-center py-20">
            <div className="liquid-metal text-xl">NO PRACTITIONERS FOUND</div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12 mb-16">
            {practitioners.map((practitioner) => (
              <div key={practitioner.id} className="practitioner-card">
                <div className="relative mb-6">
                  <div className="w-40 h-40 mx-auto rounded-full overflow-hidden border-4 border-[#ffffff30]">
                    <img
                      src={practitioner.image_url || "/default-practitioner.jpg"}
                      alt={practitioner.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>

                <h3 className="liquid-metal text-2xl mb-4 tracking-[0.2em]">
                  {practitioner.name}
                </h3>

                <div className="flex flex-wrap justify-center gap-2 mb-4">
                  {practitioner.specialties.map((specialty, index) => (
                    <span
                      key={index}
                      className="cyber-tag px-3 py-1 text-xs tracking-[0.2em]"
                    >
                      {specialty}
                    </span>
                  ))}
                </div>

                <div className="text-sm text-[#C0C0C0] mb-4">
                  {practitioner.location}
                </div>

                <div className="mb-6 text-center">
                  {practitioner.achievements.map((achievement, index) => (
                    <div
                      key={index}
                      className="text-sm tracking-[0.1em] liquid-metal mb-1"
                    >
                      {achievement}
                    </div>
                  ))}
                </div>

                <Link
                  href={`/practitioners/${practitioner.id}`}
                  className="liquid-metal-button px-8 py-3 tracking-[0.3em] text-sm inline-block"
                >
                  BOOK A SESSION
                </Link>
              </div>
            ))}
          </div>
        )}
      </div>

      <style jsx global>{`
        .practitioner-card {
          background: rgba(255, 255, 255, 0.03);
          border: 1px solid rgba(255, 255, 255, 0.1);
          padding: 2rem;
          text-align: center;
          transition: all 0.3s ease;
        }

        .practitioner-card:hover {
          transform: translateY(-5px);
          background: rgba(255, 255, 255, 0.05);
          border-color: rgba(255, 255, 255, 0.2);
        }

        .practitioner-card img {
          filter: grayscale(100%);
          transition: all 0.3s ease;
        }

        .practitioner-card:hover img {
          filter: grayscale(80%);
        }

        .cyber-tag {
          background: rgba(255, 255, 255, 0.1);
          border: 1px solid rgba(255, 255, 255, 0.3);
          color: #fff;
          text-shadow: 0 0 10px rgba(255, 255, 255, 0.5);
        }

        .liquid-metal {
          background: linear-gradient(135deg, #ffffff 0%, #b8b8b8 25%, #ffffff 50%, #8a8a8a 75%, #ffffff 100%);
          -webkit-background-clip: text;
          background-clip: text;
          color: transparent;
          text-shadow: 0 0 10px rgba(255, 255, 255, 0.3), 0 0 20px rgba(255, 255, 255, 0.2);
          animation: chromePulse 2s ease-in-out infinite;
        }

        .liquid-metal-button {
          background: linear-gradient(135deg, rgba(255, 255, 255, 0.1) 0%, rgba(184, 184, 184, 0.1) 50%, rgba(255, 255, 255, 0.1) 100%);
          border: 2px solid rgba(255, 255, 255, 0.2);
          position: relative;
          overflow: hidden;
          transition: all 0.3s ease;
          color: #ffffff;
          text-shadow: 0 0 10px rgba(255, 255, 255, 0.5);
        }

        .liquid-metal-button:hover {
          background: linear-gradient(135deg, rgba(255, 255, 255, 0.2) 0%, rgba(184, 184, 184, 0.2) 50%, rgba(255, 255, 255, 0.2) 100%);
          border-color: rgba(255, 255, 255, 0.4);
          transform: translateY(-2px);
          box-shadow: 0 0 30px rgba(255, 255, 255, 0.2), 0 0 60px rgba(255, 255, 255, 0.1);
        }

        .liquid-metal-button::after {
          content: '';
          position: absolute;
          top: -50%;
          left: -50%;
          width: 200%;
          height: 200%;
          background: radial-gradient(circle at center, rgba(255, 255, 255, 0.2) 0%, rgba(255, 255, 255, 0) 70%);
          transform: rotate(45deg);
          animation: chromePulse 4s linear infinite;
        }

        .liquid-metal-select {
          background: rgba(0, 0, 0, 0.7);
          border: 1px solid rgba(255, 255, 255, 0.2);
          color: #c0c0c0;
          padding: 0.5rem;
          width: 100%;
          text-align: center;
          appearance: none;
        }

        .liquid-metal-input {
          background: rgba(0, 0, 0, 0.7);
          transition: all 0.3s ease;
        }

        .liquid-metal-input:focus {
          box-shadow: 0 0 20px rgba(255, 255, 255, 0.1);
        }

        .animate-pulse {
          animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
        }

        .chrome-button {
          background: linear-gradient(135deg, rgba(255, 255, 255, 0.1) 0%, rgba(184, 184, 184, 0.1) 50%, rgba(255, 255, 255, 0.1) 100%);
          border: 2px solid rgba(255, 255, 255, 0.2);
          position: relative;
          overflow: hidden;
          transition: all 0.3s ease;
          color: #ffffff;
          text-shadow: 0 0 10px rgba(255, 255, 255, 0.5);
        }

        .chrome-button:hover {
          background: linear-gradient(135deg, rgba(255, 255, 255, 0.2) 0%, rgba(184, 184, 184, 0.2) 50%, rgba(255, 255, 255, 0.2) 100%);
          border-color: rgba(255, 255, 255, 0.4);
          transform: translateY(-2px);
          box-shadow: 0 0 30px rgba(255, 255, 255, 0.2), 0 0 60px rgba(255, 255, 255, 0.1);
        }

        .chrome-button::after {
          content: '';
          position: absolute;
          top: -50%;
          left: -50%;
          width: 200%;
          height: 200%;
          background: radial-gradient(circle at center, rgba(255, 255, 255, 0.2) 0%, rgba(255, 255, 255, 0) 70%);
          transform: rotate(45deg);
          animation: chromePulse 4s linear infinite;
        }

        /* Custom animations */
        @keyframes chromePulse {
          0% { filter: brightness(1) contrast(1); }
          50% { filter: brightness(1.2) contrast(1.1); }
          100% { filter: brightness(1) contrast(1); }
        }

        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.5; }
        }
      `}</style>
    </div>
  );
}

export default MainComponent;