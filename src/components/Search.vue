<template>
  <span class="container w-[96%] mx-auto block">
    <span class="flex items-center w-72 mt-4">
      <input
        class="flex text-left space-x-3 pl-10 pr-4 h-12 w-full bg-white ring-1 ring-slate-900/10 hover:ring-slate-300 focus:outline-none focus:ring-2 focus:ring-sky-500 shadow-sm rounded-lg text-slate-400 dark:bg-slate-800 dark:ring-0 dark:text-slate-300 dark:highlight-white/5 dark:hover:bg-slate-700"
        v-model="textToSearch"
        placeholder="Enter something to search..."
        v-on:keyup.enter="doSearch()"
      />
        <svg
          width="24"
          height="24"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
          class="absolute ml-2 flex-none text-slate-300 dark:text-slate-400"
          aria-hidden="true"
        >
          <path d="m19 19-3.5-3.5"></path>
          <circle cx="11" cy="11" r="6"></circle>
        </svg>
    </span>

    <span class="mt-2">
      <div
        v-for="(result, i) in searchResults"
        :key="i"
        class="shadow rounded-lg flex items-center p-2 mt-2 bg-white"
      >
        <div class="ml-4 flex-auto">
          <div class="font-medium">Title: {{ result.title }}</div>
          <div>Created By: {{ result.author }}</div>
          <div>Created Date: {{ new Date(result.created_at).toLocaleString("en-US") }}</div>
        </div>
      </div>
    </span>
  </span>
</template>

<script setup lang="ts">
  import { inject, reactive, ref, type Ref } from "vue"
  import { useSearchStore } from "../stores/search"
  import type {Axios} from 'axios'

  type SearchModel={
    title: String,
    author: String,
    created_at: String
  }
  const axios: Axios = inject("axios") as Axios
  const searchStore = useSearchStore()
  const textToSearch: Ref<String> = ref("")
  const searchResults: Array<SearchModel> = reactive([])

  const doSearch = async () => {
    try {
      if (textToSearch.value) {
        searchResults.length = 0
        searchStore.addSearchHistory(textToSearch)
        const { data } = await axios.get(`search?query=${textToSearch.value}`)
        searchResults.push(...data.hits)
      }
    } catch (error) {
      searchResults.length = 0
    }
  }
</script>
