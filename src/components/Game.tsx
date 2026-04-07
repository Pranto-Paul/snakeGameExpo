import { SafeAreaView } from 'react-native-safe-area-context';
import { StyleSheet, Text, View } from 'react-native';
import { Colors } from '../styles/Colors';
import { PanGestureHandler } from 'react-native-gesture-handler';
import { Coordinates, Direction, GestureEventType } from '../types/types';
import { useEffect, useState } from 'react';
import Snake from './Snake';
import Food from './Food';
import { checkGameOver } from '../utils/gameOver';

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

  useEffect(() => {
    if (!isGameOver && size.width > 0) {
      const intervalId = setInterval(
        () => !isPaused && moveSnake(),
        MOVE_INTERVAL,
      );
      return () => clearInterval(intervalId);
    }
  }, [snake, isGameOver, isPaused, size]);

  const moveSnake = () => {
    const snakeHead = snake[0];
    const newHead = { x: snakeHead.x, y: snakeHead.y };

    switch (direction) {
      case Direction.Up:
        newHead.y -= 1;
        break;
      case Direction.Down:
        newHead.y += 1;
        break;
      case Direction.Left:
        newHead.x -= 1;
        break;
      case Direction.Right:
        newHead.x += 1;
        break;
      default:
        break;
    }

    if (checkGameOver(newHead, GAME_BOUNDS)) {
      setIsGameOver(true);
      return;
    }

    if (newHead.x === food.x && newHead.y === food.y) {
      setFood({
        x: Math.floor(Math.random() * GAME_BOUNDS.xMax),
        y: Math.floor(Math.random() * GAME_BOUNDS.yMax),
      });
      setScore(score + SCORE_INCREMENT);
      setSnake([newHead, ...snake]);
    } else {
      setSnake([newHead, ...snake.slice(0, -1)]);
    }
  };

  const restartGame = () => {
    setSnake(SNAKE_INITIAL_POSITION);
    setFood(FOOD_INITIAL_POSITION);
    setScore(0);
    setDirection(Direction.Right);
    setIsGameOver(false);
    setIsPaused(false);
  };

  const onLayout = (event: {
    nativeEvent: { layout: { width: number; height: number } };
  }) => {
    const { width, height } = event.nativeEvent.layout;
    console.log(width, height);
    setSize({ width, height });
  };
  const GAME_BOUNDS = {
    xMin: 0,
    yMin: 0,
    xMax: Math.floor(size.width / 10),
    yMax: Math.floor(size.height / 10),
  };
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
      <SafeAreaView style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.scoreText}>Score: {score}</Text>
        </View>
        <View onLayout={onLayout} style={styles.boundaries}>
          <Snake snake={snake} />
          <Food x={food.x} y={food.y} />
        </View>
        
        {isGameOver && (
          <View style={styles.gameOverOverlay}>
            <Text style={styles.gameOverTitle}>Game Over</Text>
            <Text style={styles.scoreText}>Final Score: {score}</Text>
            <Text style={styles.restartButton} onPress={restartGame}>
              TAP TO RESTART
            </Text>
          </View>
        )}
      </SafeAreaView>
    </PanGestureHandler>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.primary,
  },
  header: {
    paddingHorizontal: 16,
    paddingTop: 10,
    alignItems: 'center',
  },
  scoreText: {
    fontSize: 22,
    fontWeight: 'bold',
    color: Colors.background,
  },
  boundaries: {
    flex: 1,
    margin: 16,
    borderWidth: 4,
    borderColor: '#e11d48',
    backgroundColor: Colors.background,
    borderRadius: 8,
  },
  gameOverOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0,0,0,0.7)',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 10,
  },
  gameOverTitle: {
    fontSize: 36,
    fontWeight: 'bold',
    color: '#e11d48',
    marginBottom: 10,
  },
  restartButton: {
    marginTop: 20,
    paddingVertical: 10,
    paddingHorizontal: 20,
    backgroundColor: Colors.secondary,
    color: Colors.primary,
    fontWeight: 'bold',
    fontSize: 18,
    borderRadius: 8,
    overflow: 'hidden',
  },
});

export default Game;
