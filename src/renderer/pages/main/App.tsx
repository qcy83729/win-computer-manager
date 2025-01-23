function App(): JSX.Element {
  const openNetWin = (): void => {
    console.log('我尼玛启动')
    window.electron.ipcRenderer.send('open_net_circle_win')
  }

  return (
    <>
      <div className="action">
        <a target="_blank" rel="noreferrer" onClick={openNetWin}>
          打开网络窗口
        </a>
      </div>
    </>
  )
}

export default App
