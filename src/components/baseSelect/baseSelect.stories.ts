import BaseSelect from './BaseSelect.vue'
import type { Meta, StoryObj } from '@storybook/vue3'

const meta = {
  title: 'Components/Base/BaseSelect',
  component: BaseSelect,
  tags: ['autodocs'],
  args: {
    options: [
      { label: 'Option 1', value: '1' },
      { label: 'Option 2', value: '2' },
    ],
  },
} as Meta<typeof BaseSelect>

export default meta

type Story = StoryObj<typeof meta>

export const Primary: Story = {}
