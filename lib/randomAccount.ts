export function randomAccountNumber(): string {
  const account_number = `2222 4545 80${~~(Math.random() * 89) + 10} ${~~(Math.random() * 8999) + 1000}`
  return account_number
}

export function randomNip(): string {
  const nip = `${~~(Math.random() * 8999) + 1000}`;
  return nip
}