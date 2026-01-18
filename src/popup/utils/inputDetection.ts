export type InputType = "url" | "search";

export function detectInputType(input: string): InputType {
  const trimmed = input.trim();
  if (!trimmed) return "search";
  if (/^https?:\/\//i.test(trimmed)) return "url";
  if (/^[\w-]+(\.[\w-]+)+(\/?\S*)?$/.test(trimmed)) return "url";
  if (/^(localhost|(\d{1,3}\.){3}\d{1,3})(:\d+)?(\/.*)?$/i.test(trimmed))
    return "url";
  return "search";
}

export function normalizeUrl(input: string): string {
  const trimmed = input.trim();
  if (/^https?:\/\//i.test(trimmed)) return trimmed;
  return `https://${trimmed}`;
}
