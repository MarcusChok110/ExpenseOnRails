export default function dateToString(dateString: string): string {
  const date = new Date(dateString);
  return `${
    date.getUTCMonth() + 1
  }/${date.getUTCDate()}/${date.getUTCFullYear()}`;
}
