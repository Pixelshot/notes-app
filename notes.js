const fs = require('fs');
const chalk = require('chalk');

const readNote = (title) => {
  const notes = loadNotes();
  const noteTitle = notes.find((note) => note.title === title);
  if (noteTitle) {
    console.log(chalk.cyan.inverse("Here's your note"));
    console.log(chalk.inverse.green(noteTitle.title));
    console.log(noteTitle.body);
  } else {
    console.log(chalk.inverse.red('Note not found!'));
  }
};

const addNote = (title, body) => {
  const notes = loadNotes();
  const duplicateNote = notes.find((note) => note.title === title);

  if (!duplicateNote) {
    notes.push({
      title: title,
      body: body,
    });

    saveNotes(notes);
    console.log(chalk.inverse.green('Note successfully added!'));
  } else {
    console.log(chalk.red.inverse('Duplication of title found!'));
  }
};

const saveNotes = (notes) => {
  const dataJSON = JSON.stringify(notes);
  fs.writeFileSync('notes.json', dataJSON);
};

const removeNote = (title) => {
  let notes = loadNotes();
  // This is to exclude the note that we're trying to delete(via title)
  notesToKeep = notes.filter((note) => note.title !== title);
  // To check if the note is in the array
  if (notes.length > notesToKeep.length) {
    console.log(chalk.inverse.yellow('Note successfully deleted!'));
    saveNotes(notesToKeep);
  } else {
    console.log(chalk.inverse.red('Note not found!'));
  }
};

const listNotes = () => {
  console.log(chalk.magenta.inverse('Listing your notes..'));
  let notes = loadNotes();
  notes.forEach((note) => console.log(note.title));
};

const loadNotes = () => {
  // If there is a file called 'notes.js' then read from it. Else return an empty array
  try {
    const dataBuffer = fs.readFileSync('notes.json');
    const dataJSON = dataBuffer.toString();
    return JSON.parse(dataJSON);
  } catch (e) {
    return [];
  }
};

module.exports = {
  readNote: readNote,
  addNote: addNote,
  removeNote: removeNote,
  listNotes: listNotes,
};
