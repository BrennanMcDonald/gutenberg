<template>
  <nav class="flex justify-center flex-wrap p-6" v-if="false">
    <div
      class="container px-4 justify-between flex text-white flex items-center flex-shrink-0 text-white mr-6"
    >
      <div class="flex text-gray-800">
        <a href="/repos">
          <h1 class="font-normal text-2xl tracking-tight">📝 Gutenberg</h1>
        </a>
      </div>
      <div class="block lg:hidden">
        <button
          class="flex items-center px-3 py-2 border rounded text-teal-200 border-teal-400 hover:text-white hover:border-white"
        >
          <svg class="fill-current h-3 w-3" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
            <title>Menu</title>
            <path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z" />
          </svg>
        </button>
      </div>
      <div class="w-full block flex-grow lg:flex lg:items-center lg:w-auto">
        <div class="text-sm lg:flex-grow">
          <a
            href="#responsive-header"
            class="block mt-4 lg:inline-block lg:mt-0 text-black hover:text-white mr-4"
          >Docs</a>
          <a
            href="#responsive-header"
            class="block mt-4 lg:inline-block lg:mt-0 text-black hover:text-white mr-4"
          >Examples</a>
          <a
            href="#responsive-header"
            class="block mt-4 lg:inline-block lg:mt-0 text-black hover:text-white"
          >Blog</a>
        </div>
        <div>
          <a
            href="#"
            class="inline-block text-sm px-4 py-2 leading-none border rounded text-white border-white hover:border-transparent hover:text-teal-500 hover:bg-white mt-4 lg:mt-0"
          >Download</a>
        </div>
      </div>
      <div>
        <a
          class="cursor-pointer float-right inline-block text-sm px-4 py-2 leading-none text-gray-800 font-light"
        >Sign Out</a>
      </div>
    </div>
  </nav>
  <nav class="flex justify-center items-center flex-wrap p-6" v-else>
    <div class='container flex px-4'>
      <div class="flex items-center flex-shrink-0 text-white mr-6">
      <div class="flex text-black">
        <a href="/repos">
          <h1 class="font-semibold uppercase text-2xl">📝 Gutenberg</h1>
        </a>
      </div>
      </div>
      <div class="block lg:hidden">
        <button
          class="flex items-center px-3 py-2 border rounded text-gray-200 border-teal-400 hover:text-white hover:border-white"
        >
          <svg class="fill-current h-3 w-3" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
            <title>Menu</title>
            <path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z" />
          </svg>
        </button>
      </div>
      <div class="w-full block flex-grow lg:flex lg:items-center lg:w-auto">
        <div class="text-sm lg:flex-grow">
          <a
            href="/repos"
            class="block mt-4 lg:inline-block lg:mt-0 text-black hover:text-gray-600 mr-4"
          >Repos</a>
          <a
            href="/gists"
            class="block mt-4 lg:inline-block lg:mt-0 text-black hover:text-gray-600 mr-4"
          >Gists</a>
        </div>
        <div>
          <a
            href="#"
            class="inline-block text-sm px-4 py-2 leading-none border rounded text-white border-white hover:border-transparent hover:text-teal-500 hover:bg-white mt-4 lg:mt-0"
          >Sign Out</a>
        </div>
      </div>
    </div>
  </nav>
</template>

<script>
import Vue from 'vue'
export default Vue.extend({})
</script>