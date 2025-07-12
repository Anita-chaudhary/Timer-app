# ⏱ React Native Multi-Timer App (Expo)

This is a feature-rich timer app built using **React Native (Expo)** that supports multiple timers, history tracking, progressive visualization, and more.

---

## 🚀 Features

### ✅ Core Functionality

* **Add Timer** with name, duration, category, and halfway alert
* **Grouped Timer List** by category (expand/collapse)
* **Timer Controls**: Start, Pause, Reset
* **Progress Visualization** with progress bar
* **Bulk Actions**: Start/Pause/Reset all timers in a category
* **Timer History** log
* **Halfway and Completion alerts**
* **Export Timer History** as `.json`
* **Filter Timers by Category**

---

## 📦 Tech Stack

* **Expo SDK 53+**
* **React Navigation**
* **AsyncStorage** for persistence
* **expo-notifications** for local alerts
* **expo-sharing** and **expo-file-system** for exporting
* **@react-native-picker/picker** for dropdowns

---

## 🛠️ Setup Instructions

### 1. Clone the Repository

```bash
git clone https://github.com/your-username/multi-timer-app.git](https://github.com/Anita-chaudhary/Timer-app
cd Timer-app
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Install Expo Modules (if not already)

```bash
npx expo install expo-notifications expo-file-system expo-sharing @react-native-async-storage/async-storage @react-native-picker/picker
```

### 4. Run on Device or Emulator

```bash
npx expo run:android
# or for iOS
eas build --platform ios
```

> ⚠️ `expo-notifications` requires a development build. **Do not use Expo Go**.

### 5. Create a Development Build (if needed)

```bash
npm install -g eas-cli
npx eas build --platform android --profile preview
```

After build completes, download the `.apk` and install it on your Android device.

---

## 📁 Folder Structure

```
├── app/                # App entry point
├── src/
│   ├── components/     # TimerItem, CategorySection
│   ├── context/        # TimerContext.js
│   ├── navigation/     # AppNavigator.js (if needed)
│   ├── screens/        # HomeScreen.js, HistoryScreen.js
│   ├── services/       # NotificationService.js
│   └── styles/         # styles.js (getStyles with theme)
├── eas.json            # EAS build config
└── README.md
```

---



---

## 🙋‍♂️ Interview Usage

To run this app during an interview:

* Use `npx expo run:android` to demonstrate full functionality
* Showcase timer creation, filtering, bulk actions, alerts
* export JSON
* Explain file structure and `useReducer` usage in `TimerContext`

---

## 🧼 To Reset Local Data

Clear local storage:

```bash
AsyncStorage.clear(); // inside useEffect or dev-only button
```

---

## 📄 License

MIT License — Use it as you like!
