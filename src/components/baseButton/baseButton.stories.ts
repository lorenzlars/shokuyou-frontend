import type { Meta, StoryObj } from '@storybook/vue3'
import { IconCheckCircle } from '@iconify-prerendered/vue-fa-regular'

import BaseButton from './BaseButton.vue'

const meta = {
  title: 'Components/Base/BaseButton',
  component: BaseButton,
  tags: ['autodocs'],
  argTypes: {
    type: {
      control: 'select',
      options: ['button', 'submit', 'reset'],
    },
    theme: {
      control: 'select',
      options: ['neutral', 'accent', 'info', 'warning', 'success', 'danger', 'passive'],
    },
    loading: {
      control: 'boolean',
    },
    rounded: {
      control: 'boolean',
    },
  },
  args: {
    label: 'Button',
    theme: 'accent',
  },
} satisfies Meta<typeof BaseButton>

export default meta

type Story = StoryObj<typeof meta>

export const Primary: Story = {}

export const Large: Story = {
  render: (args) => ({
    components: { BaseButton, IconCheckCircle },
    setup() {
      return { args }
    },
    template: `
      <BaseButton style="width: 200px;" v-bind="args">
        <template #icon>
          <IconCheckCircle />
        </template>
      </BaseButton>
    `,
  }),
  args: {
    loading: true,
  },
}

export const Rounded: Story = {
  args: {
    label: undefined,
    rounded: true,
  },
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
