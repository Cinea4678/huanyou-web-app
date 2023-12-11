<script setup lang="ts"></script>

<template>
  <div class="app-container">
    <router-view />
  </div>
</template>

<style>
body {
  background-size: cover;
  background: #d7ece6;
  background: url("/mesh.png") no-repeat center center fixed;

  font-weight: lighter;
}
.app-container {
  min-height: 200vh;
}
</style>
