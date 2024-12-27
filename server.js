/* eslint-disable @typescript-eslint/no-require-imports */

const express = require('express')
const serveStatic = require('serve-static')
const path = require('path')

const port = process.env.PORT || 80
const baseDir = path.join(__dirname, 'dist')
const server = express()

server.use(serveStatic(baseDir))

server.get('/*', (req, res) => {
  res.sendFile(path.join(baseDir, 'index.html'))
})

server.listen(port)
