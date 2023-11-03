import { ChatInputCommandInteraction } from "discord.js";

export type Command = {
  metadata: any;
  callback: (_: ChatInputCommandInteraction) => void;
};
