import { useState } from "react";

/* ─────────────────────────────────────────────
   DASHBOARD SUBCOMPONENTS
───────────────────────────────────────────── */

function MiniBar({ pct, color }) {
  return (
    <div style={{ width: "100%", height: "6px", background: "#0d1525", borderRadius: "3px" }}>
      <div style={{ width: `${pct}%`, height: "6px", background: color, borderRadius: "3px" }} />
    </div>
  );
}

function SparkLine({ data, color, width = 120, height = 32 }) {
  const max = Math.max(...data);
  const min = Math.min(...data);
  const range = max - min || 1;
  const points = data
    .map((v, i) => {
      const x = (i / (data.length - 1)) * width;
      const y = height - ((v - min) / range) * (height - 4) - 2;
      return `${x},${y}`;
    })
    .join(" ");
  return (
    <svg width={width} height={height} style={{ display: "block" }}>
      <polyline points={points} fill="none" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

/* ─────────────────────────────────────────────
   MOCK DASHBOARD
───────────────────────────────────────────── */

function Dashboard() {
  const sessions = [
    { id: "sess_8f2a1d", ip: "198.51.●●.23", score: 12, status: "Blocked", signals: "Headless UA, No mouse events, 2ms click delta", geo: "Ashburn, VA" },
    { id: "sess_3c9e7b", ip: "203.0.●●.91", score: 34, status: "Flagged", signals: "Datacenter IP, Linear scroll, Cookie reject", geo: "Frankfurt, DE" },
    { id: "sess_a14f82", ip: "192.0.●●.44", score: 87, status: "Passed", signals: "—", geo: "Brooklyn, NY" },
    { id: "sess_6d0b3e", ip: "198.51.●●.67", score: 8, status: "Blocked", signals: "Phantom JS, Zero viewport resize, Replay detected", geo: "Singapore, SG" },
    { id: "sess_f72c19", ip: "203.0.●●.15", score: 91, status: "Passed", signals: "—", geo: "Austin, TX" },
    { id: "sess_2e8a4c", ip: "198.51.●●.88", score: 21, status: "Blocked", signals: "Headless Chrome, Uniform timing, No scroll jitter", geo: "Mumbai, IN" },
  ];

  const trafficTrend = [42, 38, 45, 51, 47, 53, 48, 55, 62, 58, 64, 61, 68, 72, 65];
  const botTrend = [18, 22, 19, 25, 21, 28, 24, 31, 27, 33, 29, 35, 32, 38, 34];

  const statusColor = (st) => st === "Blocked" ? "#ef4444" : st === "Flagged" ? "#f59e0b" : "#22c55e";
  const scoreColor = (sc) => sc <= 30 ? "#ef4444" : sc <= 60 ? "#f59e0b" : "#22c55e";

  return (
    <div style={d.wrap}>
      <div style={d.topBar}>
        <div style={d.topLeft}>
          <span style={{ color: "#1f6feb", fontSize: "16px" }}>⬡</span>
          <span style={{ fontWeight: 700, color: "#e8ecf2", fontSize: "14px" }}>BotGuard Pro</span>
          <span style={d.envBadge}>Production</span>
        </div>
        <div style={d.topRight}>
          <span style={d.liveDot} />
          <span style={{ fontSize: "12px", color: "#22c55e", fontWeight: 600 }}>Live Monitoring</span>
          <span style={{ fontSize: "11px", color: "#5a6478" }}>Feb 17, 2026 · 14:32 UTC</span>
        </div>
      </div>

      <div style={d.kpiRow}>
        <div style={d.kpi}>
          <div style={d.kpiLabel}>Total Sessions (24h)</div>
          <div style={d.kpiVal}>14,832</div>
          <SparkLine data={trafficTrend} color="#5b9cf6" width={100} height={28} />
        </div>
        <div style={d.kpi}>
          <div style={d.kpiLabel}>Bot Sessions Blocked</div>
          <div style={{ ...d.kpiVal, color: "#ef4444" }}>3,241</div>
          <SparkLine data={botTrend} color="#ef4444" width={100} height={28} />
        </div>
        <div style={d.kpi}>
          <div style={d.kpiLabel}>Human Verification Rate</div>
          <div style={{ ...d.kpiVal, color: "#22c55e" }}>78.2%</div>
          <MiniBar pct={78.2} color="#22c55e" />
        </div>
        <div style={d.kpi}>
          <div style={d.kpiLabel}>Est. Revenue Protected</div>
          <div style={{ ...d.kpiVal, color: "#5b9cf6" }}>$42,180</div>
          <MiniBar pct={65} color="#5b9cf6" />
        </div>
      </div>

      <div style={d.main}>
        <div style={d.tableArea}>
          <div style={d.secHead}>
            <span style={d.secTitle}>Detection Log</span>
            <span style={{ fontSize: "11px", color: "#4a5568" }}>Last 6 sessions</span>
          </div>
          <div style={{ overflowX: "auto" }}>
            <table style={d.table}>
              <thead>
                <tr>
                  {["Session", "Origin IP", "Geo", "Score", "Status", "Signals"].map((h) => (
                    <th key={h} style={d.th}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {sessions.map((se, i) => (
                  <tr key={i} style={{ background: i % 2 === 0 ? "#0a0f1a" : "#0c1220" }}>
                    <td style={d.td}><code style={d.mono}>{se.id}</code></td>
                    <td style={d.td}><code style={d.mono}>{se.ip}</code></td>
                    <td style={d.td}>{se.geo}</td>
                    <td style={d.td}>
                      <span style={{ fontWeight: 700, fontFamily: "'JetBrains Mono', monospace", fontSize: "12px", color: scoreColor(se.score) }}>{se.score}</span>
                    </td>
                    <td style={d.td}>
                      <span style={{
                        display: "inline-block", padding: "2px 8px", borderRadius: "3px",
                        fontSize: "10px", fontWeight: 700, letterSpacing: "0.3px", textTransform: "uppercase",
                        background: `${statusColor(se.status)}18`, color: statusColor(se.status),
                        border: `1px solid ${statusColor(se.status)}33`
                      }}>{se.status}</span>
                    </td>
                    <td style={{ ...d.td, fontSize: "11px", color: "#5a6478", maxWidth: "220px" }}>{se.signals}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div style={d.sidebar}>
          <div style={d.sideCard}>
            <div style={d.secTitle}>Traffic Split (24h)</div>
            <div style={{ display: "flex", height: "8px", borderRadius: "4px", overflow: "hidden", margin: "12px 0 10px", gap: "2px" }}>
              <div style={{ width: "78%", height: "8px", background: "#22c55e", borderRadius: "4px 0 0 4px" }} />
              <div style={{ width: "14%", height: "8px", background: "#ef4444" }} />
              <div style={{ width: "8%", height: "8px", background: "#f59e0b", borderRadius: "0 4px 4px 0" }} />
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: "4px", marginTop: "6px" }}>
              {[["#22c55e", "Human 78%"], ["#ef4444", "Bot 14%"], ["#f59e0b", "Suspicious 8%"]].map(([c, t]) => (
                <div key={t} style={{ display: "flex", alignItems: "center", gap: "6px", fontSize: "11px", color: "#7a8599" }}>
                  <span style={{ width: "7px", height: "7px", borderRadius: "50%", background: c, flexShrink: 0 }} />
                  {t}
                </div>
              ))}
            </div>
          </div>

          <div style={d.sideCard}>
            <div style={d.secTitle}>Revenue Exposure</div>
            {[
              { ch: "Google Ads", risk: "$18,400", pct: 82 },
              { ch: "Meta Ads", risk: "$12,100", pct: 54 },
              { ch: "Organic", risk: "$4,200", pct: 19 },
              { ch: "Direct", risk: "$2,880", pct: 13 },
            ].map((c, i) => (
              <div key={i} style={{ marginTop: "12px" }}>
                <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "5px" }}>
                  <span style={{ fontSize: "12px", color: "#a0a8b8" }}>{c.ch}</span>
                  <span style={{ fontSize: "12px", fontWeight: 700, color: "#e8ecf2" }}>{c.risk}</span>
                </div>
                <MiniBar pct={c.pct} color={c.pct > 50 ? "#ef4444" : c.pct > 30 ? "#f59e0b" : "#5b9cf6"} />
              </div>
            ))}
          </div>

          <div style={d.sideCard}>
            <div style={d.secTitle}>Top Triggered Rules</div>
            {[
              { rule: "Headless Browser UA", hits: 1847 },
              { rule: "Datacenter IP Range", hits: 982 },
              { rule: "Zero Mouse Movement", hits: 744 },
              { rule: "Click Timing < 5ms", hits: 631 },
            ].map((r, i) => (
              <div key={i} style={{ display: "flex", justifyContent: "space-between", padding: "8px 0", borderBottom: "1px solid #0f1626" }}>
                <span style={{ fontSize: "12px", color: "#8892a4" }}>{r.rule}</span>
                <span style={{ fontSize: "12px", fontWeight: 700, color: "#e8ecf2", fontFamily: "'JetBrains Mono', monospace" }}>{r.hits.toLocaleString()}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

const d = {
  wrap: { background: "#080c14", border: "1px solid #162038", borderRadius: "12px", overflow: "hidden", fontFamily: "'Inter', system-ui, sans-serif", fontSize: "13px", color: "#a0a8b8" },
  topBar: { display: "flex", justifyContent: "space-between", alignItems: "center", padding: "14px 20px", borderBottom: "1px solid #162038", background: "#0a0f1a", flexWrap: "wrap", gap: "10px" },
  topLeft: { display: "flex", alignItems: "center", gap: "10px" },
  topRight: { display: "flex", alignItems: "center", gap: "10px" },
  envBadge: { fontSize: "10px", fontWeight: 600, letterSpacing: "0.5px", textTransform: "uppercase", padding: "2px 8px", background: "#22c55e18", color: "#22c55e", border: "1px solid #22c55e33", borderRadius: "3px" },
  liveDot: { width: "7px", height: "7px", borderRadius: "50%", background: "#22c55e", boxShadow: "0 0 6px #22c55e88" },
  kpiRow: { display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "1px", background: "#162038" },
  kpi: { background: "#0a0f1a", padding: "18px 20px", display: "flex", flexDirection: "column", gap: "6px" },
  kpiLabel: { fontSize: "11px", color: "#5a6478", textTransform: "uppercase", letterSpacing: "0.5px", fontWeight: 600 },
  kpiVal: { fontSize: "24px", fontWeight: 700, color: "#e8ecf2" },
  main: { display: "grid", gridTemplateColumns: "1fr 300px", gap: "1px", background: "#162038" },
  tableArea: { background: "#0a0f1a", padding: "20px", overflow: "hidden" },
  secHead: { display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "14px" },
  secTitle: { fontWeight: 700, color: "#c8cdd6", fontSize: "13px" },
  table: { width: "100%", borderCollapse: "collapse", fontSize: "12px" },
  th: { textAlign: "left", padding: "8px 10px", fontSize: "10px", fontWeight: 600, color: "#4a5568", textTransform: "uppercase", letterSpacing: "0.5px", borderBottom: "1px solid #162038" },
  td: { padding: "9px 10px", borderBottom: "1px solid #0f1626" },
  mono: { fontFamily: "'JetBrains Mono', 'SF Mono', monospace", fontSize: "11px", color: "#7a8599" },
  sidebar: { background: "#0a0f1a", display: "flex", flexDirection: "column" },
  sideCard: { padding: "18px 20px", background: "#0a0f1a", borderBottom: "1px solid #162038" },
};

/* ─────────────────────────────────────────────
   LANDING PAGE
───────────────────────────────────────────── */

export default function App() {
  const [faqOpen, setFaqOpen] = useState(null);
  const toggleFaq = (i) => setFaqOpen(faqOpen === i ? null : i);

  const faqs = [
    { q: "How does BotGuard Pro detect automated traffic?", a: "BotGuard Pro uses behavioral signal analysis — evaluating session timing, interaction patterns, header fingerprints, and navigation sequences against known automation signatures. Detection is deterministic, not probabilistic. Every flagged session includes a confidence score and the signals that triggered it." },
    { q: "What data does BotGuard Pro access?", a: "We analyze HTTP request metadata, session behavior patterns, and traffic flow characteristics. We do not access personally identifiable information, stored credentials, or application-layer user data. All analysis operates on traffic signals, not content." },
    { q: "How long does the Revenue Loss Audit take?", a: "Most audits are delivered within 5–7 business days after receiving access to your traffic data. The deliverable is a structured PDF report with a 30-minute walkthrough call to review findings and discuss enforcement recommendations." },
    { q: "What's included in the monthly monitoring service?", a: "Continuous real-time session scoring, a live detection dashboard, weekly summary reports, threshold-based alerting via email or webhook, and a monthly review call. You also get priority access for rule adjustments and custom detection policies." },
    { q: "Can I try it before committing to monthly monitoring?", a: "Yes — the Revenue Loss Audit is designed as a low-commitment entry point. It gives you a clear picture of your exposure before deciding whether ongoing monitoring is justified. Most monitoring clients start with the audit." },
    { q: "What platforms and stacks does BotGuard Pro integrate with?", a: "BotGuard Pro operates at the traffic layer via lightweight middleware or reverse proxy integration. It works with any HTTP-based stack — Node, Python, Go, PHP, .NET — and deploys alongside existing infrastructure without requiring application code changes." },
  ];

  return (
    <div style={s.wrapper}>
      {/* HERO */}
      <section style={s.hero}>
        <div style={s.container}>
          <a href="https://www.botguardpro.com" target="_blank" rel="noopener noreferrer" style={s.heroLogo}>
            <span style={{ color: "#1f6feb", fontSize: "20px" }}>⬡</span>
            <span style={{ fontWeight: 700, color: "#f0f4f8", fontSize: "18px" }}>BotGuard Pro</span>
          </a>
          <div style={s.badge}>Detection-First Security</div>
          <h1 style={s.heroTitle}>Your Revenue Has a<br /><span style={s.accent}>Bot Problem</span></h1>
          <p style={s.heroSub}>
            Automated traffic silently inflates your metrics, drains ad spend,
            and corrupts the data you make decisions on. BotGuard Pro enforces
            session authenticity before it hits your bottom line.
          </p>
          <div style={s.btnRow}>
            <a href="#audit" style={s.btnPrimary}>Start With a Revenue Audit — $1,500</a>
            <a href="#monitoring" style={s.btnSecondary}>Ongoing Monitoring</a>
          </div>
        </div>
      </section>

      {/* PROBLEM */}
      <section style={s.sec}>
        <div style={s.narrow}>
          <h2 style={s.secTitle}>The Cost of Ignoring Bot Traffic</h2>
          <p style={s.body}>
            Industry research estimates that nearly 50% of all internet traffic
            is automated. For businesses running paid acquisition, that means
            a significant share of every ad dollar may be reaching bots, not buyers.
          </p>
          <div style={s.statGrid}>
            {[["~50%", "of web traffic is automated"], ["$84B+", "lost to ad fraud globally per year"], ["1 in 5", "paid clicks may never reach a human"]].map(([n, l]) => (
              <div key={n} style={s.statCard}>
                <div style={s.statNum}>{n}</div>
                <div style={s.statLabel}>{l}</div>
              </div>
            ))}
          </div>
          <p style={{ ...s.body, marginTop: "40px" }}>
            Bot traffic doesn't just waste spend — it poisons your analytics,
            inflates conversion rates, skews A/B tests, and erodes confidence
            in every metric your team relies on.
          </p>
        </div>
      </section>

      {/* CAPABILITIES */}
      <section style={s.secAlt}>
        <div style={s.container}>
          <h2 style={s.secTitle}>How BotGuard Pro Works</h2>
          <div style={s.grid}>
            {[
              { icon: "◉", title: "Behavioral Traffic Scoring", desc: "Every session is scored against behavioral baselines — timing, interaction cadence, navigation depth — before it can affect conversion data." },
              { icon: "⚙", title: "Deterministic Rule Engine", desc: "No black-box ML guessing. Transparent, auditable rules enforce policy at the traffic layer with full signal traceability." },
              { icon: "△", title: "Revenue Exposure Mapping", desc: "Identifies which funnels, campaigns, and entry points carry the highest automation risk so you can prioritize enforcement." },
              { icon: "⊘", title: "Automation Pattern Detection", desc: "Flags scraping, credential stuffing, click fraud, and synthetic sessions using layered signal correlation." },
            ].map((c, i) => (
              <div key={i} style={s.card}>
                <div style={s.cardIcon}>{c.icon}</div>
                <h3 style={s.cardTitle}>{c.title}</h3>
                <p style={s.cardDesc}>{c.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* DASHBOARD */}
      <section style={s.sec}>
        <div style={{ maxWidth: "1100px", margin: "0 auto", padding: "0 24px" }}>
          <h2 style={s.secTitle}>Inside the Detection Engine</h2>
          <p style={{ ...s.body, marginBottom: "40px" }}>
            Real-time session scoring, revenue exposure mapping, and automated
            enforcement — unified in a single operational view.
          </p>
          <Dashboard />
          <p style={{ fontSize: "12px", color: "#4a5568", marginTop: "16px", textAlign: "center" }}>
            Dashboard shown with simulated data for demonstration purposes.
          </p>
        </div>
      </section>

      {/* PRICING */}
      <section id="audit" style={s.secAlt}>
        <div style={s.container}>
          <h2 style={s.secTitle}>Choose Your Engagement</h2>
          <p style={{ ...s.body, marginBottom: "50px" }}>
            Most clients start with the audit to understand their exposure,
            then move to monitoring for continuous protection.
          </p>
          <div style={s.tierRow}>
            <div style={s.tierCard}>
              <div style={s.tierBadge}>Start Here</div>
              <h3 style={s.tierTitle}>Revenue Loss Audit</h3>
              <div style={s.tierPrice}>$1,500</div>
              <div style={s.tierFreq}>one-time engagement</div>
              <div style={s.divider} />
              <h4 style={s.tierSub}>What You Receive</h4>
              <ul style={s.tierList}>
                {["Traffic authenticity analysis across your primary funnels", "Revenue exposure breakdown by channel and campaign", "Conversion distortion assessment with estimated dollar impact", "Prioritized enforcement recommendations"].map((t) => (
                  <li key={t} style={s.tierItem}><span style={s.chk}>✓</span><span>{t}</span></li>
                ))}
              </ul>
              <h4 style={s.tierSub}>Deliverables</h4>
              <ul style={s.tierList}>
                {["Structured PDF report (15–25 pages)", "30-minute walkthrough call to review findings", "Delivered within 5–7 business days"].map((t) => (
                  <li key={t} style={s.tierItem}><span style={s.chk}>✓</span><span>{t}</span></li>
                ))}
              </ul>
              <a href="https://buy.stripe.com/aFa28r050gS42xW2arcfK0e" target="_blank" rel="noopener noreferrer" style={{ ...s.btnPrimary, display: "block", textAlign: "center", marginTop: "30px" }}>Purchase Audit</a>
            </div>

            <div id="monitoring" style={{ ...s.tierCard, borderColor: "#1f6feb" }}>
              <div style={{ ...s.tierBadge, background: "#1f6feb", color: "#fff" }}>Full Protection</div>
              <h3 style={s.tierTitle}>Detection-First Monitoring</h3>
              <div style={s.tierPrice}>$5,000</div>
              <div style={s.tierFreq}>per month</div>
              <div style={s.divider} />
              <h4 style={s.tierSub}>What You Receive</h4>
              <ul style={s.tierList}>
                {["Continuous real-time session scoring across all endpoints", "Live detection dashboard with drill-down analytics", "Threshold-based alerting via email or webhook", "Custom detection rules and policy configuration"].map((t) => (
                  <li key={t} style={s.tierItem}><span style={s.chk}>✓</span><span>{t}</span></li>
                ))}
              </ul>
              <h4 style={s.tierSub}>Includes</h4>
              <ul style={s.tierList}>
                {["Weekly traffic summary reports", "Monthly review call with enforcement analysis", "Priority support and rule adjustments"].map((t) => (
                  <li key={t} style={s.tierItem}><span style={s.chk}>✓</span><span>{t}</span></li>
                ))}
              </ul>
              <a href="https://buy.stripe.com/6oU7sL6to1Xa7Sg6qHcfK0f" target="_blank" rel="noopener noreferrer" style={{ ...s.btnPrimary, display: "block", textAlign: "center", marginTop: "30px" }}>Engage Monitoring</a>
            </div>
          </div>
        </div>
      </section>

      {/* CREDIBILITY */}
      <section style={s.sec}>
        <div style={s.narrow}>
          <h2 style={s.secTitle}>Built by Infrastructure Engineers</h2>
          <p style={s.body}>
            BotGuard Pro is built by Redwine Innovations — with deep
            operational experience across security systems, ML infrastructure,
            and revenue-critical environments. The detection engine is informed
            by real-world automation patterns, not academic models.
          </p>
          <div style={s.credRow}>
            {["Patent-pending detection architecture", "Deterministic, auditable enforcement — no black boxes", "Deploys alongside existing infrastructure in hours, not weeks"].map((t) => (
              <div key={t} style={s.credItem}>
                <div style={{ color: "#1f6feb", fontSize: "14px" }}>⬡</div>
                <div>{t}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section style={s.secAlt}>
        <div style={s.narrow}>
          <h2 style={s.secTitle}>Frequently Asked Questions</h2>
          {faqs.map((faq, i) => (
            <div key={i} style={s.faqItem}>
              <button onClick={() => toggleFaq(i)} style={s.faqQ}>
                <span>{faq.q}</span>
                <span style={{ ...s.faqToggle, transform: faqOpen === i ? "rotate(45deg)" : "rotate(0deg)" }}>+</span>
              </button>
              {faqOpen === i && <div style={s.faqA}>{faq.a}</div>}
            </div>
          ))}
        </div>
      </section>

      {/* CONTACT */}
      <section style={s.sec}>
        <div style={s.narrow}>
          <h2 style={s.secTitle}>Not Ready to Buy?</h2>
          <p style={s.body}>
            If you have questions about scope, integration, or whether BotGuard Pro
            is the right fit for your environment, reach out directly. No sales pitch —
            just a technical conversation.
          </p>
          <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "14px", marginTop: "30px" }}>
            <a href="mailto:info@botguardpro.com" style={s.btnSecondary}>info@botguardpro.com</a>
            <a href="https://www.botguardpro.com" target="_blank" rel="noopener noreferrer" style={s.domainLink}>www.botguardpro.com</a>
          </div>
        </div>
      </section>

      {/* DISCLAIMER */}
      <section style={{ padding: "40px 24px 0", textAlign: "center" }}>
        <div style={s.narrow}>
          <p style={{ fontSize: "12px", color: "#4a5568", lineHeight: 1.7, maxWidth: "640px", margin: "0 auto" }}>
            BotGuard Pro is a detection and analysis tool. Results vary based on traffic
            volume, integration configuration, and environment characteristics.
            Detection outputs are informational and do not constitute guarantees
            against revenue loss, fraud, or data exposure. The Revenue Loss Audit
            provides technical analysis and is not intended as legal or financial advice.
          </p>
        </div>
      </section>

      {/* FOOTER */}
      <footer style={s.footer}>
        <div style={s.footerInner}>
          <div style={{ display: "flex", alignItems: "center", gap: "8px", flexWrap: "wrap" }}>
            <span>© {new Date().getFullYear()} BotGuard Pro · Redwine Innovations</span>
            <span style={{ color: "#2a3448" }}>·</span>
            <a href="https://www.botguardpro.com" target="_blank" rel="noopener noreferrer" style={s.footerLink}>www.botguardpro.com</a>
          </div>
                            <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
  <a href="/terms.html" style={s.footerLink}>Terms of Service</a>
  <span style={{ color: "#2a3448" }}>·</span>
  <a href="/privacy.html" style={s.footerLink}>Privacy Policy</a>
</div>

        </div>
      </footer>
    </div>
  );
}

const s = {
  wrapper: { fontFamily: "'Inter', system-ui, -apple-system, sans-serif", background: "#080c14", color: "#d8dee9", lineHeight: 1.7, overflowX: "hidden" },
  container: { maxWidth: "1100px", margin: "0 auto", padding: "0 24px" },
  narrow: { maxWidth: "760px", margin: "0 auto", padding: "0 24px" },

  hero: { padding: "120px 24px 100px", textAlign: "center", background: "radial-gradient(ellipse at 50% 0%, #0f1a30 0%, #080c14 70%)" },
  heroLogo: { display: "inline-flex", alignItems: "center", gap: "8px", textDecoration: "none", marginBottom: "24px" },
  badge: { display: "inline-block", padding: "6px 16px", fontSize: "12px", fontWeight: 600, letterSpacing: "1.5px", textTransform: "uppercase", color: "#5b9cf6", border: "1px solid #1a3a6a", borderRadius: "20px", marginBottom: "28px" },
  heroTitle: { fontSize: "clamp(36px, 5vw, 56px)", fontWeight: 700, lineHeight: 1.15, marginBottom: "24px", color: "#f0f4f8" },
  accent: { color: "#5b9cf6" },
  heroSub: { fontSize: "18px", maxWidth: "640px", margin: "0 auto 44px", color: "#8892a4" },
  btnRow: { display: "flex", gap: "16px", justifyContent: "center", flexWrap: "wrap" },
  btnPrimary: { padding: "14px 28px", background: "#1f6feb", color: "#fff", textDecoration: "none", fontWeight: 600, borderRadius: "6px", fontSize: "15px", border: "none", cursor: "pointer" },
  btnSecondary: { padding: "14px 28px", border: "1px solid #2a4a7a", color: "#5b9cf6", textDecoration: "none", fontWeight: 600, borderRadius: "6px", fontSize: "15px", background: "transparent", cursor: "pointer" },

  sec: { padding: "100px 24px", textAlign: "center" },
  secAlt: { padding: "100px 24px", background: "#0c1220", textAlign: "center" },
  secTitle: { fontSize: "clamp(26px, 3vw, 34px)", fontWeight: 700, marginBottom: "24px", color: "#f0f4f8" },
  body: { fontSize: "17px", color: "#8892a4", lineHeight: 1.8, textAlign: "center" },

  statGrid: { display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: "24px", marginTop: "50px" },
  statCard: { background: "#0c1220", border: "1px solid #162038", borderRadius: "10px", padding: "32px 20px", textAlign: "center" },
  statNum: { fontSize: "36px", fontWeight: 700, color: "#5b9cf6", marginBottom: "8px" },
  statLabel: { fontSize: "14px", color: "#8892a4" },

  grid: { display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))", gap: "20px", marginTop: "20px" },
  card: { background: "#0a1020", border: "1px solid #162038", borderLeft: "3px solid #1f6feb", borderRadius: "8px", padding: "28px", textAlign: "left" },
  cardIcon: { fontSize: "20px", color: "#5b9cf6", marginBottom: "14px" },
  cardTitle: { fontSize: "17px", fontWeight: 600, marginBottom: "10px", color: "#e8ecf2" },
  cardDesc: { fontSize: "14px", color: "#7a8599", lineHeight: 1.7, margin: 0 },

  tierRow: { display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(340px, 1fr))", gap: "28px", alignItems: "start" },
  tierCard: { background: "#0c1220", border: "1px solid #162038", borderRadius: "10px", padding: "40px 36px", textAlign: "left" },
  tierBadge: { display: "inline-block", padding: "4px 12px", fontSize: "11px", fontWeight: 700, letterSpacing: "1px", textTransform: "uppercase", background: "#162038", color: "#5b9cf6", borderRadius: "4px", marginBottom: "20px" },
  tierTitle: { fontSize: "22px", fontWeight: 700, color: "#f0f4f8", marginBottom: "8px" },
  tierPrice: { fontSize: "38px", fontWeight: 700, color: "#5b9cf6" },
  tierFreq: { fontSize: "14px", color: "#6b7588", marginBottom: "24px" },
  divider: { height: "1px", background: "#162038", margin: "24px 0" },
  tierSub: { fontSize: "13px", fontWeight: 700, letterSpacing: "1px", textTransform: "uppercase", color: "#6b7588", marginBottom: "14px", marginTop: "24px" },
  tierList: { listStyle: "none", padding: 0, margin: 0 },
  tierItem: { display: "flex", alignItems: "flex-start", gap: "10px", fontSize: "14px", color: "#a0a8b8", marginBottom: "12px", lineHeight: 1.6 },
  chk: { color: "#1f6feb", fontWeight: 700, flexShrink: 0, marginTop: "2px" },

  credRow: { display: "flex", flexDirection: "column", gap: "16px", marginTop: "40px", alignItems: "center" },
  credItem: { display: "flex", alignItems: "center", gap: "12px", fontSize: "15px", color: "#a0a8b8" },

  faqItem: { borderBottom: "1px solid #162038", textAlign: "left" },
  faqQ: { width: "100%", background: "none", border: "none", color: "#e0e4ea", fontSize: "16px", fontWeight: 600, padding: "20px 0", cursor: "pointer", display: "flex", justifyContent: "space-between", alignItems: "center", textAlign: "left", fontFamily: "inherit", lineHeight: 1.5 },
  faqToggle: { fontSize: "22px", color: "#5b9cf6", flexShrink: 0, marginLeft: "16px", transition: "transform 0.2s" },
  faqA: { fontSize: "15px", color: "#7a8599", lineHeight: 1.8, paddingBottom: "20px" },

  domainLink: { fontSize: "14px", color: "#5b9cf6", textDecoration: "none", fontWeight: 500 },

  footer: { padding: "40px 24px", borderTop: "1px solid #162038" },
  footerInner: { maxWidth: "1100px", margin: "0 auto", display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "12px", fontSize: "13px", color: "#5a6478" },
  footerLink: { color: "#5a6478", textDecoration: "none" },
};
