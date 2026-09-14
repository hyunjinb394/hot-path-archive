const dateFormat = new Intl.DateTimeFormat("ko-KR", {
  timeZone: "Asia/Seoul",
  year: "numeric",
  month: "2-digit",
  day: "2-digit",
});

export function formatDate(iso: string) {
  return dateFormat.format(new Date(iso)).replace(/\.\s?/g, ".").replace(/\.$/, "");
}
