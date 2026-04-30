// Lightweight phone frame for mobile mockups inside a DCArtboard.
// Just visual chrome — status bar + scrollable content area.

function PhoneFrame({ children, statusBarColor = '#fff', statusBarFg = '#000', bg = '#fff' }) {
  return (
    <div style={{
      width: 390, height: 844,
      background: bg,
      position: 'relative',
      overflow: 'hidden',
      fontFamily: 'inherit',
    }}>
      {/* iOS-ish status bar */}
      <div style={{
        position: 'absolute', top: 0, left: 0, right: 0, height: 44,
        background: statusBarColor,
        color: statusBarFg,
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        padding: '0 28px',
        fontSize: 15, fontWeight: 600,
        fontFamily: '-apple-system, BlinkMacSystemFont, system-ui, sans-serif',
        zIndex: 100,
        letterSpacing: -0.2,
      }}>
        <span>9:41</span>
        <div style={{ display: 'flex', alignItems: 'center', gap: 5 }}>
          {/* signal */}
          <svg width="17" height="11" viewBox="0 0 17 11" fill={statusBarFg}>
            <rect x="0" y="7" width="3" height="4" rx="0.5"/>
            <rect x="4.5" y="5" width="3" height="6" rx="0.5"/>
            <rect x="9" y="2.5" width="3" height="8.5" rx="0.5"/>
            <rect x="13.5" y="0" width="3" height="11" rx="0.5"/>
          </svg>
          {/* wifi */}
          <svg width="15" height="11" viewBox="0 0 15 11" fill={statusBarFg}>
            <path d="M7.5 11l2-2.5a2.5 2.5 0 0 0-4 0L7.5 11zM7.5 7.5a4.5 4.5 0 0 1 3.5 1.7l1.4-1.7a6.5 6.5 0 0 0-9.8 0l1.4 1.7a4.5 4.5 0 0 1 3.5-1.7zM7.5 4a8.5 8.5 0 0 1 6.5 3l1-1.2a10 10 0 0 0-15 0l1 1.2A8.5 8.5 0 0 1 7.5 4z"/>
          </svg>
          {/* battery */}
          <svg width="25" height="11" viewBox="0 0 25 11" fill="none">
            <rect x="0.5" y="0.5" width="22" height="10" rx="2.5" stroke={statusBarFg} strokeOpacity="0.4"/>
            <rect x="2" y="2" width="19" height="7" rx="1" fill={statusBarFg}/>
            <rect x="23.5" y="3.5" width="1.5" height="4" rx="0.5" fill={statusBarFg} fillOpacity="0.4"/>
          </svg>
        </div>
      </div>
      {/* content area */}
      <div style={{ position: 'absolute', top: 44, left: 0, right: 0, bottom: 0, overflowY: 'auto', overflowX: 'hidden' }}
           className="phone-scroll">
        {children}
      </div>
    </div>
  );
}

window.PhoneFrame = PhoneFrame;
