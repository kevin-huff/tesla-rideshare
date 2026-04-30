// Striped SVG photo placeholder — diagonal hatching with a monospace caption.
// Caller sets aspect via height/width; the stripes scale with size.

function PhotoPlaceholder({
  caption,
  height,
  width = '100%',
  bg = '#1a1a1a',
  fg = '#2a2a2a',
  textColor = 'rgba(255,255,255,0.55)',
  radius = 0,
  style,
}) {
  const id = React.useMemo(() => 'p' + Math.random().toString(36).slice(2, 9), []);
  return (
    <div style={{
      width, height,
      background: bg,
      borderRadius: radius,
      overflow: 'hidden',
      position: 'relative',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      ...style,
    }}>
      <svg width="100%" height="100%" style={{ position: 'absolute', inset: 0 }} preserveAspectRatio="none">
        <defs>
          <pattern id={id} patternUnits="userSpaceOnUse" width="14" height="14" patternTransform="rotate(45)">
            <line x1="0" y1="0" x2="0" y2="14" stroke={fg} strokeWidth="6" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill={`url(#${id})`} />
      </svg>
      <div style={{
        position: 'relative',
        zIndex: 1,
        fontFamily: 'ui-monospace, "SF Mono", Menlo, Monaco, monospace',
        fontSize: 11,
        letterSpacing: '0.08em',
        color: textColor,
        textTransform: 'uppercase',
        background: bg,
        padding: '6px 10px',
        border: `1px solid ${fg}`,
      }}>
        {caption}
      </div>
    </div>
  );
}

window.PhotoPlaceholder = PhotoPlaceholder;
