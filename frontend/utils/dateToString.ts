export default function dateToString(dateString: string): string {
  const date = new Date(dateString);
  return `${
    date.getUTCMonth() + 1
  }/${date.getUTCDate()}/${date.getUTCFullYear()}`;
}

export function dateToFormString(dateString: string): string {
  const date = new Date(dateString);
  return `${date.getUTCFullYear().toString().padStart(4, '0')}-${(
    date.getUTCMonth() + 1
  )
    .toString()
    .padStart(2, '0')}-${date.getUTCDate().toString().padStart(2, '0')}`;
}
