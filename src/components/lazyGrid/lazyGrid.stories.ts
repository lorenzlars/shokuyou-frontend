import type { Meta, StoryObj } from '@storybook/vue3'
import LazyGrid from './LazyGrid.vue'
import BaseCard from '@/components/baseCard/BaseCard.vue'
import type { PaginationParameters, PaginationResponse } from '@/composables/usePagination.ts'
import { http, HttpResponse } from 'msw'

const meta = {
  title: 'Components/LazyGrid',
  // https://github.com/storybookjs/storybook/issues/24238
  component: LazyGrid as unknown as Record<string, unknown>,
  tags: ['autodocs'],
  parameters: {
    msw: {
      handlers: [
        http.get('http://example.com/', () => {
          return HttpResponse.json({
            content: Array.from({ length: 10 }).map((_, i) => ({
              title: `Item ${i}`,
              description: 'Description',
            })),
            page: 1,
            pageSize: 10,
            total: 100,
          })
        }),
      ],
    },
  },
  args: {
    loader: async (
      query: PaginationParameters,
    ): Promise<PaginationResponse<{ title: string; description: string }>> => {
      const response = await fetch('http://example.com')

      return await response.json()
    },
  },
  render: (args) => ({
    components: { LazyGrid, BaseCard },
    setup() {
      return { args }
    },
    template: `
      <LazyGrid v-bind="args" v-slot="{ data }">
        <BaseCard title="test" v-bind="data" />
      </LazyGrid>
    `,
  }),
} satisfies Meta<typeof LazyGrid>

export default meta

type Story = StoryObj<typeof meta>

export const Primary: Story = {}
