<template>
  <wysiwyg :value="file_markdown" @input="fileChanged"  />
</template>

<script lang="ts">
import Vue from 'vue'
import { mapMutations } from 'vuex'
import WYSIWYG from '~/components/WYSIWYG/index.vue'

export default Vue.extend({
  props: ['owner', 'repo', 'sha', 'editor_key'],
  components: {
    WYSIWYG
  },
  methods: {
    fileChanged(markdown: String) {
      let { sha } = this;
      this.$store.commit("files/updateContent", { markdown, sha })
    }
  },
  computed: {
    file_markdown() {
      let { selected_file_contents } = this.$store.state.files;
      if(this.$store.state.files.selected_file_contents){
        let markdown = Buffer.from(selected_file_contents,'base64').toString();
        return markdown
      } else {
        return "";
      }
    },
  },
})
</script>