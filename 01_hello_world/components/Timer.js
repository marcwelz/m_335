import { useEffect, useState } from 'react';
import { View, Text, TextInput, StyleSheet } from 'react-native';
import TaskButton from './static/TaskButton';


export default function Timer() {
    const [firstTimer, setFirstTimer] = useState(0)
    const [secondTimer, setSecondTimer] = useState(0)
    const [thirdTimer, setThirdTimer] = useState(0)
    const [fourthTimer, setFourthTimer] = useState(0)
    const [timer, setTimer] = useState(null)

    const [isStopwatchActive, setStopwatchActive] = useState(false)
    const [isTimerActive, setTimerActive] = useState(false)

    setTimeout(() => {
        setFirstTimer(firstTimer + 1)
    }, 1000);

    /*setTimeout(() => {
        setSecondTimer(secondTimer + 4)
    }, 4);*/

    setTimeout(() => {
       if(isTimerActive && timer - 1 >= 0) setTimer(timer - 1)
       if(timer === 0) setTimerActive(false )
    }, 1000);

    setTimeout(() => {
        setThirdTimer(isStopwatchActive ? thirdTimer + 1 : 0)
    }, 1000);

  return (
    <View style={{ flex: 1, alignItems: 'center', padding: 20 }}>
        <Text>Timer</Text>
        <Text>Timer seconds: {firstTimer}</Text>
        <Text>Timer ms: {secondTimer}</Text>
        <TaskButton onPress={() => setStopwatchActive(!isStopwatchActive)} title={isStopwatchActive ? "stop Stopwatch": "start Stopwatch"}></TaskButton>
        <Text>Stopwatch: {thirdTimer}</Text>

        <Text style={{ margin: 10}}>set Timer</Text>
        <TextInput
            style={styles.input_text}
            onChangeText={setTimer}
            value={timer}
            placeholder="Enter amount..."
            keyboardType='numeric'
        />
        <TaskButton onPress={() => setTimerActive(!isTimerActive)} title={isTimerActive ? "stop Timer": "start Timer"}></TaskButton>
        <Text style={{ margin: 10}}>Timer: {timer === 0 ? "done": timer}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
    input_text: {
      height: 40,
      borderWidth: 1,
      padding: 10,
      width: "100%",
    },
  });
  