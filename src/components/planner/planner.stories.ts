import type { Meta, StoryObj } from '@storybook/vue3'
import Planner from './Planner.vue'
import BaseCard from '@/components/baseCard/BaseCard.vue'

const meta = {
  title: 'Components/Planner',
  component: Planner,
  tags: ['autodocs'],
  args: {
    columns: 7,
    modelValue: [
      {
        id: '89bea8f7-80f8-4509-8861-2286f72f7387',
        dayIndex: 0,
        title: 'Task 1',
      },
      {
        id: 'c11a4b12-5c9a-4a0f-a668-55e58f77b004',
        dayIndex: 1,
        title: 'Task 2',
      },
      {
        id: 'f89c931f-0e9d-4567-84a1-6f88bf74ba7a',
        dayIndex: 3,
        title: 'Task 3',
      },
      {
        id: 'c4af29ff-5181-4a96-97d0-128d5312cd32',
        dayIndex: 3,
        title: 'Task 4',
      },
    ],
  },
  render: (args) => ({
    components: { Planner, BaseCard },
    setup() {
      return { args }
    },
    template: `
      <BaseCard draggable="true">
        <code>Drag Me</code>
      </BaseCard>
      <Planner v-bind="args" v-slot="{value, itemProps}">
        <BaseCard v-bind="itemProps">
          <code>{{ value.title }}</code>
        </BaseCard>
      </Planner>
    `,
  }),
} satisfies Meta<typeof Planner>

export default meta

type Story = StoryObj<typeof meta>

export const Primary: Story = {}
