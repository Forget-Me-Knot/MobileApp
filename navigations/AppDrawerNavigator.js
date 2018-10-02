import React from "react";
import { Image } from "react-native";
import { createDrawerNavigator, DrawerItems } from "react-navigation";
import { Container, Header, Content, Body } from "native-base";
import AppStackNavigator from "./AppStackNavigator";
import Login from "../screens/Login";
import Notes from "../screens/Notes";
import Todo from "../screens/ToDo";
import Menu from "../screens/MenuItems";

const CustomDrawer = props => (
  <Container>
    <Header style={{ height: 80 }}>
      <Body>
        <Image
          style={{ height: 30, width: 30 }}
          source={require("../assets/reminder.png")}
        />
      </Body>
    </Header>
    <Content>
      <DrawerItems {...props} />
    </Content>
  </Container>
);

const AppDrawerNavigator = createDrawerNavigator(
  {
    Home: AppStackNavigator,
    Login: Login,
    Notes: Notes,
    Todo: Todo,
    Projects: Menu
  },
  {
    initialRouteName: "Home",
    drawerPosition: "left",
    contentComponent: CustomDrawer
  }
);

export default AppDrawerNavigator;
