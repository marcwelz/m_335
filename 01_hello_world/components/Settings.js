import * as React from 'react';
import { useState } from 'react';
import { Text, View, StyleSheet } from 'react-native';
import { Switch } from 'react-native-gesture-handler';

export default function Settings({ navigation }) {
  const [isEnabled, setIsEnabled] = useState(false);
  const toggleSwitch = () => setIsEnabled(previousState => !previousState);

  return (
    <View style={{ flex: 1, alignItems: 'center' }}>
      <View style={{height: 170, width: "100%"}}>
        <View style={styles.settingConfig}>
          <Text>Enable StatusBar</Text>
          <Switch 
            ios_backgroundColor="#3e3e3e"
            onValueChange={toggleSwitch}
            value={isEnabled}
          />
        </View>
        <View style={styles.settingConfig}>
          <Text>Enable Setting #1</Text>
          <Switch 
            ios_backgroundColor="#3e3e3e"
            onValueChange={toggleSwitch}
            value={isEnabled}
          />
        </View>
        <View style={styles.settingConfig}>
          <Text>Enable Setting #2</Text>
          <Switch 
            ios_backgroundColor="#3e3e3e"
            onValueChange={toggleSwitch}
            value={isEnabled}
          />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  settingConfig: {
    flex: 1, 
    justifyContent: "space-between", 
    alignItems: "center", 
    flexDirection: "row", 
    padding: 20,
  },
});