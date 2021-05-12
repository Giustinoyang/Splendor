<template>
    <div class="splash-container">
        <div class="cotologe">
            <a href="areaList">Area List</a> -> Area1
        </div>
        <div>
            <div class="splash">
                <h1 class="splash-head">AREA1</h1>
            </div>   
        </div>
        <dev class="transLink">
            <div class="pure-g">
                <div class="pure-u-1-3"><a href="area1Over"><i>Overview</i></a></div>
                <div class="pure-u-1-3"><a href="area1Det">Details</a></div>
                <div class="pure-u-1-3"><a href="area1More">More about</a></div>
            </div>
        </dev>
        <div class="maintext">
            <p>Overview</p>
            More picture and more Words.
        </div>
    </div>
</template>

<script>
    export default {}
</script>

<style scoped>
.cotologe{
    width: 80%;
    height: 3%;
    margin: auto;
    position: absolute;
    top: -85%; left: 0; bottom: 0; right: 0;
    line-height: 3em;
    color: white;
}
.transLink{
    width: 80%;
    height: 5%;
    margin: auto;
    position: absolute;
    top: -60%; left: 0; bottom: 0; right: 0;
    text-align: center;
    line-height: 3em;
    border: 3px solid white;
    color: white;
}

.maintext{
    width: 80%;
    height: 50%;
    margin: auto;
    position: absolute;
    top: 0; left: 0; bottom: 0; right: 0;
    text-align: center;
    line-height: 3em;
    border: 3px solid white;
    color: white;
    font-size: 20px;
    font-weight: bold;
}

a:link, a:active{
    text-decoration: none;
    color: white;
}
</style>