import type { Meta, StoryObj } from '@storybook/vue3'
import LazyGrid from './LazyGrid.vue'
import BaseCard from '@/components/baseCard/BaseCard.vue'
import type { PaginationParameters, PaginationResponse } from '@/composables/usePagination.ts'
import { delay, http, HttpResponse } from 'msw'

type MockResponse = {
  title: string
  description: string
}

const meta = {
  title: 'Components/LazyGrid',
  // https://github.com/storybookjs/storybook/issues/24238
  component: LazyGrid as unknown as Record<string, unknown>,
  tags: ['autodocs'],
  parameters: {
    msw: {
      handlers: [
        http.get('http://example.com', async ({ request }) => {
          const url = new URL(request.url)
          const query = {
            page: parseInt(url.searchParams.get('page') ?? '0'),
            pageSize: parseInt(url.searchParams.get('pageSize') ?? '0'),
          }

          await delay(2000)

          return HttpResponse.json({
            content: Array.from({ length: query.pageSize }).map((_, index) => ({
              title: `Item ${index + 1 + (query.page - 1) * query.pageSize}`,
              description: 'Description',
            })),
            page: query.page,
            pageSize: query.pageSize,
            total: query.pageSize * query.page + 1,
          })
        }),
      ],
    },
  },
  args: {
    loader: async (query: PaginationParameters): Promise<PaginationResponse<MockResponse>> => {
      const url = new URL('http://example.com')
      url.searchParams.set('page', query.page.toString())
      url.searchParams.set('pageSize', query.pageSize.toString())

      const response = await fetch(url)

      return await response.json()
    },
  },
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-expect-error
  render: (args) => ({
    components: { LazyGrid, BaseCard },
    setup() {
      return { args }
    },
    template: `
      <div style="height: 300px; overflow-y: scroll;">
        <LazyGrid v-bind="args" v-slot="{ data }">
          <BaseCard v-bind="data" />
        </LazyGrid>
      </div>
    `,
  }),
} satisfies Meta<typeof LazyGrid<MockResponse>>

export default meta

type Story = StoryObj<typeof meta>

export const Primary: Story = {}
