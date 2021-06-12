const {firstNames, lastNames} = require("./samples");
const {capitalize, random} = require('./helpers');
const fs = require('fs');

class UsersGenerator {
  users;
  tags;

  constructor() {
    this.users = [];
    this.tags = require('../tags.json');
  }

  generate() {
    const userNumber = this.#getUserNumber();
    this.users = [];

    for (let i = 0; i < userNumber; i++) {
      this.users.push(this.#createUser(i))
    }

    this.#writeUsers();
  }

  #getUserNumber() {
    let userNumber = parseInt(process.argv[2]);

    if (isNaN(userNumber)) {
      userNumber = 100;
    }

    return userNumber;
  }

  #createUser(index) {
    const date = new Date();
    date.setHours(0, 0, 0);
    const timestamp = date.setDate(date.getDate() - index);

    return {
      id: index,
      username: `username_${index}`,
      created_at: timestamp,
      edited_at: timestamp,
      fullName: this.#getFullName(),
      email: `username_${index}@gmail.com`,
      tags: this.#getTags(),
      curator: null,
    };
  }

  #writeUsers() {
    const string = JSON.stringify(this.users, null, '\t');

    fs.writeFile('users.json', string, function (err) {
      if (err) {
        console.error(err);
      } else {
        console.log('done!');
      }
    })
  }

  #getFullName() {
    const firstName = firstNames[random(0, firstNames.length)];
    const lastName = lastNames[random(0, lastNames.length)];

    return `${capitalize(lastName)} ${capitalize(firstName)}`;
  }

  #getTags() {
    const userTags = new Set();

    for (let i = 0; i < 3; i++) {
      const tagIndex = random(0, this.tags.length);
      userTags.add(this.tags[tagIndex]);
    }

    return Array.from(userTags);
  }
}

module.exports.UsersGenerator = UsersGenerator;
