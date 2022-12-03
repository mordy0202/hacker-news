import { reactive, type Ref } from 'vue'
import { defineStore } from 'pinia'

export const useSearchStore = defineStore('search', () => {
  const searchHistory = reactive([])

  function addSearchHistory(newSearch: Ref<String>) {
    searchHistory.push(newSearch)
  }

  return {
    searchHistory,
    addSearchHistory
  }
})
