export function formatINR(value) {
  const number = Number(value);

  if (Number.isNaN(number)) {
    return 'N/A';
  }

  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0,
  }).format(number);
}