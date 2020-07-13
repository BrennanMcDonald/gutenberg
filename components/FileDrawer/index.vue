<template>
  <div
    class="fixed z-20 lg:relative h-screen bg-white transition-all duration-500 border-collapse overflow-y-scroll"
    v-bind:class="[showMenu?'w-screen lg:w-500':'w-0']"
  >
    <folder :folder="directory_tree" :onMenuItemSelected="onMenuItemSelected" />
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { mapMutations } from 'vuex'
import Folder from './Folder.vue'

var tree = {
  // Represents the "root" directory, like in a filesystem.
  root: {
    absolute_path: '',
    files: [],
  },
}

export default Vue.extend({
  props: ['files', 'showMenu', 'selectedFile', 'onMenuItemSelected'],
  data() {
    return {
      newFile: {
        name: '',
        path: '',
      },
    }
  },
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
      });
      this.onMenuItemSelected();
    },
  },
  computed: {
    directory_tree() {
      let file_paths = this.files.map((el) => el.path)
      let tree = {
        name: '/',
        type: 'directory',
        files: [],
        children: {},
      }

      let addnode = (obj) => {
        var splitpath = obj.replace(/^\/|\/$/g, '').split('/')
        var ptr = tree
        if (splitpath.length === 1) {
          tree.files.push({
            name: obj,
            path: obj,
            file_object: this.files.filter((x) => x.path === obj)[0],
          })
        } else {
          for (var i = 0; i < splitpath.length; i++) {
            if (
              !(splitpath[i] in ptr.children) &&
              !splitpath[i].includes('.md')
            ) {
              ptr.children[splitpath[i]] = {
                name: splitpath[i],
                type: 'directory',
                depth: i,
                files: [],
                children: {},
              }
            } else if (splitpath[i].includes('.md')) {
              ptr.files.push({
                name: splitpath[i],
                path: obj,
                file_object: this.files.filter((x) => x.path === obj)[0],
              })
            }
            ptr = ptr.children[splitpath[i]]
          }
        }
      }

      file_paths.forEach(addnode)
      return tree
    },
  },
})
</script>