import * as React from 'react';
import { useEffect, useState } from 'react';
import { Text, View, StyleSheet, Dimensions } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { DataTable } from 'react-native-paper';
import MapView, { Marker } from 'react-native-maps';

export default function Results({ navigation }) {
  const [data, setData] = useState([])
  const [isDataReady, setDataReady] = useState(false) 
  const [markers, setMarkers] = useState(null)

  useEffect(() => {
    getData()
  }, [])

  useEffect(() => {
  }, [markers])

  useEffect(() => {
    if(!data && data.length>0) {
      const tmpObj = {
        latitude: data[0].location.latitude,
        longitude: data[0].location.longitude,
        title: data[0].category,
        subtitle: data[0].comment
      }
  
      setMarkers(tmpObj)
    }
  }, [data])

  const getData = async () => {
    try {
      const value = await AsyncStorage.getItem('@storage_Key')
      const parsedValue = JSON.parse(value)

      setData(parsedValue)

      setDataReady(true)
    } catch(e) {
      console.error(e)
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
      <View style={styles.container}>
      
      {markers ? 
        <MapView style={styles.map} annotations={markers}>
          <Marker 
            coordinate={{latitude: markers.latitude, longitude: markers.longitude}}
            pinColor = {"purple"} // any color
            title={markers.title}
            description={markers.subtitle}
            />
        </MapView>
      : <Text></Text>}
    </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  map: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').width,
  },
});