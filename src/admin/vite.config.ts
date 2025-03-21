import { mergeConfig, type UserConfig } from "vite";

export default (config: UserConfig) => {
  // Important: always return the modified config
  return mergeConfig(config, {
    resolve: {
      alias: {
        "@": "/src",
      },
    },
    server: {
      cors: {
        origin: ["http://localhost:3000", "your white list origin"],
        credentials: true,
      },
    },
  });
};
