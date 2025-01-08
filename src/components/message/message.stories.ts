import type { Meta, StoryObj } from '@storybook/vue3'

import Message from '@/components/message/Message.vue'

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
    title: 'Title',
    content: 'Message',
  },
}
export default meta

type Story = StoryObj<typeof Message>

export const Primary: Story = {}
