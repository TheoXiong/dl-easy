const download = (win, url = '', options = {}) => {
  return new Promise((resolve, reject) => {
    if (!(win &&  win.webContents && typeof win.webContents.downloadURL === 'function')) {
      return reject(new Error('In need of a valid instance of BrowserWindow'))
    }
    
    const session = win.webContents.session
    const listener = (event, item, webContents) => {
      if (typeof options.onStart === 'function') {
        options.onStart(item)
      }
  
      item.once('done', (event, state) => {
        session.removeListener('will-download', listener)
        if (state === 'completed') {
          resolve(item)
        } else if (state === 'cancelled') {
          if (typeof options.onCancel === 'function') {
            options.onCancel(item)
          }
        } else if (state === 'interrupted') {
          reject(new Error('download interrupted'))
        }
      })
    }
  
    session.on('will-download', listener)
    win.webContents.downloadURL(url)
  })
}

module.exports = {
  download
}