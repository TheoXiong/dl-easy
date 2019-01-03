const download = (win, url = '', options = {}) => {
  return new Promise((resolve, reject) => {
    if (!(win &&  win.webContents && typeof win.webContents.downloadURL === 'function')) {
      return reject(new Error('In need of a valid instance of BrowserWindow'))
    }
    
    const listener = (event, item, webContents) => {
      let isStart = false
      let isOver = false
      setTimeout(() => {
        if (item && typeof item.isDestroyed === 'function') {
          // download item has been destroyed, but the event has not been captured
          if (isStart && !isOver && item.isDestroyed()) {
            if (typeof options.onCancel === 'function') {
              options.onCancel(item)
            }
          } 
        }
      }, 2000)

      if (typeof options.onStart === 'function') {
        isStart = true
        options.onStart(item)
      }

      item.once('done', (event, state) => {
        isOver = true
        if (state === 'completed') {
          return resolve(item)
        } else if (state === 'cancelled') {
          if (typeof options.onCancel === 'function') {
            options.onCancel(item)
          }
        } else if (state === 'interrupted') {
          return reject(new Error('download interrupted'))
        }
      })
    }
    
    win.webContents.session.once('will-download', listener)
    win.webContents.downloadURL(url)
  })
}

module.exports = {
  download
}