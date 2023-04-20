const TimeType = ({ time, get }) => {
  const handleDate = (date) => {
    const utcTime = new Date(date);
    const vietnamTime = new Date(utcTime.getTime() + 7 * 60 * 60 * 1000);
    let result = vietnamTime.toISOString();
    let dateSlplit = result.split("T");
    let time = dateSlplit[1].split(".");
    let objectDate = new Date(dateSlplit[0]);
    let day = objectDate.getDate();
    let month = objectDate.getMonth() + 1;
    let year = objectDate.getFullYear();
    let str = day + "/" + month + "/" + year;
    return `${time[0]} ${str} `;
  };

  return <span>{handleDate(time)}</span>;
};

export default TimeType;
