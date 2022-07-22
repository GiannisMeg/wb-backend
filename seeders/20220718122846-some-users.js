"use strict";
const bcrypt = require('bcrypt');

module.exports = {
	async up(queryInterface, Sequelize) {
		await queryInterface.bulkInsert("users", [
			{
				name: "John Doe",
				createdAt: new Date(),
				updatedAt: new Date(),
			},
			{
				name: "John Doe",
				email: "Jesse",
				password: bcrypt.hashSync("Jessee", 10),
				createdAt: new Date(),
				updatedAt: new Date(),
			},
		]);
	},

	async down(queryInterface, Sequelize) {
		await queryInterface.bulkDelete("users", null, {});
	},
};
