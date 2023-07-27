<template>
<nav class="navbar navbar-expand-lg navbar-light bg-light">
  <div class="container-fluid">
    <a class="navbar-brand" href="#">
      <img src="@/assets/airserbia.png" height="24">
    </a>
    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
    </button>
    <div class="collapse navbar-collapse" id="navbarSupportedContent">
      <ul class="navbar-nav me-auto mb-2 mb-lg-0">
        <li class="nav-item">
          <router-link class="nav-link" to="/">Home</router-link>
        </li>
        <li class="nav-item">
          <router-link class="nav-link" to="/about">About</router-link>
        </li>
        <li class="nav-item">
          <a href="https://github.com/Pequla/primer-vue" class="nav-link" target="_blank">GitHub</a>
        </li>
      </ul>
    </div>
  </div>
</nav>
  <div class="container">
    <router-view/>
  </div>
  <footer class="text-center">
   &copy; {{ year }} Univerzitet Singidunum
  </footer>
</template>


<script setup>
const year = new Date().getFullYear();
</script>
