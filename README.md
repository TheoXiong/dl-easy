# dl-easy

English | [简体中文](./README.zh-CN.md)

## Introduction
Simply download file in electron application.

## Install
``` 
$   npm install dl-easy --save
```

## Usage
```
# 1. CommonJs 
const { download } = require('dl-easy')
# 2. ES6
import { download } from 'dl-easy'

# basic usage
const { remote } = require('electron')
download(remote.getCurrentWindow(), url)
  .then(file => {
    // download success
  })
  .catch(err => {
    // download fail  
  })

# with callback
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

