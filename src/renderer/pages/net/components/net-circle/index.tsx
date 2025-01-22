import css from './index.module.scss'
import React, { useEffect, useState, useCallback } from 'react'

export function NetCircle(): React.Element {
  const [mode, setMode] = useState<'circle' | 'win'>('circle')

  const mouseMoveHandle = useCallback((ev: MouseEvent): void => {
    if (ev.target === document.documentElement) {
      window.electron.ipcRenderer.send('set_ignore_mouse_events', true, { forward: true })
    } else {
      window.electron.ipcRenderer.send('set_ignore_mouse_events', false)
    }
  }, [])

  const mousedownHandle = useCallback(() => {
    window.electron.ipcRenderer.send('move_start')
  }, [])

  const mouseupHandle = useCallback(() => {
    window.electron.ipcRenderer.send('move_end')
  }, [])

  useEffect(() => {
    if (mode === 'circle') {
      window.addEventListener('mousemove', mouseMoveHandle)
      window.addEventListener('mousedown', mousedownHandle)
      window.addEventListener('mouseup', mouseupHandle)
    }

    return (): void => {
      window.removeEventListener('mousemove', mouseMoveHandle)
      window.removeEventListener('mousedown', mousedownHandle)
      window.removeEventListener('mouseup', mouseupHandle)
    }
  }, [mode])

  return (
    <div className={css.circle_box}>
      <div>
        <span>上行</span>
        <span>20kb/s</span>
      </div>
      <div>
        <span>下行</span>
        <span>20kb/s</span>
      </div>
    </div>
  )
}
