<template>
  <main class="container">
    <header>
      <h1>Splendor</h1>
      <h4>And it's a wonderful company for you</h4>
    </header>
    <section>
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
    </section>
  </main>
</template>

<script>
export default {}
</script>

<style scoped>
.box1{
  max-width:30%;
  text-align: left;
  height: 200px;
  float: left;
  margin-top: 20px;
  margin-bottom: 20px;
}
.box2{
  max-width:60%;
  text-align: right;
  height: 200px;
  float: right;
  margin-top: 20px;
  margin-bottom: 20px;
}

.box3{
  max-width:30%;
  text-align: right;
  height: 200px;
  float: right;
  margin-top: 20px;
  margin-bottom: 20px;
}
.box4{
  max-width:60%;
  text-align: left;
  height: 200px;
  float: left;
  margin-top: 20px;
  margin-bottom: 20px;
}
h2 {
  margin-top: 20px;
  margin-bottom: 20px;
}
h4 {
  margin-top: 20px;
  margin-bottom: 20px;
  text-align: center;
}
p {
  text-align: left;
  text-align: center;
}
img {
  width: auto;
  height: auto;
  max-width: 50%;
  max-height:50%;
}
</style>
