const express = require("express");
const { dirname } = require("path");
const path = require("path");
const { addNote, getNotes, removeNoteById, editNote } = require("./notes.controller");

const port = 3000;
const app = express();

// переопределяем базовые настройки express
app.set("view engine", "ejs");
app.set("views", "pages");

// научить express c какими данными работаем middleware
app.use(express.static(path.resolve(__dirname, "public")));
app.use(express.urlencoded({
  extended: true
}));
app.use(express.json());

app.get("/", async (req, res) => {
  res.render("index", {
    title: "Express App",
    notes: await getNotes(),
    created: false
  });
});

app.post("/", async (req, res) => {
  await addNote(req.body.title);
  res.render("index", {
    title: "Express App",
    notes: await getNotes(),
    created: true
  });
});

app.put("/:id", async (req, res) => {
  await editNote(req.params.id, req.body.title);
  res.render("index", {
    title: "Express App",
    notes: await getNotes(),
    created: false
  });
});

app.delete("/:id", async (req, res) => {
  await removeNoteById(req.params.id);
  res.render("index", {
    title: "Express App",
    notes: await getNotes(),
    created: false
  });
});

app.listen(port, () => {
  console.log(`Server has been started ${port}....`);
});