const { Sequelize, DataTypes } = require('sequelize')

// Development
const db = new Sequelize(
  'postgres://postgres:950423@127.0.0.1:5432/mydb'
)
// Production
//const pg = require('pg')
//pg.defaults.ssl = true
//const db = new Sequelize(process.env.DATABASE_URL, {
//  ssl: true,
 // dialectOptions: { ssl: { require: true, rejectUnauthorized: false } },
//})

/**
 * Function to define the structure of the database
 */
function defineDatabaseStructure() {
  const People = db.define(
    'people',
    {
      name: DataTypes.STRING,
      image: DataTypes.STRING,
      overview: DataTypes.TEXT,
      details: DataTypes.TEXT,
    },
    {
      underscored: true,
    }
  )
  const Area = db.define(
    'area',
    {
      title: DataTypes.STRING,
      image: DataTypes.STRING,
      overview: DataTypes.TEXT,
      details: DataTypes.TEXT,
    },
    {
      underscored: true,
    }
  )
  const Product = db.define(
    'product',
    {
      title: DataTypes.STRING,
      overview: DataTypes.TEXT,
      image: DataTypes.STRING,
      preview: DataTypes.STRING,
      details: DataTypes.TEXT,
    },
    {
      underscored: true,
    }
  )
  const Service = db.define(
    'service',
    {
      title: DataTypes.STRING,
      overview: DataTypes.TEXT,
      image: DataTypes.STRING,
      details: DataTypes.TEXT,
      case: DataTypes.TEXT,
    },
    {
      underscored: true,
    }
  )
  Area.belongsToMany(People, {through: 'AreaPeople'});
  People.belongsToMany(Area, {through: 'AreaPeople'});
  Area.hasMany(Product);
  Product.belongsTo(Area);
  Area.hasMany(Service);
  Service.belongsTo(Area);
  People.belongsToMany(Product, {through: 'PeopleProduct'});
  Product.belongsToMany(People, {through: 'PeopleProduct'});
  People.belongsToMany(Service, {through: 'PeopleService'});
  Service.belongsToMany(People, {through: 'PeopleService'});

  const Article = db.define(
    'article',
    {
      title: DataTypes.STRING,
      content: DataTypes.TEXT,
      summary: DataTypes.STRING,
      image: DataTypes.STRING,
    },
    {
      underscored: true,
    }
  )
  const Comment = db.define(
    'comment',
    {
      content: DataTypes.TEXT,
      image: {
        type: DataTypes.STRING,
        allowNull: true,
      },
    },
    {
      underscored: true,
    }
  )
  // Creating the 1 -> N association between Article and Comment
  // More on association: https://sequelize.org/master/manual/assocs.html
  Article.hasMany(Comment, { foreignKey: 'article_id' })
  db._tables = {
    Article,
    Comment,
    Area,
    People,
    Product,
    Service,
  }
}

/**
 * Function to insert some fake info in the database
 */
async function insertFakeData() {
  const { Article, Comment, Area, People, Product, Service } = db._tables
  // Create the first Article
  const firstArticle = await Article.create({
    title: 'Such good article',
    summary: 'This is the summary of the first good article',
    content: 'The content of the first article',
    image:
      'https://www.meme-arsenal.com/memes/98c0fb217e3b35d20518647668cea5dc.jpg',
  })
  await Article.create({
    title: 'Why Fallout 76 is broken',
    summary: '..no really... why?',
    content:
      'After more than 50 hours plundering the irradiated wasteland of Fallout 76, the greatest mystery still lingering is who this mutated take on Fallout is intended for. Like many of Vault-Tec’s underground bunkers, Bethesda’s multiplayer riff on its post-nuclear RPG series is an experiment gone awry. There are bright spots entangled in this mass of frustratingly buggy and sometimes conflicting systems, but what fun I was able to salvage from the expansive but underpopulated West Virginia map was consistently overshadowed by the monotony of its gathering and crafting treadmill.\nOn the surface, Fallout 76 is another dose of Bethesda’s tried-and-true open-world RPG formula on a larger-than-ever map that’s begging to be explored. As you emerge from Vault 76 you’ll start in a relatively peaceful forest and venture out into more dangerous pockets of the irradiated wasteland. My favorite is traveling the lengths of the Cranberry Bog, where the pinkish-red fields are seemingly inviting from afar but turn out to be full of a snaking system of trenches and alien forests that hide the worst horrors of the wasteland, but there are many more.',
    image:
      'https://www.meme-arsenal.com/memes/925f3e6e213ebe0bc196d379a7281ee8.jpg',
  })
  const comment1 = await Comment.create({
    content: 'Great article! Keep posting',
  })
  const comment2 = await Comment.create({
    content: 'Such Doge.',
  })
  // Adding the first comment to the first article
  await firstArticle.addComment(comment1.id)
  // Adding the second comment to the first article
  await firstArticle.addComment(comment2.id)

  const people1 = await People.create({
    name: 'people1',
    overview: 'people1 overview',
    details: 'people1 details',
  })
  const area1 = await Area.create({
    title: 'area1',
    overview: 'area1 overview',
    details: 'area1 details',
  })
  const product1 = await Product.create({
    title: 'product1',
    overview: 'prduct1 overview',
    details: 'product1 details',
  })
  const service1 = await Service.create({
    title: 'service1',
    overview: 'service1 overview',
    details: 'service1 details',
    case: 'service1 case',
  })
  await area1.addPeople(people1.id);
  await area1.addProduct(product1.id);
  await area1.addService(service1.id);
  await people1.addProduct(product1.id);
  await people1.addService(service1.id);
}
/**
 * Function to initialize the database. This is exported and called in the main api.js file
 */
async function initializeDatabase() {
  // Call the function for the database structure definition
  defineDatabaseStructure()
  // Synchronize Sequelize with the actual database
  await db.sync({force: true})
  insertFakeData();
  return db
}

export default initializeDatabase
