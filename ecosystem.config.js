module.exports = {
  apps: [
    {
      name: "unimed-frontend",
      cwd: "./frontend",
      script: "npm run start",
      watch: ["server", "client"],
      watch_delay: 1000,
      ignore_watch: [".next", "node_modules"],
      exp_backoff_restart_delay: 100,
    },
    {
      name: "unimed-backend",
      cwd: "./backend",
      script: "npm run start:prod",
      watch: true,
      watch_delay: 1000,
      ignore_watch: ["dist", "node_modules", "data", "prisma"],
      exp_backoff_restart_delay: 100
    },
  ],
};