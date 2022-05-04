const express = require('express')
const app = express()
app.set("view engine", "ejs")


app.get('/', (req, res) => {
  res.render("index.ejs")
})

app.use(express.static(__dirname + '/public'));

const port = 8080
app.listen(port, () => {
  console.log(`Server listening on port ${port} 🚀`)
})
