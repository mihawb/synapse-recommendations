const express = require('express');
const { rmSync } = require('fs');
const path = require('path')
const app = express()
const port = process.env.PORT || 3000

app.use(express.static(path.join(__dirname, '../frontend/build')));

app.get('/', (req, res) => {
	res.sendFile(path.join(__dirname, '../frontend/build', 'index.html'))
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})