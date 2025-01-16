import type { Meta, StoryObj } from '@storybook/vue3'

import BaseDialog from './BaseDialog.vue'
import BaseButton from '@/components/baseButton/BaseButton.vue'
import { shallowRef } from 'vue'
import { useDialog } from '@/components/baseDialog/useDialog.ts'

const meta = {
  title: 'Components/Base/BaseDialog',
  component: BaseDialog,
  tags: ['autodocs'],
  args: {
    title: 'Dialog',
    name: 'dialog',
  },
  render: (args) => ({
    components: { BaseDialog, BaseButton },
    setup() {
      const { showDialog } = useDialog(args.name)
      const message = shallowRef('closed')

      async function show() {
        message.value = 'open'
        await showDialog()
        message.value = 'closed'
      }

      return { args, show, message }
    },
    template: `
      <div>
        <BaseDialog v-bind="args" >
          <code>Content</code>
        </BaseDialog>
        <BaseButton @click="show" label="Show" />
        <p>
          <code>{{ message }}</code>
        </p>
      </div>
    `,
  }),
} satisfies Meta<typeof BaseDialog>

export default meta

type Story = StoryObj<typeof meta>

export const Primary: Story = {}
