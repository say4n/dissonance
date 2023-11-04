import { ChatInputCommandInteraction, SlashCommandBuilder } from "discord.js";
import { Command } from "../command.model.ts";
import stripAnsi from "strip-ansi";


const fetchCheatsheet = async (command: string) => {
  const repsonse = await fetch("https://cht.sh/" + encodeURI(command), {
    headers: new Headers({
      "User-Agent": "fetch",
    }),
  });

  const plainText = stripAnsi(await repsonse.text())
    .replaceAll("#", "###")

  return plainText
}



export const cheatCommand: Command = {
  metadata: new SlashCommandBuilder()
    .setName("cheat")
    .setDescription("fetch a cheatsheet")
    .addStringOption((option) =>
      option.setName("query")
        .setDescription("search query")
        .setRequired(true)
    ),

  callback: async (interaction: ChatInputCommandInteraction) => {
    await interaction.deferReply({ ephemeral: true });

    const query = interaction.options.getString("query") || "";
    const cheatsheet = await (fetchCheatsheet(query))

    await interaction.reply({
      content: cheatsheet,
      ephemeral: true,
    })
  },
};
