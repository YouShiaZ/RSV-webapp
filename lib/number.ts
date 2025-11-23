export function toEnglishDigits(value: any): string {
  if (value === null || value === undefined) return "";
  return value
    .toString()
    .replace(/[٠-٩]/g, (d) => "٠١٢٣٤٥٦٧٨٩".indexOf(d).toString());
}
