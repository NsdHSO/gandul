#!/bin/bash

# Configure Android signing for release builds

GRADLE_FILE="android/app/build.gradle"

# Add signing config to build.gradle
if ! grep -q "signingConfigs" "$GRADLE_FILE"; then
  # Find the android { block and add signingConfigs
  sed -i '/android {/a\
    signingConfigs {\
        release {\
            storeFile file(System.getenv("MYAPP_RELEASE_STORE_FILE") ?: "release.keystore")\
            storePassword System.getenv("MYAPP_RELEASE_STORE_PASSWORD") ?: "gandul123"\
            keyAlias System.getenv("MYAPP_RELEASE_KEY_ALIAS") ?: "gandul-key"\
            keyPassword System.getenv("MYAPP_RELEASE_KEY_PASSWORD") ?: "gandul123"\
        }\
    }' "$GRADLE_FILE"

  # Update release buildType to use signingConfig
  sed -i '/buildTypes {/,/release {/a\
            signingConfig signingConfigs.release' "$GRADLE_FILE"

  echo "✅ Android signing configured"
else
  echo "ℹ️  Signing config already exists"
fi
