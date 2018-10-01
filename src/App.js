import React,{PureComponent} from 'react';

import {
  Navigator,
  BackAndroid,
  BackHandler,
  StyleSheet,
  AppState,
  Alert,
  NetInfo,
  Dimensions
} from 'react-native';
const { width } = Dimensions.get('window');
import {
  handleAndroidBackButton,
  removeAndroidBackButtonHandler
} from './module/androidBackButton';
 import AndroidBackButton from "react-native-android-back-button"
import RouteMapper from './components/Routes';
import OfflineNotice from './components/Screens/OfflineNotice';

function MiniOfflineSign() {
  return (
    <View style={styles.offlineContainer}>
      <Text style={styles.offlineText}>No Internet Connection</Text>
    </View>
  );
}

export default class App extends PureComponent {
      constructor(props){
        super(props);

        state = {
    appState: AppState.currentState,
    isConnected: true,
  }

      }

      componentDidMount() {
      NetInfo.isConnected.addEventListener('connectionChange', this.handleConnectivityChange);
    }

    componentWillUnmount() {
      //BackAndroid.addEventListener('hardwareBackPress', this.onBackAndroid.bind(this))
      NetInfo.isConnected.removeEventListener('connectionChange', this.handleConnectivityChange);
    }

    handleConnectivityChange = isConnected => {
      if (isConnected) {
        this.setState({ isConnected });

      } else {
        console.log(isConnected,'log');
        this.setState({ isConnected });

        //this._renderAlert();
      }
    }

_renderAlert(){
  Alert.alert(
'Warning',
'Please Connect Internet',
[

{text: 'OK', onPress: () => this.handleConnectivityChange()},
],

)
}



      onBackAndroid = () => { // works best when the goBack is async

       return true;
   }

   popIfExists() {
   if (navigator.getCurrentIndex() > 0) {
     navigator.pop()
     return true // do not exit app
   } else {
     return false // exit app
   }
 }


  render() {

    var initialRoute = {
      //name: 'enrollment-form',
      name: 'login'

    };

    var layout =
         <Navigator initialRoute = { initialRoute } configureScene = { () => Navigator.SceneConfigs.FadeAndroid } renderScene = { RouteMapper } >
         </Navigator>;

          return layout;

  }
}

const styles = StyleSheet.create({
  offlineContainer: {
    backgroundColor: '#b52424',
    height: 30,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    width,
    position: 'absolute',
    top: 30
  },
  offlineText: { color: '#fff' }
});
