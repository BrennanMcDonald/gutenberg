<template>
  <div>
    <div>
      <div class="h-screen flex flex-col justify-center">
        <div class="flex flex-col items-center">
          <div>
            <img class="flex-shrink-1" src="~/assets/img/printing_press.gif" />
          </div>
          <h1 class="text-6xl font-semibold font-sans text-center cursor-pointer">📝Gutenberg</h1>
          <hr />
          <p
            class="text-xl font-sans text-center"
          >A personal knowledge database with publishing ability.</p>
          <div class="mt-10">
            <a
              v-show="!logged_in && !loading && !is_callback"
              @click="() => { loading = true; this.$auth.loginWith('github') }"
              rel="noopener noreferrer"
              class="border py-4 px-4 rounded hover:bg-gray-100 cursor-pointer"
            >
              <span class="pr-4 mr-4 -py-2 border-r">
                <fa :icon="faGithub" />
              </span>Login with Github
            </a>
            <a
              v-show="logged_in && !loading && !is_callback"
              href="/repos"
              rel="noopener noreferrer"
              class="border py-4 px-4 rounded hover:bg-gray-100"
            >Start Writing!</a>
            <a
              v-show="loading || is_callback"
              class="border py-4 px-4 rounded hover:bg-gray-100"
            ><fa :icon="faSpinner" class="fa-spin" /></a>
          </div>
        </div>
      </div>
      <div>
        <img class="px-20 py-4" src="~/assets/img/screenshot.png" />
      </div>
    </div>
  </div>
</template>

<script>
import Vue from 'vue'
import showdown from 'showdown'
import { faGithub } from '@fortawesome/free-brands-svg-icons'
import { faSpinner } from '@fortawesome/free-solid-svg-icons'

import README from '../README.md'

const converter = new showdown.Converter({})

converter.setOption('tables', 'true')
converter.setOption('tasklists', 'true')
converter.setOption('metadata', 'true')
converter.setFlavor('github')

export default Vue.extend({
  mounted() {
  },
  data() {
    return {
      loading: false
    } 
  },
  computed: {
    faGithub() {
      return faGithub;
    },
    faSpinner() {
      return faSpinner;
    },
    logged_in() {
      return this.$auth.loggedIn;
    },
    is_callback() {
      return ('code' in this.$route.query) && ('state' in this.$route.query);
    },
  }
})
</script>