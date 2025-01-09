import type { Meta, StoryObj } from '@storybook/vue3'

import MessageProvider from '@/components/message/MessageProvider.vue'

import { useMessage } from '@/components/message/useMessage.ts'
import BaseButton from '@/components/baseButton/BaseButton.vue'
import { LoremIpsum } from 'lorem-ipsum'

const lorem = new LoremIpsum()

const meta: Meta<typeof MessageProvider> = {
  title: 'Components/MessageProvider',
  component: MessageProvider,
  tags: ['autodocs'],
  args: {
    timeout: 5000,
  },
  render: (args) => ({
    components: { MessageProvider, BaseButton },
    setup() {
      function showMessageBasic() {
        const { showMessage } = useMessage()
        showMessage(lorem.generateWords(1))
      }

      function showMessageAdvanced() {
        const { showMessage } = useMessage()
        showMessage({
          theme: 'neutral',
          title: lorem.generateWords(2),
          content: lorem.generateSentences(1),
        })
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
