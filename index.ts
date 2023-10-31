import { Events } from 'discord.js'
import { commands } from './commands'
import logger from './utils'
import { client } from './discord'



client.once(Events.ClientReady, (c) => {
  logger.info(`Logged in as ${c.user.tag}`)
})

client.login(process.env.DISCORD_TOKEN)

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
