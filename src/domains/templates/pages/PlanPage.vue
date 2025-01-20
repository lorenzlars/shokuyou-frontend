<script lang="ts" setup>
import { type PlanResponseDto, PlansService } from '@/api'
import PlanForm from '@/domains/templates/components/PlanForm.vue'
import { unwrapResponseData } from '@/components/form'
import { extractParamProp } from '@/utils/routerUtils.ts'
import { shallowRef } from 'vue'
import { useRoute } from '@kitbag/router'

const { params } = useRoute()
const id = extractParamProp(params, 'id')
const plan = shallowRef<PlanResponseDto>()

if (id) {
  plan.value = unwrapResponseData(await PlansService.getPlan({ path: { id } }))
}
</script>

<template>
  <div class="py-5">
    <PlanForm :initial-values="plan" />
  </div>
</template>
