export const LOCALE_KEYS = {
	// Common
	APP_TITLE: 'APP_TITLE',
	LOADING: 'LOADING',
	ERROR_GENERIC: 'ERROR_GENERIC',
	CANCEL: 'CANCEL',
	SUBMIT: 'SUBMIT',
	SAVE: 'SAVE',
	NO_DATA: 'NO_DATA',
	BACK_TO_LIST: 'Back to List',
	VIEW_DETAILS: 'VIEW_DETAILS',
	FOOTER_DEMO_TEXT: 'FOOTER_DEMO_TEXT',

	// Vehicle related
	VEHICLE_ADD: 'VEHICLE_ADD',
	VEHICLE_EDIT: 'VEHICLE_EDIT',
	VEHICLE_DELETE: 'VEHICLE_DELETE',
	VEHICLE_NONE_FOUND: 'VEHICLE_NONE_FOUND',
	VEHICLE_SEARCH_ADJUST: 'VEHICLE_SEARCH_ADJUST',

	// Maintenance related
	MAINTENANCE_ADD: 'MAINTENANCE_ADD',
	MAINTENANCE_NONE: 'MAINTENANCE_NONE',
	MAINTENANCE_HISTORY: 'MAINTENANCE_HISTORY',

	// Form fields & validation
	FORM_REQUIRED: 'FORM_REQUIRED',
	FORM_DATE_FUTURE: 'FORM_DATE_FUTURE',
	FORM_MILEAGE_NEGATIVE: 'FORM_MILEAGE_NEGATIVE',
	FORM_MILEAGE_HIGH: 'FORM_MILEAGE_HIGH',
	FORM_COST_NEGATIVE: 'FORM_COST_NEGATIVE',
	FORM_COST_ZERO: 'FORM_COST_ZERO',
	FORM_COST_HIGH: 'FORM_COST_HIGH',
	FORM_DATE_NEXT_AFTER: 'FORM_DATE_NEXT_AFTER',
	FORM_DATE_NEXT_FAR: 'FORM_DATE_NEXT_FAR',

	// ID related
	ID_UPLOAD_INSTRUCTION: 'ID_UPLOAD_INSTRUCTION',
} as const;

// Define the default English locale
export const EN_US = {
	// Common
	[LOCALE_KEYS.APP_TITLE]: 'Fleet Management Dashboard',
	[LOCALE_KEYS.LOADING]: 'Loading...',
	[LOCALE_KEYS.ERROR_GENERIC]: 'An error occurred. Please try again.',
	[LOCALE_KEYS.CANCEL]: 'Cancel',
	[LOCALE_KEYS.SUBMIT]: 'Submit',
	[LOCALE_KEYS.SAVE]: 'Save',
	[LOCALE_KEYS.NO_DATA]: 'No data available',
	[LOCALE_KEYS.VIEW_DETAILS]: 'View Details',
	[LOCALE_KEYS.FOOTER_DEMO_TEXT]: 'For demo purposes only',

	// Vehicle related
	[LOCALE_KEYS.VEHICLE_ADD]: 'Add Vehicle',
	[LOCALE_KEYS.VEHICLE_EDIT]: 'Edit Vehicle',
	[LOCALE_KEYS.VEHICLE_DELETE]: 'Delete Vehicle',
	[LOCALE_KEYS.VEHICLE_NONE_FOUND]: 'No Vehicle found',
	[LOCALE_KEYS.VEHICLE_SEARCH_ADJUST]:
		"Try adjusting your search or filter to find what you're looking for.",

	// Maintenance related
	[LOCALE_KEYS.MAINTENANCE_ADD]: 'Add Maintenance',
	[LOCALE_KEYS.MAINTENANCE_NONE]: 'No maintenance records available.',
	[LOCALE_KEYS.MAINTENANCE_HISTORY]: 'Maintenance History',

	// Form fields & validation
	[LOCALE_KEYS.FORM_REQUIRED]: '{field} is required',
	[LOCALE_KEYS.FORM_DATE_FUTURE]: 'Date cannot be in the future',
	[LOCALE_KEYS.FORM_MILEAGE_NEGATIVE]: 'Mileage cannot be negative',
	[LOCALE_KEYS.FORM_MILEAGE_HIGH]: 'Mileage seems unusually high. Please verify.',
	[LOCALE_KEYS.FORM_COST_NEGATIVE]: 'Cost cannot be negative',
	[LOCALE_KEYS.FORM_COST_ZERO]: 'Are you sure the cost is zero?',
	[LOCALE_KEYS.FORM_COST_HIGH]: 'Cost seems unusually high. Please verify.',
	[LOCALE_KEYS.FORM_DATE_NEXT_AFTER]: 'Next due date must be after the maintenance date',
	[LOCALE_KEYS.FORM_DATE_NEXT_FAR]: 'Next due date is very far in the future. Please verify.',
};
