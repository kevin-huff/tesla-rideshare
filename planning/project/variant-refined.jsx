// V1 — Refined Dark (production polish, post Jean-Luc addendum)
// Near-black, generous whitespace, accent color, sparse mono metadata.
// Treats the car as a named character ONLY in section 02. No Star Trek
// visuals, no logos, no quotes. The plate and the name are the whole budget.

function VariantRefined({ accent = '#7dd3fc', font = 'system' }) {
  const fontFamily = font === 'mono'
    ? 'ui-monospace, "SF Mono", Menlo, Monaco, monospace'
    : font === 'serif'
      ? '"Iowan Old Style", "Charter", Georgia, serif'
      : '-apple-system, BlinkMacSystemFont, "Inter", system-ui, sans-serif';

  const css = `
    .v1 {
      --accent: ${accent};
      --bg: #0b0b0d;
      --bg2: #111114;
      --bg3: #16161a;
      --line: rgba(255,255,255,0.08);
      --line2: rgba(255,255,255,0.14);
      --fg: #ecebe6;
      --fg-dim: rgba(236,235,230,0.62);
      --fg-mute: rgba(236,235,230,0.40);
      --live: #34d399;
      background: var(--bg);
      color: var(--fg);
      font-family: ${fontFamily};
      font-feature-settings: "ss01", "cv11", "cv05";
      line-height: 1.5;
      -webkit-font-smoothing: antialiased;
    }
    .v1 .mono {
      font-family: ui-monospace, "SF Mono", Menlo, Monaco, monospace;
      font-size: 10.5px;
      letter-spacing: 0.08em;
      text-transform: uppercase;
      color: var(--fg-mute);
    }
    .v1 a { color: inherit; text-decoration: none; }
    .v1 hr { border: none; border-top: 1px solid var(--line); margin: 0; }
    .v1 .accent { color: var(--accent); }
    .v1 ::selection { background: var(--accent); color: #000; }

    .v1 details > summary { list-style: none; }
    .v1 details > summary::-webkit-details-marker { display: none; }
    .v1 details[open] summary .plus { transform: rotate(45deg); }
    .v1 .plus { transition: transform .18s ease; display: inline-block; }

    .v1 .tile { transition: border-color .15s ease, background .15s ease; }
    .v1 .tile:hover { border-color: var(--line2); background: var(--bg3); }
    .v1 .ulink { background-image: linear-gradient(currentColor, currentColor); background-position: 0 100%; background-repeat: no-repeat; background-size: 100% 1px; padding-bottom: 1px; }

    /* PICARD plate — restrained inline detail, no Star Trek anything. */
    .v1 .plate {
      display: inline-flex; align-items: center; justify-content: center;
      padding: 4px 10px 5px;
      background: #f4efe1;
      color: #1a1816;
      font-family: ui-monospace, "SF Mono", Menlo, Monaco, monospace;
      font-weight: 700;
      font-size: 12px;
      letter-spacing: 0.18em;
      border-radius: 3px;
      border: 1px solid rgba(0,0,0,0.25);
      box-shadow: inset 0 0 0 2px #f4efe1, inset 0 0 0 3px rgba(0,0,0,0.12);
      vertical-align: 1px;
    }

    @media (prefers-reduced-motion: reduce) {
      .v1 .plus, .v1 .tile { transition: none; }
    }
  `;

  const heroAccent = { color: 'var(--accent)' };
  const italicIfSerif = font === 'serif' ? { fontStyle: 'italic' } : null;

  return (
    <div className="v1" style={{ minHeight: '100%' }}>
      <style>{css}</style>

      {/* TOP NAV */}
      <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '14px 22px 10px' }}>
        <span className="mono">kevnet.cloud / ride</span>
        <span style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
          <span className="mono" style={{ fontSize: 9.5 }}>live</span>
          <span style={{ width: 7, height: 7, borderRadius: 4, background: 'var(--live)', boxShadow: '0 0 8px rgba(52,211,153,0.7)' }} title="streaming"></span>
        </span>
      </header>

      {/* HERO */}
      <section style={{ padding: '6px 22px 28px' }}>
        <div className="mono" style={{ marginBottom: 14 }}>· hello from the back seat</div>
        <h1 style={{
          fontSize: 46, lineHeight: 0.96, fontWeight: 600, letterSpacing: '-0.038em',
          margin: '0 0 18px', color: 'var(--fg)',
        }}>
          Kevin.<br/>
          And his<br/>
          <span style={{ ...heroAccent, ...italicIfSerif }}>Model&nbsp;Y</span>.
        </h1>
        <p style={{ fontSize: 15.5, color: 'var(--fg-dim)', margin: '0 0 22px', maxWidth: 320, textWrap: 'pretty' }}>
          Tech guy who drives a Tesla in Springfield, MO. Streams on Twitch as <span style={{ color: 'var(--fg)' }}>The Kevin Show</span>. Builds things in Drupal when nobody is looking.
        </p>

        <PhotoPlaceholder caption="HERO · KEVIN + MODEL Y" height={260} bg="#101013" fg="#1f1f24" textColor="rgba(255,255,255,0.5)"/>

        {/* anchor jump tiles */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 8, marginTop: 18 }}>
          {[
            { idx: '01', label: 'The Tesla', href: '#tesla' },
            { idx: '02', label: 'The Show', href: '#show' },
            { idx: '03', label: 'Work', href: '#work' },
          ].map((tile) => (
            <a key={tile.idx} href={tile.href} className="tile" style={{
              border: '1px solid var(--line)', borderRadius: 10, padding: '12px 12px 14px',
              background: 'var(--bg2)', display: 'block',
            }}>
              <div className="mono" style={{ marginBottom: 14, color: 'var(--accent)' }}>{tile.idx}</div>
              <div style={{ fontSize: 14, fontWeight: 500 }}>{tile.label}</div>
              <div style={{ marginTop: 6, fontSize: 12, color: 'var(--fg-mute)' }}>↓</div>
            </a>
          ))}
        </div>
      </section>

      {/* MEET KEVIN */}
      <hr/>
      <Section v1Label="01 / WHO" title="Meet Kevin">
        <div style={{ display: 'flex', gap: 14, alignItems: 'flex-start', marginBottom: 20 }}>
          <PhotoPlaceholder caption="HEADSHOT" height={88} width={88} bg="#101013" fg="#1f1f24" radius={6} style={{ flexShrink: 0 }}/>
          <p style={{ fontSize: 15, lineHeight: 1.55, color: 'var(--fg)', margin: 0, textWrap: 'pretty' }}>
            I run technology for a federal contractor by day. Off the clock I drive my Tesla, stream on Twitch, and tinker with whatever caught my eye that week.
            <span style={{ color: 'var(--fg-mute)' }}> [BIO · 3 to 5 sentences in Kevin's voice]</span>
          </p>
        </div>

        <div className="mono" style={{ marginBottom: 10 }}>currently into</div>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, marginBottom: 20 }}>
          {['Drupal', 'AI tooling', 'sim racing', 'tabletop', 'homesteading', 'federal IT'].map((t) => (
            <span key={t} style={{
              fontSize: 12.5, padding: '5px 10px', borderRadius: 999,
              border: '1px solid var(--line2)', color: 'var(--fg)',
            }}>{t}</span>
          ))}
        </div>

        <a href="#" className="ulink" style={{ display: 'inline-flex', gap: 8, alignItems: 'center', fontSize: 14, color: 'var(--accent)' }}>
          LinkedIn — for the resume crowd ↗
        </a>
      </Section>

      {/* MEET JEAN-LUC */}
      <hr/>
      <Section v1Label={<>02 / THE CAR &nbsp;·&nbsp; <span style={{ color: 'var(--fg-dim)' }}>PICARD</span></>} title="Meet Jean-Luc" id="tesla">
        <div className="mono" style={{ marginTop: -16, marginBottom: 18, color: 'var(--fg-dim)' }}>the model y</div>

        <PhotoPlaceholder caption="EXTERIOR · 3/4 FRONT" height={210} bg="#101013" fg="#1f1f24"/>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8, marginTop: 8 }}>
          <PhotoPlaceholder caption="INTERIOR" height={120} bg="#101013" fg="#1f1f24"/>
          <PhotoPlaceholder caption="SCREEN" height={120} bg="#101013" fg="#1f1f24"/>
        </div>

        {/* spec grid */}
        <div style={{ marginTop: 22, display: 'grid', gridTemplateColumns: '1fr 1fr', borderTop: '1px solid var(--line)', borderLeft: '1px solid var(--line)' }}>
          {[
            ['range', '~330 mi'],
            ['0—60', '4.8 sec'],
            ['the screen', '15.4 in'],
            ['driver mode', 'engage'],
          ].map(([k, v]) => (
            <div key={k} style={{ borderRight: '1px solid var(--line)', borderBottom: '1px solid var(--line)', padding: '14px 14px' }}>
              <div className="mono" style={{ marginBottom: 6 }}>{k}</div>
              <div style={{ fontSize: 18, fontWeight: 500, letterSpacing: '-0.01em' }}>{v}</div>
            </div>
          ))}
        </div>

        {/* PICARD plate — quiet detail, restrained */}
        <div style={{ marginTop: 22, display: 'flex', alignItems: 'center', gap: 12 }}>
          <span className="plate" aria-label="License plate: PICARD">PICARD</span>
          <span className="mono" style={{ color: 'var(--fg-mute)' }}>missouri · 2023</span>
        </div>

        {/* FAQ */}
        <div style={{ marginTop: 28 }}>
          <div className="mono" style={{ marginBottom: 12 }}>questions passengers ask</div>
          {[
            ['How much was it?', 'More than a Camry, less than a house. The math gets better with gas savings.'],
            ['Does it really drive itself?', 'Autopilot keeps lane and speed. I am still the one driving. Always.'],
            ['What happens if it runs out?', "Same as gas. You plan ahead. There's a charger 6 minutes from here."],
            ['Cold weather?', 'Range drops maybe 20%. Heated seats are worth it.'],
            ['Why "Jean-Luc"?', "He earned it. The plate said it first and the name stuck."],
          ].map(([q, a], i) => (
            <details key={i} style={{ borderTop: '1px solid var(--line)', padding: '14px 0' }}>
              <summary style={{ cursor: 'pointer', display: 'flex', justifyContent: 'space-between', gap: 12, alignItems: 'flex-start' }}>
                <span style={{ fontSize: 15, fontWeight: 500, color: 'var(--fg)' }}>{q}</span>
                <span className="plus" style={{ color: 'var(--accent)', fontSize: 18, lineHeight: 1, flexShrink: 0, marginTop: 2 }}>+</span>
              </summary>
              <p style={{ margin: '10px 0 0', fontSize: 14, color: 'var(--fg-dim)', lineHeight: 1.55, textWrap: 'pretty' }}>{a}</p>
            </details>
          ))}
          <div style={{ borderTop: '1px solid var(--line)' }}/>
        </div>

        {/* referral CTA */}
        <div style={{ marginTop: 24, padding: 16, border: '1px solid var(--line)', borderRadius: 10, background: 'var(--bg2)' }}>
          <div className="mono accent" style={{ marginBottom: 8 }}>referral · honest pitch</div>
          <p style={{ fontSize: 14.5, lineHeight: 1.5, color: 'var(--fg)', margin: 0 }}>
            Buying one? My referral link gets you a small perk and gets me a small one too. No pressure.
          </p>
          <a href="#" className="ulink" style={{ display: 'inline-flex', alignItems: 'center', gap: 8, marginTop: 12, fontSize: 13.5, color: 'var(--accent)' }}>
            tesla.com/referral/kevin →
          </a>
        </div>
      </Section>

      {/* THE SHOW */}
      <hr/>
      <Section v1Label="03 / TWITCH" title="The Kevin Show" id="show">
        <p style={{ fontSize: 15, color: 'var(--fg-dim)', margin: '0 0 18px', lineHeight: 1.55, textWrap: 'pretty' }}>
          Twice a week I turn the camera on and stream whatever I'm building, breaking, or thinking about. Tech, sometimes games, occasionally the car.
        </p>

        <div style={{ border: '1px solid var(--line)', borderRadius: 12, overflow: 'hidden', background: 'var(--bg2)' }}>
          <PhotoPlaceholder caption="CHANNEL ART · 16:6" height={120} bg="#0a0a0c" fg="#16161a" textColor="rgba(255,255,255,0.45)"/>
          <div style={{ padding: '14px 14px 16px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 12 }}>
              <div style={{ width: 36, height: 36, borderRadius: 18, background: '#1f1f24', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 13, fontWeight: 600, color: 'var(--fg)' }}>K</div>
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: 14.5, fontWeight: 600, color: 'var(--fg)' }}>thekevinshow</div>
                <div className="mono" style={{ marginTop: 2 }}>
                  <span style={{ color: 'var(--live)' }}>● live</span> &nbsp;·&nbsp; drupal + claude friday
                </div>
              </div>
              <button style={{
                background: 'var(--accent)', color: '#000', border: 'none', padding: '8px 14px',
                borderRadius: 999, fontSize: 13, fontWeight: 600, cursor: 'pointer', fontFamily: 'inherit',
              }}>Follow</button>
            </div>
            <div className="mono" style={{ marginBottom: 8 }}>schedule</div>
            <div style={{ fontSize: 13.5, color: 'var(--fg)', lineHeight: 1.7 }}>
              <div>tue · 8:00pm CT — building stuff</div>
              <div>fri · 8:00pm CT — variety / games</div>
            </div>
          </div>
        </div>

        <div className="mono" style={{ marginTop: 24, marginBottom: 10 }}>recent clips</div>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8 }}>
          <PhotoPlaceholder caption="CLIP · 0:42" height={110} bg="#101013" fg="#1f1f24"/>
          <PhotoPlaceholder caption="CLIP · 1:17" height={110} bg="#101013" fg="#1f1f24"/>
        </div>
      </Section>

      {/* WORK */}
      <hr/>
      <Section v1Label="04 / WORK" title="Work With Me" id="work">
        <p style={{ fontSize: 15, color: 'var(--fg-dim)', margin: '0 0 22px', lineHeight: 1.55, textWrap: 'pretty' }}>
          Mostly here so the right person knows it's an option. Director of Technology day job, federal contracting, security clearance. I take on the occasional outside engagement when it's a good fit.
        </p>

        {[
          { kind: 'web', title: 'Web & Drupal', body: 'Architecture, migrations, modules. The kind of fixes that pay for themselves in a quarter.' },
          { kind: 'ai',  title: 'AI strategy & tooling', body: 'Where to apply it, where not to. Claude in production. Internal tools that actually get used.' },
          { kind: 'frac',title: 'Fractional tech help', body: 'A few hours a month for teams that need a senior brain on call without a full hire.' },
        ].map((s, i) => (
          <div key={s.kind} style={{ borderTop: '1px solid var(--line)', padding: '18px 0', display: 'flex', gap: 14, alignItems: 'flex-start' }}>
            <span className="mono" style={{ width: 22, flexShrink: 0, color: 'var(--accent)' }}>0{i + 1}</span>
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: 16, fontWeight: 600, marginBottom: 4 }}>{s.title}</div>
              <div style={{ fontSize: 14, color: 'var(--fg-dim)', lineHeight: 1.5, textWrap: 'pretty' }}>{s.body}</div>
            </div>
          </div>
        ))}
        <div style={{ borderTop: '1px solid var(--line)' }}/>

        <a href="mailto:kevin@kevnet.cloud" style={{
          display: 'block', textAlign: 'center', marginTop: 22,
          padding: '14px 16px', border: '1px solid var(--accent)', borderRadius: 10,
          fontSize: 14.5, fontWeight: 500, color: 'var(--accent)',
        }}>
          kevin@kevnet.cloud →
        </a>
      </Section>

      {/* DIRECT BOOKING */}
      <hr/>
      <section style={{ padding: '32px 22px' }}>
        <div className="mono" style={{ marginBottom: 8 }}>off-app · for repeat passengers</div>
        <div style={{ fontSize: 17, fontWeight: 500, marginBottom: 8, letterSpacing: '-0.01em' }}>Already know me?</div>
        <p style={{ fontSize: 14, color: 'var(--fg-dim)', margin: '0 0 12px', lineHeight: 1.55, textWrap: 'pretty' }}>
          You can book me directly for airport runs, events, and longer trips.
        </p>
        <a href="mailto:kevin@kevnet.cloud" className="ulink" style={{ fontSize: 13.5, color: 'var(--accent)' }}>
          email to set it up
        </a>
      </section>

      {/* CONNECT */}
      <hr/>
      <section style={{ padding: '28px 22px' }}>
        <div className="mono" style={{ marginBottom: 14 }}>connect</div>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 1, background: 'var(--line)', border: '1px solid var(--line)' }}>
          {[
            ['email', 'kevin@kevnet.cloud'],
            ['twitch', '/thekevinshow'],
            ['linkedin', '/in/kevin'],
            ['github', '@kevnet'],
          ].map(([k, v]) => (
            <a key={k} href="#" className="tile" style={{ background: 'var(--bg)', padding: '14px 14px', display: 'block' }}>
              <div className="mono" style={{ marginBottom: 4 }}>{k}</div>
              <div style={{ fontSize: 13.5, color: 'var(--fg)' }}>{v}</div>
            </a>
          ))}
        </div>
      </section>

      {/* FOOTER */}
      <footer style={{ padding: '20px 22px 36px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <span className="mono">© 2026 kevin · springfield mo</span>
        <span className="mono">built by kevin</span>
      </footer>
    </div>
  );
}

function Section({ v1Label, title, id, children }) {
  return (
    <section id={id} style={{ padding: '30px 22px 32px' }}>
      <div className="mono" style={{ marginBottom: 8 }}>{v1Label}</div>
      <h2 style={{ fontSize: 28, margin: '0 0 22px', fontWeight: 600, letterSpacing: '-0.025em' }}>{title}</h2>
      {children}
    </section>
  );
}

window.VariantRefined = VariantRefined;
