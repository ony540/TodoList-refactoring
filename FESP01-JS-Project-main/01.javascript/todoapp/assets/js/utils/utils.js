export const converter = (t) => {
  const date = new Date(t)
  const dateOptions = {year: "numeric", month: "long", day: "numeric"}
  const timeOptions = {hour: '2-digit', minute: "numeric", second: "numeric"} 
  return date.toLocaleDateString("ko-KR", dateOptions) + ' ' + date.toLocaleTimeString("ko-KR", timeOptions) 
} 