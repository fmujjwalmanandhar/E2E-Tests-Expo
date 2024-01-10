/** @type {Detox.DetoxConfig} */
module.exports = {
  logger: {
    level: process.env.CI ? "debug" : undefined,
  },
  testRunner: {
    $0: "jest",
    args: {
      config: "e2e/jest.config.js",
      _: ["e2e"],
    },
  },
  artifacts: {
    plugins: {
      log: process.env.CI ? "failing" : undefined,
      screenshot: "failing",
    },
  },
  apps: {
    "ios.release": {
      type: "ios.app",
      build:
        "xcodebuild -workspace ios/eastestsexample.xcworkspace -scheme eastestsexample -configuration Release -sdk iphonesimulator -arch x86_64 -derivedDataPath ios/build",
      binaryPath:
        "ios/build/Build/Products/Release-iphonesimulator/eastestsexample.app",
    },
    "ios.debug": {
      type: "ios.app",
      binaryPath:
        "ios/build/Build/Products/Debug-iphonesimulator/eastestsexample.app",
      build:
        "xcodebuild -workspace ios/eastestsexample.xcworkspace -scheme eastestsexample -configuration Debug -sdk iphonesimulator -arch x86_64 -derivedDataPath ios/build",
    },
    "android.release": {
      type: "android.apk",
      build:
        "cd android && ./gradlew :app:assembleRelease :app:assembleAndroidTest -DtestBuildType=release && cd ..",
      binaryPath: "android/app/build/outputs/apk/release/app-release.apk",
    },
    "android.debug": {
      type: "android.apk",
      binaryPath: "android/app/build/outputs/apk/debug/app-debug.apk",
      build:
        "cd android && ./gradlew :app:assembleDebug :app:assembleDebugAndroidTest -DtestBuildType=debug",
      reversePorts: [8081],
    },
  },
  devices: {
    simulator: {
      type: "ios.simulator",
      device: {
        type: "iPhone 14",
      },
    },
    emulator: {
      type: "android.emulator",
      device: {
        avdName: "pixel_4",
      },
    },
  },
  configurations: {
    "ios.sim.release": {
      device: "simulator",
      app: "ios.release",
    },
    "ios.sim.debug": {
      device: "simulator",
      app: "ios.debug",
    },
    "android.emu.release": {
      device: "emulator",
      app: "android.release",
    },
    "android.emu.debug": {
      device: "emulator",
      app: "android.debug",
    },
  },
};
