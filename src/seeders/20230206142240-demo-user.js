"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
     */
    await queryInterface.bulkInsert(
      "USER",
      [
        {
          email: "John Doe1",
          username: "John Doe1",
          password: "123456",
        },
        {
          email: "John Doe2",
          username: "John Doe1",
          password: "123456",
        },
        {
          email: "John Doe3",
          username: "John Doe1",
          password: "123456",
        },
      ],
      {}
    );
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  },
};
