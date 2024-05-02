function formatDate(date) {
    // Get the year, month, and day from the date object
    const year = date.getFullYear();
    // Add 1 to month because JavaScript months are zero-based
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');

    // Get the hours, minutes, and seconds from the date object
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    const seconds = String(date.getSeconds()).padStart(2, '0');

    // Construct the formatted date string
    const formattedDate = `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;

    return formattedDate;
}

// Function to check if a date is yesterday
const isYesterday = (date) => {
    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);
    return (
        date.getDate() === yesterday.getDate() &&
        date.getMonth() === yesterday.getMonth() &&
        date.getFullYear() === yesterday.getFullYear()
    );
};

const isToday = (date) => {
    const today = new Date();
    return (
        date.getDate() === today.getDate() &&
        date.getMonth() === today.getMonth() &&
        date.getFullYear() === today.getFullYear()
    );
};

const getYesterdayFormatted = () => {
    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);

    const year = yesterday.getFullYear();
    const month = yesterday.getMonth() + 1; // Month is zero-based, so add 1 to get the actual month
    const day = yesterday.getDate();

    const formattedDate = `${year}-${month < 10 ? "0" + month : month}-${day < 10 ? "0" + day : day
        }`;
    return formattedDate;
}
function separateDateAndTime(datetimeString) {
    const date = new Date(datetimeString);

    // Separate date and time
    const dateString = `${('0' + date.getDate()).slice(-2)}/${('0' + (date.getMonth() + 1)).slice(-2)}/${date.getFullYear()}`;
    const timeString = date.toISOString().split('T')[1].split('.')[0].slice(0, -3);

    return { date: dateString, time: timeString };
}
function getDateOnly(datetimeString) {
    // Split the datetime string by space
    const parts = datetimeString.split(" ");
    // Take the first part, which represents the date
    const dateOnly = parts[0];
    return dateOnly;
}

const convertToMySQLDate = (date) => {
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const day = date.getDate().toString().padStart(2, '0');
    const hours = date.getHours().toString().padStart(2, '0');
    const minutes = date.getMinutes().toString().padStart(2, '0');
    const seconds = date.getSeconds().toString().padStart(2, '0');
    return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
};
export { formatDate, getDateOnly, convertToMySQLDate, isYesterday, getYesterdayFormatted, isToday, separateDateAndTime }