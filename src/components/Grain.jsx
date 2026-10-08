export default function Grain() {
  return (
    <>
      <svg className="pointer-events-none absolute h-0 w-0">
        <filter id="grain">
          <feTurbulence
            type="fractalNoise"
            baseFrequency="0.9"
            numOctaves="2"
            stitchTiles="stitch"
          />
          <feColorMatrix type="saturate" values="0" />
        </filter>
      </svg>
      <div
        className="pointer-events-none fixed inset-0 z-[90] opacity-[0.06] mix-blend-overlay"
        style={{ filter: 'url(#grain)' }}
      />
    </>
  )
}