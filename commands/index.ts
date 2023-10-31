import { Collection } from "discord.js"
import { Command } from "../command.model"
import { pingCommand } from "./ping"
import { deleteCommand } from "./delete"

const commandList = [
  pingCommand,
  deleteCommand,
]

export const commands = new Collection<string, Command>()

commandList.forEach(command =>
  commands.set(command.metadata.name, command)
)