export default {
  API_URL: import.meta.env.VITE_API_URL,
  CRITIC_SCORE: Number(import.meta.env.VITE_CRITIC_SCORE) || 100,
};