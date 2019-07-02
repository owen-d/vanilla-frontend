import * as cheerio from "cheerio";
import * as request from "request-promise";
import * as config from "./config";
import { html_tag_regex, misc_icon } from "./consts.js";
import { fetch_thumbnail } from "./lib.js";

export function parse_effects(table: Cheerio): string[] {
  const $ = cheerio.load(table.html() || "");
  let effects: string[] = []

  table.find("span.q2").each((_, node) => {
    const desc = $(node).find("a").text()
    if (desc) {
      effects.push(desc)
    }
  });

  return effects
}


export const html_lines = (c: Cheerio): string[] => {
  const htmlStr = c.html()
  if (!htmlStr) {
    return []
  } else {
    return htmlStr.split(html_tag_regex)
  }
}
