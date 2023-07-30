import { StatusBar } from "expo-status-bar";
import { useEffect, useState } from "react";
import { FlatList, SafeAreaView, StyleSheet, Text, View } from "react-native";
import Task from "./component/Task";
import { BottomSheetModalProvider } from "@gorhom/bottom-sheet";
import InputTask from "./component/InputTask";
//import { GestureHandlerRootView } from "react-native-gesture-handler";

export default function App() {
  const [todos, setTodos] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  async function fetchData() {
    try {
      const response = await fetch("http://localhost:8080/todos/1");
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
    /*    <GestureHandlerRootView> */
    <BottomSheetModalProvider>
      <SafeAreaView style={styles.container}>
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
      </SafeAreaView>
      <StatusBar style="auto" />
    </BottomSheetModalProvider>
    /*     </GestureHandlerRootView> */
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
