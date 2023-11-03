import { SlashCommandBuilder, ChatInputCommandInteraction, ForumChannel } from 'discord.js'
import { Command } from '../command.model.ts'
import { client } from '../discord.ts'
import { logger } from '../utils.ts'

export const deleteCommand: Command = {
  metadata: new SlashCommandBuilder()
    .setName('clean')
    .setDescription('deletes messages in a channel')
    .addNumberOption(option =>
      option
        .setName("number")
        .setDescription("number of messages to delete")
    ),

  callback: async (interaction: ChatInputCommandInteraction) => {
    const nMessages = interaction.options.getNumber("number") || 100

    const channelId = interaction.channelId
    const channel = client.channels.cache.get(channelId) as ForumChannel

    const messages = await channel.messages.fetch({ limit: nMessages });

    messages.forEach(async message => {
      logger.silly(`Deleting ${message.id}`)

      try {
        await message.react("🚮")
        await message.delete()
      } catch (e: unknown) {
        logger.error(`Can't delete ${message.id}`, e)
      }
    })

    interaction.reply({
      content: `Deleted ${nMessages} messages.`,
      ephemeral: true,
    })
  }
}

