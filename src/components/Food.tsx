import { StyleSheet, View } from 'react-native';
import { Coordinates } from '../types/types';
import { Colors } from '../styles/Colors';
import { useEffect, useRef } from 'react';
import { Animated } from 'react-native';

const GRID_SIZE = 20;

export default function Food({ x, y }: Coordinates) {
  // Little breathing animation for the food
  const pulseAnim = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(pulseAnim, {
          toValue: 1.2,
          duration: 500,
          useNativeDriver: true,
        }),
        Animated.timing(pulseAnim, {
          toValue: 1,
          duration: 500,
          useNativeDriver: true,
        })
      ])
    ).start();
  }, [pulseAnim]);

  return (
    <Animated.View 
      style={[
        styles.food, 
        { 
          top: y * GRID_SIZE, 
          left: x * GRID_SIZE,
          transform: [{ scale: pulseAnim }]
        }
      ]} 
    />
  );
}

const styles = StyleSheet.create({
  food: {
    width: GRID_SIZE - 4, // Slightly smaller than grid block
    height: GRID_SIZE - 4,
    margin: 2, // Center it in the block
    borderRadius: GRID_SIZE / 2, // Make it circular
    backgroundColor: Colors.tertiary,
    position: 'absolute',
    
    // Add glowing effect to Food
    shadowColor: Colors.tertiary,
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.8,
    shadowRadius: 6,
    elevation: 6,
  },
});
