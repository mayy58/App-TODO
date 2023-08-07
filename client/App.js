import { StatusBar } from "expo-status-bar";
import { useEffect, useState } from "react";
import { FlatList, SafeAreaView, StyleSheet, Text, View } from "react-native";
import Task from "./component/Task";
import { BottomSheetModalProvider } from "@gorhom/bottom-sheet";
import InputTask from "./component/InputTask";

export default function App() {
  const [todos, setTodos] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  async function fetchData() {
    try {
      const response = await fetch("http://192.168.100.96:8080/todos/1");
      const data = await response.json();
      setTodos(data);
    } catch (error) {
      console.error("Error en la solicitud de red:", error);
    }
  }

  function clearTodo(id) {
    setTodos(todos.filter((todo) => todo.id !== id));
  }

  function toggleTodo(id) {
    setTodos(
      todos.map((todo) =>
        todo.id === id
          ? { ...todo, completed: todo.completed === 1 ? 0 : 1 }
          : todo
      )
    );
  }

  return (
    <BottomSheetModalProvider>
      <SafeAreaView style={styles.container}>
        <View
          style={{
            flex: 1,
            paddingHorizontal: 10,
            paddingTop: Platform.OS === "android" && 30,
          }}
        >
          <FlatList
            data={todos}
            keyExtractor={(todo) => todo.id}
            renderItem={({ item }) => (
              <Task {...item} toggleTodo={toggleTodo} clearTodo={clearTodo} />
            )}
            ListHeaderComponent={() => <Text style={styles.title}>Today</Text>}
            contentContainerStyle={styles.contentContainerStyle}
          />
          <InputTask todos={todos} setTodos={setTodos} />
        </View>
      </SafeAreaView>
      <StatusBar style="auto" />
    </BottomSheetModalProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#E9E9EF",
  },
  contentContainerStyle: {
    padding: 15,
  },
  title: {
    fontWeight: "800",
    fontSize: 28,
    marginBottom: 15,
  },
});
