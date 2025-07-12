import React, { useContext, useState, useEffect } from "react";
import {
  View,
  Text,
  Button,
  Modal,
  TextInput,
  Alert,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  StatusBar,
} from "react-native";
import { TimerContext } from "../context/TimerContext";
import CategorySection from "../components/CategorySection";
import * as Crypto from "expo-crypto";
import { Picker } from "@react-native-picker/picker";

import * as FileSystem from "expo-file-system";
import * as Sharing from "expo-sharing";

const HomeScreen = () => {
  const { timers, addTimer } = useContext(TimerContext);
  const [modalVisible, setModalVisible] = useState(false);
  const [name, setName] = useState("");
  const [duration, setDuration] = useState("");
  const [category, setCategory] = useState("");
  const [halfwayAlert, setHalfwayAlert] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("All");

  const groupedTimers = () => {
    const filteredTimers =
      selectedCategory === "All"
        ? timers
        : timers.filter((timer) => timer.category === selectedCategory);

    const groups = {};
    filteredTimers.forEach((timer) => {
      if (!groups[timer.category]) groups[timer.category] = [];
      groups[timer.category].push(timer);
    });

    return Object.entries(groups).map(([key, value]) => ({
      title: key,
      data: value,
    }));
  };

  const handleAdd = async () => {
    if (!name || !duration || !category) {
      Alert.alert("All fields are required");
      return;
    }
    const id = await Crypto.randomUUID();
    const timer = {
      id,
      name,
      duration: parseInt(duration),
      remaining: parseInt(duration),
      category,
      status: "paused",
      halfwayAlertTriggered: false,
      createdAt: new Date().toISOString(),
      withHalfway: halfwayAlert,
    };

    console.log("timer", timer);
    addTimer(timer);
    setModalVisible(false);
    setName("");
    setDuration("");
    setCategory("");
    setHalfwayAlert(false);
  };

  const exportData = async () => {
    const json = JSON.stringify(timers, null, 2); // Nicely formatted
    const uri = FileSystem.documentDirectory + "timer-history.json";

    await FileSystem.writeAsStringAsync(uri, json, {
      encoding: FileSystem.EncodingType.UTF8,
    });

    await Sharing.shareAsync(uri);
  };

  const categories = ["All", ...new Set(timers.map((t) => t.category))];

  const theme = "dark";

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <StatusBar
        barStyle={theme === "dark" ? "light-content" : "dark-content"}
        backgroundColor={theme === "dark" ? "#000" : "#fff"}
      />
      <Button title="Add Timer" onPress={() => setModalVisible(true)} />

      <Text>Filter by Category:</Text>
      <View style={styles.filterDropdown}>
        <Picker
          selectedValue={selectedCategory}
          onValueChange={setSelectedCategory}
        >
          {categories.map((cat) => (
            <Picker.Item key={cat} label={cat} value={cat} color="black" />
          ))}
        </Picker>
      </View>

      {groupedTimers().map((section) => (
        <CategorySection
          key={section.title}
          title={section.title}
          data={section.data}
        />
      ))}

      <TouchableOpacity style={styles.exportButton} onPress={exportData}>
        <Text style={styles.exportText}>Export Timer History</Text>
      </TouchableOpacity>

      <Modal visible={modalVisible} animationType="slide">
        <View style={styles.modalContent}>
          <TextInput
            placeholder="Name"
            value={name}
            onChangeText={setName}
            style={styles.input}
          />
          <TextInput
            placeholder="Duration (seconds)"
            value={duration}
            onChangeText={setDuration}
            keyboardType="numeric"
            style={styles.input}
          />
          <TextInput
            placeholder="Category"
            value={category}
            onChangeText={setCategory}
            style={styles.input}
          />
          <View style={styles.checkboxContainer}>
            <Text>Halfway Alert</Text>
            <Button
              title={halfwayAlert ? "Yes" : "No"}
              onPress={() => setHalfwayAlert(!halfwayAlert)}
            />
          </View>
          <Button title="Add" onPress={handleAdd} />
          <Button title="Cancel" onPress={() => setModalVisible(false)} />
        </View>
      </Modal>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  modalContent: {
    flex: 1,
    justifyContent: "center",
    padding: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: "#aaa",
    padding: 10,
    marginBottom: 10,
    color: "black",
  },
  checkboxContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginVertical: 10,
  },
  exportButton: {
    marginTop: 20,
    backgroundColor: "#007bff",
    padding: 10,
    borderRadius: 5,
    alignItems: "center",
  },
  exportText: {
    color: "white",
    fontWeight: "bold",
  },
});

export default HomeScreen;
