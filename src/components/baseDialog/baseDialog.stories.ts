import type { Meta, StoryObj } from '@storybook/vue3'

import BaseDialog from './BaseDialog.vue'
import BaseButton from '@/components/baseButton/BaseButton.vue'
import { shallowRef } from 'vue'

const meta = {
  title: 'Components/Base/BaseDialog',
  component: BaseDialog,
  tags: ['autodocs'],
  args: {
    title: 'Dialog',
  },
  render: (args) => ({
    components: { BaseDialog, BaseButton },
    setup() {
      const show = shallowRef(false)

      return { args, show }
    },
    template: `
      <div>
        <BaseDialog v-model:show="show" v-bind="args">
          content
        </BaseDialog>
        <BaseButton @click="show = true" label="Show" />
      </div>
    `,
  }),
} satisfies Meta<typeof BaseDialog>

export default meta

type Story = StoryObj<typeof meta>

export const Primary: Story = {}
