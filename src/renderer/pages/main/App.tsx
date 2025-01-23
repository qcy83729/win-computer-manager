function App(): JSX.Element {
  const openNetWin = (): void => {
    window.electron.ipcRenderer.send('open_net_circle_win')
    console.log(+new Date())
  }

  return (
    <>
      <div className="action">
        <button onClick={openNetWin}>打开网络窗口</button>
      </div>
    </>
  )
}

export default App
