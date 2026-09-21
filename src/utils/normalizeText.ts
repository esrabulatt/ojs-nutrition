// Türkçe karakterleri (ı, İ, ş, ğ...) ayırt etmeden arama yapabilmek için
export function normalizeText(value: string): string {
  return value
    .replace(/İ/g, 'i')
    .replace(/I/g, 'i')
    .toLowerCase()
    .replace(/ı/g, 'i')
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '');
}
