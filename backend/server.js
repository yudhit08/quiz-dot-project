const express = require('express')
const cors = require('cors')
const bodyParser = require("body-parser")
const dotenv = require('dotenv')

dotenv.config()
const app = express()

const corsOptions = {
  origin: 'http://localhost:5173'
}

app.use(cors(corsOptions))

app.use(bodyParser.json())

const db = require("./models")

db.mongoose
  .connect(db.url)
  .then(() => {
    console.log("connected to database")
  })
  .catch((err) => {
    console.log("cannot connected to database ", err)
  })

app.get("/", (req, res) => {
  res.json({message: "Wellcome to Quiz API"})
})

require("./routes/user.routes")(app)

const PORT = 5000

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})