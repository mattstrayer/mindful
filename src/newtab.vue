<script setup lang="ts">
import "./index.css"

import TaskListItem from "./components/taskListItem.vue"

const state = {
  tasks: [
    {
      id: 1,
      name: "I really need to do this task!",
      completed: false
    },
    {
      id: 2,
      name: "this one is a little less pressing, so ofc i finished it first",
      completed: true
    }
  ]
}
</script>

<template>
  <h1 class="text-zinc-100 text-4xl text-center font-extrabold mb-4">
    <span>be</span>
    <span>mindful</span>
  </h1>

  <div class="container">
    <form class="mb-4">
      <div class="form-control">
        <label>Task</label>
        <div class="join">
          <input
            type="text"
            placeholder="Type here"
            class="input input-bordered join-item w-full max-w-xs" />
          <button class="btn btn-primary join-item">add</button>
        </div>
      </div>
    </form>
    <TaskListItem :task="task" v-for="task in state.tasks" />
  </div>
</template>

<style>
#__plasmo {
  justify-content: center;
  width: 100%;
  height: 100%;
}

.container {
  width: 74%;
  height: 100%;
}
</style>
