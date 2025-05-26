import { EN_US, LOCALE_KEYS } from '../constants';

/**
 * Simple translation function that gets text from the locale constants
 * @param key - The key from LOCALE_KEYS
 * @param params - Optional parameters to substitute in the string
 * @returns The translated string
 */
export function t(key: keyof typeof LOCALE_KEYS, params?: Record<string, string | number>): string {
	const localeKey = LOCALE_KEYS[key] as keyof typeof EN_US;

	let translatedString = EN_US[localeKey] || localeKey;
	if (params) {
		Object.entries(params).forEach(([paramKey, paramValue]) => {
			translatedString = translatedString.replace(`{${paramKey}}`, String(paramValue));
		});
	}

	return translatedString;
}
