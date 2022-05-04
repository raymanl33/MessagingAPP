const express = require('express')
const app = express()
app.set("view engine", "ejs")

// app.get('/', (req, res) => {
//     res.send('Hello World!')
// })

// app.get("/goodbye", (req,res) => {
//     res.send("<h1>goodbye world!</h1>")
// })



app.get('/', (req, res) => {
  res.send(`<h1>${Date()}</h1>`)
})

app.use(express.static("views"))

const port = 8080
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
