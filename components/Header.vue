<template>
    <header id="header">
        <div class="home-menu pure-menu pure-menu-horizontal">
            <a class="pure-menu-heading" href="">Splendor</a>
            <ul class="pure-menu-list">
                <li class="pure-menu-item"><a href="/" class="pure-menu-link">Home</a></li>
                |
                <li class="pure-menu-item"><a href="#" class="pure-menu-link">Careers</a></li>
                |
                <li class="pure-menu-item"><a href="#" class="pure-menu-link">Contacts</a></li>
            </ul>
        </div>
        <center>
            <div class="home-menu pure-menu pure-menu-horizontal">
                <ul class="pure-menu-list">
                    <li class="pure-menu-item"><a href="introduction" class="pure-menu-link">Introduction</a></li>
                    |
                    <li class="pure-menu-item"><a href="#" class="pure-menu-link">Areas</a></li>
                    |
                    <li class="pure-menu-item"><a href="#" class="pure-menu-link">Services</a></li>
                    |
                    <li class="pure-menu-item"><a href="#" class="pure-menu-link">Products</a></li>
                    |
                    <li class="pure-menu-item"><a href="#" class="pure-menu-link">People</a></li>
                </ul>
            </div>
        </center>
    </header>
</template>

<script>
    export default{
        name: "Header",
        head: {
            link: [
                {rel: 'stylesheet', href: '/css/pure-min.css'},
                {rel: 'stylesheet', href: '/css/style.css'},
            ]
        }
    }
</script>
<style scoped>
</style>
