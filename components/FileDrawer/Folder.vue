<template>
  <div v-bind:class="{'pl-3 border-l py-1':(folder.name !== '/')}">
    <span @click="toggleCollapse" class="cursor-pointer py-2" v-show="folder.name !== '/'">
      <fa :icon="faChevronDown" v-show="!collapsed" />
      <fa :icon="faChevronRight" v-show="collapsed" />
      {{ folder.name }}
    </span>
    <div v-show="!collapsed || folder.name === '/'">
      <folder v-for="folder in folder.children" v-bind:key="folder.name" :folder="folder" />
      <div
        v-for="file in folder.files"
        v-bind:key="file.path"
        @click="() => { selectFile(file.file_object) }"
        class="cursor-pointer pl-2 py-1 border-l"
        v-bind:class="{italic: unsaved_files.includes(file.path)}">
        <span v-show="unsaved_files.includes(file.path)">* </span>{{file.name}}
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import Folder from './Folder.vue'
import { mapMutations } from 'vuex'

import { faFolder, faFile } from '@fortawesome/free-regular-svg-icons'
import {
  faChevronDown,
  faChevronRight,
} from '@fortawesome/free-solid-svg-icons'

export default Vue.extend({
  name: 'folder',
  props: ['depth', 'folder'],
  components: {
    Folder,
  },
  methods: {
    ...mapMutations({
      setSelectedFile: 'files/setSelectedFile',
      getFileContents: 'files/getFileContents',
    }),
    selectFile(file: { path: String }) {
      let { name, owner } = this.$route.params
      this.setSelectedFile(file)
      this.getFileContents({
        path: file.path,
        name,
        owner,
      })
    },
    toggleCollapse() {
      this.collapsed = !this.collapsed
    },
  },
  data() {
    return {
      collapsed: true,
    }
  },
  computed: {
    faChevronDown() {
      return faChevronDown
    },
    faChevronRight() {
      return faChevronRight
    },
    unsaved_files() {
      return this.$store.state.files.changed_files;
    }
  },
})
</script>