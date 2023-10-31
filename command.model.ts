import { ChatInputCommandInteraction, SlashCommandBuilder } from "discord.js"

export type Command = {
  metadata: SlashCommandBuilder,
  callback: (_: ChatInputCommandInteraction) => void
}