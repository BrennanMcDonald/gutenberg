<template>
<div>
      <template v-for="(Item, Index) in MenuButtons">
        <button
          class="h-full w-10"
          @click="Item.command"
          v-bind:key="Index"
          v-show="md_toggle"
          v-if="Item.hasOwnProperty('icon') || Item.hasOwnProperty('text')">
          <fa v-show="Item.icon" :icon="Item.icon" />
          <span v-show="Item.text">
            <b>{{Item.text}}</b>
          </span>
        </button>
        <dropdown v-show="md_toggle" class="px-2" v-bind:key="Index" :options="Item" v-else />
      </template>
  <wysiwyg :value="file_markdown" @input="fileChanged"  />

</div>
</template>

<script lang="ts">
import Vue from 'vue'
import { mapMutations } from 'vuex'
import WYSIWYG from '~/components/WYSIWYG/index.vue'
import MenuButtons from './WYSIWYG/_menuButtons'

export default Vue.extend({
  props: ['owner', 'repo', 'path', 'editor_key'],
  components: {
    WYSIWYG
  },
  methods: {
    fileChanged(markdown: String) {
      let { path } = this;
      this.$store.commit("files/updateContent", { markdown, path })
    }
  },
  computed: {
    file_markdown() {
      let { selected_file_contents } = this.$store.state.files;
      if(selected_file_contents !== ""){
        let markdown = Buffer.from(selected_file_contents,'base64').toString();
        return markdown;
      } else {
        return "";
      }
    },
    MenuButtons() {
      return MenuButtons;
    }
  },
})
</script>