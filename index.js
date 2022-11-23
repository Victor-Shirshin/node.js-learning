const yargs = require("yargs");
const { addNote, getNotes, removeNoteById } = require("./notes.controller");
const packageJson = require("./package.json");

yargs.version(packageJson.version);

yargs.command({
  command: "add",
  descrebe: "Add new note to list",
  builder: {
    title: {
      type: "string",
      describe: "Note title",
      demandOption: true
    }
  },
  handler({ title }) {
    console.log("Add command", title);
    addNote(title);
  }
})

yargs.command({
  command: "list",
  descrebe: "Print all notes",
  async handler() {
    const notes = await getNotes()
    notes.map(item => console.log("Here is the list of notes:", `${item.id} ${item.title}`));
  }
})

yargs.command({
  command: "remove",
  descrebe: "Remove notes by id",
  builder: {
    id: {
      type: "number",
      descrebe: "Remove note by id",
      demandOption: true
    }
  },
  async handler({ id }) {
    await removeNoteById(id);
    console.log("noteByIdRemoved", id);
  }
})

yargs.parse();