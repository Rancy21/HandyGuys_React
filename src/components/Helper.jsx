

export function getToday() {
    const now = new Date();
  
    // Format each part of the date and time
    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, "0"); // Months are 0-indexed
    const day = String(now.getDate()).padStart(2, "0");
    const hours = String(now.getHours()).padStart(2, "0");
    const minutes = String(now.getMinutes()).padStart(2, "0");
    const seconds = String(now.getSeconds()).padStart(2, "0");
    const milliseconds = String(now.getMilliseconds()).padStart(3, "0");
  
    // Get timezone offset in ISO 8601 format (e.g., +05:30 or Z)
    const timezoneOffset = -now.getTimezoneOffset();
    const absOffset = Math.abs(timezoneOffset);
    const offsetHours = String(Math.floor(absOffset / 60)).padStart(2, "0");
    const offsetMinutes = String(absOffset % 60).padStart(2, "0");
    const timezone = timezoneOffset === 0
      ? "Z"
      : `${timezoneOffset > 0 ? "+" : "-"}${offsetHours}:${offsetMinutes}`;
  
    // Combine into the desired format
    return `${year}-${month}-${day}T${hours}:${minutes}:${seconds}.${milliseconds}${timezone}`;
  };
  
  