import type { Meta, StoryObj } from '@storybook/vue3'

import BaseMessage from '@/components/message/BaseMessage.vue'
import { LoremIpsum } from 'lorem-ipsum'

const lorem = new LoremIpsum()

const meta: Meta<typeof BaseMessage> = {
  title: 'Components/Message',
  component: BaseMessage,
  subcomponents: { Message: BaseMessage },
  tags: ['autodocs'],
  argTypes: {
    theme: {
      control: 'select',
      options: ['neutral', 'info', 'warning', 'success', 'danger'],
    },
  },
  args: {
    title: lorem.generateWords(2),
    content: lorem.generateSentences(1),
  },
}
export default meta

type Story = StoryObj<typeof BaseMessage>

export const Primary: Story = {}
