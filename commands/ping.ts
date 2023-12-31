import { ChatInputCommandInteraction, SlashCommandBuilder } from "discord.js";
import { Command } from "../command.model.ts";

export const pingCommand: Command = {
  metadata: new SlashCommandBuilder()
    .setName("ping")
    .setDescription("replies with pong!"),

  callback: async (interaction: ChatInputCommandInteraction) => {
    const delta = Date.now() - interaction.createdTimestamp;
    await interaction.reply({
      content: `Pong! **${delta}** ms`,
      ephemeral: true,
    });
  },
};
