"use client";

const NAV_LINKS = [
  { label: "Skills", href: "#skills" },
  { label: "Projects", href: "#projects" },
  { label: "Education", href: "#education" },
  { label: "Leadership", href: "#leadership" },
];

const SKILLS: Record<string, { pills: string[]; variant: string }> = {
  Languages: {
    pills: ["Python", "TypeScript", "JavaScript", "C"],
    variant: "pill",
  },
  "Web & Data": {
    pills: ["Next.js", "React", "PostgreSQL", "Supabase", "Tailwind CSS"],
    variant: "pill-green",
  },
  "Systems & Networking": {
    pills: [
      "Sockets",
      "TCP/UDP protocol design",
      "Congestion control",
      "Raft consensus",
      "Linux namespaces & cgroups",
      "Virtual memory / paging",
    ],
    variant: "pill-sys",
  },
  Tooling: {
    pills: ["Git", "pytest", "Vitest", "GitHub Actions CI/CD", "Vercel"],
    variant: "pill-gray",
  },
};

const PROJECTS = [
  {
    title: "TransportLab",
    subtitle: "Reliable Transport Protocol over UDP",
    url: "https://github.com/pastbologanesh0101",
    tags: ["Python", "TCP/UDP", "Congestion Control", "SSE", "Wireshark"],
    bullets: [
      "Built a custom transport protocol from scratch — checksummed headers, three-way handshake, and Stop-and-Wait / Go-Back-N / Selective-Repeat with SACK",
      "Implemented Jacobson/Karels RTO estimation with Karn's algorithm and five pluggable congestion-control schemes (Tahoe, Reno, CUBIC, BBR-lite), evaluated for fairness via Jain's index",
      "Live browser dashboard (Python stdlib + SSE) plotting congestion window, RTT, and bandwidth share in real time; network emulator with loss, jitter, reorder and .pcap export",
    ],
  },
  {
    title: "Systems Programming Portfolio",
    subtitle: "6 from-scratch systems projects",
    url: "https://github.com/pastbologanesh0101",
    tags: ["C", "Python", "Linux", "Systems"],
    bullets: [
      "tinykv — disk-backed key-value store: B+ tree storage engine, write-ahead-log crash recovery",
      "mini-redis — multithreaded TCP server implementing RESP2, interoperable with real redis-cli",
      "small-lang-compiler — lexer → Pratt parser → optimizer → bytecode VM, plus a C transpiler backend",
      "vm-simulator — OS memory manager: demand paging, two-level page table, TLB, FIFO/LRU/Clock/Optimal replacement",
      "packet-analyzer — from-scratch .pcap parser and protocol dissectors, validated against tcpdump",
      "tiny-docker — Linux container runtime built with unshare, pivot_root, and cgroups v2",
    ],
  },
  {
    title: "StreakForge",
    subtitle: "Habit Streak Tracker",
    url: "https://github.com/pastbologanesh0101",
    tags: ["Next.js", "TypeScript", "Tailwind", "Vitest", "GitHub Actions"],
    bullets: [
      "Full-stack-styled web app with streak and calendar-heatmap logic covered by 17 unit tests",
      "Storage-agnostic persistence layer so local storage can be swapped for a backend without touching core logic",
      "GitHub Actions CI pipeline (lint, test, build) and deployed to Vercel",
    ],
  },
];

function GithubIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z" />
    </svg>
  );
}

function LinkedinIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
    </svg>
  );
}

function MailIcon() {
  return (
    <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <rect x="2" y="4" width="20" height="16" rx="2" />
      <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
    </svg>
  );
}

function ExternalLinkIcon() {
  return (
    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <path d="M15 3h6v6M10 14 21 3M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
    </svg>
  );
}

function ArrowDownIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <path d="M12 5v14M5 12l7 7 7-7" />
    </svg>
  );
}

export default function Page() {
  return (
    <div style={{ background: "var(--bg)", minHeight: "100vh" }}>
      {/* ── NAV ── */}
      <header
        className="nav-blur fixed top-0 left-0 right-0 z-50"
        style={{ height: 56 }}
      >
        <nav
          style={{
            maxWidth: 900,
            margin: "0 auto",
            height: "100%",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            padding: "0 24px",
          }}
        >
          <span
            style={{
              fontFamily: "var(--font-geist-mono), monospace",
              color: "var(--accent)",
              fontSize: "0.9rem",
              fontWeight: 600,
              letterSpacing: "0.02em",
            }}
          >
            vt
          </span>
          <div style={{ display: "flex", gap: 28 }}>
            {NAV_LINKS.map((l) => (
              <a
                key={l.href}
                href={l.href}
                style={{
                  fontSize: "0.85rem",
                  color: "var(--muted)",
                  textDecoration: "none",
                  transition: "color 0.2s",
                  fontWeight: 500,
                }}
                onMouseEnter={(e) =>
                  ((e.target as HTMLElement).style.color = "var(--text-bright)")
                }
                onMouseLeave={(e) =>
                  ((e.target as HTMLElement).style.color = "var(--muted)")
                }
              >
                {l.label}
              </a>
            ))}
          </div>
        </nav>
      </header>

      <main style={{ maxWidth: 900, margin: "0 auto", padding: "0 24px" }}>
        {/* ── HERO ── */}
        <section
          className="hero-grid"
          style={{
            minHeight: "100vh",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            paddingTop: 96,
            paddingBottom: 64,
          }}
        >
          {/* Badge */}
          <div className="anim-0" style={{ marginBottom: 28 }}>
            <span
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 8,
                fontFamily: "var(--font-geist-mono), monospace",
                fontSize: "0.78rem",
                color: "var(--accent)",
                background: "rgba(6,182,212,0.08)",
                border: "1px solid rgba(6,182,212,0.2)",
                borderRadius: 999,
                padding: "5px 14px",
                letterSpacing: "0.05em",
              }}
            >
              <span
                style={{
                  width: 7,
                  height: 7,
                  borderRadius: "50%",
                  background: "var(--green)",
                  display: "inline-block",
                  boxShadow: "0 0 8px var(--green)",
                }}
              />
              Available for internships · 2027
            </span>
          </div>

          {/* Name */}
          <h1
            className="anim-1"
            style={{
              fontSize: "clamp(2.8rem, 6vw, 4.5rem)",
              fontWeight: 800,
              color: "var(--text-bright)",
              lineHeight: 1.1,
              letterSpacing: "-0.03em",
              marginBottom: 12,
            }}
          >
            Vishwanathan
            <br />
            <span
              style={{
                background: "linear-gradient(90deg, var(--accent), #818cf8)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              Tamizharasan
            </span>
          </h1>

          {/* Title */}
          <p
            className="anim-2"
            style={{
              fontFamily: "var(--font-geist-mono), monospace",
              fontSize: "clamp(0.85rem, 2vw, 1rem)",
              color: "var(--muted)",
              marginBottom: 32,
              letterSpacing: "0.04em",
              textTransform: "uppercase",
            }}
          >
            B.Tech Computer Science & Engineering — Systems & Networking
          </p>

          {/* Contact row */}
          <div
            className="anim-3"
            style={{
              display: "flex",
              flexWrap: "wrap",
              gap: 12,
              marginBottom: 36,
            }}
          >
            {[
              { icon: <MailIcon />, label: "pranav27062007@gmail.com", href: "mailto:pranav27062007@gmail.com" },
              { icon: null, label: "+91 80502 00772", href: "tel:+918050200772" },
              { icon: null, label: "Bangalore, India", href: null },
              { icon: null, label: "U.S. Citizen", href: null },
            ].map((item) =>
              item.href ? (
                <a
                  key={item.label}
                  href={item.href}
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: 6,
                    fontSize: "0.82rem",
                    color: "var(--muted)",
                    textDecoration: "none",
                    transition: "color 0.2s",
                  }}
                  onMouseEnter={(e) =>
                    ((e.target as HTMLElement).style.color = "var(--text)")
                  }
                  onMouseLeave={(e) =>
                    ((e.target as HTMLElement).style.color = "var(--muted)")
                  }
                >
                  {item.icon}
                  {item.label}
                </a>
              ) : (
                <span
                  key={item.label}
                  style={{ fontSize: "0.82rem", color: "var(--muted)" }}
                >
                  {item.label}
                </span>
              )
            )}
          </div>

          {/* CTA buttons */}
          <div className="anim-4" style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
            <a
              href="https://github.com/pastbologanesh0101"
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 8,
                padding: "10px 22px",
                borderRadius: 10,
                background: "var(--accent)",
                color: "#000",
                fontWeight: 600,
                fontSize: "0.88rem",
                textDecoration: "none",
                transition: "opacity 0.2s, transform 0.2s",
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLElement).style.opacity = "0.88";
                (e.currentTarget as HTMLElement).style.transform = "translateY(-1px)";
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLElement).style.opacity = "1";
                (e.currentTarget as HTMLElement).style.transform = "translateY(0)";
              }}
            >
              <GithubIcon />
              GitHub
            </a>
            <a
              href="https://linkedin.com/in/vishwanathan-tamizharasan"
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 8,
                padding: "10px 22px",
                borderRadius: 10,
                background: "transparent",
                border: "1px solid var(--border-hover)",
                color: "var(--text)",
                fontWeight: 500,
                fontSize: "0.88rem",
                textDecoration: "none",
                transition: "border-color 0.2s, color 0.2s, transform 0.2s",
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLElement).style.borderColor = "var(--accent)";
                (e.currentTarget as HTMLElement).style.color = "var(--accent)";
                (e.currentTarget as HTMLElement).style.transform = "translateY(-1px)";
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLElement).style.borderColor = "var(--border-hover)";
                (e.currentTarget as HTMLElement).style.color = "var(--text)";
                (e.currentTarget as HTMLElement).style.transform = "translateY(0)";
              }}
            >
              <LinkedinIcon />
              LinkedIn
            </a>
          </div>

          {/* Scroll hint */}
          <div
            className="anim-5"
            style={{
              marginTop: 64,
              display: "flex",
              alignItems: "center",
              gap: 8,
              color: "var(--muted2)",
              fontSize: "0.78rem",
              letterSpacing: "0.06em",
            }}
          >
            <ArrowDownIcon />
            <span style={{ fontFamily: "var(--font-geist-mono), monospace", textTransform: "uppercase" }}>
              scroll to explore
            </span>
          </div>
        </section>

        {/* ── SKILLS ── */}
        <section id="skills" style={{ paddingTop: 80, paddingBottom: 80 }}>
          <span className="section-prefix">01 / skills</span>
          <h2
            style={{
              fontSize: "clamp(1.6rem, 3.5vw, 2.2rem)",
              fontWeight: 700,
              color: "var(--text-bright)",
              marginBottom: 40,
              letterSpacing: "-0.02em",
            }}
          >
            Technical Skills
          </h2>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
              gap: 16,
            }}
          >
            {Object.entries(SKILLS).map(([category, { pills, variant }]) => (
              <div key={category} className="card" style={{ padding: "22px 24px" }}>
                <p
                  style={{
                    fontSize: "0.75rem",
                    fontWeight: 600,
                    textTransform: "uppercase",
                    letterSpacing: "0.1em",
                    color: "var(--muted)",
                    marginBottom: 14,
                    fontFamily: "var(--font-geist-mono), monospace",
                  }}
                >
                  {category}
                </p>
                <div style={{ display: "flex", flexWrap: "wrap", gap: 7 }}>
                  {pills.map((p) => (
                    <span key={p} className={`pill ${variant}`}>
                      {p}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ── PROJECTS ── */}
        <section id="projects" style={{ paddingTop: 80, paddingBottom: 80 }}>
          <span className="section-prefix">02 / projects</span>
          <h2
            style={{
              fontSize: "clamp(1.6rem, 3.5vw, 2.2rem)",
              fontWeight: 700,
              color: "var(--text-bright)",
              marginBottom: 40,
              letterSpacing: "-0.02em",
            }}
          >
            Projects
          </h2>

          <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
            {PROJECTS.map((proj) => (
              <div key={proj.title} className="card card-accent" style={{ padding: "28px 30px" }}>
                {/* Header */}
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "flex-start",
                    gap: 16,
                    marginBottom: 16,
                    flexWrap: "wrap",
                  }}
                >
                  <div>
                    <h3
                      style={{
                        fontSize: "1.15rem",
                        fontWeight: 700,
                        color: "var(--text-bright)",
                        marginBottom: 3,
                      }}
                    >
                      {proj.title}
                    </h3>
                    <p style={{ fontSize: "0.83rem", color: "var(--muted)", fontFamily: "var(--font-geist-mono), monospace" }}>
                      {proj.subtitle}
                    </p>
                  </div>
                  <a
                    href={proj.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                      display: "inline-flex",
                      alignItems: "center",
                      gap: 5,
                      fontSize: "0.8rem",
                      color: "var(--accent)",
                      textDecoration: "none",
                      flexShrink: 0,
                      transition: "opacity 0.2s",
                    }}
                    onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.opacity = "0.7")}
                    onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.opacity = "1")}
                  >
                    <GithubIcon />
                    <ExternalLinkIcon />
                  </a>
                </div>

                {/* Tags */}
                <div style={{ display: "flex", flexWrap: "wrap", gap: 6, marginBottom: 18 }}>
                  {proj.tags.map((t) => (
                    <span key={t} className="proj-tag">{t}</span>
                  ))}
                </div>

                {/* Bullets */}
                <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: 10 }}>
                  {proj.bullets.map((b, i) => (
                    <li
                      key={i}
                      style={{
                        display: "flex",
                        gap: 12,
                        fontSize: "0.88rem",
                        color: "var(--text)",
                        lineHeight: 1.6,
                      }}
                    >
                      <span
                        style={{
                          color: "var(--accent)",
                          fontFamily: "var(--font-geist-mono), monospace",
                          fontSize: "0.75rem",
                          marginTop: 3,
                          flexShrink: 0,
                        }}
                      >
                        ▸
                      </span>
                      <span>{b}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>

        {/* ── EDUCATION ── */}
        <section id="education" style={{ paddingTop: 80, paddingBottom: 80 }}>
          <span className="section-prefix">03 / education</span>
          <h2
            style={{
              fontSize: "clamp(1.6rem, 3.5vw, 2.2rem)",
              fontWeight: 700,
              color: "var(--text-bright)",
              marginBottom: 40,
              letterSpacing: "-0.02em",
            }}
          >
            Education
          </h2>

          <div className="card" style={{ padding: "28px 30px" }}>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "flex-start",
                flexWrap: "wrap",
                gap: 12,
              }}
            >
              <div>
                <h3
                  style={{
                    fontSize: "1.1rem",
                    fontWeight: 700,
                    color: "var(--text-bright)",
                    marginBottom: 4,
                  }}
                >
                  Vellore Institute of Technology (VIT), Vellore
                </h3>
                <p style={{ fontSize: "0.88rem", color: "var(--text)", marginBottom: 4 }}>
                  B.Tech, Computer Science &amp; Engineering (Core)
                </p>
                <p style={{ fontSize: "0.82rem", color: "var(--muted)", fontFamily: "var(--font-geist-mono), monospace" }}>
                  2nd Year — Expected 2029
                </p>
              </div>
              <span
                style={{
                  fontSize: "0.75rem",
                  padding: "5px 14px",
                  borderRadius: 999,
                  background: "rgba(16, 217, 119, 0.08)",
                  border: "1px solid rgba(16, 217, 119, 0.2)",
                  color: "var(--green)",
                  fontFamily: "var(--font-geist-mono), monospace",
                  fontWeight: 600,
                  letterSpacing: "0.05em",
                  flexShrink: 0,
                }}
              >
                CURRENT
              </span>
            </div>
          </div>
        </section>

        {/* ── LEADERSHIP ── */}
        <section id="leadership" style={{ paddingTop: 80, paddingBottom: 80 }}>
          <span className="section-prefix">04 / leadership</span>
          <h2
            style={{
              fontSize: "clamp(1.6rem, 3.5vw, 2.2rem)",
              fontWeight: 700,
              color: "var(--text-bright)",
              marginBottom: 40,
              letterSpacing: "-0.02em",
            }}
          >
            Leadership
          </h2>

          <div className="card" style={{ padding: "28px 30px" }}>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "flex-start",
                flexWrap: "wrap",
                gap: 12,
              }}
            >
              <div>
                <h3
                  style={{
                    fontSize: "1.1rem",
                    fontWeight: 700,
                    color: "var(--text-bright)",
                    marginBottom: 4,
                  }}
                >
                  Management Head
                </h3>
                <p style={{ fontSize: "0.88rem", color: "var(--accent)", marginBottom: 10, fontWeight: 500 }}>
                  Team ACE, VIT Vellore
                </p>
                <p style={{ fontSize: "0.88rem", color: "var(--text)", lineHeight: 1.65 }}>
                  Lead a student team, coordinating internal operations, communication, and cross-functional logistics.
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* ── FOOTER ── */}
      <footer
        style={{
          borderTop: "1px solid var(--border)",
          padding: "28px 24px",
          textAlign: "center",
        }}
      >
        <div style={{ maxWidth: 900, margin: "0 auto" }}>
          <p
            style={{
              fontSize: "0.8rem",
              color: "var(--muted)",
              fontFamily: "var(--font-geist-mono), monospace",
            }}
          >
            Vishwanathan Tamizharasan · pranav27062007@gmail.com
          </p>
        </div>
      </footer>
    </div>
  );
}
