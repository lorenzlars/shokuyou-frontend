import type { Meta, StoryObj } from '@storybook/vue3'
import DropPlanner from './DropPlanner.vue'
import BaseCard from '@/components/baseCard/BaseCard.vue'

const meta = {
  title: 'Components/DropPlanner',
  component: DropPlanner as unknown as Record<string, unknown>,
  tags: ['autodocs'],
  args: {
    columns: [
      {
        title: 'Day 1',
      },
      {
        title: 'Day 2',
      },
      {
        title: 'Day 3',
      },
    ],
    modelValue: [
      {
        dayIndex: 0,
        title: 'Task 1',
      },
      {
        dayIndex: 1,
        title: 'Task 2',
      },
      {
        dayIndex: 3,
        title: 'Task 3',
      },
      {
        dayIndex: 3,
        title: 'Task 4',
      },
    ],
  },
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  render: (args) => ({
    components: { Planner: DropPlanner, BaseCard },
    setup() {
      function startDrag(event: DragEvent) {
        if (event.dataTransfer instanceof DataTransfer) {
          event.dataTransfer.dropEffect = 'copy'
          event.dataTransfer.effectAllowed = 'copy'

          if (event.target instanceof HTMLElement) {
            event.dataTransfer.setData('value', JSON.stringify({ title: 'Drag me' }))
          }
        }
      }

      return { args, startDrag }
    },
    template: `
      <div style="display: flex; gap: 1rem;">
        <BaseCard draggable="true" @dragstart="startDrag">
          <code>Drag me</code>
        </BaseCard>
        <Planner v-bind="args" v-slot="{value, itemProps}">
          <BaseCard v-bind="itemProps">
            <code>{{ value.title }}</code>
          </BaseCard>
        </Planner>
      </div>
    `,
  }),
} satisfies Meta<typeof DropPlanner>

export default meta

type Story = StoryObj<typeof meta>

export const Primary: Story = {}
