import { StatusBar } from 'expo-status-bar';
import { useState } from 'react';
import { StyleSheet, Text, TextInput, Button, View } from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';

export default function AddTask({ navigation, route }) {
    const {navigate} = navigation
    const [open, setOpen] = useState(false);
    const [value, setValue] = useState(null)
    const [items, setItems] = useState([
        {label: 'Household', value: 'household'},
        {label: 'Car', value: 'car'},
        {label: 'Work', value: 'work'},
        {label: 'Food', value: 'food'}
    ]);
    const [number, onChangeNumber] = useState(null);

    return (
        <View style={styles.container}>
            <Text style={{ margin: 10}}>Category</Text>
            <DropDownPicker
                open={open}
                value={value}
                items={items}
                setOpen={setOpen}
                setValue={setValue}
                setItems={setItems}
                placeholder="Select category..."
            />
            <Text style={{ margin: 10}}>Amount</Text>
            <TextInput
                style={styles.input_text}
                onChangeText={onChangeNumber}
                value={number}
                placeholder="Enter amount..."
                keyboardType='numeric'
            />
            <Text style={{ margin: 10}}>Comment</Text>
            <TextInput
                style={styles.input_textarea}
                multiline
                numberOfLines={10}
                placeholder="Enter comment..."
            />
            <Button title="submit" onPress={() => {
                navigate('Home')
                }}/>
        </View>
    );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    padding: 20,
    paddingTop: 0,
  },
  input_text: {
    height: 40,
    borderWidth: 1,
    padding: 10,
    width: "100%",
  },
  input_textarea: {
    borderWidth: 1,
    height: 100,
    width: "100%",
    padding: 10,
    },
});
