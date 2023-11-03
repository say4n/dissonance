import { Logger } from "tslog";

export const logger = new Logger({
  name: "dissonance:index",
  type: "pretty",
  prettyLogTemplate: "{{dateIsoStr}} [{{logLevelName}}] {{nameWithDelimiterSuffix}}",
})
