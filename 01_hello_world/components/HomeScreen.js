import * as React from 'react';
import { StatusBar, View } from 'react-native';
import TaskButton from './static/TaskButton';

export default function HomeScreen({ navigation }) {
  return (
    <View style={{ flex: 1, alignItems: 'center' }}>
      <StatusBar 
        barStyle="dark-content"
        animated={true}
        hidden={false}
      />
      <View style={{
        width: "100%",
        padding: 20,
       }}>
        <TaskButton
          onPress={() => navigation.navigate('Add Task')}
          title="Add Task"
        ></TaskButton>
        <TaskButton
          title="Results"
          onPress={() => navigation.navigate('Results')}
        />
        <TaskButton
          title="Timer"
          onPress={() => navigation.navigate('Timer')}
        />
        <TaskButton
          title="Diagram"
          onPress={() => navigation.navigate('Diagram')}
        />
        <TaskButton
          title="Settings"
          onPress={() => navigation.navigate('Settings')}
        />
      </View>
    </View>
  );
}