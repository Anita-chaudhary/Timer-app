import React, { useContext, useEffect, useRef } from "react";
import {
  View,
  Text,
  Button,
  StyleSheet,
  Alert,
  Platform,
  ProgressBarAndroid,
  ProgressViewIOS,
} from "react-native";
import { TimerContext } from "../context/TimerContext";
import {
  scheduleHalfwayNotification,
  scheduleCompletionNotification,
  cancelNotifications,
} from "../services/NotificationService";

const TimerItem = ({ timer }) => {
  const { updateTimer, completeTimer } = useContext(TimerContext);
  const intervalRef = useRef(null);

  useEffect(() => {
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, []);

  const handleStart = () => {
    if (timer.status === "running") return;
    const halfway = Math.floor(timer.remaining / 2);

    if (timer.withHalfway)
      scheduleHalfwayNotification(timer.id, timer.name, halfway);
    scheduleCompletionNotification(timer.id, timer.name, timer.remaining);

    timer.status = "running";
    intervalRef.current = setInterval(() => {
      timer.remaining -= 1;
      if (
        timer.withHalfway &&
        !timer.halfwayAlertTriggered &&
        timer.remaining === halfway
      ) {
        Alert.alert("Halfway Alert", `${timer.name} is halfway done.`);
        timer.halfwayAlertTriggered = true;
      }

      if (timer.remaining <= 0) {
        clearInterval(intervalRef.current);
        cancelNotifications(timer.id);
        timer.status = "completed";
        timer.completedAt = new Date().toISOString();
        completeTimer({ ...timer });
        Alert.alert("Done", `${timer.name} completed.`);
      } else {
        updateTimer({ ...timer });
      }
    }, 1000);
  };

  const handlePause = () => {
    if (intervalRef.current) clearInterval(intervalRef.current);
    timer.status = "paused";
    cancelNotifications(timer.id);
    updateTimer({ ...timer });
  };

  const handleReset = () => {
    if (intervalRef.current) clearInterval(intervalRef.current);
    cancelNotifications(timer.id);
    updateTimer({
      ...timer,
      remaining: timer.duration,
      status: "paused",
      halfwayAlertTriggered: false,
    });
  };

  const renderProgress = () => {
    const progress = timer.remaining / timer.duration;
    return (
      <View style={styles.progressBarBackground}>
        <View
          style={[styles.progressBarFill, { width: `${progress * 100}%` }]}
        />
      </View>
    );
  };

  return (
    <View key={timer.id} style={styles.container}>
      <Text style={styles.title}>{timer.name}</Text>
      {renderProgress()}
      <Text>Status: {timer.status}</Text>
      <Text>Remaining: {timer.remaining}s</Text>
      <View style={styles.buttons}>
        <Button title="Start" onPress={handleStart} />
        <Button title="Pause" onPress={handlePause} />
        <Button title="Reset" onPress={handleReset} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 10,
    marginVertical: 10,
    backgroundColor: "#f9f9f9",
    borderRadius: 6,
  },
  title: { fontSize: 16, fontWeight: "bold" },
  buttons: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 10,
  },
  progressBarBackground: {
    height: 10,
    backgroundColor: "#ddd",
    borderRadius: 5,
    overflow: "hidden",
    marginVertical: 6,
  },

  progressBarFill: {
    height: 10,
    backgroundColor: "#4caf50",
    borderRadius: 5,
  },
});

export default TimerItem;
