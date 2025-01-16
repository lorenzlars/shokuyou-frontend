import type { Meta, StoryObj } from '@storybook/vue3'

import FileSelect from './FileSelect.vue'

const meta = {
  title: 'Components/FileSelect',
  component: FileSelect,
  tags: ['autodocs'],
  args: {
    label: 'Select file',
  },
  argTypes: {
    accept: {
      control: 'text',
      description: 'MIME',
    },
  },
} satisfies Meta<typeof FileSelect>

export default meta

type Story = StoryObj<typeof meta>

export const Primary: Story = {}
