import React, { useContext } from "react";
import { View, Text, FlatList, StyleSheet } from "react-native";
import { TimerContext } from "../context/TimerContext";

const HistoryScreen = () => {
  const { history } = useContext(TimerContext);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Completed Timers</Text>
      <FlatList
        data={history}
        keyExtractor={(item) => item.id}
        renderItem={({ item, index }) => (
          <View key={item.id} style={styles.itemBox}>
            <Text style={styles.name}>{item.name}</Text>
            <Text style={styles.detail}>
              Completed At: {new Date(item.completedAt).toLocaleString()}
            </Text>
          </View>
        )}
        ListEmptyComponent={<Text>No completed timers yet.</Text>}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  title: { fontSize: 20, fontWeight: "bold", marginBottom: 10 },
  itemBox: { padding: 10, backgroundColor: "#eee", marginBottom: 10 },
  name: { fontWeight: "bold" },
  detail: { color: "#555" },
});

export default HistoryScreen;
