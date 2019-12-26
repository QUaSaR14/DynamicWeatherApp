import React from 'react';
import { StyleSheet, Text, View, ActivityIndicator } from 'react-native';
import Weather from './components/Weather';
import { API_KEY } from './utils/WeatherAPIKey'
import { PacmanIndicator } from 'react-native-indicators'

export default class App extends React.Component {

  constructor(props){
    super(props)
    this.state = {
      isLoading : true,
      temperature: 0,
      weatherCondition: null,
      error: null,
    }
  }
  

  componentDidMount() {
    console.log("Component Mounted....")
    navigator.geolocation.getCurrentPosition(
      position => {
        this.fetchWeather(position.coords.latitude, position.coords.longitude)
      },
      error => {
        this.setState({ error: error })
      }
    )
  }

  fetchWeather(lat = 25, lon = 25) {
    fetch(`http://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`)
    .then(res => res.json())
    .then(json => { 
      console.log(json)
      this.setState({
        temperature: json.main.temp,
        weatherCondition: json.weather[0].main,
        isLoading: false,
      })
     })
     .catch(error => {
       console.log(error)
     })
  }

  render() {

    return (
      <View style={styles.container} >
        { this.state.isLoading ?  
            <PacmanIndicator size={160} color="#45CE30" /> : 
            <Weather weather={ this.state.weatherCondition } temperature={ this.state.temperature } />
        }
      </View>
    )
  }

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
  },
});
