"use strict";
const faker = require("faker");
const uuidv3 = require('uuid/v1');
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable(
      "Messages",
      [
        {
          id:1,
          message: "mwambie deree acome na kamzigo",
          status: "read",
          senderId: 1,
          receiverId: 2,
          createdAt: faker.date.past(),
          updatedAt: faker.date.past()
        },
        {
          id:2,
          message: "Jamaa kasema anachelewa so we tangulia tu",
          status: "unread",
          senderId: 2,
          receiverId: 3,
          createdAt: faker.date.past(),
          updatedAt: faker.date.past()
        },
        {
          id:3,
          message: "mwambie deree acome na kamzigo",
          status: "read",
          senderId:3,
          receiverId: 1,
          createdAt: faker.date.past(),
          updatedAt: faker.date.past()
        },
        {
          id:4,
          message: "mwambie deree acome na kamzigo",
          status: "read",
          senderId: 1,
          receiverId:3,
          createdAt: faker.date.past(),
          updatedAt: faker.date.past()
        },
        {
          id:5,
          message: "mwambie deree acome na kamzigo",
          status: "read",
          senderId: 2,
          receiverId:1,
          createdAt: faker.date.past(),
          updatedAt: faker.date.past()
        },
      ],
      {}
    );
  },

  down: (queryInterface, Sequelize) => {
   
      Example:
      return queryInterface.bulkDelete('Messages', null, {});
  }
};