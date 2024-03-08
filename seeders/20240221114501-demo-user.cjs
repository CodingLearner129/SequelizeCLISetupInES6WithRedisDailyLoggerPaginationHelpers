'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
     */
    const db = await import('../models/index.js');
    // await db.default.User.destroy({ where: {}, truncate: true });
    await db.default.User.truncate();
    return await db.default.User.bulkCreate([
      {
        firstName: 'John',
        lastName: 'Doe',
        email: 'example@example.com',
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ]);
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    const db = await import('../models/index.js');
    // await db.default.User.destroy({ where: {}, truncate: true }); // Use destroy instead of bulkDelete
    await db.default.User.truncate();
  }
};
