import { Collection } from "discord.js"
import { Command } from "../command.model"
import { ping } from "./ping"

export const commands = new Collection<string, Command>()

commands.set(ping.metadata.name, ping)