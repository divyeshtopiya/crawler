/**
 * Created by tushar on 13/09/17.
 */

'use strict'

const express = require('express')
const path = require('path')

exports.startServer = ({port, graph, delay}) =>
  new Promise(resolve => {
    const app = express()
    const firstNode = Object.values(graph)[0]
    app.set('view engine', 'pug')
    app.set('views', path.resolve(__dirname, './views'))
    app.use(express.static('public'))
    app.get('/', (req, res) =>
      res.render('index', {cache: true, node: firstNode})
    )
    app.get('/:hash', (req, res, next) => {
      const node = graph[req.params.hash]
      if (node)
        setTimeout(() => res.render('index', {cache: true, node}), delay)
      else next()
    })
    const server = app.listen(port, () => {
      resolve(server)
    })
  })

exports.stopServer = server => new Promise(resolve => server.close(resolve))
