<template>
  <div class="h-screen flex flex-col">
    <editor-title-bar
      :repo="name"
      :owner="owner"
      mode="gist"
      :menuToggle="() => showMenu = !showMenu"
      :newFile="() => showNewFile = !showNewFile"
    />
    <div class="flex overflow-hidden h-full">
      <div class="flex-1 overflow-y-scroll h-screen flex justify-center">
        <div class="w-full container" v-for="(file, name) in selectedGist.files" v-bind:key="name">
          <gist-file :gist="file" />
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { mapMutations, mapGetters } from 'vuex'
import File from '~/components/File.vue'
import EditorTitleBar from '~/components/EditorTitleBar.vue'
import FileDrawer from '~/components/FileDrawer/index.vue'
import GistFile from '~/components/GistFile.vue'

export default Vue.extend({
  middleware: 'auth',
  components: {
    GistFile,
  },
  data() {
    return {
      showMenu: true,
      showNewFile: false,
    }
  },
  computed: {
    files() {
      return this.$store.state.gists.selected.files;
    },
    selectedGist() {
      return this.$store.state.gists.selected;
    },
  },
  beforeRouteLeave(to, from, next) {
    if (this.$store.state.files.changed_files.length > 0) {
      const answer = window.confirm(
        'Do you really want to leave?\nyou have unsaved changes!'
      )
      if (answer) {
        next()
      } else {
        next(false)
      }
    } else {
      next()
    }
  },
})
</script>