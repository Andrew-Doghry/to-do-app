const express = require("express")
const app = express()
const ejs = require("ejs")
app.set('view engine', "ejs")
const path = require("path")
app.use(express.static(__dirname + "/public"))
app.use(express.json())
const tasks = {
    data: [],
    findOne: function (id) {
        return this.data.find(e => e.id == id)
    },
    DeleteOne: function (id) {
        this.data = this.data.filter(e => e.id !== id)
    },
}
app.get("/", (req, res) => {
    res.render(path.join(__dirname, "views", "index.ejs"), { tasks: tasks.data })
})
app.post("/", (req, res) => {
    if (req.body) {
        tasks.data.push(req.body)
    }
    res.sendStatus(204)
})
app.delete('/admin', (req, res) => {
    tasks.data = []
    console.log("data deleted")
    res.sendStatus(204)
})
app.get('/admin', (rea, res) => {
    res.render(path.join(__dirname, "views/admin.ejs"), { tasks: tasks.data })
})
app.delete('/:id', (req, res) => {
    const id = req.params.id;
    console.log(id)
    tasks.DeleteOne(+id)
})

app.listen(process.env.PORT || 5000, () => {
    console.log('listening to port :3003')
})


