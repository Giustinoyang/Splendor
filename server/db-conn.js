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


  const ReginaBarzilay = await People.create({
    name: 'Regina Barzilay',
    overview: 'I develop machine learning models that aim to understand and generate natural languages and focous on big data.',
    details: 'We are currently witnessing the first generation of NLP tools that have been deployed at scale and are used by millions of people. However, the major component of this success is access to large amounts of training data which machines use to learn mappings between input and output. I am interested in designing algorithms that do not suffer from this annotation dependence. Specifically, we are developing deep learning models that can transfer annotations across domains and languages, that can learn from a few annotated examples by utilizing supplementary data sources, and that can take advantage of human-provided rationales to constrain model structure.',
  })
  const MohammadAlizadeh = await People.create({
    name: 'Mohammad Alizadeh',
    overview: 'I work in the areas of computer networks and big data.',
    details: 'My research aims to improve the performance, robustness, and ease of management of future networks and cloud computing systems. My current research centers on network protocols and algorithms for large-scale datacenters, programmable switching architectures, and learning-based networked systems. I am also broadly interested in performance modeling and analysis of computer systems and bridging theory and practice in computer system design.',
  })
  const HariBalakrishnan = await People.create({
    name: 'Hari Balakrishnan',
    overview: 'I am interested in the area of networked computer systems.',
    details: 'My work is in the area of networked computer systems, with current interests in networking, sensing, and perception for a world of mobile, sensor-equipped devices connected to services running in the cloud or the network edge. My past work has contributed to mobile and sensor computing, wireless networks, Internet architecture (congestion control, routing, network security), overlay and P2P networks, and data management (stream processing and secure databases)',
  })
  const TamaraBroderick = await People.create({
    name: 'Tamara Broderick1',
    overview: 'I am interested in big data.',
    details: 'In my project, I am interested in understanding how we can reliably quantify uncertainty and robustness in modern, complex data analysis procedures. To that end, I am particularly interested in Bayesian inference and graphical models – with an emphasis on scalable, nonparametric, and unsupervised learning.',
  })
  const JacobAndreas = await People.create({
    name: 'Jacob Andreas',
    overview: 'I am interested in language as a communicative and computational tool.',
    details: 'My work aims to (1) understand the computational foundations of efficient language learning, and (2) build general-purpose intelligent systems that can communicate effectively with humans and learn from human guidance.',
  })
  const AdamChlipala = await People.create({
    name: 'Adam Chlipala',
    overview: 'My research is about the network security.',
    details: 'My traditional areas are programming languages and formal methods, but my interests have broadened to include other aspects of computer-system design and implementation. I like the idea of doing clean-slate redesign of computing stacks with current security and privacy concerns front-and-center, which I do believe involves, in a central way, my traditional focus of mechanized mathematical proof.',
  })
  const FredoDurand = await People.create({
    name: 'Fredo Durand',
    overview: 'I work in the area about computer grphic and use artificial intelligence to deal with. ',
    details: 'I interest span most aspects of picture generation and creation. This includes realistic graphics, real-time rendering, non-photorealistic rendering, as well as computational photography.',
  })
  const WilliamFreeman = await People.create({
    name: 'William Freeman',
    overview: 'I deal with computer graphic and machine learning.',
    details: 'My current research interests include machine learning applied to computer vision, Bayesian models of visual perception, and interactive applications of computer vision.',
  })
  const TommiJaakkola = await People.create({
    name: 'Tommi Jaakkola',
    overview: 'My research is about machine learning.',
    details: 'Our project advances how machines can learn, predict or control, and do so at scale in an efficient, principled, and interpretable manner. Our research in machine learning extends from foundational theory to modern applications, focusing especially on statistical inference and estimation tasks that lie at the heart of complex learning problems.',
  })
  const StefanieJegelka = await People.create({
    name: 'Stefanie Jegelka1',
    overview: 'I mostly work about machine learning.',
    details: 'My work is in algorithmic machine learning, and spans modeling, optimization algorithms, theory and applications. In particular, we have been working on exploiting mathematical structure for discrete and combinatorial machine learning problems, for robustness and for scaling machine learning algorithms.',
  })
  const  AleksanderMądry = await People.create({
    name: ' Aleksander Mądry',
    overview: 'I usually work for machine learning and computer graphic.',
    details: 'My work spans algorithmic graph theory, optimization and machine learning. In particular, I have a strong interest in building on the existing machine learning techniques to forge a decision-making toolkit that is reliable and well-understood enough to be safely and responsibly deployed in the real world.',
  })
  const WojciechMatusik = await People.create({
    name: 'Wojciech Matusik',
    overview: 'My work is about computer graphic.',
    details: 'I work on computer graphics: data-driven methods, physics-based simulation, appearance modeling, computational displays; and computer vision: inverse problems, data-driven methods, gaze models, computational photography, multi-modal learning.',
  })
  const DanielaRus = await People.create({
    name: 'Daniela Rus',
    overview: 'My research interests are in robotics, mobile computing, and data science.',
    details: 'We aim to develop the science of autonomy toward a future with robots and AI systems integrated into everyday life, supporting people with cognitive and physical tasks.',
  })
  const JoachimBuhmann = await People.create({
    name: 'Joachim Buhmann',
    overview: 'My team interests cover the area of pattern recognition and data analysis.',
    details: 'I am interested in statistical learning theory and applied statistics. The application areas range from computer vision and image analysis, remote sensing to bioinformatics.',
  })
  const MengjiaYan = await People.create({
    name: 'Mengjia Yan',
    overview: 'I am intersted in computer architecture and security.',
    details: 'My team interest lies in the areas of computer architecture and security, with a focus on side channel attacks and defenses. My group works on exploiting new micro-architectural vulnerabilities and designing comprehensive and efficient defense mechanisms.',
  })
  const AlanWillsky = await People.create({
    name: 'Alan Willsky',
    overview: 'My interests is about multiresolution methods for large-scale data.',
    details: 'My recently work on multiresolution methods for large-scale data fusion and assimilation. This method can be used in fields including target tracking, object recognition, fusion of nontraditional data sources, oil exploration, oceanographic remote sensing. ',
  })
  const RussTedrake = await People.create({
    name: 'Russ Tedrake',
    overview: 'I am interested in underactuated motor control systems in animals and machines. ',
    details: 'I am interested in underactuated motor control systems in animals and machines that are capable of executing dynamically dexterous tasks and interacting with uncertain environments. We believe that the design of these control systems is intimately related to the mechanical designs of their machines, and that tools from machine learning and optimal control can be used to exploit this coupling when classical control techniques fail.',
  })
  const  PeterSzolovits = await People.create({
    name: ' Peter Szolovits',
    overview: 'My job center on the application of AI methods.',
    details: 'My job center on the application of AI methods to problems of medical decision making, predictive modeling, decision support, and design of information systems for health care institutions and patients. He has worked on problems of diagnosis, therapy planning, execution and monitoring for various medical conditions, computational aspects of genetic counseling, controlled sharing of health information, and privacy and confidentiality issues in medical record systems.',
  })
  const GeraldSussman = await People.create({
    name: 'Gerald Sussman',
    overview: 'My work about Artificial Intelligence',
    details: 'My work about Artificial Intelligence include problem solving by debugging almost-right plans, propagation of constraints applied to electrical circuit analysis and synthesis, dependency-based explanation and dependency-based backtracking, and various language structures for expressing problem-solving strategies.',
  })
  const RonaldRivest = await People.create({
    name: 'Ronald Rivest',
    overview: 'I am familiar about computer security-cryptographic',
    details: 'i have extensive experience in cryptographic design and cryptanalysis. Familiar in RSA public-key cryptosystem. My work extensively in the areas of algorithms and election security.',
  })
  const  JonathanRaganKelley = await People.create({
    name: ' Jonathan Ragan Kelley',
    overview:'I am interested in computer graphic.',
    details: 'My work focuses on high-efficiency computer graphics, at the intersection of graphics with systems, architecture, and compilers.',
  })



  const Graphics = await Area.create({
    title: 'Graphics',
    overview: 'Computer graphics is a sub-field of computer science which studies methods for digitally synthesizing and manipulating visual content. ',
    details: 'Computer graphics studies the manipulation of visual and geometric information using computational techniques. It focuses on the mathematical and computational foundations of image generation and processing rather than purely aesthetic issues.A broad classification of major subfields in computer graphics might be: Geometry: ways to represent and process surfaces. Animation: ways to represent and manipulate motion. Rendering: algorithms to reproduce light transport. Imaging: image acquisition or image editing',
  })
  const Security = await Area.create({
    title: 'Security',
    overview: 'Computer security  is the protection of computer systems and networks from information disclosure, theft of or damage to their hardware, software, or electronic data, as well as from the disruption or misdirection of the services they provide.',
    details: 'This field is becoming increasingly significant due to the increased reliance on computer systems, the Internet[2] and wireless network standards such as Bluetooth and Wi-Fi, and due to the growth of "smart" devices, including smartphones, televisions, and the various devices that constitute the "Internet of things". Owing to its complexity, both in terms of politics and technology, cybersecurity is also one of the major challenges in the contemporary world.',
  })
  const AI = await Area.create({
    title: 'AI',
    overview: 'Artificial intelligence (AI) is intelligence demonstrated by machines.',
    details: ' "artificial intelligence" is often used to describe machines that mimic "cognitive" functions that humans associate with the human mind, such as "learning" and "problem solving". As machines become increasingly capable, tasks considered to require "intelligence" are often removed from the definition of AI, a phenomenon known as the AI effect. The traditional problems (or goals) of AI research include reasoning, knowledge representation, planning, learning, natural language processing, perception and the ability to move and manipulate objects.',
  })
  const Robitics = await Area.create({
    title: 'Robotics',
    overview: 'Robotics is an interdisciplinary field that integrates computer science and engineering. Robotics involves design, construction, operation, and use of robots.',
    details: 'The goal of robotics is to design machines that can help and assist humans. Robotics integrates fields of mechanical engineering, electrical engineering, information engineering, mechatronics, electronics, bioengineering, computer engineering, control engineering, software engineering, mathematics, among others. Robotics develops machines that can substitute for humans and replicate human actions. Robots can be used in many situations and for many purposes, but today many are used in dangerous environments (including inspection of radioactive materials, bomb detection and deactivation), manufacturing processes, or where humans cannot survive',
  })
  const Network = await Area.create({
    title: 'Network',
    overview: 'A computer network is a group of computers that use a set of common communication protocols over digital interconnections for the purpose of sharing resources located on or provided by the network nodes. ',
    details: 'A computer network is a group of computers that use a set of common communication protocols over digital interconnections for the purpose of sharing resources located on or provided by the network nodes. The interconnections between nodes are formed from a broad spectrum of telecommunication network technologies, based on physically wired, optical, and wireless radio-frequency methods that may be arranged in a variety of network topologies. The nodes of a computer network may include personal computers, servers, networking hardware, or other specialised or general-purpose hosts. Computer networks may be classified by many criteria, including the transmission medium used to carry signals, bandwidth, communications protocols to organize network traffic, the network size, the topology, traffic control mechanism, and organizational intent.',
  })
  const BigData = await Area.create({
    title: 'BigData',
    overview: 'Big data is a field that treats ways to analyze, systematically extract information from, or otherwise deal with data sets that are too large or complex to be dealt with by traditional data-processing application software. ',
    details: 'Big data analysis challenges include capturing data, data storage, data analysis, search, sharing, transfer, visualization, querying, updating, information privacy, and data source. Big data was originally associated with three key concepts: volume, variety, and velocity.The analysis of big data presents challenges in sampling, and thus previously allowing for only observations and sampling. Therefore, big data often includes data with sizes that exceed the capacity of traditional software to process within an acceptable time and value.Current usage of the term big data tends to refer to the use of predictive analytics, user behavior analytics, or certain other advanced data analytics methods that extract value from big data, and seldom to a particular size of data set. There is little doubt that the quantities of data now available are indeed large, but that is not the most relevant characteristic of this new data ecosystem.',
  })
  await BigData.addPeople(ReginaBarzilay);
  await AI.addPeople(ReginaBarzilay);
  await BigData.addPeople(MohammadAlizadeh);
  await Security.addPeople(MohammadAlizadeh);
  await Security.addPeople(HariBalakrishnan);
  await Network.addPeople(HariBalakrishnan);
  await BigData.addPeople(TamaraBroderick);
  await AI.addPeople(JacobAndreas);
  await Security.addPeople(AdamChlipala);
  await Network.addPeople(AdamChlipala);
  await AI.addPeople(FredoDurand);
  await Graphics.addPeople(FredoDurand);
  await Graphics.addPeople(WilliamFreeman);
  await AI.addPeople(WilliamFreeman);
  await AI.addPeople(TommiJaakkola);
  await AI.addPeople(StefanieJegelka);
  await AI.addPeople(AleksanderMądry);
  await Graphics.addPeople(AleksanderMądry);
  await Graphics.addPeople(WojciechMatusik);
  await AI.addPeople(DanielaRus);
  await Robitics.addPeople(DanielaRus);
  await BigData.addPeople(JoachimBuhmann);
  await Security.addPeople(MengjiaYan);
  await BigData.addPeople(AlanWillsky);
  await AI.addPeople(RussTedrake);
  await AI.addPeople(PeterSzolovits);
  await AI.addPeople(GeraldSussman);
  await Security.addPeople(RonaldRivest);
  await Graphics.addPeople(JonathanRaganKelley);



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
