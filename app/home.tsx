"use client"

import { useEffect, useState } from "react"
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, ActivityIndicator } from "react-native"
import { useFonts, Unbounded_400Regular, Unbounded_700Bold } from "@expo-google-fonts/unbounded"
import { AntDesign } from "@expo/vector-icons"
import { getCategory } from "../lib/category"
import CategoryHandler from "../components/categoryhandler"

interface Category {
  category_id: number
  category_Name: string
}

export default function Home() {
  const [fontsLoaded] = useFonts({
    Unbounded_Regular: Unbounded_400Regular,
    Unbounded_Bold: Unbounded_700Bold,
  })

  const [categories, setCategories] = useState<Category[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [modalVisible, setModalVisible] = useState(false)

  const fetchCategories = async () => {
    setIsLoading(true)
    try {
      const data = await getCategory()
      setCategories(data)
    } catch (error) {
      console.error("Error fetching categories:", error)
    } finally {
      setIsLoading(false)
    }
  }

  const handleCategoryAdded = () => {
    fetchCategories() // Refresh the categories after a new one is added
  }

  useEffect(() => {
    if (fontsLoaded) {
      fetchCategories()
    }
  }, [fontsLoaded])

  if (!fontsLoaded) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" color="#0484D1" />
      </View>
    )
  }

  return (
    <View style={styles.container}>
      <View style={{ flex: 1, backgroundColor: "#0484D1" }}>
        <View style={styles.welcomeText}>
          <Text
            style={{
              fontSize: 26,
              fontFamily: "Unbounded_Bold",
              marginLeft: 20,
              marginBottom: 20,
            }}
          >
            Hello, User!
          </Text>
        </View>
        <View style={styles.content}>
          <View style={styles.categoryContainer}>
            <View style={styles.categoryHeader}>
              <Text style={styles.categoryTitle}>My Categories</Text>
              <TouchableOpacity
                style={styles.addButton}
                onPress={() => setModalVisible(true)}
              >
                <AntDesign name="plus" size={24} color="#0484D1" />
              </TouchableOpacity>
            </View>

            {isLoading ? (
              <ActivityIndicator size="large" color="#0484D1" style={styles.loader} />
            ) : (
              <ScrollView contentContainerStyle={styles.categoriesScrollView} showsVerticalScrollIndicator={false}>
                {categories.length === 0 ? (
                  <Text style={styles.noCategories}>No categories yet. Add one!</Text>
                ) : (
                  <View>
                    {categories.map((category) => (
                      <View key={category.category_id}>
                        <Text>{category.category_Name}</Text>
                      </View>
                    ))}
                  </View>
                )}
              </ScrollView>
            )}
          </View>
        </View>
      </View>

      <CategoryHandler
        isVisible={modalVisible}
        onClose={() => setModalVisible(false)}
        onCategoryAdded={handleCategoryAdded}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "center",
    zIndex: -1,
  },
  welcomeText: {
    flex: 1,
    justifyContent: "flex-end",
    alignItems: "flex-start",
    backgroundColor: "white",
  },
  categoryContainer: {
    width: "100%",
    height: "90%",
    flexDirection: "column",
    borderBottomLeftRadius: 50,
    borderBottomRightRadius: 50,
    alignItems: "center",
    backgroundColor: "white",
    paddingTop: 20,
    paddingBottom: 30,
  },
  categoryHeader: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    paddingHorizontal: 20,
    marginBottom: 20,
    position: "relative",
  },
  categoryTitle: {
    fontSize: 20,
    fontFamily: "Unbounded_Regular",
    color: "#0484D1",
  },
  addButton: {
    position: "absolute",
    right: 30,
    backgroundColor: "#f0f0f0",
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 3,
  },
  content: {
    flex: 5,
    alignItems: "center",
    zIndex: 1,
  },
  categoriesScrollView: {
    alignItems: "center",
    paddingVertical: 10,
    width: "100%",
  },
  loader: {
    marginTop: 50,
  },
  noCategories: {
    fontFamily: "Unbounded_Regular",
    fontSize: 16,
    color: "#666",
    marginTop: 50,
  },
})
