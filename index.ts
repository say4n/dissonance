import { Events } from 'discord.js'
import { commands } from './commands/mod.ts'
import { logger } from './utils.ts'
import { client } from './discord.ts'
import { load } from "https://deno.land/std@0.205.0/dotenv/mod.ts";

const env = await load();

client.once(Events.ClientReady, (c) => {
  logger.info(`Logged in as ${c.user.tag}`)
})

client.login(env["DISCORD_TOKEN"])

client.on(Events.InteractionCreate, interaction => {
  logger.info(`${interaction.toString()} from ${interaction.user.displayName}`)
  if (!interaction.isChatInputCommand()) return

  const command = commands.get(interaction.commandName)

  if (!command) {
    logger.error(`No command matching ${interaction.commandName} was found.`)
    return
  }

  try {
    command.callback(interaction)
  }
  catch (error) {
    logger.error(error)

    if (interaction.replied || interaction.deferred) {
      interaction.followUp({ content: 'There was an error while executing this command!', ephemeral: true })
    }
    else {
      interaction.reply({ content: 'There was an error while executing this command!', ephemeral: true })
    }
  }
})
