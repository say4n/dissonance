import { SlashCommandBuilder, ChatInputCommandInteraction, ForumChannel } from 'discord.js'
import { Command } from '../command.model'
import { client } from '../discord'

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

    messages.forEach(async message =>
      await message.delete()
    )

    interaction.reply({
      content: `Deleted ${nMessages} messages.`,
      ephemeral: true,
    })
  }
}

