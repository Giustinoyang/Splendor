<template>
    <div class="splash-container">

        <div class="splash">
            <h1 class="splash-head">AREA LIST</h1>
        </div>   
  
        <div class="list_area">
            <div class="list_head">
                <div class="area_head">
                    Area1
                </div>
                <div class="area_head">
                    Area2
                </div>
            </div>
            <div class="list_text">
                <div class="area_text">
                    This Area is...
                    <a href="area1Over">more detail</a>
                </div>
                <div class="area_text">
                    This Area is...
                    <a href="area2">more detail</a>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {}
</script>

<style scoped>
.list_area{
    width: 80%;
    height: 50%;
    margin: auto;
    position: absolute;
    top: 0%; left: 0%; bottom: 0%; right: 0%;
    text-align: center;
    line-height: 5em;
}
.list_head{
    width: 30%;
    margin: auto;
    position: absolute;
    text-align: center;
}

.list_text{
    width: 60%;
    margin: auto;
    left: 40%;
    position: absolute;
    text-align: center;
}

.area_head{
    border: 3px solid white;
    border-radius: 50px;
    margin-bottom: 1em;
}

.area_text{
    border: 3px solid white;
    border-radius: 5px;
    margin-bottom: 1em;
}
</style>