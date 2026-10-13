const PROJECTS = [
  {
    title: "TransportLab",
    subtitle: "Reliable transport protocol over UDP — from scratch",
    url: "https://github.com/pastbologanesh0101",
    tags: ["Python", "TCP/UDP", "Congestion Control", "SSE", "Wireshark"],
    bullets: [
      "Built a custom transport protocol in Python — checksummed headers, three-way handshake, Stop-and-Wait / Go-Back-N / Selective-Repeat with SACK",
      "Jacobson/Karels RTO estimation with Karn's algorithm and five pluggable congestion-control schemes (Tahoe, Reno, CUBIC, BBR-lite), evaluated for fairness via Jain's index",
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
    subtitle: "Habit streak tracker — full-stack web app",
    url: "https://github.com/pastbologanesh0101",
    tags: ["Next.js", "TypeScript", "Tailwind", "Vitest", "GitHub Actions"],
    bullets: [
      "Full-stack-styled web app with streak and calendar-heatmap logic covered by 17 unit tests",
      "Storage-agnostic persistence layer so local storage can be swapped for a backend without touching core logic",
      "GitHub Actions CI pipeline (lint, test, build) deployed to Vercel",
    ],
  },
];

function GithubIcon() {
  return (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z" />
    </svg>
  );
}

function LinkedinIcon() {
  return (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
    </svg>
  );
}

function MailIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <rect x="2" y="4" width="20" height="16" rx="2" />
      <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
    </svg>
  );
}

function ArrowIcon() {
  return (
    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <path d="M7 17 17 7M7 7h10v10" />
    </svg>
  );
}

export default function Page() {
  return (
    <>
      {/* ── NAV ── */}
      <header className="topbar">
        <div className="topbar-inner">
          <div className="brand"><span>VT</span> · Portfolio</div>
          <nav>
            <ul className="nav-links">
              <li><a href="#skills">Skills</a></li>
              <li><a href="#projects">Projects</a></li>
              <li><a href="#education">Education</a></li>
              <li><a href="#leadership">Leadership</a></li>
            </ul>
          </nav>
        </div>
      </header>

      <div className="wrap">

        {/* ── HERO ── */}
        <section className="hero" id="hero">
          <div className="kicker h0">
            <span className="kicker-dot" />
            B.Tech Computer Science &amp; Engineering · Systems &amp; Networking
          </div>

          <h1 className="hero-name h1">
            Vishwanathan<br />Tamizharasan
          </h1>

          <p className="hero-role h2">
            VIT Vellore · 2nd Year · Expected 2029 · U.S. Citizen
          </p>

          <div className="contact-row h3">
            <a className="contact-item" href="mailto:pranav27062007@gmail.com">
              <MailIcon />
              pranav27062007@gmail.com
            </a>
            <span className="contact-sep">·</span>
            <a className="contact-item" href="tel:+918050200772">
              +91 80502 00772
            </a>
            <span className="contact-sep">·</span>
            <span>Bangalore, India</span>
          </div>

          <div className="cta-row h4">
            <a
              className="btn primary"
              href="https://github.com/pastbologanesh0101"
              target="_blank"
              rel="noopener noreferrer"
            >
              <GithubIcon />
              GitHub
            </a>
            <a
              className="btn ghost"
              href="https://linkedin.com/in/vishwanathan-tamizharasan"
              target="_blank"
              rel="noopener noreferrer"
            >
              <LinkedinIcon />
              LinkedIn
            </a>
          </div>
        </section>

        {/* ── SKILLS ── */}
        <section id="skills">
          <p className="section-label reveal">Technical Skills</p>

          <div className="reveal reveal-1">
            <div className="skill-row">
              <div className="skill-cat">Languages</div>
              <div className="skill-list">
                <b>Python</b> · TypeScript / JavaScript · C
              </div>
            </div>
            <div className="skill-row">
              <div className="skill-cat">Web &amp; Data</div>
              <div className="skill-list">
                <b>Next.js</b> · React · PostgreSQL · Supabase · Tailwind CSS
              </div>
            </div>
            <div className="skill-row">
              <div className="skill-cat">Systems</div>
              <div className="skill-list">
                Sockets · <b>TCP/UDP protocol design</b> · Congestion control · Raft consensus · Linux namespaces &amp; cgroups · Virtual memory / paging
              </div>
            </div>
            <div className="skill-row">
              <div className="skill-cat">Tooling</div>
              <div className="skill-list">
                Git · pytest · Vitest · GitHub Actions CI/CD · Vercel
              </div>
            </div>
          </div>
        </section>

        {/* ── PROJECTS ── */}
        <section id="projects">
          <p className="section-label reveal">Projects</p>

          {PROJECTS.map((proj, i) => (
            <div key={proj.title} className={`proj-card reveal reveal-${Math.min(i + 1, 3) as 1 | 2 | 3}`}>
              <div className="proj-header">
                <span className="proj-title">{proj.title}</span>
                <a
                  className="proj-link"
                  href={proj.url}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <GithubIcon />
                  <ArrowIcon />
                </a>
              </div>
              <p className="proj-subtitle">{proj.subtitle}</p>
              <div className="proj-tags">
                {proj.tags.map((t) => (
                  <span key={t} className="proj-tag">{t}</span>
                ))}
              </div>
              <ul className="proj-bullets">
                {proj.bullets.map((b, j) => (
                  <li key={j}>{b}</li>
                ))}
              </ul>
            </div>
          ))}
        </section>

        {/* ── EDUCATION ── */}
        <section id="education">
          <p className="section-label reveal">Education</p>
          <div className="reveal reveal-1">
            <div className="fact-row">
              <div>
                <p className="fact-title">Vellore Institute of Technology (VIT)</p>
                <p className="fact-sub">B.Tech, Computer Science &amp; Engineering (Core)</p>
                <p className="fact-meta">Vellore, India · 2nd Year · Expected 2029</p>
              </div>
              <span className="fact-badge">Current</span>
            </div>
          </div>
        </section>

        {/* ── LEADERSHIP ── */}
        <section id="leadership">
          <p className="section-label reveal">Leadership</p>
          <div className="reveal reveal-1">
            <p className="fact-title">Management Head</p>
            <p className="fact-sub" style={{ color: "var(--accent)", marginBottom: 8 }}>
              Team ACE · VIT Vellore
            </p>
            <p style={{ fontSize: "0.875rem", color: "var(--ink-soft)", lineHeight: 1.65 }}>
              Lead a student team, coordinating internal operations, communication, and cross-functional logistics.
            </p>
          </div>
        </section>

        {/* ── FOOTER ── */}
        <footer className="footer reveal" style={{ marginTop: 70 }}>
          <p>Vishwanathan Tamizharasan · pranav27062007@gmail.com · Bangalore</p>
        </footer>

      </div>
    </>
  );
}
