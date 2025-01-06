import type { Meta, StoryObj } from '@storybook/vue3'
import { IconCheckCircle } from '@iconify-prerendered/vue-fa-regular'

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
    loading: {
      control: 'boolean',
    },
    circle: {
      control: 'boolean',
    },
  },
  args: {
    label: 'Button',
  },
} satisfies Meta<typeof BaseButton>

export default meta

type Story = StoryObj<typeof meta>

export const Primary: Story = {}

export const Circle: Story = {
  render: (args) => ({
    components: { BaseButton, IconCheckCircle },
    setup() {
      return { args }
    },
    template: `
      <BaseButton v-bind="args">
        <template #icon>
          <IconCheckCircle />
        </template>
      </BaseButton>
    `,
  }),
  args: {
    circle: true,
  },
}

export const IconSlot: Story = {
  render: (args) => ({
    components: { BaseButton, IconCheckCircle },
    setup() {
      return { args }
    },
    template: `
      <BaseButton v-bind="args">
        <template #icon>
          <IconCheckCircle />
        </template>
      </BaseButton>
    `,
  }),
}
