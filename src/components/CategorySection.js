import React, { useState, useContext, useRef } from "react";
import { View, Text, Button, StyleSheet, TouchableOpacity } from "react-native";
import TimerItem from "../components/TimerItem";
import { TimerContext } from "../context/TimerContext";

const CategorySection = ({ title, data }) => {
  const { updateTimer } = useContext(TimerContext);
  const [expanded, setExpanded] = useState(true);
  const intervals = useRef({});

  const bulkAction = (action) => {
    data.forEach((timer) => {
      if (action === "start" && timer.status !== "running") {
        timer.status = "running";
        updateTimer({ ...timer });
      }
      if (action === "pause" && timer.status === "running") {
        timer.status = "paused";
        updateTimer({ ...timer });
      }
      if (action === "reset") {
        timer.status = "paused";
        timer.remaining = timer.duration;
        timer.halfwayAlertTriggered = false;
        updateTimer({ ...timer });
      }
    });
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => setExpanded(!expanded)}>
        <Text style={styles.title}>
          {title} {expanded ? "-" : "+"}
        </Text>
      </TouchableOpacity>
      {expanded && (
        <View>
          {data.map((timer, index) => (
            <TimerItem key={index} timer={timer} />
          ))}
          <View style={styles.bulkActions}>
            <Button title="Start All" onPress={() => bulkAction("start")} />
            <Button title="Pause All" onPress={() => bulkAction("pause")} />
            <Button title="Reset All" onPress={() => bulkAction("reset")} />
          </View>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: { marginVertical: 10 },
  title: { fontSize: 18, fontWeight: "bold" },
  bulkActions: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginTop: 10,
  },
});

export default CategorySection;
