export const converter = (t) => {
  const date = new Date(t)
  const dateOptions = {year: "numeric", month: "numeric", day: "numeric"}
  const timeOptions = {hour: '2-digit', minute: "numeric"} 
  return date.toLocaleDateString("ko-KR", dateOptions).replace('20', '') + ' ' + date.toLocaleTimeString("ko-KR", timeOptions) 
} 