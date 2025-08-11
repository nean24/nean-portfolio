export type Locale = "en" | "vi";
export type Dict = Record<string, string>;

export async function getDictionary(locale: Locale): Promise<Dict> {
const safe = locale === "vi" ? "vi" : "en";
  const dict = await import(`@/dictionaries/${safe}.json`);
  return dict.default as Dict;
}