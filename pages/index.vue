<template>
  <main class="container">
    <header>
      <h1>SPLENDOR</h1>
      <h4>And it's a wonderful company for you</h4>
        <img src = "~/static/Splendor.png"/>
    </header>
    <section>
      <h2>Introduction</h2>
      <p>
        Splendor is a multinational consulting and software company, which focuses on artificial intellegence, computer graphics, network, robotics, computer security and bigdata. We help customers harness the power of transformative technologies. We are top experts in performance engineering, analytics, and security etc.We use data, software, and insights to solve our customers' most substantial technology challenges.
      </p>
      <h2>What's News</h2>
       <img class= "box1" src = "~/static/news/news1.png"/>
       <div class="box2">
        <h4>Splendor sucessfully help to maintain important network security</h4>
        <p>
            We develop advanced cybersecurity use cases and design and implement analytics dashboards. We also build risk-based response automation solutions. Splendor maintain important network security for our clients. This year we help our client success away from risk and hack. And report a emergency critical risk of infrastructure.
        </p>
      </div>
      <img class= "box3" src = "~/static/news/news2.png"/> 
      <div class="box4">    
      <h4>Flexible use of supervised machine learning</h4>
      <p>
        We sucessfully utilize supervised machine learning techniques on player tracking data from the game of basketball to automatically discover relationships between player movement and offensive success.
      </p>
      </div>
      <img class= "box1" src = "~/static/news/news3.png"/>
      <div class="box2">   
      <h4>Fastpasss is sucessfully used by Flowtune </h4>
      <p>
        Fastpass is a platform which developed by us, aims for high utilization with zero queueing. It provides low median and tail latencies for packets, high data rates between machines, and flexible network resource allocation policies. The key idea in Fastpass is fine-grained control over packet transmission times and network paths.Flowtune is developing network monitoring and scheduling based on principles derived from this work.
      </p>
      </div>
      <img class= "box3" src = "~/static/news/news4.png"/> 
      <div class="box4">
        <h4>Capacity Management in the Kubernetes Era: The 5-Step Roadmap</h4>
        <p>
          With the growth of automated, scalable frameworks, such as Kubernetes, hosted on flexible (hybrid) cloud or AWS, Azure, and GCP, many IT organizations have concluded that capacity planning as we know it has completed its mission. We sucessfully held assumptions about infrastructure capacity in the cloud and the five essential steps to a successful cloud-native capacity management implementation. 
        </p>
      </div>
       <img class= "box1" src = "~/static/news/news5.png"/>
       <div class="box2">   
      <h4>VOO TV+ Upgrades UX with Splendor </h4>
      <p>
        Splendor and VOO worked closely to implement the next generation of VOO’s front-end experience, introducing advanced AI capabilities built into the Splendor UX Engine machine learning platform, supporting the migration of current use cases and the addition of a range of new use cases to improve VOO’s subscribers’ user experience. After a successful pilot test, VOO is now rolling out the new service, VOO TV+,  across its entire television customers.  
      </p>
      </div>
    </section>
  </main>
</template>

<script>
export default {}
</script>

<style scoped>
h1 {
  font-size: 50px;
  font-weight: bolder;
  font-family: "Lucida Handwriting", "Lucida Console","Courier New", monospace;
}
.box1{
  max-width:35%;
  text-align: left;
  height: 250px;
  float: left;
  margin-top: 40px;
  margin-bottom: 70px;
  overflow: hidden;
}
.box2{
  max-width:55%;
  text-align: right;
  height: 300px;
  float: right;
  margin-top: 30px;
  margin-bottom: 30px;
  overflow: hidden;
}

.box3{
  max-width:35%;
  text-align: right;
  height: 250px;
  float: right;
  margin-top: 40px;
  margin-bottom: 70px;
  overflow: hidden;
}
.box4{
  max-width:55%;
  text-align: left;
  height: 300px;
  float: left;
  margin-top: 30px;
  margin-bottom: 30px;
  overflow: hidden;
}
h2 {
  margin-top: 40px;
  margin-bottom: 40px;
  font-size: 35px;
}
h4 {
  margin-top: 20px;
  margin-bottom: 20px;
  text-align: center;
  font-size: 25px;
}
p {
  text-align: center;
  font-size: 18px;
  margin-bottom: 20px;
}
img {
  width: auto;
  height: auto;
  max-width: 30%;
  max-height:30%;
  margin-top: 20px;
  margin-bottom: 20px;
}
</style>
