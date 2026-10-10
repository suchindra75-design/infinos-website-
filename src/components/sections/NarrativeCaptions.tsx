'use client'

import { CAPTIONS } from '@/content/site'
import { useExperienceStore } from '@/state/experienceStore'

export function NarrativeCaptions() {
  const phase = useExperienceStore((s) => s.phase)
  const chapterProgress = useExperienceStore((s) => s.chapterProgress)

  const caption = CAPTIONS[phase]
  const fade = Math.min(1, chapterProgress / 0.12) * Math.min(1, (1 - chapterProgress) / 0.12)
  const y = (1 - Math.min(1, chapterProgress / 0.12)) * 24

  return (
    <div
      className="captions"
      style={{
        opacity: caption ? fade : 0,
        visibility: caption && fade > 0.01 ? 'visible' : 'hidden',
        transform: `translateY(${y}px)`,
      }}
    >
      {caption && (
        <>
          <p className="caption-kicker">{caption.kicker}</p>
          <h2 className="caption-title">{caption.title}</h2>
          {caption.meta && <p className="caption-meta">{caption.meta}</p>}
        </>
      )}
    </div>
  )
}
