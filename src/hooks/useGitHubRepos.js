import { useState, useEffect } from 'react';

const GITHUB_USERNAME = 'soorya079';
const CACHE_KEY = 'github-repos-cache';
const CACHE_TTL = 1000 * 60 * 30; // 30 minutes

export function useGitHubRepos() {
  const [repos, setRepos] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchRepos() {
      // Check cache
      try {
        const cached = sessionStorage.getItem(CACHE_KEY);
        if (cached) {
          const { data, timestamp } = JSON.parse(cached);
          if (Date.now() - timestamp < CACHE_TTL) {
            setRepos(data);
            setLoading(false);
            return;
          }
        }
      } catch {}

      try {
        const token = import.meta.env.VITE_GITHUB_TOKEN;
        const headers = token ? { Authorization: `Bearer ${token}` } : {};

        const res = await fetch(
          `https://api.github.com/users/${GITHUB_USERNAME}/repos?sort=updated&per_page=30&type=public`,
          { headers }
        );

        if (res.status === 403 || res.status === 429) {
          throw new Error('GitHub API rate limit reached. Showing static project data.');
        }
        if (!res.ok) {
          throw new Error(`GitHub API error: ${res.status}`);
        }

        const data = await res.json();
        setRepos(data);
        sessionStorage.setItem(CACHE_KEY, JSON.stringify({ data, timestamp: Date.now() }));
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }

    fetchRepos();
  }, []);

  return { repos, loading, error, username: GITHUB_USERNAME };
}
