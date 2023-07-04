import { View, Text, Image, TextInput, TouchableOpacity, ScrollView, StyleSheet, Button } from 'react-native'
import React, { useEffect, useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import * as Location from 'expo-location';
import { ActivityIndicator } from 'react-native-paper';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function WeatherView() {

  const [isLoading, setIsLoading] = useState(true);     //loading View value
  const [isPermissions, setIsPermissions] = useState(false);  //Location Permissons View value
  const [isError, setIsError] = useState(false)   //Error View value

  const [requestTimer, setRequestTimer] = useState(1800000); // 1800000 = 30 minutes in milliseconds (Timer for request)

  const [dataName, setDataName] = useState(null);
  const [dataImage, setDataImage] = useState(null);
  const [dataTemp, setDataTemp] = useState(null);
  const [dataWeatherDescription, setDataWeatherDescription] = useState(null);
  const [correctTime, setCorrectTime] = useState(null);
  const [dataWindSpeed, setDataWindSpeed] = useState(null);
  const [dataHumidity, setDataHumidity] = useState(null);

  const [correctDate, setCorrectDate] = useState(null)


  {/* Get Correct Date */ }
  const currentDate = () => {
    const currentDate = new Date();
    const options = { weekday: 'long', month: 'long', day: 'numeric' };
    setCorrectDate(currentDate.toLocaleDateString('ru-RU', options));
  }


  {/* AsyncStorage Start Block */ }
  const saveData = async () => {
    try {
      const jsonDataName = JSON.stringify(dataName);
      const jsonDataTemp = JSON.stringify(dataTemp);
      const jsonDataWeatherDescription = JSON.stringify(dataWeatherDescription);
      const jsonDataWindSpeed = JSON.stringify(dataWindSpeed);
      const jsonDataHumidity = JSON.stringify(dataHumidity);
      const jsonCorrectDate = JSON.stringify(correctDate);

      await AsyncStorage.setItem('keyForDataName', jsonDataName);
      await AsyncStorage.setItem('keyForDataTemp', jsonDataTemp);
      await AsyncStorage.setItem('keyForDataWeatherDescription', jsonDataWeatherDescription);
      await AsyncStorage.setItem('keyForDataWindSpeed', jsonDataWindSpeed);
      await AsyncStorage.setItem('keyForDataHumidity', jsonDataHumidity);
      await AsyncStorage.setItem('keyForCorrectDate', jsonCorrectDate)

      console.log('Data saved successfully!');
    } catch (error) {
      console.error(error);
    }
  }

  const loadData = async () => {
    try {
      console.log("start loading data")
      const jsonDataName = await AsyncStorage.getItem('keyForDataName');
      const jsonDataTemp = await AsyncStorage.getItem('keyForDataTemp');
      const jsonDataWeatherDescription = await AsyncStorage.getItem('keyForDataWeatherDescription');
      const jsonDataWindSpeed = await AsyncStorage.getItem('keyForDataWindSpeed');
      const jsonDataHumidity = await AsyncStorage.getItem('keyForDataHumidity');
      const jsonCorrectDate = await AsyncStorage.getItem('keyForCorrectDate');

      setDataName(JSON.parse(jsonDataName));
      setDataTemp(JSON.parse(jsonDataTemp));
      setDataWeatherDescription(JSON.parse(jsonDataWeatherDescription));
      setDataWindSpeed(JSON.parse(jsonDataWindSpeed));
      setDataHumidity(JSON.parse(jsonDataHumidity));
      setCorrectDate(JSON.parse(jsonCorrectDate));

      if (dataTemp, dataHumidity, dataName, dataWeatherDescription, dataWindSpeed, correctDate != null) {
        setIsLoading(false)
        console.log("data is not empty")
      }
      else {
        console.log("data is empty")
      }
    } catch (error) {
      console.error(error);
    }
  }
  {/* AsyncStorage end Block */ }




  useEffect(() => {
    const loadDataAndFetchData = async () => {
      try {
        if (dataName == null) {
          await loadData();
        }
        let { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== 'granted') {
          setIsPermissions(false);
          return;
        } else {
          setIsPermissions(true);
          let location = await Location.getCurrentPositionAsync({});
          fetchDataFromApi(location.coords.latitude, location.coords.longitude);
        }
      } catch (error) {
        console.log(error);
      }
    };

    loadDataAndFetchData();

    {/*request every 30 minutes or every 5 minutes if error*/ }
    const interval = setInterval(() => {
      loadDataAndFetchData();
    }, requestTimer);

    return () => {
      clearInterval(interval);
    };
  }, []);



  {/* fetch Data Start Block */ }
  const fetchDataFromApi = (latitude, longitude) => {
    console.log("start")
    try {
      fetch('https://api.openweathermap.org/data/2.5/weather?appid=26f6cadbb5b881afd9c874a155c8ef21&units=metric&lang=ru&lat=' + latitude + '&lon=' + longitude).then(res => res.json()).then(data => {
        console.log(data)
        try {
          setDataName(data.name)
          setDataImage(data.weather[0].icon)
          setDataTemp(Math.trunc(data.main.temp))
          setDataWeatherDescription(data.weather[0].description)
          setDataWindSpeed(data.wind.speed)
          setDataHumidity(data.main.humidity)

          currentDate()

          if (isLoading) {
            setIsLoading(false);
          }

          saveData()

          if (isError) {
            setIsError(false)
            setRequestTimer(1800000)  // 1800000 = 30 minutes in milliseconds
          }

        } catch {
          setIsError(true)
          setRequestTimer(300000)  // 300000 = 5 minutes in milliseconds
        }
      })
    } catch {
      setIsError(true)
      setRequestTimer(300000)  // 300000 = 5 minutes in milliseconds
    }
  }
  {/* fetch Data end Block */ }



  {/*CODE LAYOUT*/ }
  return (

    <View style={{ flex: 1, position: 'relative' }}>

      <SafeAreaView style={{ flex: 1, flexDirection: 'column', backgroundColor: 'rgb(229, 229, 229)' }}>
        <View style={{ marginHorizontal: 4, flex: 1, justifyContent: 'space-around', marginBottom: 2 }}>

          {/* IF THERE ERROR*/}
          {isError ?
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', }}>
              <Text style={{ fontSize: 24, fontWeight: 'bold', color: 'black', marginBottom: 10, }}>
                Произошла ошибка...
              </Text>
              <Text style={{ fontSize: 18, color: 'gray', marginBottom: 10, }}>Обновим, когда появится доступ к погоде</Text>
            </View>

            /* IF THERE IS NO ACCESS TO THE LOCATION*/
            : !isPermissions ?
              <View style={{ alignItems: 'center' }}>
                <Text style={{
                  fontSize: 30,
                  fontWeight: 'bold',
                  marginBottom: 10,
                }}>
                  Не могу показать погоду
                </Text>
                <Text style={{
                  fontSize: 16,
                  marginBottom: 10,
                }}>
                  мне нужно знать твою геолокацию
                </Text>
                <Button title="Разрешить доступ" onPress={Location.requestForegroundPermissionAsync} />
              </View>

              /* IF THERE LOADING DATA*/
              : isLoading ?
                <View style={{ alignItems: 'center' }}>
                  <ActivityIndicator size="large" color="blue" />
                  <Text>Загружаю Погоду...</Text>
                </View>

                /* if there Weather View*/
                : <View style={{ marginHorizontal: 4, flex: 1, justifyContent: 'space-around', marginBottom: 2}}>
                  {/* location tittle */}
                  <Text style={{ color: 'black', textAlign: 'center', fontSize: 20, fontWeight: 'bold' }}>
                    {dataName}
                  </Text>
                  {/*weather image */}
                  <View style={{ flexDirection: 'row', justifyContent: 'center' }}>
                    {dataImage ? (
                      <Image style={{ width: 200, height: 200 }}
                        source={{ uri: 'https://openweathermap.org/img/wn/' + dataImage + '@4x.png' }}
                        resizeMode='contain'
                      />
                    ) : (
                      <Image style={{ width: 200, height: 200 }}
                        source={require('../assets/images/question-mark.png')}
                        resizeMode='contain'
                      />
                    )}
                  </View>



                  {/* degree celcius && days && line */}
                  <View style={{ marginBottom: 2 }}>
                    <Text style={{ textAlign: 'center', fontWeight: 'bold', color: 'black', fontSize: 60, marginLeft: 5 }}>
                      {dataTemp}&#176;
                    </Text>
                    <Text style={{ textAlign: 'center', color: 'black', fontSize: 20, letterSpacing: 2 }}>
                      {dataWeatherDescription}
                    </Text>
                    <Text style={{ textAlign: 'center', color: 'gray', fontSize: 20, letterSpacing: 2 }}>
                      {correctDate}
                    </Text>


                    {/* simple line */}
                    <View style={{
                      borderStyle: 'inset',
                      borderWidth: 1.5,
                      borderRadius: 1,
                      marginTop: 20
                    }}>
                    </View>
                  </View>

                  {/* Wind && Humitity */}
                  <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 2, marginHorizontal: 50 }}>
                    <View>
                      <Image source={require('../assets/images/wind.png')} style={{ height: 40, width: 40 }} />
                      <Text style={{ color: 'black', fontWeight: 'bold', fontSize: 16, marginTop: 15 }}>{dataWindSpeed} км/ч</Text>
                      <Text style={{ color: 'gray', fontWeight: 'bold', fontSize: 10, marginTop: 5 }}>Ветер</Text>
                    </View>
                    <View>
                      <Image source={require('../assets/images/humidity.png')} style={{ height: 40, width: 40 }} />
                      <Text style={{ color: 'black', fontWeight: 'bold', fontSize: 16, marginTop: 15 }}>{dataHumidity}%</Text>
                      <Text style={{ color: 'gray', fontWeight: 'bold', fontSize: 10, marginTop: 5 }}>Влажность</Text>
                    </View>
                  </View>
                </View>


          }
        </View>
      </SafeAreaView>
    </View>
  )
}

