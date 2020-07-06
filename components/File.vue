<template>
  <div class="flex-grow flex-shrink-0 h-full">
      <div class="p-4 border flex">
        <a
          @click="saveFile"
          class="py-2 px-4 border rounded border-blue-600 hover:bg-blue-600 hover:text-white cursor-pointer"
        >Save</a>
        <a
          class="py-2 flex-end px-4 border rounded border-blue-600 hover:bg-blue-600 hover:text-white cursor-pointer"
        >View metadata</a>
      </div>
      <div class="flex p-4 h-full">
        <div class="w-1/2">
          <textarea v-bind:value="raw_markdown" @input="updateContent" class="resize w-full h-full"></textarea>
        </div>
        <div class="w-1/2 h-full overflow-x-scoll">
          <div class='p-4 m-4 shadow h-full overflow-x-scroll' v-html="file_content.html" id="Markdown"></div>
        </div>
      </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import showdown from 'showdown'
import { Editor, EditorContent, EditorMenuBar } from 'tiptap'
import { mapMutations } from 'vuex'

const converter = new showdown.Converter({})

converter.setOption('tables', 'true')
converter.setOption('tasklists', 'true')
converter.setOption('metadata', 'true')
converter.setFlavor('github')

export default Vue.extend({
  props: ['owner', 'repo', 'sha'],
  data() {
    return {
      metadata_toggle: false,
      editor: null,
    }
  },
  components: {
    EditorContent,
  },
  mounted() {
    this.editor = new Editor({
      content: this.file_content.html,
      onUpdate: this.updateContent,
    })
  },
  beforeDestroy() {
    this.editor.destroy()
  },
  methods: {
    ...mapMutations({
      updateContent: 'files/updateContent',
      saveFile: 'files/saveFile'
    }),
    saveFile() {
      this.$store.commit('files/saveFile', {
        owner: this.owner,
        repo: this.repo,
      })
    }
  },
  computed: {
    raw_markdown() {
      if (this.$store.state.files.selected_data.content) {
        return Buffer.from(
          this.$store.state.files.selected_data.content,
          'base64'
        ).toString()
      } else {
        return ''
      }
    },
    file_content() {
      if (this.$store.state.files.selected_data.content) {
        let markdown = Buffer.from(
          this.$store.state.files.selected_data.content,
          'base64'
        ).toString()
        let html = converter
          .makeHtml(markdown)
          .replace(
            /<img src="(.*)" alt="(.*)"\s*\/>/g,
            `<img src="https://raw.githubusercontent.com/${this.owner}/${this.repo}/master/$1" alt="$2" />`
          )
        let metadata = converter.getMetadata()
        return {
          html,
          metadata,
          markdown,
        }
      } else {
        return ''
      }
    },
  },
})
</script>

<style lang="scss">
#Markdown {
  @media print {
    *,
    *:before,
    *:after {
      background: transparent !important;
      color: #000 !important;
      box-shadow: none !important;
      text-shadow: none !important;
    }

    a,
    a:visited {
      text-decoration: underline;
    }

    a[href]:after {
      content: ' (' attr(href) ')';
    }

    abbr[title]:after {
      content: ' (' attr(title) ')';
    }

    a[href^='#']:after,
    a[href^='javascript:']:after {
      content: '';
    }

    pre,
    blockquote {
      border: 1px solid #999;
      page-break-inside: avoid;
    }

    thead {
      display: table-header-group;
    }

    tr,
    img {
      page-break-inside: avoid;
    }

    img {
      max-width: 100% !important;
    }

    p,
    h2,
    h3 {
      orphans: 3;
      widows: 3;
    }

    h2,
    h3 {
      page-break-after: avoid;
    }
  }

  pre,
  code {
    font-family: Menlo, Monaco, 'Courier New', monospace;
  }

  pre {
    padding: 0.5rem;
    line-height: 1.25;
    overflow-x: scroll;
  }

  a,
  a:visited {
    color: #3498db;
  }

  a:hover,
  a:focus,
  a:active {
    color: #2980b9;
  }

  .modest-no-decoration {
    text-decoration: none;
  }

  html {
    font-size: 12px;
  }

  @media screen and (min-width: 32rem) and (max-width: 48rem) {
    html {
      font-size: 15px;
    }
  }

  @media screen and (min-width: 48rem) {
    html {
      font-size: 16px;
    }
  }

  body {
    line-height: 1.85;
  }

  p,
  .modest-p {
    font-size: 1rem;
    margin-bottom: 1.3rem;
  }

  h1,
  .modest-h1,
  h2,
  .modest-h2,
  h3,
  .modest-h3,
  h4,
  .modest-h4 {
    margin: 1.414rem 0 0.5rem;
    font-weight: inherit;
    line-height: 1.42;
  }

  h1,
  .modest-h1 {
    margin-top: 0;
    font-size: 3.998rem;
  }

  h2,
  .modest-h2 {
    font-size: 2.827rem;
  }

  h3,
  .modest-h3 {
    font-size: 1.999rem;
  }

  h4,
  .modest-h4 {
    font-size: 1.414rem;
  }

  h5,
  .modest-h5 {
    font-size: 1.121rem;
  }

  h6,
  .modest-h6 {
    font-size: 0.88rem;
  }

  small,
  .modest-small {
    font-size: 0.707em;
  }

  /* https://github.com/mrmrs/fluidity */

  img,
  canvas,
  iframe,
  video,
  svg,
  select,
  textarea {
    max-width: 100%;
  }

  @import url('http://fonts.googleapis.com/css?family=Open+Sans+Condensed:300,300italic,700');

  @import url('http://fonts.googleapis.com/css?family=Arimo:700,700italic');

  html {
    font-size: 18px;
    max-width: 100%;
  }

  body {
    color: #444;
    font-family: 'Open Sans Condensed', sans-serif;
    font-weight: 300;
    margin: 0 auto;
    max-width: 48rem;
    line-height: 1.45;
    padding: 0.25rem;
  }

  h1,
  h2,
  h3,
  h4,
  h5,
  h6 {
    font-family: Arimo, Helvetica, sans-serif;
  }

  h1,
  h2,
  h3 {
    border-bottom: 2px solid #fafafa;
    margin-bottom: 1.15rem;
    padding-bottom: 0.5rem;
    text-align: center;
  }

  blockquote {
    border-left: 8px solid #fafafa;
    padding: 1rem;
  }

  pre,
  code {
    background-color: #fafafa;
  }
}
</style>
