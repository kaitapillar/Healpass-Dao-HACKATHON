"use client";
import React, { useState, useEffect } from "react";
import { useAccount, useConnect, useContractWrite, useReadContract, useDisconnect } from "wagmi"; // Add useDisconnect
import { coinbaseWallet } from "wagmi/connectors";
import { parseEther } from "viem";
import Link from "next/link"; // For navigation

function MainComponent() {
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
    },
  ];
  const [sessions, setSessions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [registrationLoading, setRegistrationLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [submitStatus, setSubmitStatus] = useState({
    loading: false,
    error: null,
    success: false,
  });
  const { isConnected, address } = useAccount();
  const { connect, connectors } = useConnect(); // Destructure connectors for debugging
  const { disconnect } = useDisconnect(); // For logout functionality
  const { write: approveTokens } = useContractWrite({
    address: "YOUR_HEALPASS_COIN_CONTRACT_ADDRESS", // ERC-20 HealPass Coin contract address
    abi: [
      {
        inputs: [
          { name: "spender", type: "address" },
          { name: "amount", type: "uint256" },
        ],
        name: "approve",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
      },
    ],
    functionName: "approve",
  });
  const { write: registerSession } = useContractWrite({
    address: "YOUR_SESSION_CONTRACT_ADDRESS", // Contract for session registration
    abi: [
      {
        inputs: [
          { name: "sessionId", type: "uint256" },
          { name: "tokenAmount", type: "uint256" },
        ],
        name: "registerForSession",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
      },
    ],
    functionName: "registerForSession",
  });

  // Read contract to check if user is registered for a session
  const { data: isRegistered, refetch: refetchRegistration } = useReadContract({
    address: "YOUR_SESSION_CONTRACT_ADDRESS",
    abi: [
      {
        inputs: [{ name: "user", type: "address" }, { name: "sessionId", type: "uint256" }],
        name: "isUserRegistered",
        outputs: [{ type: "bool" }],
        stateMutability: "view",
        type: "function",
      },
    ],
    functionName: "isUserRegistered",
    args: address ? [address, BigInt(0)] : undefined, // Default to session ID 0; update as needed
    enabled: !!address, // Only fetch if address exists
  });

  useEffect(() => {
    const fetchSessions = async () => {
      try {
        const response = await fetch("/api/list-classes", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
        });
        if (!response.ok) throw new Error("Failed to fetch sessions");
        const data = await response.json();
        setSessions(data.classes?.length > 0 ? data.classes : defaultSessions);
      } catch (err) {
        setError("Failed to load sessions");
        console.error(err);
        setSessions(defaultSessions);
      } finally {
        setLoading(false);
      }
    };
    fetchSessions();
  }, []);

  const handleRegister = async (sessionId, tokenCost) => {
    console.log("Attempting to register for session", sessionId, "with wallet connected:", isConnected);
    if (!isConnected) {
      console.log("Wallet not connected, attempting to connect...");
      connect({ connector: coinbaseWallet() });
      return;
    }

    setRegistrationLoading(true);
    try {
      // Check if already registered for this session
      if (isRegistered) {
        setError("You have already registered for this session.");
        return;
      }

      // Approve tokens for the session contract
      console.log("Approving tokens...");
      await approveTokens({
        args: ["YOUR_SESSION_CONTRACT_ADDRESS", BigInt(tokenCost * 10 ** 18)], // Approve token cost in wei (assuming 18 decimals for HealPass Coin)
      });

      // Register for the session using the approved tokens
      console.log("Registering for session...");
      await registerSession({
        args: [BigInt(sessionId), BigInt(tokenCost * 10 ** 18)], // Use token amount
      });

      window.location.href = `/classes/${sessionId}`; // Redirect to session details or confirmation
    } catch (err) {
      setError("Registration failed: " + err.message);
      console.error("Registration error:", err);
    } finally {
      setRegistrationLoading(false);
      refetchRegistration(); // Refresh registration status
    }
  };

  const handleWaitlistSubmit = async (e) => {
    e.preventDefault();
    setSubmitStatus({
      loading: true,
      error: null,
      success: false,
    });

    try {
      const response = await fetch("/api/join-waitlist", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      const data = await response.json();

      if (data.error) {
        throw new Error(data.error);
      }

      setSubmitStatus({
        loading: false,
        error: null,
        success: true,
      });
      setEmail("");
    } catch (err) {
      setSubmitStatus({
        loading: false,
        error: err.message,
        success: false,
      });
    }
  };

  const handleLogout = () => {
    disconnect(); // Disconnect the wallet
  };

  return (
    <div className="min-h-screen bg-[#000] text-[#C0C0C0] font-mono relative overflow-hidden">
      <div className="fixed inset-0">
        <div className="absolute inset-0 bg-[#ffffff]/5"></div> {/* Match home/practitioner design */}
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-[#000]/90"></div>
      </div>

      <div className="relative z-10 container mx-auto px-4 py-16">
        {/* Add Back Button at the top */}
        <div className="mb-8 text-left">
          <Link href="/" className="chrome-button px-6 py-2 tracking-[0.2em] text-sm">
            Back to Home
          </Link>
        </div>
        <section className="text-center mb-24">
          <h1 className="chrome-text text-6xl md:text-7xl tracking-[0.2em] mb-8">
            HEALPASS
          </h1>
          <div className="text-lg tracking-[0.3em] max-w-3xl mx-auto mb-12 chrome-text flex flex-col gap-2">
            <span>ROOT CAUSE HEALING</span>
            <span>SELF MASTERY</span>
            <span>HEALTH AUTONOMY</span>
            <span>COMMUNITY GOVERNED HEALTHCARE</span>
          </div>

          <div className="mb-16">
            <h2 className="text-2xl tracking-[0.2em] chrome-text mb-4">
              BEGIN YOUR JOURNEY
            </h2>
            <Link href="/book-session" className="block max-w-2xl mx-auto">
              <div className="bg-[#ffffff08] border-2 border-[#ffffff30] p-8 rounded-lg transform hover:scale-[1.02] transition-all duration-300 hover:border-[#0f0]/30 cursor-pointer">
                <h3 className="text-xl tracking-[0.2em] chrome-text mb-4">
                  BOOK A CLARITY SESSION WITH YOUR INTUITIVE JOURNEY COACH
                </h3>
                <p className="text-sm tracking-[0.2em] chrome-text mb-4">
                  MEMBERS GET MONTHLY MEETINGS WITH THEIR JOURNEY COACH
                </p>
                <p className="text-sm tracking-[0.2em] chrome-text">
                  FIRST SESSION INCLUDES BIOMETRIC LAB TEST AND ANALYSIS
                </p>
                <div className="mt-6">
                  <button className="px-8 py-3 bg-[#0f0]/10 border border-[#0f0]/20 hover:bg-[#0f0]/20 transition-colors chrome-text">
                    SCHEDULE NOW
                  </button>
                </div>
              </div>
            </Link>
          </div>

          <div className="mb-16">
            <h2 className="text-3xl tracking-[0.2em] chrome-text mb-4">
              HEAL WITH COMMUNITY
            </h2>
            <p className="text-sm tracking-[0.2em] max-w-2xl mx-auto chrome-text">
              GET ACCESS TO DRS AND NICHE EXPERTS ANYWHERE, FOR LIVE Q&A AND
              HEALTH AND WELLNESS WORKSHOPS
            </p>
          </div>
        </section>

        <section className="mb-24">
          <h2 className="chrome-text text-3xl tracking-[0.3em] mb-12 text-center">
            UPCOMING LIVE SESSIONS
          </h2>
          {loading ? (
            <div className="text-center py-12">
              <div className="chrome-text animate-pulse">
                LOADING SESSIONS...
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {sessions
                .sort((a, b) => new Date(a.date_time) - new Date(b.date_time))
                .map((session) => (
                  <div
                    key={session.id}
                    className="bg-[#ffffff05] border border-[#ffffff20] p-6 rounded-lg transform hover:scale-[1.02] transition-all duration-300 hover:border-[#0f0]/30"
                  >
                    <div className="flex items-center gap-4 mb-4">
                      <img
                        src={session.instructor_image}
                        alt={session.instructor_name}
                        className="w-12 h-12 rounded-full object-cover"
                      />
                      <div>
                        <h3 className="chrome-text text-sm tracking-[0.2em]">
                          {session.category_name}
                        </h3>
                        <p className="text-xs">{session.instructor_name}</p>
                      </div>
                    </div>
                    <h4 className="text-lg mb-2 chrome-text">
                      {session.title}
                    </h4>
                    <p className="text-sm text-zinc-400 mb-4">
                      {session.description}
                    </p>
                    <div className="flex justify-between items-center mb-4">
                      <div className="text-xs">
                        {new Date(session.date_time).toLocaleDateString()} @{" "}
                        {new Date(session.date_time).toLocaleTimeString([], {
                          hour: "2-digit",
                          minute: "2-digit",
                          timeZoneName: "short",
                        })}
                      </div>
                      <div className="text-xs">
                        {session.current_participants}/
                        {session.max_participants}
                      </div>
                    </div>
                    <div className="flex flex-wrap gap-2 mb-4">
                      {session.specialty_focus.split(" ").map((tag) => (
                        <span
                          key={tag}
                          className="text-xs px-2 py-1 bg-[#0f0]/10 border border-[#0f0]/20 rounded"
                        >
                          #{tag}
                        </span>
                      ))}
                    </div>
                    <div className="flex justify-between items-center">
                      <div className="chrome-text">
                        {session.token_cost} HEALPASS COINS
                      </div>
                      {isRegistered ? (
                        <div className="text-[#0f0] text-sm">Already Registered</div>
                      ) : (
                        <button
                          onClick={() => handleRegister(session.id, session.token_cost)}
                          disabled={registrationLoading}
                          className="px-4 py-2 bg-[#0f0]/10 border border-[#0f0]/20 hover:bg-[#0f0]/20 transition-colors chrome-text"
                        >
                          {registrationLoading ? "REGISTERING..." : "REGISTER"}
                        </button>
                      )}
                    </div>
                  </div>
                ))}
            </div>
          )}
        </section>

        <section className="mb-24 bg-[#ffffff05] border border-[#ffffff20] p-8 rounded-lg">
          <h2 className="chrome-text text-3xl tracking-[0.3em] mb-8 text-center">
            OWNERSHIP IN HEALTHCARE, POOLED RISK, PRACTITIONERS VETTED BY
            COMMUNITY
          </h2>
          <p className="text-sm tracking-[0.2em] max-w-2xl mx-auto chrome-text mb-8 text-center">
            JOIN THE GREATEST REDISTRIBUTION OF WEALTH IN HEALTHCARE. THE TOKEN
            ECONOMY THAT THRIVES ON HEALTH.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="text-center">
              <h3 className="chrome-text text-xl mb-4">
                HEALPASS DAO MEMBERSHIP
              </h3>
              <p className="text-sm mb-4">
                EXCLUSIVE ACCESS TO RETREATS AND PARTNER DEALS, UNLIMITED
                WORKSHOPS, EARN ON REFERRALS
              </p>
              <form
                onSubmit={handleWaitlistSubmit}
                className="max-w-md mx-auto"
              >
                <div className="flex flex-col gap-4">
                  {!submitStatus.success ? (
                    <>
                      <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="ENTER YOUR EMAIL"
                        className="px-6 py-3 bg-[#0f0]/10 border border-[#0f0]/20 focus:border-[#0f0]/40 outline-none transition-colors text-center"
                        required
                      />
                      <button
                        type="submit"
                        disabled={submitStatus.loading}
                        className="px-6 py-3 bg-[#0f0]/10 border border-[#0f0]/20 hover:bg-[#0f0]/20 transition-colors chrome-text disabled:opacity-50"
                      >
                        {submitStatus.loading ? "JOINING..." : "JOIN WAITLIST"}
                      </button>
                    </>
                  ) : (
                    <div className="text-[#0f0] text-center py-3 bg-[#0f0]/10 border border-[#0f0]/20">
                      ✓ YOU'RE ON THE LIST!
                    </div>
                  )}

                  {submitStatus.error && (
                    <div className="text-red-500 text-center text-sm">
                      {submitStatus.error}
                    </div>
                  )}
                </div>
              </form>
            </div>
            <div className="text-center">
              <h3 className="chrome-text text-xl mb-4">HEALTH FUND</h3>
              <p className="text-sm mb-4">
                QUALIFYING CONTRIBUTORS CAN ACCESS COLLECTIVE HEALTH COVERAGE
              </p>
              <button className="px-6 py-3 bg-[#0f0]/10 border border-[#0f0]/20 hover:bg-[#0f0]/20 transition-colors chrome-text">
                LEARN MORE
              </button>
            </div>
          </div>
        </section>

        <section className="mt-32">
          <h2 className="chrome-text text-3xl tracking-[0.3em] mb-12 text-center">
            CONDITION-BASED HEALING COHORTS
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-[#ffffff05] border border-[#ffffff20] p-6 rounded-lg text-center">
              <h3 className="chrome-text text-xl mb-4">
                LYME DISEASE REVERSAL PROGRAM
              </h3>
              <div className="text-[#0f0] text-2xl mb-4">94% SUCCESS RATE</div>
              <p className="text-sm mb-4">
                PROVEN PROTOCOL FOR DETOX AND RECOVERY
              </p>
              <button className="px-6 py-3 bg-[#0f0]/10 border border-[#0f0]/20 hover:bg-[#0f0]/20 transition-colors chrome-text">
                JOIN COHORT
              </button>
            </div>
            <div className="bg-[#ffffff05] border border-[#ffffff20] p-6 rounded-lg text-center">
              <h3 className="chrome-text text-xl mb-4">FERTILITY PROGRAM</h3>
              <div className="text-[#0f0] text-2xl mb-4">88% SUCCESS RATE</div>
              <p className="text-sm mb-4">
                NATURAL APPROACHES TO FERTILITY ENHANCEMENT
              </p>
              <button className="px-6 py-3 bg-[#0f0]/10 border border-[#0f0]/20 hover:bg-[#0f0]/20 transition-colors chrome-text">
                JOIN COHORT
              </button>
            </div>
            <div className="bg-[#ffffff05] border border-[#ffffff20] p-6 rounded-lg text-center">
              <h3 className="chrome-text text-xl mb-4">
                AUTOIMMUNE DISEASE REVERSAL
              </h3>
              <div className="text-[#0f0] text-2xl mb-4">91% SUCCESS RATE</div>
              <p className="text-sm mb-4">
                COMPREHENSIVE PROTOCOL FOR IMMUNE SYSTEM RESET
              </p>
              <button className="px-6 py-3 bg-[#0f0]/10 border border-[#0f0]/20 hover:bg-[#0f0]/20 transition-colors chrome-text">
                JOIN COHORT
              </button>
            </div>
          </div>
        </section>

        <section className="mt-32 mb-24">
          <h2 className="chrome-text text-3xl tracking-[0.3em] mb-12 text-center">
            MEMBER SPACE
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <Link
              href="/member/guest-voting"
              className="bg-[#ffffff05] border border-[#ffffff20] p-6 rounded-lg text-center transform hover:scale-[1.02] transition-all duration-300 hover:border-[#0f0]/30 cursor-pointer"
            >
              <h3 className="chrome-text text-xl mb-4">
                VOTE ON NEXT SPECIAL GUEST RESIDENCY DR
              </h3>
              <button className="px-6 py-3 bg-[#0f0]/10 border border-[#0f0]/20 hover:bg-[#0f0]/20 transition-colors chrome-text">
                CAST VOTE
              </button>
            </Link>

            <Link
              href="/member/retreats"
              className="bg-[#ffffff05] border border-[#ffffff20] p-6 rounded-lg text-center transform hover:scale-[1.02] transition-all duration-300 hover:border-[#0f0]/30 cursor-pointer"
            >
              <h3 className="chrome-text text-xl mb-4">SIGN UP FOR RETREATS</h3>
              <button className="px-6 py-3 bg-[#0f0]/10 border border-[#0f0]/20 hover:bg-[#0f0]/20 transition-colors chrome-text">
                VIEW CALENDAR
              </button>
            </Link>

            <Link
              href="/member/trials"
              className="bg-[#ffffff05] border border-[#ffffff20] p-6 rounded-lg text-center transform hover:scale-[1.02] transition-all duration-300 hover:border-[#0f0]/30 cursor-pointer"
            >
              <h3 className="chrome-text text-xl mb-4">
                PARTICIPATE IN TRIAL STUDIES
              </h3>
              <button className="px-6 py-3 bg-[#0f0]/10 border border-[#0f0]/20 hover:bg-[#0f0]/20 transition-colors chrome-text">
                VIEW TRIALS
              </button>
            </Link>

            <Link
              href="/member/products"
              className="bg-[#ffffff05] border border-[#ffffff20] p-6 rounded-lg text-center transform hover:scale-[1.02] transition-all duration-300 hover:border-[#0f0]/30 cursor-pointer"
            >
              <h3 className="chrome-text text-xl mb-4">
                PARTNER DEMOS & DISCOUNTS
              </h3>
              <button className="px-6 py-3 bg-[#0f0]/10 border border-[#0f0]/20 hover:bg-[#0f0]/20 transition-colors chrome-text">
                VIEW PRODUCTS
              </button>
            </Link>
          </div>
        </section>

        {/* Add logout button if connected */}
        {isConnected && (
          <div className="fixed top-4 right-4">
            <button
              onClick={handleLogout}
              className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition"
            >
              Disconnect Wallet
            </button>
          </div>
        )}
      </div>

      <style jsx global>{`
        .chrome-text {
          background: linear-gradient(
            135deg,
            #ffffff 0%,
            #b8b8b8 25%,
            #ffffff 50%,
            #8a8a8a 75%,
            #ffffff 100%
          );
          -webkit-background-clip: text;
          background-clip: text;
          color: transparent;
          text-shadow: 0 0 10px rgba(255,255,255,0.3);
        }

        @keyframes glow {
          0% { text-shadow: 0 0 10px rgba(0,255,0,0.3); }
          50% { text-shadow: 0 0 20px rgba(0,255,0,0.5); }
          100% { text-shadow: 0 0 10px rgba(0,255,0,0.3); }
        }

        .text-[#0f0] {
          animation: glow 2s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
}

export default MainComponent;