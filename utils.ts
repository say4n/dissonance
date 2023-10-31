import { Logger } from "tslog";

const logger = new Logger({
  name: "dissonance:index",
  type: "pretty",
  prettyLogTemplate: "{{dateIsoStr}} [{{logLevelName}}] {{nameWithDelimiterSuffix}}",
})

export default logger