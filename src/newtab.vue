<script setup lang="ts">
import "./index.css"
</script>

<template>
  <div class="container">
    <div class="join">
      <input
        type="text"
        placeholder="Type here"
        class="input input-bordered join-item w-full max-w-xs" />
      <button class="btn btn-primary join-item">Hello!</button>
    </div>
    <div class="form-control">
      <label class="label cursor-pointer">
        <input type="checkbox" checked="checked" class="checkbox" />
        <span class="label-text">Remember me</span>
      </label>
    </div>

    <h2 class="text-zinc-100 text-4xl text-center font-extrabold">
      be...mindful
    </h2>
  </div>
</template>

<style>
#__plasmo {
  display: flex;
  justify-content: center;
  width: 100%;
  height: 100%;
}

.container {
  width: 100%;
  height: 100%;
}
</style>
