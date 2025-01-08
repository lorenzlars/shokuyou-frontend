import type { Meta, StoryObj } from '@storybook/vue3'

import BaseLink from './BaseLink.vue'

const meta = {
  title: 'Components/Base/BaseLink',
  component: BaseLink,
  tags: ['autodocs'],
  render: (args) => ({
    components: { BaseLink },
    setup() {
      return { args }
    },
    template: `
      <BaseLink v-bind="args">
        I am a link
      </BaseLink>
    `,
  }),
  args: {
    to: '/',
  },
} satisfies Meta<typeof BaseLink>

export default meta

type Story = StoryObj<typeof meta>

export const Primary: Story = {}
