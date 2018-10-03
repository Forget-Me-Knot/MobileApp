import { createSwitchNavigator } from "react-navigation";
import AppDrawerNavigator from "./navigations/AppDrawerNavigator";
import Login from './screens/Login'
import Signup from './screens/SignUp'

export default createSwitchNavigator({
	Login: Login,
	Signup: Signup,
  App: AppDrawerNavigator
}, {
	initialRouteName: 'Login'
});
