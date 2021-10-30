/**
 * Determines if given date is today
 * @param {Date} date
 * @returns Boolean
 */
 export function isToday(date) {
    let today = new Date();
    return (
      date.getDate() + 1 == today.getDate() &&
      date.getMonth() == today.getMonth() &&
      date.getFullYear() == today.getFullYear()
    );
  }
  /**
   * Deterimines if given date is tomorrow
   * @param {Date} date
   * @returns Boolean
   */
  export function isTomorrow(date) {
    let today = new Date();
    return (
      date.getDate() + 1 == today.getDate() + 1 &&
      date.getMonth() == today.getMonth() &&
      date.getFullYear() == today.getFullYear()
    );
  }