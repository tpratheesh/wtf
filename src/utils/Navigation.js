import React from 'react';
import { Dimensions, Image, StyleSheet, View, Text } from 'react-native';
import { DrawerItems } from 'react-navigation';
import * as Colors from '../themes/colors';

const styles = StyleSheet.create({
  buttonText: {
    color: Colors.primaryFont
  }
})

export const getNavigationOptions = (title, backgroundColor, color) => ({
  title,
  headerTitle: title,
  headerTransparent: true,
  headerStyle: {
    backgroundColor,
  },
  headerTitleStyle: {
    color,
  },
  headerTintColor: color,
  headerLeft: null,
  headerRight: null
});

export const getNavigationOptionsWithAction = (title, backgroundColor, color, headerLeft, headerRight) => ({
  title,
  headerStyle: {
    backgroundColor,
  },
  headerTitleStyle: {
    color,
  },
  headerTintColor: color,
  headerLeft,
  headerRight
});

export const getDrawerNavigationOptions = (title, backgroundColor, titleColor, drawerIcon) => ({
  title,
  headerTitle: title,
  headerStyle: {
    backgroundColor,
  },
  headerTitleStyle: {
    color: titleColor,
  },
  headerTintColor: titleColor,
  drawerLabel: title,
  drawerIcon,
});

const CustomDrawerContentComponent = (props) => (
  <View>
    <View
      style={{
        backgroundColor: Colors.primary,
        height: 140,
        alignItems: 'center',
        justifyContent: 'center'
      }}
    >
      <Text style={{ color: Colors.secondary, fontSize: 30 }}>
        <Image
          source={{
            uri:
              "https://raw.githubusercontent.com/GeekyAnts/NativeBase-KitchenSink/master/assets/drawer-cover.png"
          }}
          style={{
            height: 120,
            width: 120,
            borderRadius: 60,
          }}
        />
      </Text>
    </View>
    <DrawerItems {...props}
    />
  </View>
);

export const getDrawerConfig = (drawerPosition, initialRouteName) => ({
  drawerWidth: Dimensions.get('window').width * .7,
  drawerPosition,
  initialRouteName,
  drawerOpenRoute: 'DrawerOpen',
  drawerCloseRoute: 'DrawerClose',
  drawerToggleRoute: 'DrawerToggle',
  drawerBackgroundColor: Colors.primaryFont,
  contentComponent: CustomDrawerContentComponent,
  contentOptions: {
    activeTintColor: Colors.secondary,
    activeBackgroundColor: 'transparent',
    inactiveTintColor: Colors.primary,
    itemsContainerStyle: {
      marginVertical: 0,
    },
    iconContainerStyle: {
      opacity: 1,
    },
    itemStyle: {
      height: 50,
    }
  },
});