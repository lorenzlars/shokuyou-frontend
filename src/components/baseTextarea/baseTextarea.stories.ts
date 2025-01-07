import type { Meta, StoryObj } from '@storybook/vue3'

import BaseTextarea from './BaseTextarea.vue'

const meta = {
  title: 'Components/BaseTextarea',
  component: BaseTextarea,
  tags: ['autodocs'],
  args: {
    placeholder: 'Placeholder',
  },
} satisfies Meta<typeof BaseTextarea>

export default meta

type Story = StoryObj<typeof meta>

export const Primary: Story = {}
