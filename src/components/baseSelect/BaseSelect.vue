<script lang="ts" setup>
defineProps<{
  options: { value: string; label: string }[]
}>()
const modelValue = defineModel()
</script>

<template>
  <div class="w-full max-w-sm mx-auto">
    <label for="select" class="block text-sm font-medium text-gray-700 mb-2">
      Select an option:
    </label>
    <div class="relative">
      <select
        id="select"
        v-model="modelValue"
        class="block w-full appearance-none rounded-md border border-gray-300 bg-white py-2 pl-3 pr-10 text-base focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 sm:text-sm"
      >
        <option v-for="option in options" :key="option.value" :value="option.value">
          {{ option.label }}
        </option>
      </select>
      <div class="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
        <svg
          class="h-4 w-4 text-gray-400"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path
            fill-rule="evenodd"
            d="M10 3a1 1 0 01.867.5l5 8a1 1 0 01-.867 1.5H4.133a1 1 0 01-.867-1.5l5-8A1 1 0 0110 3zm0 2.236L6.264 10h7.472L10 5.236zM14.5 14a1.5 1.5 0 110 3 1.5 1.5 0 010-3z"
            clip-rule="evenodd"
          />
        </svg>
      </div>
    </div>
    <p class="mt-2 text-sm text-gray-600">
      Selected Value: <span class="font-semibold">{{ modelValue }}</span>
    </p>
  </div>
</template>
