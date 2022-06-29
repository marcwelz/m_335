import { StatusBar } from 'expo-status-bar';
import { useEffect, useState } from 'react';
import { StyleSheet, Text, TextInput, Button, View, LogBox } from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';
import AsyncStorage from '@react-native-async-storage/async-storage';
import TaskButton from './static/TaskButton';
import * as Location from 'expo-location';

export default function AddTask({ navigation }) {
    const {navigate} = navigation
    const [location, setLocation] = useState(null);
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

    useEffect(() => {
      console.log("Location jas changed")

      if(location) {
        const parsedLocation = JSON.parse(location)
        const tmpObj = {
          "category": dropdownValue,
          "amount": amount,
          "comment": comment,
          "location": {
            "latitude": parsedLocation.coords.latitude,
            "longitude": parsedLocation.coords.longitude,
          }
        }
        setData(data.concat(tmpObj))
        storeData()

        console.log("data saved")
      }
    }, [location])

    useEffect(() => {
      const tmpObj = []
      storeDataStart(tmpObj)
      }, []);

    const storeDataStart = async (tmpData) => {
        try {
          await AsyncStorage.setItem('@storage_Key', JSON.stringify(tmpData))
        } catch (e) {
          // saving error
        }
      }

      const getCurrentLocation = () => {
        (async () => {
          let { status } = await Location.requestForegroundPermissionsAsync();
          if (status !== 'granted') return;
          
          let location = await Location.getCurrentPositionAsync({});
          setLocation(JSON.stringify(location));
        })();
      }

    const storeData = async () => {
        try {
          const jsonValue = JSON.stringify(data)
          console.log(jsonValue)
          await AsyncStorage.setItem('@storage_Key', jsonValue)
        } catch (e) {
          console.error(e)
        }
      }

    const getData = async () => {
      try {
        const value = await AsyncStorage.getItem('@storage_Key')
        if(value !== null) {
          console.log(JSON.parse(value)) 
        }
      } catch(e) {
        console.error(e)
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
                onPress={() => getCurrentLocation()}
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
