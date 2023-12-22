<script setup lang="ts"></script>

<template>
  <div class="app-container">
    <suspense>
      <router-view />
      <template #fallback>
        <div class="flex w-full h-full justify-center items-center">
          <svg-icon name="InfLoading" />
        </div>
      </template>
    </suspense>
  </div>
</template>

<style>
body {
  background-size: cover;
  background: #d7ece6;
  background: url("/mesh.png") no-repeat center center fixed;

  font-weight: lighter;

  --app-padl: 12px;
  --app-padr: 12px;
  --app-padx: calc(var(--app-padl) + var(--app-padr));
}

body:before {
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 40vh;
  background: linear-gradient(to bottom, #d7ece6 30%, #d7ece600);

  z-index: 0;
}

.app-container {
  min-height: 100vh;
  position: relative;
  z-index: 1;

  padding-left: var(--app-padl);
  padding-right: var(--app-padr);
}
</style>
