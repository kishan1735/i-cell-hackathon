import { openai } from "./openai";

export async function prompt(input) {
  const completion = await openai.chat.completions.create({
    messages: [{ role: "user", content: input }],
    model: "gpt-3.5-turbo",
  });
  const res = completion.choices[0].message.content;

  const regex = RegExp("Course '(.*)': Option (\\d\\d?)", "g");
  const sectionMap = new Map();
  let match;
  while ((match = regex.exec(res)) !== null) {
    console.log(`Found ${match.groups[0]}. Next starts at ${regex.lastIndex}.`);
    sectionMap.set(match.groups[0], match.groups[1]);
  }
  return sectionMap;
}
