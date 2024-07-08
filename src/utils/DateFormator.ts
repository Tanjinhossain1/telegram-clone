export const formatTime = (dateString:string) => {
    const date = new Date(dateString);
    
    // Check if the date is valid
    if (isNaN(date.getTime())) {
      return "Invalid Date";
    }
  
    let hours = date.getUTCHours();
    const minutes = date.getUTCMinutes();
    const ampm = hours >= 12 ? 'PM' : 'AM';
  
    hours = hours % 12;
    hours = hours ? hours : 12; // the hour '0' should be '12'
    const minutesStr = minutes < 10 ? '0' + minutes : minutes;
  
    const formattedTime = `${hours}:${minutesStr} ${ampm}`;
    return formattedTime;
  };

  export function formatDay(dateString:string) {
    const date = new Date(dateString);
    const formattedDate = date.toLocaleString('en-us', { month: 'short', day: 'numeric' });
    const parts = formattedDate.split(' ');
    const day = parts[1];
    const month = parts[0];

    // Function to convert month from abbreviated form to full form
    function getMonthNameAbbreviated(month:any) {
        const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
        return months.indexOf(month) + 1;
    }

    const monthInFull = getMonthNameAbbreviated(month);
    return `${day} ${monthInFull}`;
}