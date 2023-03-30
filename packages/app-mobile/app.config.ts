import { ExpoConfig, ConfigContext } from "expo/config";

export default ({ config }: ConfigContext): ExpoConfig => {
  const projectID = "55bf074d-0473-4e61-9d9d-ecf570704635";
  const packageName = "app.backpack.mobile";

  const isDev = process.env.NODE_ENV === "development";

  return {
    ...config,
    name: "Backpack",
    slug: "backpack",
    owner: "coral-xyz",
    version: "0.1.0",
    orientation: "portrait",
    icon: "./assets/icon.png",
    userInterfaceStyle: "light",
    splash: {
      image: "./assets/splash.png",
      resizeMode: "cover",
      backgroundColor: "#000",
    },
    updates: {
      fallbackToCacheTimeout: 0,
      url: "https://u.expo.dev/" + projectID,
    },
    runtimeVersion: {
      policy: "sdkVersion",
    },
    assetBundlePatterns: ["**/*"],
    ios: {
      supportsTablet: false,
      bundleIdentifier: packageName,
      infoPlist: {
        NSAllowsArbitraryLoads: true,
        NSExceptionDomains: {
          localhost: {
            NSExceptionAllowsInsecureHTTPLoads: true,
            NSIncludesSubdomains: true,
          },
        },
        WKAppBoundDomains: [
          "coral-xyz.github.io",
          "ngrok.io",
          "backpack-api.xnfts.dev",
        ],
      },
    },
    android: {
      package: packageName,
      googleServicesFile: process.env.GOOGLE_SERVICES_JSON,
      adaptiveIcon: {
        foregroundImage: "./assets/adaptive-icon.png",
        backgroundColor: "#000",
      },
    },
    web: {
      favicon: "./assets/favicon.png",
    },
    extra: {
      ENABLED_NFT_SEND: !isDev,
      ENABLED_CHAT: !isDev,
      localWebViewUrl: "http://localhost:9333",
      remoteWebViewUrl:
        "https://coral-xyz.github.io/backpack/background-scripts/7b1f07d/service-worker-loader.html",
      eas: {
        projectId: projectID,
      },
    },
  };
};