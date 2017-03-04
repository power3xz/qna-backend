import loki from 'lokijs';

const db = new loki('./server/db/db.json');
// db.loadDatabase({}, () => {
//   let questions = db.getCollection('questions');
//   if (!questions) {
//     questions = db.addCollection('questions');
//   }

//   db.saveDatabase();
// });

export const questions = db.addCollection('questions');