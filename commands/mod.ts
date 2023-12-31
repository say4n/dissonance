import { Collection } from "discord.js";
import { Command } from "../command.model.ts";
import { pingCommand } from "./ping.ts";
import { deleteCommand } from "./delete.ts";
import { listCommand } from "./list.ts";
import { cheatCommand } from "./cheat.ts";

const commandList = [
  pingCommand,
  deleteCommand,
  listCommand,
  cheatCommand,
];

export const commands = new Collection<string, Command>();

commandList.forEach((command) => commands.set(command.metadata.name, command));
