import type { Meta, StoryObj } from '@storybook/vue3'
import { LoremIpsum } from 'lorem-ipsum'

import BaseCard from './BaseCard.vue'

const meta = {
  title: 'Components/Base/BaseCard',
  component: BaseCard,
  tags: ['autodocs'],
  render: (args) => ({
    components: { BaseCard },
    setup() {
      return { args }
    },
    template: `
      <BaseCard style="width: 350px;" v-bind="args">
        <template #cover>
          <img src="https://picsum.photos/200/300" alt="Example image" class="w-full"/>
        </template>
      </BaseCard>
    `,
  }),
} satisfies Meta<typeof BaseCard>

export default meta

type Story = StoryObj<typeof meta>

const lorem = new LoremIpsum({
  sentencesPerParagraph: {
    max: 8,
    min: 4,
  },
  wordsPerSentence: {
    max: 16,
    min: 4,
  },
})

export const Primary: Story = {
  args: {
    title: lorem.generateWords(2),
    description: lorem.generateSentences(5),
  },
}

export const Slots: Story = {
  render: (args) => ({
    components: { BaseCard },
    setup() {
      return { args, lorem }
    },
    template: `
      <BaseCard style="width: 350px;" v-bind="args">
        <template #cover>
          <img src="https://picsum.photos/200/300" alt="Example image" class="w-full"/>
        </template>

        <template #default>
          <p>
            {{ lorem.generateSentences(5) }}
          </p>
        </template>
      </BaseCard>
    `,
  }),
}
