<template>
  <div class="container w-[96%] mx-auto block">
    <span class="mt-4">
      <span class="text-lg font-bold">Recent Searches</span>
      <div class="shadow rounded-lg items-center p-2 bg-white">
        <p
          v-for="(searchedText, i) in recentSearches"
          :key="i"
          class="font-medium mt-2"
        >
          {{ searchedText }}
        </p>
      </div>
    </span>
  </div>
</template>

<script setup lang="ts">
  import { computed, type ComputedRef } from "vue"
  import { useSearchStore } from "../stores/search"
  const searchStore = useSearchStore()
  const recentSearches: ComputedRef<String[]> = computed(() => [ ...searchStore.searchHistory ])
</script>
