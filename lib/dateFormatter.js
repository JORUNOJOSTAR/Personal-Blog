function getDate(){
    const options = {
        month: 'long',
        day: 'numeric',
        year: 'numeric'
      };
      
    const date = new Intl.DateTimeFormat('en', options).format(new Date());
    return date;
}

function compareDate(dateX,dateY){
  return Date.parse(dateY.publishingDate) - Date.parse(dateX.publishingDate);
}

export {getDate,compareDate};