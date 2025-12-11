module.exports = {
  apps: [
    {
      name: "teras-farm",
      script: "node_modules/.bin/next",
      args: "start",
      env: {
        NODE_ENV: "production",
        PORT: 3001,
      },
      error_file: "./logs/error.log",
      out_file: "./logs/out.log",
    },
  ],
};
