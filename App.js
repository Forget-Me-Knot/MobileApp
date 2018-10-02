import { createSwitchNavigator } from "react-navigation";
import AppDrawerNavigator from "./navigations/AppDrawerNavigator";

export default createSwitchNavigator({
  App: AppDrawerNavigator
});
