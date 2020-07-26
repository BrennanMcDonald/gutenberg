<template>
  <div class="w-full border flex p-4 pl-2 relative">
    <button class="text-lg py-2 px-4" v-on:click="toggleMenu">
      <fa :icon="faBars" />
    </button>
    <h1 @click="() => this.$router.push(`/${mode}s`)" class="cursor-pointer self-center text-xl">Back to {{mode}} List</h1>
    <button
      @click="newFile"
      class="py-2 px-4 rounded border ml-4 hover:bg-gray-500 hover:text-white cursor-pointer -mr-1"
    >New File <fa :icon="faPlusCircle" /></button>
    <div class="absolute pr-10 right-0">
      <button
        @click="saveFile"
        class="py-2 px-4 rounded-l border border-r-0 hover:bg-gray-500 hover:text-white cursor-pointer -mr-1"
      >Save</button>
      <button
        class="py-2 px-4 rounded-r border hover:bg-gray-500 hover:text-white cursor-pointer"
      >View metadata</button>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { faPlusCircle, faBars } from '@fortawesome/free-solid-svg-icons'

export default Vue.extend({
  props: ['repo', 'menuToggle', 'owner', 'editorRef', 'newFile', 'mode'],
  computed: {
    faPlusCircle() {
      return faPlusCircle
    },
    faBars() {
      return faBars
    },
  },
  methods: {
    toggleMenu() {
      this.menuToggle();
    },
    saveFile() {
      this.$store.commit('files/saveFile', {
        owner: this.owner,
        repo: this.repo,
      });
    }
  }
})
</script>
