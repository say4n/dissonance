import { REST, RESTPutAPIApplicationCommandsResult, Routes } from "discord.js";
import { commands } from "./commands/mod.ts";
import { load } from "https://deno.land/std@0.205.0/dotenv/mod.ts";

const env = await load();

const rest = new REST().setToken(env["DISCORD_TOKEN"]);

(async () => {
  try {
    console.log(`Refreshing ${commands.size} application (/) commands.`);

    // The put method is used to fully refresh all commands in the guild with the current set
    const data = await rest.put(
      Routes.applicationCommands(env["APPLICATION_ID"]),
      { body: commands.map((c) => c.metadata.toJSON()) },
    ) as RESTPutAPIApplicationCommandsResult;

    console.log(`Refreshed ${data.length} application (/) commands.`);
  } catch (error) {
    // And of course, make sure you catch and log any errors!
    console.error(error);
  }
})();
