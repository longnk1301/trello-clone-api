import express from 'express'

const app = express()
const hostname = 'localhost'
const port = 8017

app.get('/', (req,res) => {
  res.end('hello')
})


app.listen(port, hostname, () => {
  console.log(`Running at ${hostname}:${port}/`)
})