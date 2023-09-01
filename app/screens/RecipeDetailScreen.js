import { ScrollView, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { StatusBar } from 'expo-status-bar'

const RecipeDetailScreen = () => {
  return (
    <View style={styles.container}>
       <StatusBar style='dark' />
         <ScrollView >
            
         </ScrollView>
    </View>
  )
}

export default RecipeDetailScreen

const styles = StyleSheet.create({
    container:{
        flex: 1,
    }
})