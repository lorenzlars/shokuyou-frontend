import type { Meta, StoryObj } from '@storybook/vue3'

import ImageSelector from './ImageSelector.vue'
import { shallowRef } from 'vue'

const meta = {
  title: 'Components/ImageSelector',
  component: ImageSelector,
  tags: ['autodocs'],
  render: (args) => ({
    components: { ImageSelector },
    setup() {
      const edit = shallowRef(false)

      return { args, edit }
    },
    template: `
      <ImageSelector style="width: 350px;" v-bind="args" />
    `,
  }),
} satisfies Meta<typeof ImageSelector>

export default meta

type Story = StoryObj<typeof meta>

export const Primary: Story = {}
