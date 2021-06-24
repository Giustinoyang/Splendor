import express from 'express'
import initializeDatabase from '../db-conn'
const app = express()

// We need this one if we send data inside the body as JSON
app.use(express.json())

async function init() {
  // Call the init function that returns the Database
  const db = await initializeDatabase()
  // Let's extract all the objects we need to perform queries inside the endpoints
  const { Article, Comment, Area, People, Product, Service, SubArea } = db._tables
  // API to get all the articles
  app.get('/articles', async (req, res) => {
    const articles = await Article.findAll()
    return res.json(articles)
  })
  // API to get an article by ID.
  // This one will return also the comments
  app.get('/article/:id', async (req, res) => {
    const { id } = req.params
    const article = await Article.findOne({
      where: { id },
      include: { model: Comment }, // -> this is the way we "include" also comments inside Articles
    })
    return res.json(article)
  })
  app.get('/areas', async (req, res) =>{
    const areas = await Area.findAll()
    return res.json(areas)
  })
  app.get('/area/:id', async (req, res) =>{
    const { id } = req.params
    const area = await Area.findOne({
      where: {id},
      include:[People, Product, Service, SubArea,],
    })
    return res.json(area)
  })
  app.get('/people', async (req, res) =>{
    const people = await People.findAll()
    return res.json(people)
  })
  app.get('/person/:id', async (req, res) =>{
    const { id } = req.params
    const people = await People.findOne({
      where: {id},
      include:[Area,Product, Service],
    })
    return res.json(people)
  })
  app.get('/people/:position', async(req, res)=>{
    const{ position } = req.params
    const person = await People.findAll({
      where: {position: position},
    })
    return res.json(person);
  })
  app.get('/positions', async(req, res) =>{
    const postitions = await People.findAll({
      attributes: ['position'],
      group: 'position'
    })
    return res.json(postitions)
  })
  app.get('/products', async(req, res) =>{
    const products =await Product.findAll()
    return res.json(products)
  })
  app.get('/product/:id', async(req, res) =>{
    const { id } = req.params
    const product = await Product.findOne({
      where: {id},
      include: [People, Area],
    })
    return res.json(product)
  })
  app.get('/services', async(req, res) =>{
    const services =await Service.findAll()
    return res.json(services)
  })
  app.get('/service/:id', async(req, res) =>{
    const { id } = req.params
    const service = await Service.findOne({
      where: {id},
      include: [People, Area],
    })
    return res.json(service)
  })
  // This one is just an example
  app.get('/ad', (req, res) => {
    return res.json({
      url:
        'https://wordstream-files-prod.s3.amazonaws.com/s3fs-public/styles/simple_image/public/images/media/images/google-display-ads-example-2-final.png?oV7qevVB2XtFyF_O64TG6L27AFM3M2oL&itok=TBfuuTM_',
    })
  })
}

init()

export default app
   