export const BASE_URL =
  process.env.NEXT_PUBLIC_VERCEL_ENV === 'production'
    ? 'https://pulmeo.vercel.app'
    : 'http://localhost:3000';
