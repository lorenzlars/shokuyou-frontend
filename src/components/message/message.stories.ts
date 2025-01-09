import type { Meta, StoryObj } from '@storybook/vue3'

import Message from '@/components/message/Message.vue'
import { LoremIpsum } from 'lorem-ipsum'

const lorem = new LoremIpsum()

const meta: Meta<typeof Message> = {
  title: 'Components/Message',
  component: Message,
  subcomponents: { Message },
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

type Story = StoryObj<typeof Message>

export const Primary: Story = {}
