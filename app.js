const Sequelize = require('sequelize')
const { STRING } = Sequelize;
const db = new Sequelize(process.env.DATABASE_URL || 'postgres://localhost/bookmarks')

const syncAndSeed = async() => {
    await db.sync({ force: true});

    await db.close();
}
