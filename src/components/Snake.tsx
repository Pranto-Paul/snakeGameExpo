import React from 'react';
import { Coordinates } from '../types/types';
import { View } from 'react-native';
import { Colors } from '../styles/Colors';
import { StyleSheet } from 'react-native';

const GRID_SIZE = 20;

const Snake = ({ snake }: { snake: Coordinates[] }) => {
  return (
    <>
      {snake.map((segment, index) => {
        const isHead = index === 0;
        return (
          <View
            key={index}
            style={[
              styles.snake,
              { 
                left: segment.x * GRID_SIZE, 
                top: segment.y * GRID_SIZE,
                // Make the head slightly different from the body
                backgroundColor: isHead ? Colors.secondary : '#059669', // lighter green for head, deeper for body
                borderRadius: isHead ? 8 : 4,
                zIndex: isHead ? 10 : 1,
              }
            ]}
          >
            {/* Optional: Add cute little eyes to the snake head */}
            {isHead && (
              <View style={styles.eyesContainer}>
                <View style={styles.eye} />
                <View style={styles.eye} />
              </View>
            )}
          </View>
        );
      })}
    </>
  );
};

const styles = StyleSheet.create({
  snake: {
    width: GRID_SIZE - 2, // Slight gap so we can see segments
    height: GRID_SIZE - 2,
    position: 'absolute',
    // Apply a glowing drop shadow
    shadowColor: Colors.secondary,
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.6,
    shadowRadius: 4,
    elevation: 4, // Android shadow
  },
  eyesContainer: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    height: '100%',
    width: '100%',
    opacity: 0.8,
  },
  eye: {
    width: 4,
    height: 4,
    backgroundColor: '#000',
    borderRadius: 2,
  }
});

export default Snake;
