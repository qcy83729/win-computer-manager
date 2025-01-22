import { ipcMain } from 'electron'
import WindowManage from './window-manage'

export class Ipc {
  private static instance: Ipc | null = null
  static listen(): Ipc {
    if (!Ipc.instance) {
      Ipc.instance = new Ipc()
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
      WindowManage.createNetCircleWin()
    })
  }
}
