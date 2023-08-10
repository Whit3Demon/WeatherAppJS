import { View, Text, Image, StyleSheet, Button } from "react-native";
import React, { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import * as Location from "expo-location";
import { ActivityIndicator } from "react-native-paper";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function WeatherView() {
  const [isLoading, setIsLoading] = useState(true); //loading View value
  const [isPermissions, setIsPermissions] = useState(false); //Location Permissons View value
  const [isError, setIsError] = useState(false); //Error View value

  const [requestTimer, setRequestTimer] = useState(1800000); // 1800000 = 30 minutes in milliseconds (Timer for)

  const [dataName, setDataName] = useState(null);
  const [dataImage, setDataImage] = useState(null);
  const [dataTemp, setDataTemp] = useState<number | null>(null);
  const [dataWeatherDescription, setDataWeatherDescription] = useState(null);
  const [dataWindSpeed, setDataWindSpeed] = useState(null);
  const [dataHumidity, setDataHumidity] = useState(null);

  const [correctDate, setCorrectDate] = useState<string>("");

  {
    /* Get Correct Date */
  }
  const currentDate = () => {
    const currentDate = new Date();
    const options: Intl.DateTimeFormatOptions = {
      weekday: "long",
      month: "long",
      day: "numeric",
    };
    const formattedDate: string = currentDate.toLocaleDateString(
      "ru-RU",
      options
    );
    setCorrectDate(formattedDate);
  };

  {
    /* AsyncStorage Start Block */
  }
  const saveData = async () => {
    try {
      const jsonDataName = JSON.stringify(dataName);
      const jsonDataTemp = JSON.stringify(dataTemp);
      const jsonDataWeatherDescription = JSON.stringify(dataWeatherDescription);
      const jsonDataWindSpeed = JSON.stringify(dataWindSpeed);
      const jsonDataHumidity = JSON.stringify(dataHumidity);
      const jsonCorrectDate = JSON.stringify(correctDate);

      await AsyncStorage.setItem("keyForDataName", jsonDataName);
      await AsyncStorage.setItem("keyForDataTemp", jsonDataTemp);
      await AsyncStorage.setItem(
        "keyForDataWeatherDescription",
        jsonDataWeatherDescription
      );
      await AsyncStorage.setItem("keyForDataWindSpeed", jsonDataWindSpeed);
      await AsyncStorage.setItem("keyForDataHumidity", jsonDataHumidity);
      await AsyncStorage.setItem("keyForCorrectDate", jsonCorrectDate);

      await AsyncStorage.setItem(
        "keyForFirstLaunchOnboarding",
        JSON.stringify(true)
      ); //disable onboarding on next startup

    } catch (error) {null}
  };

  const loadData = async () => {
    try {
      const jsonDataName = await AsyncStorage.getItem("keyForDataName");
      const jsonDataTemp = await AsyncStorage.getItem("keyForDataTemp");
      const jsonDataWeatherDescription = await AsyncStorage.getItem(
        "keyForDataWeatherDescription"
      );
      const jsonDataWindSpeed = await AsyncStorage.getItem(
        "keyForDataWindSpeed"
      );
      const jsonDataHumidity = await AsyncStorage.getItem("keyForDataHumidity");
      const jsonCorrectDate = await AsyncStorage.getItem("keyForCorrectDate");

      setDataName(jsonDataName !== null ? JSON.parse(jsonDataName) : null);
      setDataTemp(jsonDataTemp !== null ? JSON.parse(jsonDataTemp) : null);
      setDataWeatherDescription(
        jsonDataWeatherDescription !== null
          ? JSON.parse(jsonDataWeatherDescription)
          : null
      );
      setDataWindSpeed(
        jsonDataWindSpeed !== null ? JSON.parse(jsonDataWindSpeed) : null
      );
      setDataHumidity(
        jsonDataHumidity !== null ? JSON.parse(jsonDataHumidity) : null
      );
      setCorrectDate(
        jsonCorrectDate !== null ? JSON.parse(jsonCorrectDate) : null
      );

      if (
        dataTemp != null &&
        dataHumidity != null &&
        dataName != null &&
        dataWeatherDescription != null &&
        dataWindSpeed != null &&
        correctDate != null
      ) {
        setIsLoading(false);
      } else {null}
    } catch (error) {null}
  };

  {
    /* AsyncStorage end Block */
  }

  useEffect(() => {
    const loadDataAndFetchData = async () => {
      try {
        if (dataName == null) {
          await loadData();
        }
        const { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== "granted") {
          setIsPermissions(false);
          return;
        } else {
          setIsPermissions(true);
          const location = await Location.getCurrentPositionAsync({});
          fetchDataFromApi(location.coords.latitude, location.coords.longitude);
        }
      } catch (error) {null}
    };

    loadDataAndFetchData();

    {
      /*request every 30 minutes or every 5 minutes if error*/
    }
    const interval = setInterval(() => {
      loadDataAndFetchData();
    }, requestTimer);

    return () => {
      clearInterval(interval);
    };
  }, []);

  {
    /* fetch Data Start Block */
  }
  const fetchDataFromApi = async (
    latitude: string | number,
    longitude: string | number
  ) => {
    try {
      const response = await fetch(
        "https://api.openweathermap.org/data/2.5/weather?appid=26f6cadbb5b881afd9c874a155c8ef21&units=metric&lang=ru&lat=" +
          latitude +
          "&lon=" +
          longitude
      );
      const data = await response.json();

      console.log(data);
      try {
        setDataName(data.name);
        setDataImage(data.weather[0].icon);
        setDataTemp(Math.floor(data.main.temp));
        setDataWeatherDescription(data.weather[0].description);
        setDataWindSpeed(data.wind.speed);
        setDataHumidity(data.main.humidity);

        currentDate();

        if (isLoading) {
          setIsLoading(false);
        }

        saveData();

        if (isError) {
          setIsError(false);
          setRequestTimer(1800000); // 1800000 = 30 minutes in milliseconds
        }
      } catch {
        setIsError(true);
        setRequestTimer(300000); // 300000 = 5 minutes in milliseconds
      }
    } catch {
      setIsError(true);
      setRequestTimer(300000); // 300000 = 5 minutes in milliseconds
    }
  };
  {
    /* fetch Data end Block */
  }

  //ERROR VIEW
  const ErrorView = () => (
    <View style={styles.errorContainer}>
      <Text style={styles.errorText}>Произошла ошибка...</Text>
      <Text style={styles.errorSubText}>
        Обновим, когда появится доступ к погоде
      </Text>
    </View>
  );

  //GET PERMISSONS VIEW
  const PermissonsView = () => (
    <View style={styles.permissonsContainer}>
      <Text style={styles.permissonsText}>Не могу показать погоду</Text>
      <Text style={styles.permissonsSubText}>
        мне нужно знать твою геолокацию
      </Text>
      <Button
        title="Разрешить доступ"
        onPress={() => Location.requestForegroundPermissionsAsync}
      />
    </View>
  );

  //LOADING DATA VIEW
  const LoadingView = () => (
    <View style={styles.loadingContainer}>
      <ActivityIndicator size="large" color="blue" />
      <Text>Загружаю Погоду...</Text>
    </View>
  );

  const NoProblemsWeatherView = () => (
    <View style={styles.weatherContainer}>
      {/* location tittle */}
      <Text style={styles.weatherCityNameText}>{dataName}</Text>

      {/*weather image */}
      <View style={styles.weatherImagesContainer}>
        {dataImage ? (
          <Image
            style={styles.weatherImagesSize}
            source={{
              uri: "https://openweathermap.org/img/wn/" + dataImage + "@4x.png",
            }}
            resizeMode="contain"
          />
        ) : (
          <Image
            style={styles.weatherImagesSize}
            source={require("../../assets/images/question-mark.png")}
            resizeMode="contain"
          />
        )}
      </View>

      {/* degree celcius && days */}
      <View style={styles.weatherDescriptionContainer}>
        <Text style={styles.weatherTempText}>{dataTemp}&#176;</Text>
        <Text style={styles.weatherDescriptionText}>
          {dataWeatherDescription}
        </Text>
        <Text style={styles.weatherDateText}>{correctDate}</Text>

        {/* simple line */}
        <View style={styles.line} />
      </View>

      {/* Wind && Humitity */}
      <BottomWindHumitityComponent />
    </View>
  );

  {
    /* Block of components for NoProblemsWeatherView */
  }

  const BottomWindHumitityComponent = () => (
    <View style={styles.weatheWindHumitityContainer}>
      <View>
        <Image
          source={require("../../assets/images/wind.png")}
          style={styles.weatherWindHumitityImageSize}
        />
        <Text style={styles.weatherWindHumitityText}>{dataWindSpeed} км/ч</Text>
        <Text style={styles.weatherWindHumititySubText}>Ветер</Text>
      </View>
      <View>
        <Image
          source={require("../../assets/images/humidity.png")}
          style={{ height: 40, width: 40 }}
        />
        <Text style={styles.weatherWindHumitityText}>{dataHumidity}%</Text>
        <Text style={styles.weatherWindHumititySubText}>Влажность</Text>
      </View>
    </View>
  );
  {
    /* End Block of components for NoProblemsWeatherView */
  }

  {
    /*RETURN CODE LAYOUT*/
  }
  return (
    <View style={styles.container}>
      <SafeAreaView style={styles.safeContainer}>
        <View style={styles.subContainer}>
          {/* IF THERE ERROR*/}
          {isError ? (
            <ErrorView />
          ) : /* IF THERE IS NO ACCESS TO THE LOCATION*/
          !isPermissions ? (
            <PermissonsView />
          ) : /* IF THERE LOADING DATA*/
          isLoading ? (
            <LoadingView />
          ) : (
            /* if there Weather View*/
            <NoProblemsWeatherView />
          )}
        </View>
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: "relative",
  },
  safeContainer: {
    flex: 1,
    position: "relative",
  },
  subContainer: {
    marginHorizontal: 4,
    flex: 1,
    justifyContent: "space-around",
    marginBottom: 2,
  },

  line: {
    borderWidth: 1.5,
    borderRadius: 1,
    marginTop: 20,
  },

  errorContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  errorText: {
    fontSize: 24,
    fontWeight: "bold",
    color: "black",
    marginBottom: 10,
  },
  errorSubText: {
    fontSize: 18,
    color: "gray",
    marginBottom: 10,
  },

  permissonsContainer: {
    alignItems: "center",
  },
  permissonsText: {
    fontSize: 30,
    fontWeight: "bold",
    marginBottom: 10,
  },
  permissonsSubText: {
    fontSize: 16,
    marginBottom: 10,
  },

  loadingContainer: {
    alignItems: "center",
  },

  weatherContainer: {
    marginHorizontal: 4,
    flex: 1,
    justifyContent: "space-around",
    marginBottom: 2,
  },
  weatherCityNameText: {
    color: "black",
    textAlign: "center",
    fontSize: 20,
    fontWeight: "bold",
  },
  weatherImagesContainer: {
    flexDirection: "row",
    justifyContent: "center",
  },
  weatherImagesSize: {
    width: 200,
    height: 200,
  },

  weatherDescriptionContainer: {
    marginBottom: 2,
  },
  weatherTempText: {
    textAlign: "center",
    fontWeight: "bold",
    color: "black",
    fontSize: 60,
    marginLeft: 5,
  },
  weatherDescriptionText: {
    textAlign: "center",
    color: "black",
    fontSize: 20,
    letterSpacing: 2,
  },
  weatherDateText: {
    textAlign: "center",
    color: "gray",
    fontSize: 20,
    letterSpacing: 2,
  },

  weatheWindHumitityContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 2,
    marginHorizontal: 50,
  },
  weatherWindHumitityImageSize: {
    height: 40,
    width: 40,
  },
  weatherWindHumitityText: {
    color: "black",
    fontWeight: "bold",
    fontSize: 16,
    marginTop: 15,
  },
  weatherWindHumititySubText: {
    color: "gray",
    fontWeight: "bold",
    fontSize: 10,
    marginTop: 5,
  },
});
