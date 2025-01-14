import BaseDropdown from './BaseDropdown.vue'
import type { Meta, StoryObj } from '@storybook/vue3'

const meta = {
  title: 'Components/Base/BaseDropdown',
  component: BaseDropdown,
  tags: ['autodocs'],
  args: {
    valueName: 'value',
    labelName: 'label',
    options: [
      { label: 'Option 1', value: '1' },
      { label: 'Option 2', value: '2' },
    ],
  },
} as Meta<typeof BaseDropdown<{ label: string; value: string }>>

export default meta

type Story = StoryObj<typeof meta>

export const Primary: Story = {}
