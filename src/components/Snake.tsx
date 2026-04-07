import React from 'react';
import { Coordinates } from '../types/types';
import { View } from 'react-native';
import { Colors } from '../styles/Colors';
import { StyleSheet } from 'react-native';

const Snake = ({ snake }: { snake: Coordinates[] }) => {
  return (
    <>
      {snake.map((segment, index) => (
        <View
          key={index}
          style={[styles.snake, { left: segment.x * 10, top: segment.y * 10 }]}
        />
      ))}
    </>
  );
};

const styles = StyleSheet.create({
  snake: {
    width: 10,
    height: 10,
    backgroundColor: Colors.primary,
    position: 'absolute',
    borderRadius: 5,
  },
});

export default Snake;
