
const numberToComma = (targetNum: number) => {
  return targetNum.toLocaleString('ko-KR');
};

const changeDateFormat = (date: string) => {
  const dateObj = new Date(date);
  const [year, month, day, minute, second] = [dateObj.getFullYear(), dateObj.getMonth(), dateObj.getDay(), dateObj.getMinutes(), dateObj.getSeconds()]
  return `${year}-${('0' + month).slice(0, 2)}-${('0' + day).slice(0, 2)} ${('0' + minute).slice(0, 2)}:${('0' + second).slice(0, 2)}`;
}

export {numberToComma, changeDateFormat}