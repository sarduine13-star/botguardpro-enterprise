import { useState, useEffect } from "react";

const STRIPE = {
  quickScan: "https://buy.stripe.com/dRmaEX5pk31eb4sg1hcfK0i",
  revenueAudit: "https://buy.stripe.com/dRm9ATg3Y9pC6Oc5mDcfK0h",
  revenueShield: "https://buy.stripe.com/dRm14naJEgS42xWcP5cfK0g",
};

const NAV_LINKS = ["Problem", "How It Works", "Pricing", "FAQ"];

function useScrollY() {
  const [y, setY] = useState(0);
  useEffect(() => {
    const handler = () => setY(window.scrollY);
    window.addEventListener("scroll", handler, { passive: true });
    return () => window.removeEventListener("scroll", handler);
  }, []);
  return y;
}

function Nav() {
  const scrollY = useScrollY();
  const [open, setOpen] = useState(false);
  return (
    <nav
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        zIndex: 100,
        padding: "0 2rem",
        height: "64px",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        background: scrollY > 40 ? "rgba(5,7,10,0.95)" : "transparent",
        backdropFilter: scrollY > 40 ? "blur(12px)" : "none",
        borderBottom: scrollY > 40 ? "1px solid rgba(255,255,255,0.06)" : "none",
        transition: "all 0.3s ease",
      }}
    >
      <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
        <div style={{
          width: 28, height: 28, borderRadius: 6,
          background: "linear-gradient(135deg, #00ff88, #00ccff)",
          display: "flex", alignItems: "center", justifyContent: "center",
          fontSize: 14, fontWeight: 900, color: "#000"
        }}>B</div>
        <span style={{ fontFamily: "'Space Mono', monospace", fontWeight: 700, color: "#fff", fontSize: 15, letterSpacing: "-0.3px" }}>
          BotGuard<span style={{ color: "#00ff88" }}>Pro</span>
        </span>
      </div>

      <div style={{ display: "flex", gap: "2rem", alignItems: "center" }} className="desktop-nav">
        {NAV_LINKS.map(l => (
          <a key={l} href={`#${l.toLowerCase().replace(/ /g, "-")}`}
            style={{ color: "rgba(255,255,255,0.6)", fontSize: 13, textDecoration: "none", fontFamily: "'Space Mono', monospace", letterSpacing: "0.5px", transition: "color 0.2s" }}
            onMouseEnter={e => e.target.style.color = "#00ff88"}
            onMouseLeave={e => e.target.style.color = "rgba(255,255,255,0.6)"}
          >{l}</a>
        ))}
        <a href={STRIPE.quickScan} target="_blank" rel="noopener noreferrer"
          style={{
            background: "#00ff88", color: "#000", padding: "8px 18px",
            borderRadius: 6, fontSize: 13, fontWeight: 700, textDecoration: "none",
            fontFamily: "'Space Mono', monospace", letterSpacing: "0.3px",
            transition: "all 0.2s",
          }}
          onMouseEnter={e => { e.target.style.background = "#00ffaa"; e.target.style.transform = "translateY(-1px)"; }}
          onMouseLeave={e => { e.target.style.background = "#00ff88"; e.target.style.transform = "translateY(0)"; }}
        >Scan My Site →</a>
      </div>
    </nav>
  );
}

function Hero() {
  return (
    <section style={{
      minHeight: "100vh",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      padding: "120px 2rem 80px",
      textAlign: "center",
      position: "relative",
      overflow: "hidden",
    }}>
      {/* Grid background */}
      <div style={{
        position: "absolute", inset: 0,
        backgroundImage: "linear-gradient(rgba(0,255,136,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(0,255,136,0.04) 1px, transparent 1px)",
        backgroundSize: "60px 60px",
        zIndex: 0,
      }} />
      {/* Glow */}
      <div style={{
        position: "absolute", top: "30%", left: "50%", transform: "translate(-50%,-50%)",
        width: 600, height: 400,
        background: "radial-gradient(ellipse, rgba(0,255,136,0.08) 0%, transparent 70%)",
        zIndex: 0,
      }} />

      <div style={{ position: "relative", zIndex: 1, maxWidth: 800 }}>
        <div style={{
          display: "inline-block",
          background: "rgba(0,255,136,0.1)",
          border: "1px solid rgba(0,255,136,0.3)",
          borderRadius: 100,
          padding: "6px 16px",
          marginBottom: "2rem",
          fontFamily: "'Space Mono', monospace",
          fontSize: 12,
          color: "#00ff88",
          letterSpacing: "1px",
        }}>
          ◆ REVENUE INTEGRITY PLATFORM
        </div>

        <h1 style={{
          fontFamily: "'Syne', sans-serif",
          fontSize: "clamp(2.8rem, 7vw, 5.5rem)",
          fontWeight: 900,
          color: "#fff",
          lineHeight: 1.0,
          marginBottom: "1.5rem",
          letterSpacing: "-2px",
        }}>
          Bots Are Eating<br />
          <span style={{
            background: "linear-gradient(135deg, #00ff88, #00ccff)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
          }}>Your Ad Budget.</span>
        </h1>

        <p style={{
          fontFamily: "'DM Sans', sans-serif",
          fontSize: "clamp(1rem, 2vw, 1.25rem)",
          color: "rgba(255,255,255,0.55)",
          maxWidth: 560,
          margin: "0 auto 3rem",
          lineHeight: 1.7,
        }}>
          Fake clicks. Ghost sessions. Inflated costs. BotGuard Pro detects exactly who's hitting your site, what it's costing you, and how to stop them.
        </p>

        <div style={{ display: "flex", gap: "1rem", justifyContent: "center", flexWrap: "wrap" }}>
          <a href={STRIPE.quickScan} target="_blank" rel="noopener noreferrer"
            style={{
              background: "#00ff88",
              color: "#000",
              padding: "16px 32px",
              borderRadius: 8,
              fontSize: 15,
              fontWeight: 800,
              textDecoration: "none",
              fontFamily: "'Space Mono', monospace",
              letterSpacing: "0.3px",
              transition: "all 0.2s",
              display: "inline-flex",
              alignItems: "center",
              gap: 8,
            }}
            onMouseEnter={e => { e.currentTarget.style.background = "#00ffaa"; e.currentTarget.style.transform = "translateY(-2px)"; e.currentTarget.style.boxShadow = "0 8px 30px rgba(0,255,136,0.3)"; }}
            onMouseLeave={e => { e.currentTarget.style.background = "#00ff88"; e.currentTarget.style.transform = "translateY(0)"; e.currentTarget.style.boxShadow = "none"; }}
          >
            Run a $99 Quick Scan →
          </a>
          <a href="#pricing"
            style={{
              background: "transparent",
              color: "rgba(255,255,255,0.7)",
              padding: "16px 32px",
              borderRadius: 8,
              fontSize: 15,
              fontWeight: 600,
              textDecoration: "none",
              fontFamily: "'DM Sans', sans-serif",
              border: "1px solid rgba(255,255,255,0.15)",
              transition: "all 0.2s",
            }}
            onMouseEnter={e => { e.currentTarget.style.borderColor = "rgba(255,255,255,0.4)"; e.currentTarget.style.color = "#fff"; }}
            onMouseLeave={e => { e.currentTarget.style.borderColor = "rgba(255,255,255,0.15)"; e.currentTarget.style.color = "rgba(255,255,255,0.7)"; }}
          >
            View All Plans
          </a>
        </div>

        <div style={{ marginTop: "3rem", display: "flex", gap: "2rem", justifyContent: "center", flexWrap: "wrap" }}>
          {[["$0", "Average daily waste from bot traffic"], ["80%", "Of bot clicks bypass standard blockers"], ["3 min", "Time to get your scan report"]].map(([val, label]) => (
            <div key={val} style={{ textAlign: "center" }}>
              <div style={{ fontFamily: "'Syne', sans-serif", fontSize: "2rem", fontWeight: 900, color: "#00ff88" }}>{val}</div>
              <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 12, color: "rgba(255,255,255,0.4)", maxWidth: 140 }}>{label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Problem() {
  const items = [
    { icon: "💸", title: "Ad Spend Drained", desc: "Bots click your paid ads, spend your budget, and never convert. You pay for traffic that was never human." },
    { icon: "🖥️", title: "Server Costs Inflated", desc: "Fake traffic drives up your hosting bills, CDN costs, and compute usage every single month." },
    { icon: "🪑", title: "SaaS Seats Consumed", desc: "Fake signups eat your trial limits and plan quotas, blocking real customers and distorting your metrics." },
    { icon: "🗑️", title: "CRM Polluted", desc: "Fake leads flood your sales pipeline, wasting your team's time chasing ghosts that will never close." },
    { icon: "📊", title: "Analytics Poisoned", desc: "Bad data leads to bad decisions. Bots tank your conversion rate and make a working funnel look broken." },
    { icon: "🔁", title: "It Never Stops", desc: "Bots evolve, tactics change, and new sources emerge. Without monitoring, the bleeding continues indefinitely." },
  ];

  return (
    <section id="problem" style={{ padding: "100px 2rem", maxWidth: 1100, margin: "0 auto" }}>
      <div style={{ textAlign: "center", marginBottom: "4rem" }}>
        <div style={{ fontFamily: "'Space Mono', monospace", fontSize: 11, color: "#00ff88", letterSpacing: "2px", marginBottom: "1rem" }}>THE PROBLEM</div>
        <h2 style={{ fontFamily: "'Syne', sans-serif", fontSize: "clamp(2rem, 4vw, 3rem)", fontWeight: 900, color: "#fff", letterSpacing: "-1px", margin: 0 }}>
          Bots Cost You More<br />Than You Think
        </h2>
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: "1.5rem" }}>
        {items.map(({ icon, title, desc }) => (
          <div key={title} style={{
            background: "rgba(255,255,255,0.03)",
            border: "1px solid rgba(255,255,255,0.07)",
            borderRadius: 12,
            padding: "1.75rem",
            transition: "all 0.2s",
            cursor: "default",
          }}
            onMouseEnter={e => { e.currentTarget.style.background = "rgba(0,255,136,0.04)"; e.currentTarget.style.borderColor = "rgba(0,255,136,0.2)"; }}
            onMouseLeave={e => { e.currentTarget.style.background = "rgba(255,255,255,0.03)"; e.currentTarget.style.borderColor = "rgba(255,255,255,0.07)"; }}
          >
            <div style={{ fontSize: 28, marginBottom: "0.75rem" }}>{icon}</div>
            <div style={{ fontFamily: "'Syne', sans-serif", fontSize: "1.1rem", fontWeight: 700, color: "#fff", marginBottom: "0.5rem" }}>{title}</div>
            <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 14, color: "rgba(255,255,255,0.5)", lineHeight: 1.7 }}>{desc}</div>
          </div>
        ))}
      </div>
    </section>
  );
}

function HowItWorks() {
  const steps = [
    { num: "01", title: "You Purchase a Plan", desc: "Checkout takes 60 seconds. No setup calls, no contracts, no waiting." },
    { num: "02", title: "We Scan Your Traffic", desc: "Our engine analyzes your sessions, fingerprints suspicious behavior, and cross-references known bot sources." },
    { num: "03", title: "You Get the Report", desc: "A full PDF lands in your inbox — who, what, where, how, and exactly what it's costing you." },
    { num: "04", title: "You Get the Fix", desc: "Block rules, ad platform settings, and step-by-step instructions to stop the bleed immediately." },
  ];

  return (
    <section id="how-it-works" style={{ padding: "100px 2rem", background: "rgba(255,255,255,0.01)", borderTop: "1px solid rgba(255,255,255,0.05)", borderBottom: "1px solid rgba(255,255,255,0.05)" }}>
      <div style={{ maxWidth: 1000, margin: "0 auto" }}>
        <div style={{ textAlign: "center", marginBottom: "4rem" }}>
          <div style={{ fontFamily: "'Space Mono', monospace", fontSize: 11, color: "#00ff88", letterSpacing: "2px", marginBottom: "1rem" }}>HOW IT WORKS</div>
          <h2 style={{ fontFamily: "'Syne', sans-serif", fontSize: "clamp(2rem, 4vw, 3rem)", fontWeight: 900, color: "#fff", letterSpacing: "-1px", margin: 0 }}>
            Pay. Scan. Fix. Done.
          </h2>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: "2rem" }}>
          {steps.map(({ num, title, desc }) => (
            <div key={num} style={{ position: "relative" }}>
              <div style={{
                fontFamily: "'Space Mono', monospace",
                fontSize: "3.5rem",
                fontWeight: 700,
                color: "rgba(0,255,136,0.12)",
                lineHeight: 1,
                marginBottom: "1rem",
              }}>{num}</div>
              <div style={{ fontFamily: "'Syne', sans-serif", fontSize: "1.1rem", fontWeight: 700, color: "#fff", marginBottom: "0.5rem" }}>{title}</div>
              <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 14, color: "rgba(255,255,255,0.5)", lineHeight: 1.7 }}>{desc}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Calculator() {
  const [spend, setSpend] = useState(5000);
  const wasteRate = 0.23;
  const waste = Math.round(spend * wasteRate);
  const monthly = waste * 30;

  return (
    <section style={{ padding: "100px 2rem" }}>
      <div style={{ maxWidth: 700, margin: "0 auto", textAlign: "center" }}>
        <div style={{ fontFamily: "'Space Mono', monospace", fontSize: 11, color: "#00ff88", letterSpacing: "2px", marginBottom: "1rem" }}>SAVINGS CALCULATOR</div>
        <h2 style={{ fontFamily: "'Syne', sans-serif", fontSize: "clamp(2rem, 4vw, 3rem)", fontWeight: 900, color: "#fff", letterSpacing: "-1px", marginBottom: "0.75rem" }}>
          How Much Are You Losing?
        </h2>
        <p style={{ fontFamily: "'DM Sans', sans-serif", color: "rgba(255,255,255,0.5)", marginBottom: "3rem", fontSize: 15 }}>
          Enter your daily ad spend to estimate your bot traffic waste.
        </p>

        <div style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.08)", borderRadius: 16, padding: "2.5rem" }}>
          <div style={{ marginBottom: "2rem" }}>
            <label style={{ fontFamily: "'Space Mono', monospace", fontSize: 12, color: "rgba(255,255,255,0.5)", display: "block", marginBottom: "1rem" }}>
              DAILY AD SPEND: <span style={{ color: "#00ff88" }}>${spend.toLocaleString()}</span>
            </label>
            <input
              type="range" min="100" max="50000" step="100" value={spend}
              onChange={e => setSpend(Number(e.target.value))}
              style={{ width: "100%", accentColor: "#00ff88", cursor: "pointer" }}
            />
            <div style={{ display: "flex", justifyContent: "space-between", fontFamily: "'Space Mono', monospace", fontSize: 11, color: "rgba(255,255,255,0.3)", marginTop: "0.5rem" }}>
              <span>$100</span><span>$50,000</span>
            </div>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}>
            <div style={{ background: "rgba(255,0,80,0.08)", border: "1px solid rgba(255,0,80,0.2)", borderRadius: 10, padding: "1.25rem" }}>
              <div style={{ fontFamily: "'Space Mono', monospace", fontSize: 11, color: "rgba(255,100,100,0.8)", marginBottom: "0.5rem" }}>EST. DAILY WASTE</div>
              <div style={{ fontFamily: "'Syne', sans-serif", fontSize: "2rem", fontWeight: 900, color: "#ff4466" }}>${waste.toLocaleString()}</div>
            </div>
            <div style={{ background: "rgba(255,0,80,0.08)", border: "1px solid rgba(255,0,80,0.2)", borderRadius: 10, padding: "1.25rem" }}>
              <div style={{ fontFamily: "'Space Mono', monospace", fontSize: 11, color: "rgba(255,100,100,0.8)", marginBottom: "0.5rem" }}>EST. MONTHLY WASTE</div>
              <div style={{ fontFamily: "'Syne', sans-serif", fontSize: "2rem", fontWeight: 900, color: "#ff4466" }}>${monthly.toLocaleString()}</div>
            </div>
          </div>

          <div style={{ marginTop: "1.5rem", padding: "1rem", background: "rgba(0,255,136,0.05)", border: "1px solid rgba(0,255,136,0.15)", borderRadius: 10 }}>
            <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 14, color: "rgba(255,255,255,0.6)" }}>
              A $99 Quick Scan pays for itself if we find just <span style={{ color: "#00ff88", fontWeight: 700 }}>${(99 / waste).toFixed(1)} days</span> of waste.
            </div>
          </div>

          <a href={STRIPE.quickScan} target="_blank" rel="noopener noreferrer"
            style={{
              display: "block", marginTop: "1.5rem",
              background: "#00ff88", color: "#000",
              padding: "14px", borderRadius: 8,
              fontSize: 14, fontWeight: 800, textDecoration: "none",
              fontFamily: "'Space Mono', monospace",
              transition: "all 0.2s",
            }}
            onMouseEnter={e => { e.currentTarget.style.background = "#00ffaa"; e.currentTarget.style.boxShadow = "0 8px 30px rgba(0,255,136,0.25)"; }}
            onMouseLeave={e => { e.currentTarget.style.background = "#00ff88"; e.currentTarget.style.boxShadow = "none"; }}
          >
            Stop the Bleed — Run a Quick Scan →
          </a>
        </div>
      </div>
    </section>
  );
}

function Pricing() {
  const plans = [
    {
      name: "Quick Scan",
      price: "$99",
      period: "one-time",
      tag: null,
      desc: "Right now. One report. Find out if you have a problem and exactly what it's costing you.",
      features: [
        "Instant automated scan",
        "Bot traffic detection report",
        "Estimated daily & monthly waste",
        "PDF delivered to your inbox",
        "Results in minutes",
      ],
      cta: "Run My Scan",
      href: STRIPE.quickScan,
      highlight: false,
    },
    {
      name: "Revenue Audit",
      price: "$297",
      period: "one-time",
      tag: "Most Popular",
      desc: "30 days of monitoring. Full picture. Every detail on where they come from, what they cost you, and exactly how to stop them.",
      features: [
        "Everything in Quick Scan",
        "30-day monitoring period",
        "Bot origin & fingerprint analysis",
        "Ad spend, hosting & ops cost breakdown",
        "Step-by-step remediation guide",
        "Block rules & ad platform settings",
        "Full PDF audit report",
      ],
      cta: "Get My Audit",
      href: STRIPE.revenueAudit,
      highlight: true,
    },
    {
      name: "Revenue Shield",
      price: "$497",
      period: "/month",
      tag: "3rd Month Free",
      desc: "Your always-on revenue bodyguard. Never think about bots again.",
      features: [
        "Everything in Revenue Audit",
        "Continuous 24/7 monitoring",
        "Monthly reports, auto-delivered",
        "Unlimited on-demand scans",
        "Real-time threat alerts",
        "Updated block rules as bots evolve",
        "3rd month completely free",
      ],
      cta: "Protect My Revenue",
      href: STRIPE.revenueShield,
      highlight: false,
    },
  ];

  return (
    <section id="pricing" style={{ padding: "100px 2rem" }}>
      <div style={{ maxWidth: 1100, margin: "0 auto" }}>
        <div style={{ textAlign: "center", marginBottom: "4rem" }}>
          <div style={{ fontFamily: "'Space Mono', monospace", fontSize: 11, color: "#00ff88", letterSpacing: "2px", marginBottom: "1rem" }}>PRICING</div>
          <h2 style={{ fontFamily: "'Syne', sans-serif", fontSize: "clamp(2rem, 4vw, 3rem)", fontWeight: 900, color: "#fff", letterSpacing: "-1px", margin: 0 }}>
            Stop the Bleed Today
          </h2>
          <p style={{ fontFamily: "'DM Sans', sans-serif", color: "rgba(255,255,255,0.4)", marginTop: "1rem", fontSize: 15 }}>
            No contracts. No setup fees. Cancel anytime.
          </p>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: "1.5rem", alignItems: "start" }}>
          {plans.map(({ name, price, period, tag, desc, features, cta, href, highlight }) => (
            <div key={name} style={{
              background: highlight ? "rgba(0,255,136,0.05)" : "rgba(255,255,255,0.03)",
              border: highlight ? "1px solid rgba(0,255,136,0.3)" : "1px solid rgba(255,255,255,0.07)",
              borderRadius: 16,
              padding: "2rem",
              position: "relative",
              transform: highlight ? "scale(1.02)" : "scale(1)",
              transition: "all 0.2s",
            }}>
              {tag && (
                <div style={{
                  position: "absolute", top: -12, left: "50%", transform: "translateX(-50%)",
                  background: highlight ? "#00ff88" : "rgba(255,200,0,0.9)",
                  color: "#000", padding: "4px 16px", borderRadius: 100,
                  fontFamily: "'Space Mono', monospace", fontSize: 11, fontWeight: 700,
                  whiteSpace: "nowrap",
                }}>{tag}</div>
              )}

              <div style={{ fontFamily: "'Space Mono', monospace", fontSize: 12, color: "rgba(255,255,255,0.4)", marginBottom: "0.5rem", letterSpacing: "1px" }}>
                {name.toUpperCase()}
              </div>
              <div style={{ display: "flex", alignItems: "baseline", gap: 4, marginBottom: "0.75rem" }}>
                <span style={{ fontFamily: "'Syne', sans-serif", fontSize: "2.8rem", fontWeight: 900, color: "#fff", lineHeight: 1 }}>{price}</span>
                <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 14, color: "rgba(255,255,255,0.4)" }}>{period}</span>
              </div>
              <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 14, color: "rgba(255,255,255,0.5)", lineHeight: 1.7, marginBottom: "1.5rem", minHeight: 60 }}>
                {desc}
              </p>

              <ul style={{ listStyle: "none", padding: 0, margin: "0 0 2rem", display: "flex", flexDirection: "column", gap: "0.6rem" }}>
                {features.map(f => (
                  <li key={f} style={{ display: "flex", gap: 10, alignItems: "flex-start" }}>
                    <span style={{ color: "#00ff88", flexShrink: 0, marginTop: 2 }}>✓</span>
                    <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 14, color: "rgba(255,255,255,0.6)" }}>{f}</span>
                  </li>
                ))}
              </ul>

              <a href={href} target="_blank" rel="noopener noreferrer"
                style={{
                  display: "block", textAlign: "center",
                  background: highlight ? "#00ff88" : "rgba(255,255,255,0.08)",
                  color: highlight ? "#000" : "#fff",
                  padding: "14px", borderRadius: 8,
                  fontSize: 14, fontWeight: 700, textDecoration: "none",
                  fontFamily: "'Space Mono', monospace",
                  border: highlight ? "none" : "1px solid rgba(255,255,255,0.12)",
                  transition: "all 0.2s",
                }}
                onMouseEnter={e => {
                  e.currentTarget.style.transform = "translateY(-2px)";
                  e.currentTarget.style.boxShadow = highlight ? "0 8px 30px rgba(0,255,136,0.25)" : "0 8px 20px rgba(0,0,0,0.3)";
                  if (!highlight) e.currentTarget.style.background = "rgba(255,255,255,0.12)";
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.transform = "translateY(0)";
                  e.currentTarget.style.boxShadow = "none";
                  if (!highlight) e.currentTarget.style.background = "rgba(255,255,255,0.08)";
                }}
              >
                {cta} →
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function FAQ() {
  const [open, setOpen] = useState(null);
  const items = [
    { q: "How fast do I get my Quick Scan report?", a: "The scan runs automatically after purchase. Your PDF report is delivered to your email within minutes — no waiting, no manual process." },
    { q: "What do I need to provide?", a: "Just your website URL and email address at checkout. No code installs, no API keys, no technical setup required." },
    { q: "What if I don't have paid ads running?", a: "Bots still cost you. Fake signups, server load, analytics pollution, and CRM spam affect every site. The scan detects all of it." },
    { q: "Is the Revenue Audit a subscription?", a: "No. The $297 Revenue Audit is a one-time payment for a 30-day monitoring period plus a full remediation report. No recurring charges." },
    { q: "Can I cancel Revenue Shield anytime?", a: "Yes. Cancel anytime with no fees or penalties. Your 3rd month free is applied automatically at the end of your 2nd billing cycle." },
    { q: "What if I don't find any bot traffic?", a: "That's a win — you now have proof your traffic is clean. And you have the baseline data to detect if that changes in the future." },
  ];

  return (
    <section id="faq" style={{ padding: "100px 2rem", background: "rgba(255,255,255,0.01)", borderTop: "1px solid rgba(255,255,255,0.05)" }}>
      <div style={{ maxWidth: 700, margin: "0 auto" }}>
        <div style={{ textAlign: "center", marginBottom: "4rem" }}>
          <div style={{ fontFamily: "'Space Mono', monospace", fontSize: 11, color: "#00ff88", letterSpacing: "2px", marginBottom: "1rem" }}>FAQ</div>
          <h2 style={{ fontFamily: "'Syne', sans-serif", fontSize: "clamp(2rem, 4vw, 3rem)", fontWeight: 900, color: "#fff", letterSpacing: "-1px", margin: 0 }}>
            Common Questions
          </h2>
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
          {items.map(({ q, a }, i) => (
            <div key={i} style={{
              background: "rgba(255,255,255,0.03)",
              border: "1px solid rgba(255,255,255,0.07)",
              borderRadius: 10,
              overflow: "hidden",
              transition: "border-color 0.2s",
            }}>
              <button onClick={() => setOpen(open === i ? null : i)}
                style={{
                  width: "100%", textAlign: "left", padding: "1.25rem 1.5rem",
                  background: "none", border: "none", cursor: "pointer",
                  display: "flex", justifyContent: "space-between", alignItems: "center", gap: "1rem",
                }}>
                <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 15, fontWeight: 600, color: "#fff" }}>{q}</span>
                <span style={{ color: "#00ff88", fontSize: 20, flexShrink: 0, transition: "transform 0.2s", transform: open === i ? "rotate(45deg)" : "rotate(0)" }}>+</span>
              </button>
              {open === i && (
                <div style={{ padding: "0 1.5rem 1.25rem", fontFamily: "'DM Sans', sans-serif", fontSize: 14, color: "rgba(255,255,255,0.55)", lineHeight: 1.7 }}>
                  {a}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function CTA() {
  return (
    <section style={{ padding: "100px 2rem", textAlign: "center", position: "relative", overflow: "hidden" }}>
      <div style={{
        position: "absolute", top: "50%", left: "50%", transform: "translate(-50%,-50%)",
        width: 800, height: 400,
        background: "radial-gradient(ellipse, rgba(0,255,136,0.06) 0%, transparent 70%)",
      }} />
      <div style={{ position: "relative", maxWidth: 600, margin: "0 auto" }}>
        <h2 style={{ fontFamily: "'Syne', sans-serif", fontSize: "clamp(2rem, 5vw, 3.5rem)", fontWeight: 900, color: "#fff", letterSpacing: "-1.5px", marginBottom: "1rem" }}>
          Bots Don't Take<br />Days Off.
        </h2>
        <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 16, color: "rgba(255,255,255,0.5)", marginBottom: "2.5rem", lineHeight: 1.7 }}>
          Every day you wait is another day of wasted spend, inflated costs, and bad data. A $99 scan takes minutes and pays for itself fast.
        </p>
        <a href={STRIPE.quickScan} target="_blank" rel="noopener noreferrer"
          style={{
            display: "inline-block",
            background: "#00ff88", color: "#000",
            padding: "18px 40px", borderRadius: 8,
            fontSize: 15, fontWeight: 800, textDecoration: "none",
            fontFamily: "'Space Mono', monospace",
            transition: "all 0.2s",
          }}
          onMouseEnter={e => { e.currentTarget.style.background = "#00ffaa"; e.currentTarget.style.transform = "translateY(-2px)"; e.currentTarget.style.boxShadow = "0 12px 40px rgba(0,255,136,0.3)"; }}
          onMouseLeave={e => { e.currentTarget.style.background = "#00ff88"; e.currentTarget.style.transform = "translateY(0)"; e.currentTarget.style.boxShadow = "none"; }}
        >
          Run a $99 Quick Scan Now →
        </a>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer style={{
      borderTop: "1px solid rgba(255,255,255,0.06)",
      padding: "2rem",
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      flexWrap: "wrap",
      gap: "1rem",
      maxWidth: 1100,
      margin: "0 auto",
    }}>
      <div style={{ fontFamily: "'Space Mono', monospace", fontSize: 13, color: "rgba(255,255,255,0.3)" }}>
        © 2025 BotGuard<span style={{ color: "#00ff88" }}>Pro</span>
      </div>
      <div style={{ display: "flex", gap: "1.5rem" }}>
        {[["Quick Scan", STRIPE.quickScan], ["Revenue Audit", STRIPE.revenueAudit], ["Revenue Shield", STRIPE.revenueShield]].map(([label, href]) => (
          <a key={label} href={href} target="_blank" rel="noopener noreferrer"
            style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 13, color: "rgba(255,255,255,0.4)", textDecoration: "none", transition: "color 0.2s" }}
            onMouseEnter={e => e.target.style.color = "#00ff88"}
            onMouseLeave={e => e.target.style.color = "rgba(255,255,255,0.4)"}
          >{label}</a>
        ))}
      </div>
      <div style={{ fontFamily: "'Space Mono', monospace", fontSize: 12, color: "rgba(255,255,255,0.2)" }}>
        info@botguardpro.com
      </div>
    </footer>
  );
}

export default function App() {
  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;700;900&family=Space+Mono:wght@400;700&family=DM+Sans:wght@400;500;600;700&display=swap');
        * { box-sizing: border-box; margin: 0; padding: 0; }
        html { scroll-behavior: smooth; }
        body { background: #05070a; color: #fff; -webkit-font-smoothing: antialiased; }
        input[type=range] { -webkit-appearance: none; height: 4px; background: rgba(255,255,255,0.1); border-radius: 2px; outline: none; }
        input[type=range]::-webkit-slider-thumb { -webkit-appearance: none; width: 18px; height: 18px; border-radius: 50%; background: #00ff88; cursor: pointer; box-shadow: 0 0 10px rgba(0,255,136,0.4); }
        @media (max-width: 768px) { .desktop-nav { display: none !important; } }
      `}</style>
      <Nav />
      <Hero />
      <Problem />
      <HowItWorks />
      <Calculator />
      <Pricing />
      <FAQ />
      <CTA />
      <Footer />
    </>
  );
}
