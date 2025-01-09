import type { Meta, StoryObj } from '@storybook/vue3'

import MessageProvider from '@/components/message/MessageProvider.vue'

import { useMessage } from '@/components/message/useMessage.ts'
import BaseButton from '@/components/baseButton/BaseButton.vue'

const meta: Meta<typeof MessageProvider> = {
  title: 'Components/MessageProvider',
  component: MessageProvider,
  tags: ['autodocs'],
  render: (args) => ({
    components: { MessageProvider, BaseButton },
    setup() {
      function showMessageBasic() {
        const { showMessage } = useMessage()
        showMessage('Content')
      }

      function showMessageAdvanced() {
        const { showMessage } = useMessage()
        showMessage({ theme: 'neutral', title: 'Title', content: 'Content' })
      }

      return { args, showMessageBasic, showMessageAdvanced }
    },
    template: `

      <MessageProvider v-bind="args">
        <div style="display: flex; gap: 1rem;">
          <BaseButton theme="info" @click="showMessageBasic" label="Show basic message"/>
          <BaseButton theme="neutral" @click="showMessageAdvanced" label="Show advanced message"/>
        </div>
      </MessageProvider>
    `,
  }),
}
export default meta

type Story = StoryObj<typeof MessageProvider>

export const Primary: Story = {}
