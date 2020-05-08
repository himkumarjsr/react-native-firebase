import React, { Component } from 'react';
import { Text, View, Picker, StyleSheet } from 'react-native';
import PureChart from 'react-native-pure-chart';

export default class Portfolio extends Component {
  constructor() {
    super();
    this.state = { 
      pickerValue: 'm',
      totalEarning: 'Rs. 2,066',
      amountPaid:'Rs. 44'
    }
  }

 onselectChnage = (itemvalue)=>{
     this.setState({pickerValue:itemvalue }, function () {
      this.changeValue();
    });
     }
  

  changeValue = () => {
    if(this.state.pickerValue === 'm'){
      this.setState({totalEarning:'Rs. 2,066' });
      this.setState({amountPaid:'Rs. 44' });
    }
    else if(this.state.pickerValue === 'q'){
      this.setState({totalEarning:'Rs. 12,108' });
      this.setState({amountPaid:'Rs. 4,380' });
    }
    else if(this.state.pickerValue === 'y'){
      this.setState({totalEarning:'Rs. 60,494'});
      this.setState({amountPaid:'Rs. 4,820' });
    }
   }
    render() {
        let sampleData = [
            {
              seriesName: 'series1',
              data: [
                {x: 'Jan', y: 3020},
                {x: 'Feb', y: 2201},
                {x: 'Mar', y: 1020},
                {x: 'Apr', y: 2501},
                {x: 'May', y: 1055},
                {x: 'Jun', y: 3786},
                {x: 'Jul', y: 3105},
                {x: 'Aug', y: 2083},
                {x: 'Sep', y: 4448},
                {x: 'Oct', y: 1126},
                {x: 'Nov', y: 2422},
                {x: 'Dec', y: 5890}
              ],
              color: 'red'
            },
            {
              seriesName: 'series2',
              data: [
                {x: 'Jan', y: 3000},
                {x: 'feb', y: 2003},
                {x: 'Mar', y: 1706},
                {x: 'Apr', y: 250},
                {x: 'May', y: 1011},
                {x: 'Jun', y: 1701},
                {x: 'Jul', y: 1804},
                {x: 'Aug', y: 1640},
                {x: 'Sep', y: 4310},
                {x: 'Oct', y: 1210},
                {x: 'Nov', y: 6102},
                {x: 'Dec', y: 3100}
              ],
              color: 'green'
            }
          ]

          // var totalSum = 0;

          // for (let i in sampleData){
          //   let seriesSum = 0;
          //   let currentSeries = sampleData[i].seriesName;
          //   let currentSeriesSum = sampleData[i].data.reduce((sum,cur) => sum + cur['y'],0);
          //   totalSum = totalSum + currentSeriesSum;
          // }

        return (
            <View>
              <View style={styles.container}> 
                <Text style={styles.headerText}>For your portfolio</Text>
                <Picker style={styles.pickerSelect}
                selectedValue={this.state.pickerValue}
                // onValueChange={(itemvalue, itemIndex) => this.setState({pickerValue: itemvalue})}
                onValueChange={this.onselectChnage}
                >
                  <Picker.Item label="This Month" value="m" />
                  <Picker.Item label="This Quater" value="q" />
                  <Picker.Item label="This Year" value="y" />
                </Picker>
              </View>
              <View style={styles.container}>
                <View style={styles.section}>
                  <Text style={styles.totalEarning}>{this.state.totalEarning}</Text>
                  <Text style={styles.labelTxt}>Total Earning</Text>
                </View>
                <View style={styles.section}>
                <Text style={styles.amountPaid}>{this.state.amountPaid}</Text>
                  <Text style={styles.labelTxt}>Amount paid</Text>
                </View>
                {/* <Text style={styles.amountPaid}>{this.state.amountPaid}</Text> */}
                {/* <Text>{totalSum}</Text> */}
              </View>
              <View style={styles.chartLayout}>
                <PureChart 
                  data={sampleData} 
                  width='20'
                  height={150} 
                  type='line'
                /> 
              </View>
               
            </View>
        )
    }
}

const styles = StyleSheet.create({

  container: {
      flexGrow: 1,
      justifyContent: 'flex-start',
      marginTop:0,
      alignItems:'center',
      flexDirection: 'row',
      paddingLeft:30
    },
    pickerSelect:{
      width:"50%",
      paddingLeft:50
    },
    section:{
      width: '40%',
    },
    totalEarning:{
      borderColor: 'green',
      borderWidth: 1,
      marginTop: 0,
      margin: 20,
      backgroundColor: '#fff',
      textAlign: 'center',
      padding: 10
    },
    amountPaid:{
      borderColor: 'red',
      borderWidth: 1,
      marginTop: 0,
      margin: 20,
      backgroundColor: '#fff',
      textAlign: 'center',
      padding: 10
    },
    labelTxt:{
      marginLeft: 20,
      paddingBottom:20,
      fontSize: 12,
      color: 'grey'
    },
    chartLayout:{
      width: '90%',
      marginLeft: 15
    },
    headerText:{
      fontSize: 18,
      fontWeight: 'bold',
      letterSpacing: 1
    }
  });
