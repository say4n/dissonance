import { ChatInputCommandInteraction, SlashCommandBuilder } from "discord.js";
import { Command } from "../command.model.ts";
import { commands } from "./mod.ts";

export const listCommand: Command = {
  metadata: new SlashCommandBuilder()
    .setName("list")
    .setDescription("list all commands"),

  callback: async (interaction: ChatInputCommandInteraction) => {
    await interaction.reply({
      content:
        "Supported commands are:\n\n" +
        commands.map((c) => `**${c.metadata.name}**: ${c.metadata.description}`).join("\n"),
    });
  },
};
