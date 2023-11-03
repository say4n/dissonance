import parse from "node-html-parser";
import TurndownService from "turndown";

const converter = new TurndownService();

const repsonse = await fetch("https://cht.sh/tr");
const root = parse(await repsonse.text());
const pre = root.getElementsByTagName("pre")[0];

console.log(converter.turndown(pre.innerText).replaceAll(" \\# ", "\n\n"));
