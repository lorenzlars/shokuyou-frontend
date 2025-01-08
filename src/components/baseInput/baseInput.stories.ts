import type { Meta, StoryObj } from '@storybook/vue3'

import BaseInput from './BaseInput.vue'

const meta = {
  title: 'Components/Base/BaseInput',
  component: BaseInput,
  tags: ['autodocs'],
  args: {
    placeholder: 'Placeholder',
  },
} satisfies Meta<typeof BaseInput>

export default meta

type Story = StoryObj<typeof meta>

export const Primary: Story = {}
