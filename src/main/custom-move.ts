import { BrowserWindow, screen } from 'electron'

export class CustomMove {
  isMoving = false
  startPos = {
    winx: 0,
    winy: 0,
    cx: 0,
    cy: 0
  }

  public moveStart(win: BrowserWindow): void {
    const { x, y } = win.getBounds()
    const cursorpos = screen.getCursorScreenPoint()
    this.startPos = {
      winx: x,
      winy: y,
      cx: cursorpos.x,
      cy: cursorpos.y
    }

    this.isMoving = true
    this.move(win)
  }

  private move(win: BrowserWindow): void {
    if (!this.isMoving) return
    const cursorpos = screen.getCursorScreenPoint()
    const { winx, winy, cx, cy } = this.startPos

    const x = winx + (cursorpos.x - cx)
    const y = winy + (cursorpos.y - cy)
    const { width, height } = win.getBounds()

    win.setBounds({
      x,
      y,
      width,
      height
    })

    setTimeout(() => {
      this.move(win)
    }, 10)
  }

  public end(): void {
    this.isMoving = false
  }
}
