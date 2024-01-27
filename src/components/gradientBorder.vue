<template>
  <div class="mindful-border"></div>
</template>

<style scoped>
.mindful-border {
  height: 2px;
  width: 100%;

  background: linear-gradient(
    90deg,
    transparent 0%,
    oklch(var(--n)) 50%,
    transparent 100%
  );
}
</style>
