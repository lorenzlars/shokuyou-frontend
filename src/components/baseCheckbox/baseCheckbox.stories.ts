import type { Meta, StoryObj } from '@storybook/vue3'

import BaseCheckbox from './BaseCheckbox.vue'

const meta = {
  title: 'Components/BaseCheckbox',
  component: BaseCheckbox,
  tags: ['autodocs'],
  args: {
    label: 'Label',
  },
} satisfies Meta<typeof BaseCheckbox>

export default meta

type Story = StoryObj<typeof meta>

export const Primary: Story = {}
