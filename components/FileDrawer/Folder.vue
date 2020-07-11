<template>
  <div v-bind:class="{'pl-2':(folder.name !== '/')}">
    <span @click="toggleCollapse" class="cursor-pointer" v-show="folder.name !== '/'">
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
        class="cursor-pointer pl-2 pb-1"
      >
        {{file.name}}
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import Folder from './Folder.vue'
import { faFolder, faFile } from '@fortawesome/free-regular-svg-icons'
import {
  faChevronDown,
  faChevronRight,
} from '@fortawesome/free-solid-svg-icons'
import { mapMutations } from 'vuex'

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
  },
})
</script>