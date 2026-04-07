import { SafeAreaView } from 'react-native-safe-area-context';
import { StyleSheet, Text } from 'react-native';
import { Colors } from '../styles/Colors';
import { PanGestureHandler } from 'react-native-gesture-handler';
import { Coordinates, Direction, GestureEventType } from '../types/types';
import { use, useState } from 'react';

const SNAKE_INITIAL_POSITION = [{ x: 10, y: 10 }];
const FOOD_INITIAL_POSITION = { x: 20, y: 20 };
const MOVE_INTERVAL = 50;
const SCORE_INCREMENT = 10;

const Game = () => {
  const [size, setSize] = useState({ width: 0, height: 0 });
  const [direction, setDirection] = useState<Direction>(Direction.Right);
  const [snake, setSnake] = useState<Coordinates[]>(SNAKE_INITIAL_POSITION);
  const [food, setFood] = useState<Coordinates>(FOOD_INITIAL_POSITION);
  const [score, setScore] = useState<number>(0);
  const [isGameOver, setIsGameOver] = useState<boolean>(false);
  const [isPaused, setIsPaused] = useState<boolean>(false);

  const onLayout = (event: {
    nativeEvent: { layout: { width: number; height: number } };
  }) => {
    const { width, height } = event.nativeEvent.layout;
    // console.log(width, height);
    setSize({ width, height });
  };
  const GAME_BOUNDS = { xMin: 0, yMin: 0, xMax: size.width, yMax: size.height };
  const handleGesture = (event: GestureEventType) => {
    const { translationX, translationY } = event.nativeEvent;

    if (Math.abs(translationX) > Math.abs(translationY)) {
      if (translationX > 0) {
        setDirection(Direction.Right);
      } else {
        setDirection(Direction.Left);
      }
    } else {
      if (translationY > 0) {
        setDirection(Direction.Down);
      } else {
        setDirection(Direction.Up);
      }
    }
  };
  return (
    <PanGestureHandler onGestureEvent={handleGesture}>
      <SafeAreaView onLayout={onLayout} style={styles.container}>
        <Text>Game content goes here!</Text>
      </SafeAreaView>
    </PanGestureHandler>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.primary,
  },
});

export default Game;
