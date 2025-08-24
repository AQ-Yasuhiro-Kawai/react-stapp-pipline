export default {
  "src/**/*.{ts,tsx,js,jsx}": [
    () => "npm run type:check",
    "biome check --write --no-errors-on-unmatched",
  ],
  "src/**/*.{ts,tsx,js,jsx,md,json}": "npm run cspell",
};
