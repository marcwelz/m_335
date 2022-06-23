import * as React from 'react';
import { useEffect, useState } from 'react';
import { Text, View, Button } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { DataTable } from 'react-native-paper';

export default function Results({ navigation }) {
  const [data, setData] = useState([])
  const [isDataReady, setDataReady] = useState(false) 

  useEffect(() => {
    getData()
  }, [])

  const getData = async () => {
    try {
      const value = await AsyncStorage.getItem('@storage_Key')
      console.log(value)
      if(value !== null) {
        setData(JSON.parse(value))
        setDataReady(true)
      } else {
        console.log("no dasa")
      }
    } catch(e) {
      // error reading value
    }
  }

  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>Results</Text>
      {isDataReady ? <DataTable>
        <DataTable.Header>
          <DataTable.Title>Category</DataTable.Title>
          <DataTable.Title numeric>Amount</DataTable.Title>
          <DataTable.Title>Comment</DataTable.Title>
        </DataTable.Header>

        {data.map((d) => 
          <DataTable.Row>
            <DataTable.Cell><Text>{d.category}</Text></DataTable.Cell>
            <DataTable.Cell numeric><Text>{d.amount}</Text></DataTable.Cell>
            <DataTable.Cell><Text>{d.comment}</Text></DataTable.Cell>
          </DataTable.Row>
        )}

      </DataTable> : <Text></Text>}
    </View>
  );
}