import { useEffect, useState } from 'react';
import { View, Text, TextInput, StyleSheet } from 'react-native';
import { BarChart, Grid, LineChart, YAxis } from 'react-native-svg-charts';
import TaskButton from './static/TaskButton';


export default function Diagram() {
    const fill = 'rgb(134, 65, 244)'
    const data = [50, 10, 40, 95, 48, 24, 24, 85, 144, 90, 35, 53, 53, 24, 50, 20, 80]
    const contentInset = { top: 20, bottom: 20 }

    return (
        <View style={{ flex: 1, alignItems: 'center' }}>
            <BarChart style={{ height: 200, maxWidth: 400 }} data={data} svg={{ fill }} contentInset={{ top: 30, bottom: 30 }}>
                <Grid />
            </BarChart>
            <View style={{ height: 200, flexDirection: 'row' }}>
                <YAxis
                    data={data}
                    contentInset={contentInset}
                    svg={{
                        fill: 'grey',
                        fontSize: 10,
                    }}
                    numberOfTicks={10}
                    formatLabel={(value) => `${value}ºC`}
                />
                <LineChart
                    style={{ height: 200, maxWidth: 400 }}
                    data={data}
                    svg={{ stroke: 'rgb(134, 65, 244)' }}
                    contentInset={{ top: 20, bottom: 20 }}
                >
                    <Grid />
                </LineChart>
            </View>
        </View>
    )
}
  