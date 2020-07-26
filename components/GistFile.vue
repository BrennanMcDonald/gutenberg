<template>
  <div class='w-full'>
    <h2>{{this.gist.name}}</h2>
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
    <wysiwyg :value="file_markdown" />
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { mapMutations } from 'vuex'
import WYSIWYG from '~/components/WYSIWYG/index.vue'
import MenuButtons from './WYSIWYG/_menuButtons'

export default Vue.extend({
  props: ['gist', 'editor_key'],
  mounted() {
    this.$axios.get(this.gist.raw_url).then(res => {
      console.log("MNTED")
      console.log(res);
    })
  },
  components: {
    WYSIWYG,
  },
  data() {
    return {
      file_markdown: '',
      md_toggle: false
    }
  },
  computed: {
    MenuButtons() {
      return MenuButtons
    },
  },
})
</script>