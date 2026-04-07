import { SafeAreaView } from 'react-native-safe-area-context';
import { StyleSheet, Text } from 'react-native';
import { Colors } from '../styles/Colors';
import { PanGestureHandler } from 'react-native-gesture-handler';

const Game = () => {
  const handleGesture = (event: any) => {
    const { translationX, translationY } = event.nativeEvent;

    if (Math.abs(translationX) > Math.abs(translationY)) {
      if (translationX > 0) {
        console.log('Right');
      } else {
        console.log('Left');
      }
    } else {
      if (translationY > 0) {
        console.log('Down');
      } else {
        console.log('Up');
      }
    }
  };
  return (
    <PanGestureHandler onGestureEvent={handleGesture}>
      <SafeAreaView style={styles.container}>
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
