const MAX_INT32 = 2_147_483_647;

export function parseId(raw: string) {
  const id = Number(raw);
  return Number.isInteger(id) && id > 0 && id <= MAX_INT32 ? id : null;
}