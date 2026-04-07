import { SafeAreaView } from 'react-native-safe-area-context';
import { StyleSheet, Text } from 'react-native';
import { Colors } from '../styles/Colors';

const Game = () => {
  return (
    <SafeAreaView style={styles.container}>
      <Text>Game content goes here!</Text>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.primary,
  },
});

export default Game;
