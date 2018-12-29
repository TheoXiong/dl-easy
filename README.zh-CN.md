# dl-easy

简体中文 | [English](./README.md)

## 简介
在Electron应用中下载文件

## 安装
``` 
$   npm install dl-easy --save
```

## 使用
```
# 1. CommonJs 
const { download } = require('dl-easy')
# 2. ES6
import { download } from 'dl-easy'

# 基本用法
const { remote } = require('electron')
download(remote.getCurrentWindow(), url)
  .then(file => {
    // download success
  })
  .catch(err => {
    // download fail  
  })

# 带回调
download(remote.getCurrentWindow(), url, {
  'onStart': (file) => { 
    // download has started
  },
  'onCancel': (fileObj) => { 
    // download has canceled
  }
})
  .then(file => {
    // download success
  })
  .catch(err => {
    // download fail  
  })

```