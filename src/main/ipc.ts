import { ipcMain, BrowserWindow } from 'electron'
import WindowManage from './window-manage'
import { CustomMove } from './custom-move'

export class Ipc {
  private static instance: Ipc | null = null
  static listen(): Ipc {
    if (!Ipc.instance) {
      Ipc.instance = new Ipc()
    } else {
      return Ipc.instance
    }

    // 自动监听
    for (const name of Object.getOwnPropertyNames(Ipc.prototype)) {
      if (typeof Ipc.instance[name] === 'function' && name !== 'constructor') {
        Ipc.instance[name]()
      }
    }

    return Ipc.instance
  }

  openNetCirCleWin(): void {
    ipcMain.on('open_net_circle_win', () => {
      WindowManage.createNetWin()
    })
  }

  setIgnoreMouseEvents(): void {
    ipcMain.on('set_ignore_mouse_events', (event, ignore, options) => {
      // 从sender中拿到BrowserWindow
      const win = BrowserWindow.fromWebContents(event.sender)
      win?.setIgnoreMouseEvents(ignore, options)
    })
  }

  winMove(): void {
    ipcMain.on('move_start', (event) => {
      const customMove = new CustomMove()
      customMove.moveStart(BrowserWindow.fromWebContents(event.sender)!)
      ipcMain.on('move_end', () => {
        customMove.end()
      })
    })
  }
}
