export function toEnglishDigits(value: any): string {
  if (value === null || value === undefined) return "";
  return value
    .toString()
    .replace(/[٠-٩]/g, (d: string): string => {
  const index = "٠١٢٣٤٥٦٧٨٩".indexOf(d);
  return index.toString();
});

}
