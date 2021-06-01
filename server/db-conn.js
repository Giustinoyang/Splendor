const { Sequelize, DataTypes } = require('sequelize')

// Development
const db = new Sequelize(
  'postgres://postgres:123456@127.0.0.1:5432/postgres'
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
      position: DataTypes.STRING,
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

  
  const ReginaBarzilay = await People.create({
    name: 'Regina Barzilay',
    image: '/people/ReginaBarzilay.png',
    position: 'teamleader',
    overview: 'I develop machine learning models that aim to understand and generate natural languages and focous on big data.',
    details: 'We are currently witnessing the first generation of NLP tools that have been deployed at scale and are used by millions of people. However, the major component of this success is access to large amounts of training data which machines use to learn mappings between input and output. I am interested in designing algorithms that do not suffer from this annotation dependence. Specifically, we are developing deep learning models that can transfer annotations across domains and languages, that can learn from a few annotated examples by utilizing supplementary data sources, and that can take advantage of human-provided rationales to constrain model structure.',
  })
  const MohammadAlizadeh = await People.create({
    name: 'Mohammad Alizadeh',
    image: '/people/MohammadAlizadeh.png',
    position: 'engineer',
    overview: 'I work in the areas of computer networks and big data.',
    details: 'My research aims to improve the performance, robustness, and ease of management of future networks and cloud computing systems. My current research centers on network protocols and algorithms for large-scale datacenters, programmable switching architectures, and learning-based networked systems. I am also broadly interested in performance modeling and analysis of computer systems and bridging theory and practice in computer system design.',
  })
  const HariBalakrishnan = await People.create({
    name: 'Hari Balakrishnan',
    image: '/people/HariBalakrishnan.png',
    position: 'teamleader',
    overview: 'I am interested in the area of networked computer systems.',
    details: 'My work is in the area of networked computer systems, with current interests in networking, sensing, and perception for a world of mobile, sensor-equipped devices connected to services running in the cloud or the network edge. My past work has contributed to mobile and sensor computing, wireless networks, Internet architecture (congestion control, routing, network security), overlay and P2P networks, and data management (stream processing and secure databases)',
  })
  const TamaraBroderick = await People.create({
    name: 'Tamara Broderick1',
    image: '/people/TamaraBroderick.png',
    position: 'engineer',
    overview: 'I am interested in big data.',
    details: 'In my project, I am interested in understanding how we can reliably quantify uncertainty and robustness in modern, complex data analysis procedures. To that end, I am particularly interested in Bayesian inference and graphical models – with an emphasis on scalable, nonparametric, and unsupervised learning.',
  })
  const JacobAndreas = await People.create({
    name: 'Jacob Andreas',
    image: '/people/JacobAndreas.png',
    position: 'engineer',
    overview: 'I am interested in language as a communicative and computational tool.',
    details: 'My work aims to (1) understand the computational foundations of efficient language learning, and (2) build general-purpose intelligent systems that can communicate effectively with humans and learn from human guidance.',
  })
  const AdamChlipala = await People.create({
    name: 'Adam Chlipala',
    image: '/people/AdamChlipala.png',
    position: 'engineer',
    overview: 'My research is about the network security.',
    details: 'My traditional areas are programming languages and formal methods, but my interests have broadened to include other aspects of computer-system design and implementation. I like the idea of doing clean-slate redesign of computing stacks with current security and privacy concerns front-and-center, which I do believe involves, in a central way, my traditional focus of mechanized mathematical proof.',
  })
  const FredoDurand = await People.create({
    name: 'Fredo Durand',
    image: '/people/FredoDurand.png',
    position: 'engineer',
    overview: 'I work in the area about computer graphic and use artificial intelligence to deal with. ',
    details: 'I interest span most aspects of picture generation and creation. This includes realistic graphics, real-time rendering, non-photorealistic rendering, as well as computational photography.',
  })
  const WilliamFreeman = await People.create({
    name: 'William Freeman',
    image: '/people/WilliamFreeman.png',
    position: 'engineer',
    overview: 'I deal with computer graphic and machine learning.',
    details: 'My current research interests include machine learning applied to computer vision, Bayesian models of visual perception, and interactive applications of computer vision.',
  })
  const TommiJaakkola = await People.create({
    name: 'Tommi Jaakkola',
    image: '/people/TommiJaakkola.png',
    position: 'engineer',
    overview: 'My research is about machine learning.',
    details: 'Our project advances how machines can learn, predict or control, and do so at scale in an efficient, principled, and interpretable manner. Our research in machine learning extends from foundational theory to modern applications, focusing especially on statistical inference and estimation tasks that lie at the heart of complex learning problems.',
  })
  const StefanieJegelka = await People.create({
    name: 'Stefanie Jegelka',
    image: '/people/StefanieJegelka.png',
    position: 'engineer',
    overview: 'I mostly work about machine learning.',
    details: 'My work is in algorithmic machine learning, and spans modeling, optimization algorithms, theory and applications. In particular, we have been working on exploiting mathematical structure for discrete and combinatorial machine learning problems, for robustness and for scaling machine learning algorithms.',
  })
  const  AleksanderMądry = await People.create({
    name: ' Aleksander Mądry',
    image: '/people/AleksanderMądry.png',
    position: 'engineer',
    overview: 'I usually work for machine learning and computer graphic.',
    details: 'My work spans algorithmic graph theory, optimization and machine learning. In particular, I have a strong interest in building on the existing machine learning techniques to forge a decision-making toolkit that is reliable and well-understood enough to be safely and responsibly deployed in the real world.',
  })
  const WojciechMatusik = await People.create({
    name: 'Wojciech Matusik',
    image: '/people/WojciechMatusik.png',
    position: 'engineer',
    overview: 'My work is about computer graphic.',
    details: 'I work on computer graphics: data-driven methods, physics-based simulation, appearance modeling, computational displays; and computer vision: inverse problems, data-driven methods, gaze models, computational photography, multi-modal learning.',
  })
  const DanielaRus = await People.create({
    name: 'Daniela Rus',
    image: '/people/DanielaRus.png',
    position: 'teamleader',
    overview: 'My research interests are in robotics, mobile computing, and data science.',
    details: 'We aim to develop the science of autonomy toward a future with robots and AI systems integrated into everyday life, supporting people with cognitive and physical tasks.',
  })
  const JoachimBuhmann = await People.create({
    name: 'Joachim Buhmann',
    image: '/people/JoachimBuhmann.png',
    position: 'engineer',
    overview: 'My team interests cover the area of pattern recognition and data analysis.',
    details: 'I am interested in statistical learning theory and applied statistics. The application areas range from computer vision and image analysis, remote sensing to bioinformatics.',
  })
  const MengjiaYan = await People.create({
    name: 'Mengjia Yan',
    image: '/people/MengjiaYan.png',
    position: 'engineer',
    overview: 'I am intersted in computer architecture and security.',
    details: 'My team interest lies in the areas of computer architecture and security, with a focus on side channel attacks and defenses. My group works on exploiting new micro-architectural vulnerabilities and designing comprehensive and efficient defense mechanisms.',
  })
  const AlanWillsky = await People.create({
    name: 'Alan Willsky',
    image: '/people/AlanWillsky.png',
    position: 'engineer',
    overview: 'My interests is about multiresolution methods for large-scale data.',
    details: 'My recently work on multiresolution methods for large-scale data fusion and assimilation. This method can be used in fields including target tracking, object recognition, fusion of nontraditional data sources, oil exploration, oceanographic remote sensing. ',
  })
  const RussTedrake = await People.create({
    name: 'Russ Tedrake',
    image: '/people/RussTedrake.png',
    position: 'engineer',
    overview: 'I am interested in underactuated motor control systems in animals and machines. ',
    details: 'I am interested in underactuated motor control systems in animals and machines that are capable of executing dynamically dexterous tasks and interacting with uncertain environments. We believe that the design of these control systems is intimately related to the mechanical designs of their machines, and that tools from machine learning and optimal control can be used to exploit this coupling when classical control techniques fail.',
  })
  const  PeterSzolovits = await People.create({
    name: ' Peter Szolovits',
    image: '/people/PeterSzolovits.png',
    position: 'engineer',
    overview: 'My job center on the application of AI methods.',
    details: 'My job center on the application of AI methods to problems of medical decision making, predictive modeling, decision support, and design of information systems for health care institutions and patients. He has worked on problems of diagnosis, therapy planning, execution and monitoring for various medical conditions, computational aspects of genetic counseling, controlled sharing of health information, and privacy and confidentiality issues in medical record systems.',
  })
  const GeraldSussman = await People.create({
    name: 'Gerald Sussman',
    image: '/people/GeraldSussman.png',
    position: 'teamleader',
    overview: 'My work about Artificial Intelligence',
    details: 'My work about Artificial Intelligence include problem solving by debugging almost-right plans, propagation of constraints applied to electrical circuit analysis and synthesis, dependency-based explanation and dependency-based backtracking, and various language structures for expressing problem-solving strategies.',
  })
  const RonaldRivest = await People.create({
    name: 'Ronald Rivest',
    image: '/people/RonaldRivest.png',
    position: 'CEO',
    overview: 'I am familiar about computer security-cryptographic',
    details: 'i have extensive experience in cryptographic design and cryptanalysis. Familiar in RSA public-key cryptosystem. My work extensively in the areas of algorithms and election security.',
  })
  const  JonathanRaganKelley = await People.create({
    name: ' Jonathan Ragan Kelley',
    image: '/people/JonathanRaganKelley.png',
    position: 'teamleader',
    overview:'I am interested in computer graphic.',
    details: 'My work focuses on high-efficiency computer graphics, at the intersection of graphics with systems, architecture, and compilers.',
  })



  const Graphics = await Area.create({
    title: 'Graphics',
    image: '/area/Graphics.png',
    overview: 'Computer graphics is a sub-field of computer science which studies methods for digitally synthesizing and manipulating visual content. ',
    details: 'Computer graphics studies the manipulation of visual and geometric information using computational techniques. It focuses on the mathematical and computational foundations of image generation and processing rather than purely aesthetic issues.A broad classification of major subfields in computer graphics might be: Geometry: ways to represent and process surfaces. Animation: ways to represent and manipulate motion. Rendering: algorithms to reproduce light transport. Imaging: image acquisition or image editing',
  })
  const Security = await Area.create({
    title: 'Security',
    image: '/area/Security.png',
    overview: 'Computer security  is the protection of computer systems and networks from information disclosure, theft of or damage to their hardware, software, or electronic data, as well as from the disruption or misdirection of the services they provide.',
    details: 'This field is becoming increasingly significant due to the increased reliance on computer systems, the Internet and wireless network standards such as Bluetooth and Wi-Fi, and due to the growth of "smart" devices, including smartphones, televisions, and the various devices that constitute the "Internet of things". Owing to its complexity, both in terms of politics and technology, cybersecurity is also one of the major challenges in the contemporary world.',
  })
  const AI = await Area.create({
    title: 'AI',
    image: '/area/AI.png',
    overview: 'Artificial intelligence (AI) is intelligence demonstrated by machines.',
    details: ' "artificial intelligence" is often used to describe machines that mimic "cognitive" functions that humans associate with the human mind, such as "learning" and "problem solving". As machines become increasingly capable, tasks considered to require "intelligence" are often removed from the definition of AI, a phenomenon known as the AI effect. The traditional problems (or goals) of AI research include reasoning, knowledge representation, planning, learning, natural language processing, perception and the ability to move and manipulate objects.',
  })
  const Robotics = await Area.create({
    title: 'Robotics',
    image: '/area/Robotics.png',
    overview: 'Robotics is an interdisciplinary field that integrates computer science and engineering. Robotics involves design, construction, operation, and use of robots.',
    details: 'The goal of robotics is to design machines that can help and assist humans. Robotics integrates fields of mechanical engineering, electrical engineering, information engineering, mechatronics, electronics, bioengineering, computer engineering, control engineering, software engineering, mathematics, among others. Robotics develops machines that can substitute for humans and replicate human actions. Robots can be used in many situations and for many purposes, but today many are used in dangerous environments (including inspection of radioactive materials, bomb detection and deactivation), manufacturing processes, or where humans cannot survive',
  })
  const Network = await Area.create({
    title: 'Network',
    image: '/area/Network.png',
    overview: 'A computer network is a group of computers that use a set of common communication protocols over digital interconnections for the purpose of sharing resources located on or provided by the network nodes. ',
    details: 'A computer network is a group of computers that use a set of common communication protocols over digital interconnections for the purpose of sharing resources located on or provided by the network nodes. The interconnections between nodes are formed from a broad spectrum of telecommunication network technologies, based on physically wired, optical, and wireless radio-frequency methods that may be arranged in a variety of network topologies. The nodes of a computer network may include personal computers, servers, networking hardware, or other specialised or general-purpose hosts. Computer networks may be classified by many criteria, including the transmission medium used to carry signals, bandwidth, communications protocols to organize network traffic, the network size, the topology, traffic control mechanism, and organizational intent.',
  })
  const BigData = await Area.create({
    title: 'BigData',
    image: '/area/BigData.png',
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
  await Robotics.addPeople(StefanieJegelka);
  await AI.addPeople(AleksanderMądry);
  await Graphics.addPeople(AleksanderMądry);
  await Graphics.addPeople(WojciechMatusik);
  await AI.addPeople(DanielaRus);
  await Robotics.addPeople(DanielaRus);
  await BigData.addPeople(JoachimBuhmann);
  await Security.addPeople(MengjiaYan);
  await BigData.addPeople(AlanWillsky);
  await AI.addPeople(RussTedrake);
  await Robotics.addPeople(RussTedrake);
  await AI.addPeople(PeterSzolovits);
  await Robotics.addPeople(PeterSzolovits);
  await AI.addPeople(GeraldSussman);
  await Security.addPeople(RonaldRivest);
  await Graphics.addPeople(JonathanRaganKelley);



  const Mapster = await Product.create({
    title: 'Mapster',
    image: '/proser/Mapster.png',
    overview: 'Automated techniques for building better and smarter maps from aerial imagery and terrestrial position sensor data.',
    details: 'Creating and maintaining maps is both expensive and labor-intensive. As a result, maps often have poor coverage, or contain outdated information. For example, many villages in Indonesia are not covered by street maps. Below, the closest mapped roads (bottom, in black) to a village may be miles away. Our goal is to leverage GPS trajectories, satellite and aerial imagery, drone imagery, and other data sources to improve the accuracy and coverage of maps, and to reduce the delay between physical road network changes and updates to the map.',
  })
  await Graphics.addProduct(Mapster);
  await WilliamFreeman.addProduct(Mapster.id);
  await FredoDurand.addProduct(Mapster.id);

  const Congestion_Control_Plane = await Product.create({
    title: 'Congestion Control Plane',
    image: '/proser/CongestionControlPlane.png',
    overview: 'A new platform and API for writing congestion control algorithms.',
    details: 'The congestion control plane is a new API for writing congestion control algorithms. It provides three benefits:Supporting Sophisticated Algorithms: Many modern congestion control proposals use sophisticated processing to make control decisions. It is often difficult to implement these algorithms within the “datapath” - any module that provides data transmission and reception interfaces between higher-layer applications and lower-layer network hardware. CCP allows algorithm implementations to take advantage of useful user-space libraries independent of the target datapath. Write-Once, Run-Anywhere: Recently, new datapaths have emerged, leading to the “matrix of sadness,” where congestion control algorithm developers must re-implement their algorithms anew on each datapath. CCP provides a runtime for algorithms which interfaces with each datapath, so the same algorithm code runs in multiple datapaths without modification. New Capabilities: It is difficult to implement new congestion control capabilities such as the congestion manager in current datapaths. CCP allows developers to add these capabilities without datapath modification.',
  })
  await Network.addProduct(Congestion_Control_Plane);
  await HariBalakrishnan.addProduct(Congestion_Control_Plane);
  await AdamChlipala.addProduct(Congestion_Control_Plane);

  const Beecluster = await Product.create({
    title: 'Beecluster',
    image: '/proser/Beecluster.png',
    overview: 'A tasking framework for cross-platform drone apps.',
    details: 'Dynamic Tasking: BeeCluster embraces dynamic task graph (DTG) as its core programming model, allowing your application to react to the environment by creating new tasks or canceling existing tasks dynamically.Flexible Virtual Drones: BeeCluster provides a set of versatile abstractions mapping your virtual drones to physical drones. You can even define a virtual drone with infinite flying time in BeeCluster!',
  })
  await Robotics.addProduct(Beecluster);
  await DanielaRus.addProduct(Beecluster.id);
  await StefanieJegelka.addProduct(Beecluster.id);
  await RussTedrake.addProduct(Beecluster.id);

  const RFocus = await Product.create({
    title: 'RFocus',
    image: '/proser/RFocus.png',
    overview: 'Beamforming Using Thousands of Passive Antennas',
    details: 'RFocus adds more antennas to the environment. They are arranged as a 2D surface, where each antenna is a simple backscatter reflector, similar to a passive RFID tag. They do not emit any signal of their own; instead they simply reflect signal incident from the transmitter in a controlled way. ',
  })
  await Network.addProduct(RFocus.id);
  await HariBalakrishnan.addProduct(RFocus.id);
  await AdamChlipala.addProduct(RFocus.id);
  await MohammadAlizadeh.addProduct(RFocus.id);


  const Fastpass = await Service.create({
    title: 'Fastpass',
    image: '/proser/Fastpass.png',
    overview: 'Fastpass is a datacenter network framework.',
    details: 'Fastpass aims for high utilization with zero queueing. It provides low median and tail latencies for packets, high data rates between machines, and flexible network resource allocation policies. The key idea in Fastpass is fine-grained control over packet transmission times and network paths.',
    case: 'Flowtune is developing network monitoring and scheduling based on principles derived from this work.',
  })
  await Network.addService(Fastpass);
  await HariBalakrishnan.addService(Fastpass);
  await AdamChlipala.addService(Fastpass);

  const Helping_Robots_Learn = await Service.create({
    title: 'Helping Robots Learn',
    image: '/proser/HelpingRobotsLearn.png',
    overview: 'Help robots learn faster by providing demonstrations when they need help.',
    details: 'This project explores a master-apprentice model of learning that combines self-supervision with learning by demonstration. A robot learns to grasp on its own by repeatedly trying to pick up a bottle. But if it can not find a good grasp using its current model, it asks a person for help. The person is supervising the robot in a virtual reality (VR) control room, and they can take control of the robot to provide grasping demonstrations. ',
    case: 'Results indicate that the robot learned faster when demonstrations were included; it learned a model with 100% grasping accuracy after 150 grasps. ',
  })
  
  await AI.addService(Helping_Robots_Learn);
  await JacobAndreas.addService(Helping_Robots_Learn);
  await TommiJaakkola.addService(Helping_Robots_Learn);
  await DanielaRus.addService(Helping_Robots_Learn);

  

  const Data_Driven_Inference = await Service.create({
    title: 'Data Driven Inference',
    image: '/proser/DataDrivenInference.png',
    overview: 'We use machine learning to improve outcomes in medicine, finance, and sports.',
    details: 'Our group focuses on the application of advanced computational techniques to medicine. ',
    case: 'Current projects include prediction of adverse medical events, prediction of response to therapies, non-invasive monitoring and diagnostic tools, and tele-medicine.',
  })
 
  await BigData.addService(Data_Driven_Inference);
  await ReginaBarzilay.addService(Data_Driven_Inference);
  await TamaraBroderick.addService(Data_Driven_Inference);
  await AlanWillsky.addService(Data_Driven_Inference);


  const Risk_and_Causes_of_Infection = await Product.create({
    title: 'Risk and Causes of Infection',
    image: '/proser/RiskandCausesofInfection.png',
    overview: 'We aim to study the causes and transmission modes of infectious diseases among members of a community in the presence of hidden, asymptomatic spreaders of the pathogen.',
    details: 'When modeling the spread of an infection among members or nodes of a community, each node`s probability of getting infected depends on its innate susceptibility and its exposure to the contagion through its neighbors.In many cases, a neighbor`s influence is hidden. Such is the case with asymptomatic carriers of the disease. We develop generative models to identify the hidden influencers in both static and dynamic networks. We use the neighbors` hidden influence state to compute an accurate estimate of exposure to the contagion. We propose efficient variational inference algorithms to learn our models parameters. We also study the causal mechanisms that lead to an elevated risk of infection.',
  })
 
  await BigData.addProduct(Risk_and_Causes_of_Infection);
  await MohammadAlizadeh.addProduct(Risk_and_Causes_of_Infection);
  await ReginaBarzilay.addProduct(Risk_and_Causes_of_Infection);
  await JoachimBuhmann.addProduct(Risk_and_Causes_of_Infection);
  await AlanWillsky.addProduct(Risk_and_Causes_of_Infection);
  
  



  const Predicting_Adverse_Events = await Service.create({
    title: 'Predicting Adverse Events',
    image: '/proser/PredictingAdverseEvents.png',
    overview: 'Big data forecasting is the core application of big data. Big data forecasting transforms the traditional meaning of forecasting into “current measurement”.',
    details: 'The advantage of big data forecasting is that it transforms a very difficult forecasting problem into a relatively simple description problem, which is beyond the reach of traditional small data sets. From the perspective of forecasting, the results of big data forecasting not only lead to simple and objective conclusions for dealing with real business, but also can be used to help companies make business decisions.',
    case: 'Transitioning machine learning models across electronic health record (EHR) versions can be improved by mapping different EHR encodings to a common vocabulary.',
  })
  await BigData.addService(Predicting_Adverse_Events);
  await AlanWillsky.addService(Predicting_Adverse_Events);
  await TamaraBroderick.addService(Predicting_Adverse_Events);
  await JoachimBuhmann.addService(Predicting_Adverse_Events);


  const Privacy_Preserving_Framework = await Product.create({
    title: 'Privacy Preserving Framework',
    image: '/proser/PrivacyPreservingFramework.png',
    overview: 'This framework that enforces privacy transparently enabling different kinds of machine learning to be developed that are automatically privacy preserving.',
    details: 'Our approach is to develop a general framework that enforces privacy internally enabling different kinds of machine learning to be developed that are automatically privacy preserving. This decoupling of privacy preservation and machine learning based analysis is important because it reduces the additional burden of privacy protection. Our goal is to protect the data from analysts who want to analyze it for various purposes while still enabling its utility.',
  })
  await Security.addProduct(Privacy_Preserving_Framework);
  await RonaldRivest.addProduct(Privacy_Preserving_Framework);
  await MengjiaYan.addProduct(Privacy_Preserving_Framework);


  const Supervised_Machine_Learning_Techniques = await Service.create({
    title: 'Supervised Machine Learning Techniques',
    image: '/proser/SupervisedMachineLearningTechniques.png',
    overview: 'We aim to utilize supervised machine learning techniques on tracking data',
    details: 'Supervised learning is a machine learning task that infers a function from labeled training data. The training data includes a set of training examples. In supervised learning, each instance is composed of an input object (usually a vector) and a desired output value (also called a supervised signal).',
    case: 'We utilize supervised machine learning techniques on player tracking data from the game of basketball to automatically discover relationships between player movement and offensive success.',
  })

  await AI.addService(Supervised_Machine_Learning_Techniques);
  await AleksanderMądry.addService(Supervised_Machine_Learning_Techniques);
  await GeraldSussman.addService(Supervised_Machine_Learning_Techniques);
  await PeterSzolovits.addService(Supervised_Machine_Learning_Techniques);


  const Secure_Networks = await Service.create({
    title: 'Secure Networks',
    image: '/proser/SecureNetworks.png',
    overview: 'Focusing and helping to maintain network security.',
    details: 'Our reporter offers a series of recommendations for government or companies to develop a coherent cybersecurity plan that coordinates efforts across departments, encourages investment, and removes parts of key infrastructure ',
    case: 'Report warns of hacking risk to electric grid, oil pipelines, and other critical infrastructure',
  })

  await Security.addService(Secure_Networks);
  await RonaldRivest.addService(Secure_Networks);
  await MengjiaYan.addService(Secure_Networks);
  await MohammadAlizadeh.addService(Secure_Networks);





  const An_Interlock_for_Self_Driving_Cars = await Product.create({
    title: 'An Interlock for Self Driving Cars',
    image: '/proser/AnInterlockforSelfDrivingCars.png',
    overview: 'This project is designing a new architecture for a highly dependable self-driving car.',
    details: 'Our project takes a new approach that equips self-driving cars with tools for perception and situational awareness that are just as sophisticated as those of the main controller. We do this by means of certified control. Certified control is a new architecture for autonomous cars that offers the possibility of a small, verifiable trusted base without preventing the use of complex machine-learning algorithms for perception and control.',
  })
 
  await AI.addProduct(An_Interlock_for_Self_Driving_Cars);
  await GeraldSussman.addProduct(An_Interlock_for_Self_Driving_Cars);
  await PeterSzolovits.addProduct(An_Interlock_for_Self_Driving_Cars);
  await RussTedrake.addProduct(An_Interlock_for_Self_Driving_Cars);
 

  const Muscle_Signals_And_Robots = await Product.create({
    title: 'Muscle Signals And Robots',
    image: '/proser/MuscleSignalsAndRobots.png',
    overview: 'Robot assistants that can help you lift objects by mirroring motions and following nonverbal commands.',
    details: 'this project looks at the person`s muscle activity to inform the robot about how it should move to best assist the person while they collaborate.  By using the muscles already involved in performing the task, the robot could almost become like an extension of yourself that can be controlled intuitively.',
  })
  await Robotics.addProduct(Muscle_Signals_And_Robots);
  await RussTedrake.addProduct(Muscle_Signals_And_Robots);
  await PeterSzolovits.addProduct(Muscle_Signals_And_Robots);
  await DanielaRus.addProduct(Muscle_Signals_And_Robots);
 



  const Geometric_Data_Processing = await Service.create({
    title: 'Geometric Data Processing',
    image: '/proser/GeometricDataProcessing.png',
    overview: 'Our group studies geometric problems in computer graphics, computer vision',
    details: 'Geometry is a central component of algorithms for computer-aided design, medical imaging, 3D animation, and robotics.  While early work in computational geometry provided basic methods to store and process shapes, modern geometry research builds on these foundations by assembling unstructured, noisy, and even probabilistic signals about shape into robust models capturing semantic, geometric, and topological features. ',
    case: 'A central theme in our research involves algorithms and applications for optimal transport (OT).  OT lifts classical geometry to probability distributions, providing a means for geometric computation on uncertain data. ',
  })
  await Graphics.addService(Geometric_Data_Processing);
  await JonathanRaganKelley.addService(Geometric_Data_Processing);
  await WojciechMatusik.addService(Geometric_Data_Processing);
  await FredoDurand.addService(Geometric_Data_Processing);

  const Flash_for_Indoor_Portraits = await Product.create({
    title: 'Flash for Indoor Portraits',
    image: '/proser/FlashforIndoorPortraits.png',
    overview: 'To achieve high-quality photo lighting in challenging environments.',
    details: 'our prototype camera dynamically reconstructs a 3D scene model and directs a motor-controlled flash head at nearby walls and ceilings for soft indirect illumination.We first identify criteria for evaluating flash directions, based on established photography literature, and relate these criteria to the color and geometry of a scene. We augment a camera with servomotors rotate the flash head, and additional sensors (a fisheye and 3D sensors) to gather information about potential bounce surfaces.',
  })
  await Graphics.addProduct(Flash_for_Indoor_Portraits);
  await WilliamFreeman.addProduct(Flash_for_Indoor_Portraits);
  await WojciechMatusik.addProduct(Flash_for_Indoor_Portraits);
  await JonathanRaganKelley.addProduct(Flash_for_Indoor_Portraits);


  const Artificial_Codriver = await Product.create({
    title: 'Artificial Co-driver',
    image: '/proser/ArtificialCodriver.png',
    overview: 'By observing driver in real road situations, we learn a computer assistant that can make driving easier, safer and more enjoyable.',
    details: 'Self-driving cars have obtained a lot of attention in recent years from both research and industry. On the way to fully autonomous vehicles we aim to support a human driver by providing a computer assistant. We want to advance existing systems to another level by providing natural and targeted interaction based on the events both in and outside the car. We use a dataset from recording of real driving in combination with machine learning techniques in order to predict driver`s intentions. This will help the artificial co-pilot in the car to determine the most efficient solution for given road situation.',
  })
  await AI.addProduct(Artificial_Codriver);
  await JacobAndreas.addProduct(Artificial_Codriver);
  await TommiJaakkola.addProduct(Artificial_Codriver);
  await StefanieJegelka.addProduct(Artificial_Codriver);


  const Deep_Learning_for_3D_Data = await Product.create({
    title: 'Deep Learning for 3D Data',
    image: '/proser/DeepLearningfor3DData.png',
    overview: 'Developing state-of-the-art deep learning algorithms for analyzing and modeling 3D geometry.',
    details: 'we are developing deep learning tools designed from the ground up for 3D data, specifically point clouds, triangulated surfaces, and CAD models; these modalities undoubtedly are used widely in applications from design to manufacture to robotic navigation using e.g. LiDAR. Rather than shoehorning existing techniques for images or unstructured problems, we start from well-studied constructions from differential geometry and digital geometry processing, which provide well-posed replacements for operations like convolution in the presence of curvature.',
  })
  await AI.addProduct(Deep_Learning_for_3D_Data);
  await StefanieJegelka.addProduct(Deep_Learning_for_3D_Data);
  await DanielaRus.addProduct(Deep_Learning_for_3D_Data);
  await GeraldSussman.addProduct(Deep_Learning_for_3D_Data);


  const Data_Civilizer = await Product.create({
    title: 'Data Civilizer',
    image: '/proser/DataCivilizer.png',
    overview: 'This project is for data discovery.',
    details: 'As part of Data Civilizer we are designing abstractions and building tools and systems to help people with their data-related tasks, from discovering, to cleaning, to transforming it. The aim is to shape the data in a way that is easy to analyzer---for example to fit a model or fill in a report.',
  })
  await BigData.addProduct(Data_Civilizer);
  await AlanWillsky.addProduct(Data_Civilizer);
  await JoachimBuhmann.addProduct(Data_Civilizer);
  await TamaraBroderick.addProduct(Data_Civilizer);



  const Encrypted_Data = await Service.create({
    title: 'Encrypted Data',
    image: '/proser/EncryptedData.png',
    overview: 'We are investigating the limits of computing on encrypted data, with a focus on the private outsourcing of computation over sensitive data.',
    details: 'There number of classical and more modern approaches to the the private outsourcing of data, including grabled circuits, multi-party computation, fully-homomorphic and functional encryption, and obfuscation. We are exploring new techniques to push the boundaries of what is feasible in this direction.',
    case: 'Commonly used in hospital. Hospitals have vast amounts of patient data that would be useful to third-party researchers, but cannot freely share the data due to a myriad of privacy issues. We try to protect the information of the hospital.',
  })

  await Security.addService(Encrypted_Data);
  await RonaldRivest.addService(Encrypted_Data);
  await MengjiaYan.addService(Encrypted_Data);
  await HariBalakrishnan.addService(Encrypted_Data);


  
  const Complex_Machine_Learning_Models = await Product.create({
    title: 'Complex Machine Learning Models',
    image: '/proser/ComplexMachineLearningModels.png',
    overview: 'Our goal is to develop methods that can "explain" the behavior of complex machine learning models, without restricting their power. We seek explanations that are simple, robust and grounded in statistical analysis of the model`s behavior.',
    details: 'Modern machine learning models are highly flexible but lack transparency. Can we devise methods to explain the predictions of such models, without restricting their expressiveness? Can we do so even if we don`t know anything about their architecture, i.e., if they are "black-boxes"? In this project, we are developing methods for explaining the predictions made rather than constraining the models themselves to be interpretable. We are particularly interested in providing explanations for the predictions of complex machine learning models that operate on structured data, such as sentences, trees or graphs. For example, we use statistical input-output analysis to learn to interpret predictions of sequence-to-sequence models, such as those used in machine translation and dialogue systems.',
  })
  await AI.addProduct(Complex_Machine_Learning_Models);
  await ReginaBarzilay.addProduct(Complex_Machine_Learning_Models);
  await JacobAndreas.addProduct(Complex_Machine_Learning_Models);
  await FredoDurand.addProduct(Complex_Machine_Learning_Models);
  await AleksanderMądry.addProduct(Complex_Machine_Learning_Models);


  const Spoken_Language_Systems = await Product.create({
    title: 'Spoken Language Systems',
    image: '/proser/SpokenLanguageSystems.png',
    overview: 'Our goal is to create technology that makes it possible for everyone in the world to interact with with computers via natural spoken language.',
    details: 'We believe that conversational interfaces will enable us to converse with machines much in the same way that we communicate with one another and will play a fundamental role in facilitating our move toward an information-based society.',
  })
  await AI.addProduct(Spoken_Language_Systems);
  await GeraldSussman.addProduct(Spoken_Language_Systems);
  await DanielaRus.addProduct(Spoken_Language_Systems);
  await WilliamFreeman.addProduct(Spoken_Language_Systems);


  const Representation_Learning_and_GNN = await Product.create({
    title: 'Representation Learning and GNN',
    image: '/proser/RepresentationLearningandGNN.png',
    overview: 'This project aims to explore the theoretical foundations of learning with graphs and relations in AI via the GNN architecture.',
    details: 'Graph Neural Networks (GNNs) are a powerful framework revolutionizing graph representation learning, but our understanding of their representational properties is limited. In machine learning, a system can effectively make predictions from raw data by learning representations. For such data, researchers are increasingly harnessing the power of Graph Neural Networks (GNNs), a structured framework for representation learning of graphs. This project focuses on the theoretical foundations for analyzing the expressive power of GNNs.By developing the theoretical foundations for reasoning about the expressive power of GNNs and expanding their representational capacity, we continue to pursue evolving and powerful architectures for machine learning with graphs.',
  })
  await AI.addProduct(Representation_Learning_and_GNN);
  await ReginaBarzilay.addProduct(Representation_Learning_and_GNN);
  await FredoDurand.addProduct(Representation_Learning_and_GNN);
  await WojciechMatusik.addProduct(Representation_Learning_and_GNN);
  await JonathanRaganKelley.addProduct(Representation_Learning_and_GNN);


  const High_Performance_Parallel_Clustering = await Product.create({
    title: 'High Performance Parallel Clustering',
    image: '/proser/HighPerformanceParallelClustering.png',
    overview: 'We are designing new parallel algorithms, optimizations, and frameworks for clustering large-scale graph and geometric data.',
    details: 'The goal of this project is to design novel parallel algorithms and optimizations for clustering large-scale graph and geometric data. We intend to consider various classes of clustering algorithms, and use them to cluster large datasets in AI applications. We will also design high-level programming frameworks to make it easier to write new high-performance clustering algorithms, and also plan to develop a benchmark suite for comparing the performance of different algorithms as well as their clustering quality under different metrics.',
  })
  await AI.addProduct(High_Performance_Parallel_Clustering);
  await PeterSzolovits.addProduct(High_Performance_Parallel_Clustering);
  await RussTedrake.addProduct(High_Performance_Parallel_Clustering);
  await WilliamFreeman.addProduct(High_Performance_Parallel_Clustering);
  


  const Ithema_Performance_Prediction = await Product.create({
    title: 'Ithema Performance Prediction',
    image: '/proser/IthemaPerformancePrediction.png',
    overview: 'Predicting the number of clock cycles a processor takes to execute a block of assembly instructions in steady-state (the throughput) is important for both compiler designers and performance engineers.',
    details: 'Ithemal is the first tool that learns to predict the throughput of a set of instructions. It does so more accurately than state-of-the-art hand-written tools currently used in compiler backends and static machine code analyzers. In particular, Ithemal has less than half the error of state-of-the-art analytical models (LLVM`s llvm-mca and Intel`s IACA).',
  })
  await AI.addProduct(Ithema_Performance_Prediction);
  await JacobAndreas.addProduct(Ithema_Performance_Prediction);
  await TommiJaakkola.addProduct(Ithema_Performance_Prediction);
  await StefanieJegelka.addProduct(Ithema_Performance_Prediction);


 
  const Advanced_Network_Architecture = await Product.create({
    title: 'Advanced Network Architecture',
    image: '/proser/AdvancedNetworkArchitecture.png',
    overview: 'The challenge that motivates the ANA group is to foster a healthy future for the Internet. The interplay of private sector investment, public sector regulation and public interest advocacy, as well as the global diversity in drivers and aspirations, makes for an uncertain future.',
    details: 'Our goal is to carry out targeted research that can help shape this future. Our research targets core design principles and technology for large, decentralized, open-access networks such as the Internet. We are particularly concerned with the fundamental design principles that underlie tomorrow`s networks--what we call the architecture of networks. Technology is not the primary force that is shaping the future of the Internet. Our research methods include engineering studies, software and prototype development, and the study of networks using a multi-disciplinary approach including law, economics and political science. Specific projects range from detailed TCP performance analysis to the interplay of economics, regulation and technology in shaping the future. ',
  })
  await AI.addProduct(Advanced_Network_Architecture);
  await RonaldRivest.addProduct(Advanced_Network_Architecture);
  await AdamChlipala.addProduct(Advanced_Network_Architecture);
  await MengjiaYan.addProduct(Advanced_Network_Architecture);


  const Cryptography_on_Structured_Hardness = await Product.create({
    title: 'Cryptography on Structured Hardness',
    image: '/proser/CryptographyonStructuredHardness.png',
    overview: 'We aim to base a variety of cryptographic primitives on complexity theoretic assumptions. We focus on the assumption that there exist highly structured problems.',
    details: 'Most of modern cryptography is based on the conjectured hardness of some very specific problems like factoring.A prominent goal in cryptographic research is to base cryptography on a firmer complexity theoretic footing, such as the assumption that P is not equal to NP (which we know is necessary). This seems very far from our current understanding and so we aim to base cryptographic primitives on general complexity theoretic assumptions, albeit ones that are stronger than P not equals NP. Specifically, the assumption that P is not equal to NP means that there exists a language L that (1) is not in P but (2) is in NP. In this project we consider strengthening this assumption in two ways: 1) We assume that L is hard to compute for most instances (rather than merely hard in the worst-case). 2) We assume not only that L belongs to NP, but that it has additional structure.',
  })
  await Security.addProduct(Cryptography_on_Structured_Hardness);
  await MengjiaYan.addProduct(Cryptography_on_Structured_Hardness);
  await RonaldRivest.addProduct(Cryptography_on_Structured_Hardness);
  await AdamChlipala.addProduct(Cryptography_on_Structured_Hardness);




  const Route_and_Motion_Planning = await Product.create({
    title: 'Route and Motion Planning',
    image: '/proser/RouteandMotionPlanning.png',
    overview: 'Our goal is to develop algorithms to deploy a fleet of vehicles for Mobility-on-Demand in large road networks governed by rules of the road.',
    details: 'Complex traffic situations may require vehicles to handle cases where the rules of the road are in conflict with each other or lead to infeasible planning problems. It is dangerous to just hand off the control to the human and expect that they can deal with the problematic situation. Thus, we require planning algorithms that provide motion plans even when not all rules of the road can be enforces (e.g., driving in the left lane to avoid a construction area), preferably in a minimum violating way.',
  })

  await Graphics.addProduct(Route_and_Motion_Planning);
  await FredoDurand.addProduct(Route_and_Motion_Planning);
  await WojciechMatusik.addProduct(Route_and_Motion_Planning);
  await  JonathanRaganKelley.addProduct(Route_and_Motion_Planning);


 
  const MBlocks_Modular_Robotics = await Product.create({
    title: 'MBlocks Modular Robotics',
    image: '/proser/MBlocksModularRobotics.png',
    overview: 'Creating modular robotic systems which can reconfigure themselves in order to create new robots.',
    details: 'The vision of the field of Modular Self-Reconfigurable Robotics (MSRR) is to create swarms of robots which are able to connect to each other and to be able to change their configuration in order to create new robots or structures. The M-Blocks projects introduces a novel hardware system using pulses of angular momentum and magnetic hinges in an attempt to simplify the practical challenges involving modules moving on a substrate of other modules.',
  })
  await Robotics.addProduct(MBlocks_Modular_Robotics);
  await StefanieJegelka.addProduct(MBlocks_Modular_Robotics);
  await DanielaRus.addProduct(MBlocks_Modular_Robotics);
  await PeterSzolovits.addProduct(MBlocks_Modular_Robotics);

  const Soft_Robotic_Hand = await Product.create({
    title: 'Soft Robotic Hand',
    image: '/proser/SoftRoboticHand.png',
    overview: 'A soft hand capable of robustly grasping and identifying objects using internal strain and force measurements as well as computer vision.',
    details: 'A soft hand that is capable of robustly grasping and identifying objects based on internal state measurements along with a system that autonomously performs grasps. The highly compliant soft hand allows for intrinsic robustness to grasping uncertainties. The addition of internal sensing allows the configuration of the hand and object to be detected.',
  })
  await Robotics.addProduct(Soft_Robotic_Hand);
  await PeterSzolovits.addProduct(Soft_Robotic_Hand);
  await DanielaRus.addProduct(Soft_Robotic_Hand);
  await StefanieJegelka.addProduct(Soft_Robotic_Hand);


  const Drones_that_Drive = await Product.create({
    title: 'Drones that Drive',
    image: '/proser/DronesthatDrive.png',
    overview: 'Multi-robot path planning for robot swarms that can both fly and drive.',
    details: 'The multi-robot path planning problem has been extensively studied for the cases of flying and driving vehicles. However, path planning for the case of vehicles that can both fly and drive has not yet been considered.We`ve developed a framework for multi-robot path planning for a swarm of flying-and-driving vehicles. By putting a lightweight driving platform on a quadcopter, we create a robust vehicle with an energy efficient driving mode and an agile flight mode.',
  })
  await Robotics.addProduct(Drones_that_Drive);
  await PeterSzolovits.addProduct(Drones_that_Drive);
  await DanielaRus.addProduct(Drones_that_Drive);
  await StefanieJegelka.addProduct(Drones_that_Drive);




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
