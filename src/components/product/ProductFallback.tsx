export function ProductFallback() {
  return (
    <div className="product-fallback" aria-hidden="true">
      <svg viewBox="0 0 300 380" width="300" height="380">
        <rect x="40" y="30" width="220" height="330" rx="18" fill="none" stroke="rgba(238,241,244,0.35)" strokeWidth="1.5" />
        <rect x="56" y="96" width="188" height="10" rx="5" fill="rgba(238,241,244,0.12)" />
        <rect x="56" y="160" width="188" height="46" rx="8" fill="rgba(238,241,244,0.08)" />
        <rect x="56" y="250" width="188" height="8" rx="4" fill="rgba(194,122,58,0.4)" />
        <rect x="56" y="296" width="120" height="24" rx="6" fill="rgba(238,241,244,0.1)" />
        <rect x="106" y="52" width="88" height="46" rx="6" fill="#05070a" stroke="rgba(238,241,244,0.3)" strokeWidth="1" />
        <text x="150" y="83" textAnchor="middle" fill="#eef1f4" fontSize="24" fontFamily="monospace">04.2</text>
      </svg>
      <p className="product-fallback-note">STATIC SCHEMATIC — WEBGL UNAVAILABLE</p>
    </div>
  )
}
