const mongoose = require("mongoose");

if (process.argv.length < 3) {
  console.log("give password as argument");
  process.exit(1);
}

const password = process.argv[2];

const url = `mongodb+srv://fullstack:${password}@cluster0-xeieo.mongodb.net/phonebook?retryWrites=true&w=majority`;

mongoose.connect(url, { useNewUrlParser: true });

const personSchema = new mongoose.Schema({
  name: String,
  number: String
});

const Person = mongoose.model("Person", personSchema);

if (process.argv.length === 5) {
  const newPerson = new Person({
    name: process.argv[3],
    number: process.argv[4]
  });

  newPerson.save().then(res => {
    console.log(`added ${res.name} number ${res.number} to phonebook`);
    mongoose.connection.close();
    process.exit(1);
  });
} else {
  Person.find({}).then(res => {
    console.log("Phonebook:");
    res.forEach(p => {
      console.log(p.name, p.number);
    });
    mongoose.connection.close();
  });
}
