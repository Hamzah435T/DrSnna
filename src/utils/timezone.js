// src/utils/timezone.js

// Reference dates for each day of the week (using a known week, e.g. Sept 6 (Sun) to Sept 12 (Sat) 2026)
// 0: Sunday, 1: Monday, ... 6: Saturday
const REF_DATES = {
    0: 6, 1: 7, 2: 8, 3: 9, 4: 10, 5: 11, 6: 12
};
const DAYS_ARRAY = ["SUNDAY", "MONDAY", "TUESDAY", "WEDNESDAY", "THURSDAY", "FRIDAY", "SATURDAY"];

/**
 * Converts a local day and time to UTC.
 * @param {string} dayName "MONDAY"
 * @param {string} timeString "09:00"
 * @returns {{ utcDayOfWeek: string, utcTime: string }}
 */
export function localToUtcRecurring(dayName, timeString) {
    if (!dayName || !timeString) return { utcDayOfWeek: dayName, utcTime: timeString };
    const dayIndex = DAYS_ARRAY.indexOf(dayName.toUpperCase());
    if (dayIndex === -1) return { utcDayOfWeek: dayName, utcTime: timeString };
    
    const [hours, minutes] = timeString.split(':').map(Number);
    
    // Create local date
    const d = new Date(2026, 8, REF_DATES[dayIndex], hours, minutes, 0);
    
    const utcDayIndex = d.getUTCDay();
    const utcHours = d.getUTCHours().toString().padStart(2, '0');
    const utcMinutes = d.getUTCMinutes().toString().padStart(2, '0');
    
    return {
        utcDayOfWeek: DAYS_ARRAY[utcDayIndex],
        utcTime: `${utcHours}:${utcMinutes}:00`
    };
}

/**
 * Converts a UTC day and time to local browser time.
 * @param {string} utcDayName "MONDAY"
 * @param {string} utcTimeString "06:00:00"
 * @returns {{ localDayOfWeek: string, localTime: string }}
 */
export function utcToLocalRecurring(utcDayName, utcTimeString) {
    if (!utcDayName || !utcTimeString) return { localDayOfWeek: utcDayName, localTime: utcTimeString };
    const dayIndex = DAYS_ARRAY.indexOf(utcDayName.toUpperCase());
    if (dayIndex === -1) return { localDayOfWeek: utcDayName, localTime: utcTimeString };
    
    const [hours, minutes] = utcTimeString.split(':').map(Number);
    
    // Create UTC date
    const d = new Date(Date.UTC(2026, 8, REF_DATES[dayIndex], hours, minutes, 0));
    
    const localDayIndex = d.getDay();
    const localHours = d.getHours().toString().padStart(2, '0');
    const localMinutes = d.getMinutes().toString().padStart(2, '0');
    
    return {
        localDayOfWeek: DAYS_ARRAY[localDayIndex],
        localTime: `${localHours}:${localMinutes}`
    };
}

/**
 * Converts a local specific date and time to UTC.
 * @param {string} dateString "2026-09-05"
 * @param {string} timeString "09:00"
 * @returns {{ utcDate: string, utcTime: string }}
 */
export function localToUtcSpecific(dateString, timeString) {
    if (!dateString || !timeString) return { utcDate: dateString, utcTime: timeString };
    const [year, month, day] = dateString.split('-').map(Number);
    const [hours, minutes] = timeString.split(':').map(Number);
    
    const d = new Date(year, month - 1, day, hours, minutes, 0);
    
    const utcYear = d.getUTCFullYear();
    const utcMonth = (d.getUTCMonth() + 1).toString().padStart(2, '0');
    const utcDay = d.getUTCDate().toString().padStart(2, '0');
    const utcHours = d.getUTCHours().toString().padStart(2, '0');
    const utcMinutes = d.getUTCMinutes().toString().padStart(2, '0');
    
    return {
        utcDate: `${utcYear}-${utcMonth}-${utcDay}`,
        utcTime: `${utcHours}:${utcMinutes}:00`
    };
}

/**
 * Converts a UTC specific date and time to local time.
 * @param {string} utcDateString "2026-09-05"
 * @param {string} utcTimeString "06:00:00"
 * @returns {{ localDate: string, localTime: string }}
 */
export function utcToLocalSpecific(utcDateString, utcTimeString) {
    if (!utcDateString || !utcTimeString) return { localDate: utcDateString, localTime: utcTimeString };
    const [year, month, day] = utcDateString.split('-').map(Number);
    const [hours, minutes] = utcTimeString.split(':').map(Number);
    
    const d = new Date(Date.UTC(year, month - 1, day, hours, minutes, 0));
    
    const localYear = d.getFullYear();
    const localMonth = (d.getMonth() + 1).toString().padStart(2, '0');
    const localDay = d.getDate().toString().padStart(2, '0');
    const localHours = d.getHours().toString().padStart(2, '0');
    const localMinutes = d.getMinutes().toString().padStart(2, '0');
    
    return {
        localDate: `${localYear}-${localMonth}-${localDay}`,
        localTime: `${localHours}:${localMinutes}`
    };
}
