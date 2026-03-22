import { ImageResponse } from 'next/og'

export const size = { width: 32, height: 32 }
export const contentType = 'image/png'

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          background: '#162040',
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          borderRadius: '4px',
        }}
      >
        <div
          style={{
            display: 'flex',
            alignItems: 'baseline',
            fontFamily: 'sans-serif',
            fontWeight: 900,
            fontSize: '13px',
            letterSpacing: '-0.5px',
            lineHeight: 1,
          }}
        >
          <span style={{ color: '#FFFFFF' }}>G</span>
          <span style={{ color: '#E8A820' }}>T</span>
          <span style={{ color: '#FFFFFF' }}>M</span>
        </div>
      </div>
    ),
    { ...size }
  )
}
