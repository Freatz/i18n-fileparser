const fs = require("fs");
const _ = require("lodash");
const { Client } = require("@notionhq/client");
import { writeJSONFile } from "./writer";

const buildNotionFiles = async (data: any[], lang: string) => {
  let obj: Record<string, string> = {};
  for (const page of data) {
    const key = page.properties.key.title[0].text.content;
    const content = page.properties[lang].rich_text[0].text.content;
    _.set(obj, key, content);
  }
  writeJSONFile(obj, lang);
};

export async function processNotion(
  notionSecret: string,
  notionId: string
): Promise<any> {
  const notion = new Client({
    auth: notionSecret,
  });

  const notionPages = await notion.databases.query({
    database_id: notionId,
  });

  const languageNotionKeys = Object.keys(
    notionPages.results[0].properties
  ).slice(0, -1);
  return languageNotionKeys.forEach((language) =>
    buildNotionFiles(notionPages.results, language)
  );
}
