import type { Meta, StoryObj } from '@storybook/vue3'

import BaseButton from './BaseButton.vue'

const meta = {
  title: 'Base/Button',
  component: BaseButton,
  tags: ['autodocs'],
  argTypes: {
    type: {
      control: 'select',
      options: ['button', 'submit', 'reset'],
    },
    theme: {
      control: 'select',
      options: ['neutral', 'accent', 'info', 'warning', 'success', 'danger'],
    },
  },
  args: {
    label: 'Button',
  },
} satisfies Meta<typeof BaseButton>

export default meta

type Story = StoryObj<typeof meta>

export const Primary: Story = {}
