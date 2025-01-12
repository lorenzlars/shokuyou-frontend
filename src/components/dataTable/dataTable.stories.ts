import type { Meta, StoryObj } from '@storybook/vue3'

import DataTable from './DataTable.vue'
import DataTableColumn from './DataTableColumn.vue'

const meta = {
  title: 'Components/DataTable',
  component: DataTable as unknown as Record<string, unknown>,
  tags: ['autodocs'],
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-expect-error
  render: (args) => ({
    components: { DataTable, DataTableColumn },
    setup() {
      return { args }
    },
    template: `
      <DataTable v-bind="args">
        <DataTableColumn path="name" title="Name"/>
        <DataTableColumn path="age" title="Age"/>
      </DataTable>
    `,
  }),
  args: {
    values: [{ name: 'John', age: 20 }],
    keyPath: 'name',
  },
} satisfies Meta<typeof DataTable>

export default meta

type Story = StoryObj<typeof meta>

export const Primary: Story = {}
