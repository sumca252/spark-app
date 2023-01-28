# Spark-app 
[![Build Status](https://scrutinizer-ci.com/g/sumca252/spark-app/badges/build.png?b=main)](https://scrutinizer-ci.com/g/sumca252/spark-app/build-status/main) [![Code Coverage](https://scrutinizer-ci.com/g/sumca252/spark-app/badges/coverage.png?b=main)](https://scrutinizer-ci.com/g/sumca252/spark-app/?branch=main) [![Scrutinizer Code Quality](https://scrutinizer-ci.com/g/sumca252/spark-app/badges/quality-score.png?b=main)](https://scrutinizer-ci.com/g/sumca252/spark-app/?branch=main)


# Pre-requisites 
- [Node.js](https://nodejs.org/en/download/)
- [Cordova](https://cordova.apache.org/docs/en/latest/guide/cli/)
- [Java JDK 8](http://www.oracle.com/technetwork/java/javase/downloads/jdk8-downloads-2133151.html)
- [Gradle](https://gradle.org/install/)
- [Android Studio](https://developer.android.com/studio/index.html)
- [Android SDK 30.0.3](https://developer.android.com/studio/releases/platform-tools)

# Installation

```
npm install 
```

## Cordova
```
npm install -g cordova
```

### Add platform

```
cordova platform add browser
cordova platform add android
```

## Homebrew
```
brew install gradel
```

```
brew install --cask homebrew/cask-versions/temurin8 android-studio android-sdk 
```


## Chocolatey
```
choco install -y jdk8 gradle androidstudio android-sdk
```

## Ubuntu/Debian
```
sudo apt install -y openjdk-8-jdk gradle android-studio android-sdk
```



## Build the app

To build the app you can use ```npm run dev```, it tells the webpack to watch the file system and automatically recreate bundle.js if file changes are detected. If you change the style, you can run ```npm run style ```.

```
cordova build
```


## Run the app
```
cordova run android
```

## Run the app in the browser
```
cordova run browser
```

## Test the app

```
# For both tests and coverage
npm run test

# only tests
npm run mocha
```

### Eslint

```
npm run lint
```
