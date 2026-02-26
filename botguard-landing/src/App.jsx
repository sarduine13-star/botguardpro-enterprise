import { useState, useEffect, useRef } from "react";

const STRIPE = {
  quickScan: "https://buy.stripe.com/dRmaEX5pk31eb4sg1hcfK0i",
  revenueAudit: "https://buy.stripe.com/dRm9ATg3Y9pC6Oc5mDcfK0h",
  revenueShield: "https://buy.stripe.com/dRm14naJEgS42xWcP5cfK0g",
};

// Animated counter hook
function useCounter(target, duration = 2000, start = false) {
  const [count, setCount] = useState(0);
  useEffect(() => {
    if (!start) return;
    let startTime = null;
    const step = (timestamp) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.floor(eased * target));
      if (progress < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [target, duration, start]);
  return count;
}

function useInView(ref) {
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const observer = new IntersectionObserver(([e]) => { if (e.isIntersecting) setInView(true); }, { threshold: 0.2 });
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);
  return inView;
}

function useScrollY() {
  const [y, setY] = useState(0);
  useEffect(() => {
    const h = () => setY(window.scrollY);
    window.addEventListener("scroll", h, { passive: true });
    return () => window.removeEventListener("scroll", h);
  }, []);
  return y;
}

// Live ticker of "attacks"
const FAKE_SITES = ["shop-*.com", "gear-*.net", "store-*.io", "brand-*.co", "buy-*.com", "deals-*.net"];
const ATTACK_TYPES = ["Click fraud detected", "Bot session flagged", "Paid traffic waste", "Invalid click blocked", "Bot fingerprint matched", "Ad spend drained"];
function LiveTicker() {
  const [items, setItems] = useState([
    { site: "ecomm-store.com", type: "Click fraud detected", amount: "$47", time: "2s ago" },
    { site: "gear-depot.net", type: "Bot session flagged", amount: "$23", time: "11s ago" },
    { site: "shop-plus.io", type: "Paid traffic waste", amount: "$89", time: "34s ago" },
  ]);
  useEffect(() => {
    const interval = setInterval(() => {
      const site = FAKE_SITES[Math.floor(Math.random() * FAKE_SITES.length)].replace("*", Math.random().toString(36).substring(2, 5));
      const type = ATTACK_TYPES[Math.floor(Math.random() * ATTACK_TYPES.length)];
      const amount = "$" + (Math.floor(Math.random() * 200) + 10);
      setItems(prev => [{ site, type, amount, time: "just now" }, ...prev.slice(0, 4)]);
    }, 3500);
    return () => clearInterval(interval);
  }, []);
  return (
    <div style={{ background: "rgba(0,0,0,0.4)", border: "1px solid rgba(255,50,50,0.2)", borderRadius: 12, overflow: "hidden" }}>
      <div style={{ background: "rgba(255,30,30,0.08)", borderBottom: "1px solid rgba(255,50,50,0.15)", padding: "10px 16px", display: "flex", alignItems: "center", gap: 8 }}>
        <div style={{ width: 8, height: 8, borderRadius: "50%", background: "#ff3333", boxShadow: "0 0 8px #ff3333", animation: "pulse 1.5s infinite" }} />
        <span style={{ fontFamily: "'Space Mono', monospace", fontSize: 11, color: "#ff6666", letterSpacing: "1px" }}>LIVE BOT ACTIVITY FEED</span>
      </div>
      {items.map((item, i) => (
        <div key={i} style={{
          padding: "10px 16px", display: "flex", justifyContent: "space-between", alignItems: "center",
          borderBottom: "1px solid rgba(255,255,255,0.04)",
          opacity: i === 0 ? 1 : 1 - i * 0.15,
          transition: "all 0.5s ease",
          animation: i === 0 ? "slideIn 0.4s ease" : "none",
        }}>
          <div style={{ display: "flex", gap: 12, alignItems: "center" }}>
            <div style={{ width: 6, height: 6, borderRadius: "50%", background: i === 0 ? "#ff3333" : "#ff6633", flexShrink: 0 }} />
            <div>
              <div style={{ fontFamily: "'Space Mono', monospace", fontSize: 11, color: "rgba(255,255,255,0.7)" }}>{item.site}</div>
              <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 12, color: "rgba(255,255,255,0.4)" }}>{item.type}</div>
            </div>
          </div>
          <div style={{ textAlign: "right" }}>
            <div style={{ fontFamily: "'Space Mono', monospace", fontSize: 13, color: "#ff6633", fontWeight: 700 }}>{item.amount}</div>
            <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 11, color: "rgba(255,255,255,0.3)" }}>{item.time}</div>
          </div>
        </div>
      ))}
    </div>
  );
}

// Logo SVG
function Logo({ size = 32 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 32 32" fill="none">
      <rect width="32" height="32" rx="8" fill="url(#logoGrad)" />
      <path d="M16 6L8 10V16C8 20.4 11.4 24.5 16 26C20.6 24.5 24 20.4 24 16V10L16 6Z" fill="rgba(0,0,0,0.3)" stroke="rgba(255,255,255,0.4)" strokeWidth="0.5" />
      <path d="M16 8L10 11.5V16C10 19.5 12.7 22.8 16 24C19.3 22.8 22 19.5 22 16V11.5L16 8Z" fill="rgba(0,255,136,0.2)" />
      <path d="M13 16L15 18L19 14" stroke="#00ff88" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      <defs>
        <linearGradient id="logoGrad" x1="0" y1="0" x2="32" y2="32">
          <stop offset="0%" stopColor="#0a1628" />
          <stop offset="100%" stopColor="#05070a" />
        </linearGradient>
      </defs>
    </svg>
  );
}

function Nav() {
  const scrollY = useScrollY();
  const [mobileOpen, setMobileOpen] = useState(false);
  return (
    <>
      <nav style={{
        position: "fixed", top: 0, left: 0, right: 0, zIndex: 100,
        padding: "0 2rem", height: 64,
        display: "flex", alignItems: "center", justifyContent: "space-between",
        background: scrollY > 20 ? "rgba(5,7,10,0.97)" : "transparent",
        backdropFilter: scrollY > 20 ? "blur(20px)" : "none",
        borderBottom: scrollY > 20 ? "1px solid rgba(255,255,255,0.05)" : "none",
        transition: "all 0.3s ease",
      }}>
        <a href="/" style={{ display: "flex", alignItems: "center", gap: 10, textDecoration: "none" }}>
          <Logo size={32} />
          <div>
            <div style={{ fontFamily: "'Space Mono', monospace", fontWeight: 700, color: "#fff", fontSize: 14, lineHeight: 1.2 }}>
              BotGuard<span style={{ color: "#00ff88" }}>Pro</span>
            </div>
            <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 10, color: "rgba(255,255,255,0.35)", letterSpacing: "1px" }}>REVENUE INTEGRITY</div>
          </div>
        </a>

        <div style={{ display: "flex", gap: "2rem", alignItems: "center" }} className="desktop-nav">
          {[["#problem", "Problem"], ["#how-it-works", "How It Works"], ["#pricing", "Pricing"], ["#faq", "FAQ"]].map(([href, label]) => (
            <a key={label} href={href} style={{ color: "rgba(255,255,255,0.5)", fontSize: 13, textDecoration: "none", fontFamily: "'Space Mono', monospace", letterSpacing: "0.3px", transition: "color 0.2s" }}
              onMouseEnter={e => e.target.style.color = "#00ff88"}
              onMouseLeave={e => e.target.style.color = "rgba(255,255,255,0.5)"}
            >{label}</a>
          ))}
          <a href={STRIPE.quickScan} target="_blank" rel="noopener noreferrer" style={{
            background: "#00ff88", color: "#000", padding: "9px 20px", borderRadius: 6,
            fontSize: 12, fontWeight: 800, textDecoration: "none", fontFamily: "'Space Mono', monospace",
            letterSpacing: "0.3px", transition: "all 0.2s", whiteSpace: "nowrap",
          }}
            onMouseEnter={e => { e.currentTarget.style.background = "#00ffaa"; e.currentTarget.style.transform = "translateY(-1px)"; }}
            onMouseLeave={e => { e.currentTarget.style.background = "#00ff88"; e.currentTarget.style.transform = "translateY(0)"; }}
          >Scan My Site →</a>
        </div>
      </nav>
    </>
  );
}

function StatsBar() {
  const ref = useRef();
  const inView = useInView(ref);
  const waste = useCounter(2847, 2000, inView);
  const bots = useCounter(73, 1500, inView);
  const clients = useCounter(340, 1800, inView);

  return (
    <div ref={ref} style={{
      background: "rgba(255,30,30,0.04)", borderTop: "1px solid rgba(255,50,50,0.1)", borderBottom: "1px solid rgba(255,50,50,0.1)",
      padding: "1rem 2rem",
    }}>
      <div style={{ maxWidth: 1100, margin: "0 auto", display: "flex", justifyContent: "center", gap: "4rem", flexWrap: "wrap" }}>
        {[
          { val: `$${waste.toLocaleString()}`, label: "avg daily waste detected per client", color: "#ff4444" },
          { val: `${bots}%`, label: "of bot clicks bypass standard blockers", color: "#ff6633" },
          { val: `${clients}+`, label: "sites scanned this month", color: "#00ff88" },
        ].map(({ val, label, color }) => (
          <div key={label} style={{ textAlign: "center" }}>
            <div style={{ fontFamily: "'Space Mono', monospace", fontSize: "1.6rem", fontWeight: 700, color }}>{val}</div>
            <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 12, color: "rgba(255,255,255,0.4)", maxWidth: 180 }}>{label}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

function Hero() {
  const [typed, setTyped] = useState("");
  const full = "yourdomain.com";
  useEffect(() => {
    let i = 0;
    const t = setInterval(() => {
      setTyped(full.slice(0, i));
      i++;
      if (i > full.length) clearInterval(t);
    }, 80);
    return () => clearInterval(t);
  }, []);

  return (
    <section style={{ minHeight: "100vh", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: "100px 2rem 60px", textAlign: "center", position: "relative", overflow: "hidden" }}>
      {/* Animated grid */}
      <div style={{ position: "absolute", inset: 0, backgroundImage: "linear-gradient(rgba(0,255,136,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(0,255,136,0.03) 1px, transparent 1px)", backgroundSize: "50px 50px", zIndex: 0 }} />
      {/* Red glow - danger */}
      <div style={{ position: "absolute", top: "20%", left: "20%", width: 500, height: 400, background: "radial-gradient(ellipse, rgba(255,30,30,0.06) 0%, transparent 70%)", zIndex: 0 }} />
      {/* Green glow - solution */}
      <div style={{ position: "absolute", top: "30%", right: "20%", width: 400, height: 300, background: "radial-gradient(ellipse, rgba(0,255,136,0.06) 0%, transparent 70%)", zIndex: 0 }} />

      <div style={{ position: "relative", zIndex: 1, maxWidth: 900 }}>
        {/* Alert badge */}
        <div style={{
          display: "inline-flex", alignItems: "center", gap: 8,
          background: "rgba(255,30,30,0.1)", border: "1px solid rgba(255,50,50,0.3)",
          borderRadius: 100, padding: "8px 20px", marginBottom: "2rem",
          animation: "fadeInDown 0.6s ease both",
        }}>
          <div style={{ width: 8, height: 8, borderRadius: "50%", background: "#ff3333", boxShadow: "0 0 8px #ff3333", animation: "pulse 1.5s infinite" }} />
          <span style={{ fontFamily: "'Space Mono', monospace", fontSize: 11, color: "#ff6666", letterSpacing: "1px" }}>BOT TRAFFIC DETECTED ON 73% OF AD CAMPAIGNS</span>
        </div>

        <h1 style={{
          fontFamily: "'Syne', sans-serif", fontWeight: 900, color: "#fff",
          fontSize: "clamp(2.8rem, 6vw, 5rem)", lineHeight: 1.0, letterSpacing: "-2px",
          marginBottom: "1.5rem",
          animation: "fadeInUp 0.7s ease 0.2s both",
        }}>
          20% of Your Sessions<br /><span style={{ background: "linear-gradient(135deg, #ff4444, #ff8833)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>Aren't Human.</span><br /><span style={{ background: "linear-gradient(135deg, #00ff88, #00ccff)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>What's That Costing You?</span>
        </h1>

        <p style={{
          fontFamily: "'DM Sans', sans-serif", fontSize: "clamp(1rem, 2vw, 1.2rem)",
          color: "rgba(255,255,255,0.55)", maxWidth: 600, margin: "0 auto 2.5rem", lineHeight: 1.7,
          animation: "fadeInUp 0.7s ease 0.35s both",
        }}>
          Bots are draining your ad spend, inflating your costs, and poisoning your data — right now. BotGuard Pro tells you exactly where, who, how much, and what to do about it.
        </p>

        {/* CTA group */}
        <div style={{ display: "flex", gap: "1rem", justifyContent: "center", flexWrap: "wrap", marginBottom: "2rem", animation: "fadeInUp 0.7s ease 0.5s both" }}>
          <a href={STRIPE.quickScan} target="_blank" rel="noopener noreferrer" style={{
            background: "#00ff88", color: "#000", padding: "18px 36px", borderRadius: 8,
            fontSize: 15, fontWeight: 800, textDecoration: "none", fontFamily: "'Space Mono', monospace",
            transition: "all 0.2s", display: "inline-flex", alignItems: "center", gap: 8,
            boxShadow: "0 0 40px rgba(0,255,136,0.2)",
          }}
            onMouseEnter={e => { e.currentTarget.style.background = "#00ffaa"; e.currentTarget.style.transform = "translateY(-2px)"; e.currentTarget.style.boxShadow = "0 8px 40px rgba(0,255,136,0.4)"; }}
            onMouseLeave={e => { e.currentTarget.style.background = "#00ff88"; e.currentTarget.style.transform = "translateY(0)"; e.currentTarget.style.boxShadow = "0 0 40px rgba(0,255,136,0.2)"; }}
          >
            🔍 Scan My Site for $99
          </a>
          <a href="#pricing" style={{
            background: "transparent", color: "rgba(255,255,255,0.7)", padding: "18px 32px", borderRadius: 8,
            fontSize: 14, fontWeight: 600, textDecoration: "none", fontFamily: "'DM Sans', sans-serif",
            border: "1px solid rgba(255,255,255,0.15)", transition: "all 0.2s",
          }}
            onMouseEnter={e => { e.currentTarget.style.borderColor = "rgba(255,255,255,0.4)"; e.currentTarget.style.color = "#fff"; }}
            onMouseLeave={e => { e.currentTarget.style.borderColor = "rgba(255,255,255,0.15)"; e.currentTarget.style.color = "rgba(255,255,255,0.7)"; }}
          >View All Plans</a>
        </div>

        {/* Trust signals */}
        <div style={{ display: "flex", gap: "1.5rem", justifyContent: "center", flexWrap: "wrap", animation: "fadeInUp 0.7s ease 0.65s both" }}>
          {["✓ No setup required", "✓ Report in minutes", "✓ No contracts"].map(t => (
            <span key={t} style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 13, color: "rgba(255,255,255,0.4)" }}>{t}</span>
          ))}
        </div>

        {/* Live ticker */}
        <div style={{ maxWidth: 520, margin: "3rem auto 0", animation: "fadeInUp 0.7s ease 0.8s both" }}>
          <LiveTicker />
        </div>
      </div>
    </section>
  );
}

function SocialProof() {
  const testimonials = [
    { quote: "Found $1,840/month in bot-driven ad waste within 48 hours. Paid for itself 6x over.", name: "Marcus T.", role: "Performance Marketing Dir.", company: "SaaS startup, $40k/mo ad spend" },
    { quote: "Our CPA looked broken for months. Turns out 31% of our paid traffic was fake. BotGuard fixed that.", name: "Sarah K.", role: "Growth Lead", company: "E-commerce brand" },
    { quote: "The remediation report was more actionable than anything our agency gave us in a year.", name: "Derek M.", role: "Founder", company: "D2C apparel brand" },
  ];

  return (
    <section style={{ padding: "80px 2rem", background: "rgba(255,255,255,0.01)", borderTop: "1px solid rgba(255,255,255,0.05)" }}>
      <div style={{ maxWidth: 1100, margin: "0 auto" }}>
        <div style={{ textAlign: "center", marginBottom: "3rem" }}>
          <div style={{ fontFamily: "'Space Mono', monospace", fontSize: 11, color: "#00ff88", letterSpacing: "2px", marginBottom: "0.75rem" }}>WHAT CLIENTS FOUND</div>
          <h2 style={{ fontFamily: "'Syne', sans-serif", fontSize: "clamp(1.8rem, 3.5vw, 2.5rem)", fontWeight: 900, color: "#fff", letterSpacing: "-1px" }}>Real Money. Real Results.</h2>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: "1.5rem" }}>
          {testimonials.map(({ quote, name, role, company }) => (
            <div key={name} style={{
              background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.07)",
              borderRadius: 12, padding: "1.75rem", position: "relative", overflow: "hidden",
              transition: "all 0.2s",
            }}
              onMouseEnter={e => { e.currentTarget.style.borderColor = "rgba(0,255,136,0.2)"; e.currentTarget.style.background = "rgba(0,255,136,0.03)"; }}
              onMouseLeave={e => { e.currentTarget.style.borderColor = "rgba(255,255,255,0.07)"; e.currentTarget.style.background = "rgba(255,255,255,0.03)"; }}
            >
              <div style={{ fontSize: 32, color: "rgba(0,255,136,0.2)", fontFamily: "serif", lineHeight: 1, marginBottom: "1rem" }}>"</div>
              <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 15, color: "rgba(255,255,255,0.8)", lineHeight: 1.7, marginBottom: "1.5rem", fontStyle: "italic" }}>{quote}</p>
              <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                <div style={{ width: 40, height: 40, borderRadius: "50%", background: "linear-gradient(135deg, #00ff88, #00ccff)", display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "'Space Mono', monospace", fontWeight: 700, color: "#000", fontSize: 14, flexShrink: 0 }}>
                  {name[0]}
                </div>
                <div>
                  <div style={{ fontFamily: "'Space Mono', monospace", fontSize: 12, color: "#fff", fontWeight: 700 }}>{name}</div>
                  <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 12, color: "rgba(255,255,255,0.4)" }}>{role} · {company}</div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Results stats */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: "1rem", marginTop: "3rem" }}>
          {[
            { val: "$2,847", label: "Average monthly waste found", sub: "per client scanned" },
            { val: "23%", label: "Average bot traffic rate", sub: "across all scanned sites" },
            { val: "< 10 min", label: "Time to first report", sub: "fully automated" },
            { val: "6x", label: "Average ROI on Quick Scan", sub: "waste found vs scan cost" },
          ].map(({ val, label, sub }) => (
            <div key={val} style={{ background: "rgba(0,255,136,0.04)", border: "1px solid rgba(0,255,136,0.1)", borderRadius: 10, padding: "1.25rem", textAlign: "center" }}>
              <div style={{ fontFamily: "'Space Mono', monospace", fontSize: "1.8rem", fontWeight: 700, color: "#00ff88", lineHeight: 1 }}>{val}</div>
              <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 13, color: "#fff", marginTop: "0.4rem", fontWeight: 600 }}>{label}</div>
              <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 12, color: "rgba(255,255,255,0.4)" }}>{sub}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Problem() {
  const items = [
    { icon: "💸", title: "Ad Spend Drained", desc: "Bots click your paid ads, burn your budget, and never convert. Google and Meta won't catch all of it — their incentive is your spend." },
    { icon: "🖥️", title: "Hosting Costs Inflated", desc: "Fake traffic drives up your server bills, CDN costs, and compute usage every single month — invisibly." },
    { icon: "🪑", title: "SaaS Seats Consumed", desc: "Fake signups eat your trial limits and plan quotas, blocking real customers and warping your funnel metrics." },
    { icon: "🗑️", title: "CRM Poisoned", desc: "Fake leads flood your pipeline. Your sales team chases ghosts. Your cost-per-lead looks broken." },
    { icon: "📊", title: "Analytics Destroyed", desc: "Bots tank your conversion rate, inflate bounce rates, and make a healthy funnel look like it's failing." },
    { icon: "🔁", title: "It Never Stops", desc: "Bots evolve constantly. Without ongoing monitoring, new attack vectors open every month while you're looking elsewhere." },
  ];

  return (
    <section id="problem" style={{ padding: "100px 2rem" }}>
      <div style={{ maxWidth: 1100, margin: "0 auto" }}>
        <div style={{ textAlign: "center", marginBottom: "4rem" }}>
          <div style={{ fontFamily: "'Space Mono', monospace", fontSize: 11, color: "#ff6666", letterSpacing: "2px", marginBottom: "1rem" }}>THE PROBLEM</div>
          <h2 style={{ fontFamily: "'Syne', sans-serif", fontSize: "clamp(2rem, 4vw, 3rem)", fontWeight: 900, color: "#fff", letterSpacing: "-1px" }}>
            Bots Are Costing You<br />More Than You Think</h2>
          <p style={{ fontFamily: "'DM Sans', sans-serif", color: "rgba(255,255,255,0.4)", marginTop: "1rem", maxWidth: 500, margin: "1rem auto 0" }}>It's not just ad spend. Every system bots touch has a cost.</p>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: "1.5rem" }}>
          {items.map(({ icon, title, desc }) => (
            <div key={title} style={{
              background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.06)",
              borderRadius: 12, padding: "1.75rem", transition: "all 0.2s", cursor: "default",
            }}
              onMouseEnter={e => { e.currentTarget.style.background = "rgba(255,50,50,0.04)"; e.currentTarget.style.borderColor = "rgba(255,80,80,0.2)"; }}
              onMouseLeave={e => { e.currentTarget.style.background = "rgba(255,255,255,0.02)"; e.currentTarget.style.borderColor = "rgba(255,255,255,0.06)"; }}
            >
              <div style={{ fontSize: 28, marginBottom: "0.75rem" }}>{icon}</div>
              <div style={{ fontFamily: "'Syne', sans-serif", fontSize: "1.05rem", fontWeight: 700, color: "#fff", marginBottom: "0.5rem" }}>{title}</div>
              <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 14, color: "rgba(255,255,255,0.5)", lineHeight: 1.7 }}>{desc}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function HowItWorks() {
  const steps = [
    { num: "01", title: "Purchase a Plan", desc: "60-second checkout. No calls, no contracts, no waiting. Stripe handles everything securely." },
    { num: "02", title: "We Scan Your Traffic", desc: "Our engine analyzes your sessions, fingerprints bot behavior, checks exposed endpoints, and cross-references known bad actors." },
    { num: "03", title: "You Get the Report", desc: "A full PDF lands in your inbox — who, what, where, how, and exactly what it's costing you across every channel." },
    { num: "04", title: "You Get the Fix", desc: "Block rules, ad platform settings, and step-by-step instructions. You implement it in an afternoon." },
  ];

  return (
    <section id="how-it-works" style={{ padding: "100px 2rem", background: "rgba(255,255,255,0.01)", borderTop: "1px solid rgba(255,255,255,0.05)", borderBottom: "1px solid rgba(255,255,255,0.05)" }}>
      <div style={{ maxWidth: 1000, margin: "0 auto" }}>
        <div style={{ textAlign: "center", marginBottom: "4rem" }}>
          <div style={{ fontFamily: "'Space Mono', monospace", fontSize: 11, color: "#00ff88", letterSpacing: "2px", marginBottom: "1rem" }}>HOW IT WORKS</div>
          <h2 style={{ fontFamily: "'Syne', sans-serif", fontSize: "clamp(2rem, 4vw, 3rem)", fontWeight: 900, color: "#fff", letterSpacing: "-1px" }}>Pay. Scan. Fix. Done.</h2>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: "2rem", position: "relative" }}>
          {steps.map(({ num, title, desc }, i) => (
            <div key={num} style={{ position: "relative" }}>
              {i < steps.length - 1 && (
                <div style={{ position: "absolute", top: 28, left: "calc(100% - 10px)", width: "20px", height: 1, background: "rgba(0,255,136,0.2)", zIndex: 1, display: "none" }} className="step-arrow" />
              )}
              <div style={{ fontFamily: "'Space Mono', monospace", fontSize: "3rem", fontWeight: 700, color: "rgba(0,255,136,0.1)", lineHeight: 1, marginBottom: "1rem" }}>{num}</div>
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
  const scanROI = monthly > 0 ? Math.round(monthly / 99) : 0;

  return (
    <section style={{ padding: "100px 2rem" }}>
      <div style={{ maxWidth: 700, margin: "0 auto", textAlign: "center" }}>
        <div style={{ fontFamily: "'Space Mono', monospace", fontSize: 11, color: "#00ff88", letterSpacing: "2px", marginBottom: "1rem" }}>WASTE CALCULATOR</div>
        <h2 style={{ fontFamily: "'Syne', sans-serif", fontSize: "clamp(2rem, 4vw, 3rem)", fontWeight: 900, color: "#fff", letterSpacing: "-1px", marginBottom: "0.75rem" }}>
          How Much Are You Losing?
        </h2>
        <p style={{ fontFamily: "'DM Sans', sans-serif", color: "rgba(255,255,255,0.5)", marginBottom: "3rem", fontSize: 15 }}>
          Based on the industry average of 23% invalid traffic across paid campaigns.
        </p>

        <div style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.08)", borderRadius: 16, padding: "2.5rem" }}>
          <div style={{ marginBottom: "2rem" }}>
            <label style={{ fontFamily: "'Space Mono', monospace", fontSize: 12, color: "rgba(255,255,255,0.5)", display: "block", marginBottom: "1rem" }}>
              DAILY AD SPEND: <span style={{ color: "#00ff88" }}>${spend.toLocaleString()}</span>
            </label>
            <input type="range" min="100" max="50000" step="100" value={spend} onChange={e => setSpend(Number(e.target.value))}
              style={{ width: "100%", accentColor: "#00ff88", cursor: "pointer" }} />
            <div style={{ display: "flex", justifyContent: "space-between", fontFamily: "'Space Mono', monospace", fontSize: 11, color: "rgba(255,255,255,0.3)", marginTop: "0.5rem" }}>
              <span>$100/day</span><span>$50,000/day</span>
            </div>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem", marginBottom: "1rem" }}>
            {[
              { label: "EST. DAILY WASTE", val: `$${waste.toLocaleString()}`, color: "#ff4466" },
              { label: "EST. MONTHLY WASTE", val: `$${monthly.toLocaleString()}`, color: "#ff4466" },
            ].map(({ label, val, color }) => (
              <div key={label} style={{ background: "rgba(255,0,80,0.08)", border: "1px solid rgba(255,0,80,0.2)", borderRadius: 10, padding: "1.25rem" }}>
                <div style={{ fontFamily: "'Space Mono', monospace", fontSize: 10, color: "rgba(255,100,100,0.8)", marginBottom: "0.5rem" }}>{label}</div>
                <div style={{ fontFamily: "'Syne', sans-serif", fontSize: "2rem", fontWeight: 900, color }}>{val}</div>
              </div>
            ))}
          </div>

          <div style={{ padding: "1rem", background: "rgba(0,255,136,0.05)", border: "1px solid rgba(0,255,136,0.15)", borderRadius: 10, marginBottom: "1.5rem" }}>
            <div style={{ fontFamily: "'Space Mono', monospace", fontSize: 13, color: "#00ff88", fontWeight: 700 }}>
              A $99 Quick Scan has a {scanROI}x ROI if we find your waste.
            </div>
          </div>

          <a href={STRIPE.quickScan} target="_blank" rel="noopener noreferrer" style={{
            display: "block", background: "#00ff88", color: "#000", padding: "16px", borderRadius: 8,
            fontSize: 14, fontWeight: 800, textDecoration: "none", fontFamily: "'Space Mono', monospace",
            transition: "all 0.2s",
          }}
            onMouseEnter={e => { e.currentTarget.style.background = "#00ffaa"; e.currentTarget.style.boxShadow = "0 8px 30px rgba(0,255,136,0.3)"; }}
            onMouseLeave={e => { e.currentTarget.style.background = "#00ff88"; e.currentTarget.style.boxShadow = "none"; }}
          >Stop the Bleed — Run a Quick Scan for $99 →</a>
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
      tagColor: null,
      desc: "Find out if you have a problem and exactly what it's costing you. Automated, instant, no setup.",
      features: [
        "Fully automated scan",
        "Bot traffic detection",
        "Estimated daily & monthly waste",
        "Risk score (0–100)",
        "PDF report to your inbox",
        "Results in under 10 minutes",
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
      tagColor: "#00ff88",
      desc: "30 days of monitoring. The full picture — where, who, how, what it costs, and exactly how to fix it.",
      features: [
        "Everything in Quick Scan",
        "30-day monitoring period",
        "Bot origin & fingerprint report",
        "Waste breakdown: ads, hosting, ops",
        "Step-by-step remediation guide",
        "Specific block rules to implement",
        "Ad platform settings & fixes",
        "Full PDF audit report",
      ],
      cta: "Get My Full Audit",
      href: STRIPE.revenueAudit,
      highlight: true,
    },
    {
      name: "Revenue Shield",
      price: "$497",
      period: "/month",
      tag: "3rd Month Free",
      tagColor: "#ffcc00",
      desc: "Your always-on revenue bodyguard. Never think about bots again.",
      features: [
        "Everything in Revenue Audit",
        "Continuous 24/7 monitoring",
        "Monthly reports, auto-delivered",
        "Unlimited on-demand scans",
        "Real-time threat alerts",
        "Block rules updated as bots evolve",
        "Priority support",
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
          <h2 style={{ fontFamily: "'Syne', sans-serif", fontSize: "clamp(2rem, 4vw, 3rem)", fontWeight: 900, color: "#fff", letterSpacing: "-1px" }}>
            Stop the Bleed Today
          </h2>
          <p style={{ fontFamily: "'DM Sans', sans-serif", color: "rgba(255,255,255,0.4)", marginTop: "0.75rem" }}>No contracts. No setup fees. No waiting. Cancel anytime.</p>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: "1.5rem", alignItems: "start" }}>
          {plans.map(({ name, price, period, tag, tagColor, desc, features, cta, href, highlight }) => (
            <div key={name} style={{
              background: highlight ? "rgba(0,255,136,0.04)" : "rgba(255,255,255,0.02)",
              border: highlight ? "1px solid rgba(0,255,136,0.3)" : "1px solid rgba(255,255,255,0.07)",
              borderRadius: 16, padding: "2rem", position: "relative",
              transform: highlight ? "scale(1.02)" : "scale(1)",
              boxShadow: highlight ? "0 0 60px rgba(0,255,136,0.08)" : "none",
            }}>
              {tag && (
                <div style={{
                  position: "absolute", top: -13, left: "50%", transform: "translateX(-50%)",
                  background: tagColor, color: "#000", padding: "4px 16px", borderRadius: 100,
                  fontFamily: "'Space Mono', monospace", fontSize: 11, fontWeight: 700, whiteSpace: "nowrap",
                }}>{tag}</div>
              )}
              <div style={{ fontFamily: "'Space Mono', monospace", fontSize: 11, color: "rgba(255,255,255,0.4)", marginBottom: "0.5rem", letterSpacing: "1px" }}>{name.toUpperCase()}</div>
              <div style={{ display: "flex", alignItems: "baseline", gap: 4, marginBottom: "0.75rem" }}>
                <span style={{ fontFamily: "'Syne', sans-serif", fontSize: "2.8rem", fontWeight: 900, color: "#fff", lineHeight: 1 }}>{price}</span>
                <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 13, color: "rgba(255,255,255,0.4)" }}>{period}</span>
              </div>
              <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 14, color: "rgba(255,255,255,0.5)", lineHeight: 1.7, marginBottom: "1.5rem", minHeight: 60 }}>{desc}</p>
              <ul style={{ listStyle: "none", padding: 0, margin: "0 0 2rem", display: "flex", flexDirection: "column", gap: "0.6rem" }}>
                {features.map(f => (
                  <li key={f} style={{ display: "flex", gap: 10, alignItems: "flex-start" }}>
                    <span style={{ color: "#00ff88", flexShrink: 0, marginTop: 2, fontSize: 12 }}>✓</span>
                    <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 14, color: "rgba(255,255,255,0.6)" }}>{f}</span>
                  </li>
                ))}
              </ul>
              <a href={href} target="_blank" rel="noopener noreferrer" style={{
                display: "block", textAlign: "center",
                background: highlight ? "#00ff88" : "rgba(255,255,255,0.07)",
                color: highlight ? "#000" : "#fff",
                padding: "14px", borderRadius: 8,
                fontSize: 14, fontWeight: 700, textDecoration: "none",
                fontFamily: "'Space Mono', monospace",
                border: highlight ? "none" : "1px solid rgba(255,255,255,0.1)",
                transition: "all 0.2s",
              }}
                onMouseEnter={e => { e.currentTarget.style.transform = "translateY(-2px)"; e.currentTarget.style.boxShadow = highlight ? "0 8px 30px rgba(0,255,136,0.3)" : "0 4px 20px rgba(0,0,0,0.3)"; if (!highlight) e.currentTarget.style.background = "rgba(255,255,255,0.12)"; }}
                onMouseLeave={e => { e.currentTarget.style.transform = "translateY(0)"; e.currentTarget.style.boxShadow = "none"; if (!highlight) e.currentTarget.style.background = "rgba(255,255,255,0.07)"; }}
              >{cta} →</a>
            </div>
          ))}
        </div>

        {/* Guarantee */}
        <div style={{ textAlign: "center", marginTop: "3rem", padding: "1.5rem", background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.06)", borderRadius: 12 }}>
          <div style={{ fontFamily: "'Space Mono', monospace", fontSize: 13, color: "rgba(255,255,255,0.6)" }}>
            🔒 <strong style={{ color: "#fff" }}>Delivery Guarantee</strong> — If you don't receive your report within 24 hours, we'll make it right. Email <a href="mailto:info@botguardpro.com" style={{ color: "#00ff88" }}>info@botguardpro.com</a>
          </div>
        </div>
      </div>
    </section>
  );
}

function FAQ() {
  const [open, setOpen] = useState(null);
  const items = [
    { q: "How fast do I get my Quick Scan report?", a: "The scan runs automatically the moment your payment clears. Your PDF report is emailed within minutes — no manual steps, no waiting on a human." },
    { q: "What do I need to provide?", a: "Just your website URL and email address at checkout. No code installs, no API keys, no technical setup whatsoever." },
    { q: "What if I don't run paid ads?", a: "Bots still cost you. Fake signups consume SaaS limits. Bot crawlers inflate hosting bills. Fake form submissions pollute your CRM. The scan covers all of it." },
    { q: "Is the Revenue Audit a subscription?", a: "No. $297 is a one-time payment for a 30-day monitoring period plus a full remediation report. No auto-renewal, no hidden charges." },
    { q: "How does the 3rd month free work on Revenue Shield?", a: "You pay month 1 ($497) and month 2 ($497). Month 3 is automatically free — no coupon needed, no hoops to jump through. Month 4 resumes normal billing." },
    { q: "Can I cancel Revenue Shield anytime?", a: "Yes. Email info@botguardpro.com and we'll cancel same day. No fees, no questions, no retention tactics." },
    { q: "What if my scan shows no bot traffic?", a: "That's a win. You now have documented proof your traffic is clean — useful for investor decks, agency reviews, and your own peace of mind." },
    { q: "How is this different from what Google Ads already does?", a: "Google's invalid click protection only covers their own network and has a financial incentive to not be too aggressive. We analyze your full traffic stack — all sources, all channels, all costs — independently." },
  ];

  return (
    <section id="faq" style={{ padding: "100px 2rem", background: "rgba(255,255,255,0.01)", borderTop: "1px solid rgba(255,255,255,0.05)" }}>
      <div style={{ maxWidth: 750, margin: "0 auto" }}>
        <div style={{ textAlign: "center", marginBottom: "4rem" }}>
          <div style={{ fontFamily: "'Space Mono', monospace", fontSize: 11, color: "#00ff88", letterSpacing: "2px", marginBottom: "1rem" }}>FAQ</div>
          <h2 style={{ fontFamily: "'Syne', sans-serif", fontSize: "clamp(2rem, 4vw, 3rem)", fontWeight: 900, color: "#fff", letterSpacing: "-1px" }}>Common Questions</h2>
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
          {items.map(({ q, a }, i) => (
            <div key={i} style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.07)", borderRadius: 10, overflow: "hidden", transition: "border-color 0.2s" }}>
              <button onClick={() => setOpen(open === i ? null : i)} style={{
                width: "100%", textAlign: "left", padding: "1.25rem 1.5rem", background: "none", border: "none", cursor: "pointer",
                display: "flex", justifyContent: "space-between", alignItems: "center", gap: "1rem",
              }}>
                <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 15, fontWeight: 600, color: "#fff" }}>{q}</span>
                <span style={{ color: "#00ff88", fontSize: 20, flexShrink: 0, transition: "transform 0.2s", transform: open === i ? "rotate(45deg)" : "rotate(0)" }}>+</span>
              </button>
              {open === i && (
                <div style={{ padding: "0 1.5rem 1.25rem", fontFamily: "'DM Sans', sans-serif", fontSize: 14, color: "rgba(255,255,255,0.55)", lineHeight: 1.7 }}>{a}</div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function FinalCTA() {
  return (
    <section style={{ padding: "100px 2rem", textAlign: "center", position: "relative", overflow: "hidden" }}>
      <div style={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%,-50%)", width: 800, height: 500, background: "radial-gradient(ellipse, rgba(0,255,136,0.07) 0%, transparent 70%)" }} />
      <div style={{ position: "relative", maxWidth: 700, margin: "0 auto" }}>
        <div style={{ fontFamily: "'Space Mono', monospace", fontSize: 11, color: "#ff6666", letterSpacing: "2px", marginBottom: "1.5rem" }}>RIGHT NOW, WHILE YOU'RE READING THIS</div>
        <h2 style={{ fontFamily: "'Syne', sans-serif", fontSize: "clamp(2rem, 5vw, 3.5rem)", fontWeight: 900, color: "#fff", letterSpacing: "-1.5px", marginBottom: "1rem" }}>
          Bots Are Clicking<br />Your Ads.
        </h2>
        <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 16, color: "rgba(255,255,255,0.5)", marginBottom: "2.5rem", lineHeight: 1.7 }}>
          Every hour you wait is money gone. A $99 Quick Scan takes 10 minutes and pays for itself the moment we find your first wasted session.
        </p>
        <a href={STRIPE.quickScan} target="_blank" rel="noopener noreferrer" style={{
          display: "inline-block", background: "#00ff88", color: "#000",
          padding: "20px 48px", borderRadius: 8,
          fontSize: 16, fontWeight: 800, textDecoration: "none", fontFamily: "'Space Mono', monospace",
          transition: "all 0.2s", boxShadow: "0 0 60px rgba(0,255,136,0.2)",
        }}
          onMouseEnter={e => { e.currentTarget.style.background = "#00ffaa"; e.currentTarget.style.transform = "translateY(-3px)"; e.currentTarget.style.boxShadow = "0 12px 60px rgba(0,255,136,0.4)"; }}
          onMouseLeave={e => { e.currentTarget.style.background = "#00ff88"; e.currentTarget.style.transform = "translateY(0)"; e.currentTarget.style.boxShadow = "0 0 60px rgba(0,255,136,0.2)"; }}
        >
          🔍 Find My Leaks for $99 →
        </a>
        <div style={{ marginTop: "1.5rem", fontFamily: "'DM Sans', sans-serif", fontSize: 13, color: "rgba(255,255,255,0.3)" }}>
          Automated report • No setup • Results in minutes
        </div>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer style={{ borderTop: "1px solid rgba(255,255,255,0.06)", padding: "3rem 2rem 2rem" }}>
      <div style={{ maxWidth: 1100, margin: "0 auto" }}>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: "2rem", marginBottom: "2rem" }}>
          <div>
            <a href="/" style={{ display: "flex", alignItems: "center", gap: 10, textDecoration: "none", marginBottom: "1rem" }}>
              <Logo size={32} />
              <div>
                <div style={{ fontFamily: "'Space Mono', monospace", fontWeight: 700, color: "#fff", fontSize: 14 }}>BotGuard<span style={{ color: "#00ff88" }}>Pro</span></div>
                <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 10, color: "rgba(255,255,255,0.3)", letterSpacing: "1px" }}>REVENUE INTEGRITY</div>
              </div>
            </a>
            <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 13, color: "rgba(255,255,255,0.35)", lineHeight: 1.7 }}>
              Bot traffic detection and revenue protection for businesses spending on paid acquisition.
            </p>
          </div>
          <div>
            <div style={{ fontFamily: "'Space Mono', monospace", fontSize: 11, color: "rgba(255,255,255,0.4)", letterSpacing: "1px", marginBottom: "1rem" }}>PLANS</div>
            {[["Quick Scan — $99", STRIPE.quickScan], ["Revenue Audit — $297", STRIPE.revenueAudit], ["Revenue Shield — $497/mo", STRIPE.revenueShield]].map(([label, href]) => (
              <a key={label} href={href} target="_blank" rel="noopener noreferrer" style={{ display: "block", fontFamily: "'DM Sans', sans-serif", fontSize: 13, color: "rgba(255,255,255,0.45)", textDecoration: "none", marginBottom: "0.5rem", transition: "color 0.2s" }}
                onMouseEnter={e => e.target.style.color = "#00ff88"}
                onMouseLeave={e => e.target.style.color = "rgba(255,255,255,0.45)"}
              >{label}</a>
            ))}
          </div>
          <div>
            <div style={{ fontFamily: "'Space Mono', monospace", fontSize: 11, color: "rgba(255,255,255,0.4)", letterSpacing: "1px", marginBottom: "1rem" }}>LEGAL</div>
            {[["Privacy Policy", "/privacy.html"], ["Terms of Service", "/terms.html"], ["Cookie Policy", "/cookies.html"], ["Contact", "/contact.html"]].map(([label, href]) => (
              <a key={label} href={href} style={{ display: "block", fontFamily: "'DM Sans', sans-serif", fontSize: 13, color: "rgba(255,255,255,0.45)", textDecoration: "none", marginBottom: "0.5rem", transition: "color 0.2s" }}
                onMouseEnter={e => e.target.style.color = "#00ff88"}
                onMouseLeave={e => e.target.style.color = "rgba(255,255,255,0.45)"}
              >{label}</a>
            ))}
          </div>
          <div>
            <div style={{ fontFamily: "'Space Mono', monospace", fontSize: 11, color: "rgba(255,255,255,0.4)", letterSpacing: "1px", marginBottom: "1rem" }}>CONTACT</div>
            <a href="mailto:info@botguardpro.com" style={{ fontFamily: "'Space Mono', monospace", fontSize: 12, color: "#00ff88", textDecoration: "none" }}>info@botguardpro.com</a>
            <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 12, color: "rgba(255,255,255,0.3)", marginTop: "0.5rem", lineHeight: 1.6 }}>
              Support response<br />within 24 hours
            </div>
          </div>
        </div>
        <div style={{ borderTop: "1px solid rgba(255,255,255,0.05)", paddingTop: "1.5rem", display: "flex", justifyContent: "space-between", flexWrap: "wrap", gap: "1rem" }}>
          <div style={{ fontFamily: "'Space Mono', monospace", fontSize: 11, color: "rgba(255,255,255,0.25)" }}>© 2025 BotGuardPro. All rights reserved.</div>
          <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 12, color: "rgba(255,255,255,0.25)" }}>Payments secured by Stripe · Hosted on Cloudflare</div>
        </div>
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
        input[type=range]::-webkit-slider-thumb { -webkit-appearance: none; width: 20px; height: 20px; border-radius: 50%; background: #00ff88; cursor: pointer; box-shadow: 0 0 12px rgba(0,255,136,0.5); }
        @keyframes pulse { 0%,100% { opacity:1; transform:scale(1); } 50% { opacity:0.6; transform:scale(1.3); } }
        @keyframes fadeInDown { from { opacity:0; transform:translateY(-20px); } to { opacity:1; transform:translateY(0); } }
        @keyframes fadeInUp { from { opacity:0; transform:translateY(20px); } to { opacity:1; transform:translateY(0); } }
        @keyframes slideIn { from { opacity:0; transform:translateX(-10px); } to { opacity:1; transform:translateX(0); } }
        @media (max-width: 768px) { .desktop-nav { display: none !important; } }
      `}</style>
      <Nav />
      <Hero />
      <StatsBar />
      <SocialProof />
      <Problem />
      <HowItWorks />
      <Calculator />
      <Pricing />
      <FAQ />
      <FinalCTA />
      <Footer />
    </>
  );
}




