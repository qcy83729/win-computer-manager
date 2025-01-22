import { BrowserWindow } from 'electron'
import { join } from 'path'
import { is } from '@electron-toolkit/utils'

type Key = 'main' | 'net'

class WindowManage {
  private winMap: Record<Key, BrowserWindow> = {} as Record<Key, BrowserWindow>

  private showAndClose(win: BrowserWindow, key: Key): void {
    win.on('closed', () => {
      delete this.winMap[key]
      win = null
      key = null
    })

    win.on('ready-to-show', () => {
      win.show()
    })
  }

  private loadUrl(win: BrowserWindow, fileName: string): void {
    if (is.dev && process.env['ELECTRON_RENDERER_URL']) {
      win.loadURL(`${process.env['ELECTRON_RENDERER_URL']}/${fileName}`)
    } else {
      win.loadFile(join(__dirname, `../renderer/${fileName}`))
    }
  }

  createMainWindow(): BrowserWindow {
    this.winMap.main = new BrowserWindow({
      width: 900,
      height: 670,
      show: false,
      autoHideMenuBar: true,
      webPreferences: {
        preload: join(__dirname, '../preload/index.js'),
        sandbox: false
      }
    })

    this.loadUrl(this.winMap.main, 'index.html')
    this.showAndClose(this.winMap.main, 'main')

    return this.winMap.main
  }

  createNetWin(): BrowserWindow {
    this.winMap.net = new BrowserWindow({
      width: 200,
      height: 200,
      transparent: true,
      frame: false,
      resizable: false,
      maximizable: false,
      webPreferences: {
        preload: join(__dirname, '../preload/index.js'),
        sandbox: false
      }
    })

    this.loadUrl(this.winMap.net, 'net.html')
    this.showAndClose(this.winMap.net, 'net')

    return this.winMap.net
  }

  getWin(key: Key): BrowserWindow | null {
    return this.winMap[key] ?? null
  }
}

export default new WindowManage()
