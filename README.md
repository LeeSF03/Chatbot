# Chatbot App for Mila University Software Engineering Class Assignment

## Get started

1. Install dependencies

   ```bash
   yarn
   ```

2. prebuild the app

   ```bash
    yarn prebuild
   ```

3. create development build

   ```bash
   yarn android or yarn ios
   ```

4. start development server (optional)
   Creating an development build will also the development server after it's done building, so this part is optional
   ```bash
   yarn start
   ```

## SQLite Migrations Steps

Note: the following steps is needed to run SQLite migrations is due to the following issue: https://github.com/drizzle-team/drizzle-orm/issues/2384#issuecomment-2139478294

1. add your schema to ./db/schema.ts

2. stop your development server
   focus on the terminal running the development server and run:

   ```bash
   Ctrl + c
   ```

3. run migration

   ```bash
   yarn migrate
   ```

4. start development server

   ```bash
   yarn start
   ```

5. open drizzle studio
   Open devtools menu from the terminal with "start" process and choose expo-drizzle-studio-plugin
   ```bash
   Shift + m
   ```

In the output, you'll find options to open the app in a

- [development build](https://docs.expo.dev/develop/development-builds/introduction/)
- [Android emulator](https://docs.expo.dev/workflow/android-studio-emulator/)
- [iOS simulator](https://docs.expo.dev/workflow/ios-simulator/)
- [Expo Go](https://expo.dev/go), a limited sandbox for trying out app development with Expo

You can start developing by editing the files inside the **app** directory. This project uses [file-based routing](https://docs.expo.dev/router/introduction).

## Get a fresh project

When you're ready, run:

```bash
yarn reset-project
```

This command will move the starter code to the **app-example** directory and create a blank **app** directory where you can start developing.

## Learn more

To learn more about developing your project with Expo, look at the following resources:

- [Expo documentation](https://docs.expo.dev/): Learn fundamentals, or go into advanced topics with our [guides](https://docs.expo.dev/guides).
- [Learn Expo tutorial](https://docs.expo.dev/tutorial/introduction/): Follow a step-by-step tutorial where you'll create a project that runs on Android, iOS, and the web.
