<template>
</template>

<script lang="ts">
import Vue from 'vue'
import showdown from 'showdown'
const converter = new showdown.Converter({})

converter.setOption('tables', 'true')
converter.setOption('tasklists', 'true')
converter.setOption('metadata', 'true')
converter.setFlavor('github')

export default Vue.extend({
  props: ['file'],
  mounted() {
    console.log("EDITOR")
    console.log(this.file)
  },
})
</script>
