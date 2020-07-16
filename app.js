const chalk = require('chalk');
const yargs = require('yargs');

const {
  getNotes,
  readNote,
  addNote,
  removeNote,
  listNotes,
} = require('./notes');
const log = console.log;

// Difference between parsing of process.argv & yargs.argv
// console.log(process.argv);
// console.log(yargs.argv);
// ======================================================
// ================== Process.argv ========================
// const command = process.argv[2];
// command === 'add'
//   ? log(chalk.green.inverse('Task added!'))
//   : command === 'remove'
//   ? log(chalk.red.inverse('Task removed!'))
//   : log(chalk.magenta.inverse('Undefined task, please try again'));
// ======================================================

// ================== Yargs.argv ========================

// Customize yargs version
// ! Call yargs commands only after version declaration for it to take into effect
yargs.version('1.1.0');

yargs.command({
  command: 'add',
  describe: 'Add a new note',
  builder: {
    title: {
      describe: 'Note Title',
      demandOption: true,
      type: 'string',
    },
    body: {
      describe: 'Note body',
      demandOption: true,
      type: 'string',
    },
  },
  handler(argv) {
    addNote(argv.title, argv.body);
  },
});

yargs.command({
  command: 'remove',
  describe: 'Remove a note',
  builder: {
    title: {
      describe: 'Note title',
      demandOption: true,
      type: 'string',
    },
  },
  // shortform syntax
  handler(argv) {
    removeNote(argv.title);
  },
});

yargs.command({
  command: 'list',
  describe: 'List your notes',
  handler() {
    listNotes();
  },
});

yargs.command({
  command: 'read',
  describe: 'Read a note',
  builder: {
    title: {
      describe: 'Note title',
      demandOption: true,
      type: 'string',
    },
  },
  handler(argv) {
    readNote(argv.title);
  },
});

console.log(yargs.argv);
