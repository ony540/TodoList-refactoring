export const formatDate = (t: string) => {
  const date = new Date(t);

  const dateOptions = {
    year: 'numeric' as const,
    month: 'numeric' as const,
    day: 'numeric' as const,
  };

  const timeOptions = {
    hour: 'numeric' as const,
    minute: 'numeric' as const,
  };

  return (
    date.toLocaleDateString('ko-KR', dateOptions).replace('20', '') +
    ' ' +
    date.toLocaleTimeString('ko-KR', timeOptions)
  );
};
