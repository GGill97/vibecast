// src/utils/caching.ts

const CACHE_DURATION = 30 * 60 * 1000; // 30 minutes

export const setCache = (key: string, data: any) => {
  const cacheItem = {
    data,
    timestamp: Date.now(),
  };
  localStorage.setItem(key, JSON.stringify(cacheItem));
};

export const getCache = (key: string) => {
  const cachedItem = localStorage.getItem(key);
  if (!cachedItem) return null;

  const { data, timestamp } = JSON.parse(cachedItem);
  if (Date.now() - timestamp > CACHE_DURATION) {
    localStorage.removeItem(key);
    return null;
  }

  return data;
};

export const clearCache = (key: string) => {
  localStorage.removeItem(key);
};
