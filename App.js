import React, { Component } from 'react'

import Home from './src/Paginas/Home'
import TelaDestino from './src/Paginas/TelaDestino'

import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'

import { NotificationManager } from './src/Notification'

const notificador = NotificationManager
const Stack = createStackNavigator();

export default class App extends Component {
  constructor(props) {
    super(props)
  }

  componentDidMount() {
    notificador.configure();
    notificador.createChannel();
    notificador.buildNotificationSchedule();
  }

  onPressSendNotification = () => {
    notificador.showNotification(
      1,
      "Você tem um cupom de 10% disponível",
      "Que tal usar seu cupom em um maravilhoso lanche natural",
      {}, // data
      {} // options
    )
  }

  onPressCancelAllLocalNotification = () => {
    notificador.cancelAllLocalNotification()
  }

  render() {

    return (
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name='Home'>
            {
              ({navigation}) => {
                notificador.setNavegador(navigation)
                return (
                <Home 
                  MandarNotificacao={this.onPressSendNotification} 
                  CancelarNotificacao={this.onPressCancelAllLocalNotification}
                />
                )
              }
            }
            </Stack.Screen>
          <Stack.Screen name='TelaDestino' component={TelaDestino} />
        </Stack.Navigator>
      </NavigationContainer>
      
    )
  }
}