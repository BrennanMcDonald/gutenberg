<template>
  <div class='p-20'>
    <div>
      <div>
        <h1 class='text-5xl font-semibold font-sans text-center'>Gutenburg</h1>
        <hr>
        <p class='text-xl font-sans text-center'>
          A personal knowledge database with publishing ability.
        </p>
      </div>
      <div>
        <img class='px-20 py-4' src='~/assets/img/screenshot.png' />
      </div>
      <div class="links">
        <a
          href="/login"
          rel="noopener noreferrer"
          class="border border-b-4 hover:border-0 py-4 px-8 rounded"
        >Login with Github <fa :icon="faGithub" /></a>
      </div>
    </div>
  </div>
</template>

<script>
import Vue from 'vue'
import showdown from 'showdown'
import { faGithub } from '@fortawesome/free-brands-svg-icons'

import README from '../README.md'

const converter = new showdown.Converter({})

converter.setOption('tables', 'true')
converter.setOption('tasklists', 'true')
converter.setOption('metadata', 'true')
converter.setFlavor('github')

export default Vue.extend({
  auth: false,
  computed: {
    readme_html() {
      let asdf = README.replace('assets', '~/assets')
      return converter.makeHtml(asdf);
    }
  }
})
</script>