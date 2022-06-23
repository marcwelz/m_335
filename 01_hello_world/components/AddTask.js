import { StatusBar } from 'expo-status-bar';
import { useEffect, useState } from 'react';
import { StyleSheet, Text, TextInput, Button, View } from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';
import AsyncStorage from '@react-native-async-storage/async-storage';
import TaskButton from './static/TaskButton';

export default function AddTask({ navigation }) {
    const {navigate} = navigation
    const [open, setOpen] = useState(false);
    const [data, setData] = useState([])
    const [dropdownValue, setDropdownValue] = useState(null)
    const [amount, setAmount] = useState(null)
    const [comment, setComment] = useState(null)
    const [items, setItems] = useState([
        {label: 'Household', value: 'household'},
        {label: 'Car', value: 'car'},
        {label: 'Work', value: 'work'},
        {label: 'Food', value: 'food'}
    ]);
    
    async function handlePress() {
        const tmpObj = {
            "category": dropdownValue,
            "amount": amount,
            "comment": comment
        }

        console.log(data, tmpObj)

        setData(data.concat(tmpObj))
        storeData()

    }

    useEffect(() => {
        const tmpObj = [
            {
                "category": "car",
                "amount": 144,
                "comment": "no comment"
            },
            {
                "category": "house",
                "amount": 500,
                "comment": "the house is ass"
            },
            {
                "category": "work",
                "amount": 400000,
                "comment": "comment"
            },
        ]
        storeDataStart(tmpObj)
    }, [])

    const storeDataStart = async (tmpData) => {
        try {
          await AsyncStorage.setItem('@storage_Key', JSON.stringify(tmpData))
        } catch (e) {
          // saving error
        }
      }

    const storeData = async () => {
        try {
          const jsonValue = JSON.stringify(data)
          await AsyncStorage.setItem('@storage_Key', jsonValue)
        } catch (e) {
          // saving error
        }
      }

      const getData = async () => {
        try {
          const value = await AsyncStorage.getItem('@storage_Key')
          if(value !== null) {
            console.log(value)
          }
        } catch(e) {
          // error reading value
        }
      }

    return (
        <View style={styles.container}>
            <Text style={{ margin: 10}}>Category</Text>
            <DropDownPicker
                open={open}
                value={dropdownValue}
                items={items}
                setOpen={setOpen}
                setValue={setDropdownValue}
                setItems={setItems}
                placeholder="Select category..."
            />
            <Text style={{ margin: 10}}>Amount</Text>
            <TextInput
                style={styles.input_text}
                onChangeText={setAmount}
                value={amount}
                placeholder="Enter amount..."
                keyboardType='numeric'
            />
            <Text style={{ margin: 10}}>Comment</Text>
            <TextInput
                value={comment}
                onChangeText={setComment}
                style={styles.input_textarea}
                multiline
                numberOfLines={10}
                placeholder="Enter comment..."
            />
            <TaskButton
                title="Save"
                onPress={() => handlePress()}
            />
            <Button title="get data" onPress={() => getData()}/>
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
    marginBottom: 10,
    },
});
