module.exports = {
  expo: {
    name: "Gandul",
    slug: "Gandul",
    version: "1.0.0",
    orientation: "portrait",
    icon: "./assets/images/logo-G.png",
    scheme: "gandul",
    userInterfaceStyle: "automatic",
    newArchEnabled: true,
    ios: {
      supportsTablet: true,
      bundleIdentifier: "com.anonymous.gandul",
    },
    android: {
      adaptiveIcon: {
        backgroundColor: "#E6F4FE",
        foregroundImage: "./assets/images/logo-G.png",
        backgroundImage: "./assets/images/android-icon-background.png",
        monochromeImage: "./assets/images/logo-G.png",
      },
      edgeToEdgeEnabled: true,
      predictiveBackGestureEnabled: false,
      package: "ro.gandul.app",
      versionCode: 1,
      permissions: ["INTERNET", "ACCESS_NETWORK_STATE"],
    },
    web: {
      output: "static",
      favicon: "./assets/images/favicon.png",
      bundler: "metro",
    },
    plugins: [
      "expo-router",
      [
        "expo-splash-screen",
        {
          image: "./assets/images/logo-G.png",
          imageWidth: 200,
          resizeMode: "contain",
          backgroundColor: "#ffffff",
          dark: {
            backgroundColor: "#000000",
          },
        },
      ],
    ],
    experiments: {
      typedRoutes: true,
      reactCompiler: true,
    },
    extra: {
      router: {},
      eas: {
        projectId: "6e6430e1-2a7b-4cd7-86d2-4c88c2f2a9d4",
      },
      // Read environment variable at build time and bundle it into the app
      EXPO_PUBLIC_GRAPHQL_URL: process.env.EXPO_PUBLIC_GRAPHQL_URL || 'http://localhost:2003/strapi-proxy',
      EXPO_PUBLIC_ENV: process.env.EXPO_PUBLIC_ENV || 'local',
    },
    owner: "nsdhso",
  },
};
