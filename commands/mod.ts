import { Collection } from "discord.js";
import { Command } from "../command.model.ts";
import { pingCommand } from "./ping.ts";
import { deleteCommand } from "./delete.ts";

const commandList = [
  pingCommand,
  deleteCommand,
];

export const commands = new Collection<string, Command>();

commandList.forEach((command) => commands.set(command.metadata.name, command));
