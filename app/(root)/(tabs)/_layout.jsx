import { StyleSheet, Text, View, Platform,Image  } from 'react-native'
import {Tabs, Redirect} from 'expo-router';


import { icons } from '../../../constants';


const Tabicon = ({icons, color, name, focused}) => {
    return (
        <View style={{ alignItems: 'center', justifyContent: 'center' }}>
            <Image 
                source={icons}
                resizeMode="contain"  
                tintColor={color} 
                style={{ width: 20, height: 25,marginBottom: 5}}
                
            />
            <Text className={`${focused ? 'font-poppins-semibold':'font-poppins'} text-xxs`}style={{ width: '100%', textAlign: 'center' }}>{name}</Text>
        </View>
    )
}

const BottomNav = () => {
  return (
    <>
        <Tabs
             screenOptions={{
                headerShown: false,
                tabBarShowLabel: false, // This will hide the labels for all tabs
                tabBarStyle: {
                    height: 60, // Adjust height as needed
                    backgroundColor: '#fff', // Optional: change background color
                    paddingTop: 20,
                  },
            }}
        >
            
            <Tabs.Screen
            name="home"
            options={{
                title:'HOME',
                tabBarIcon: ({color, focused}) =>(
                    <Tabicon
                    icons={icons.home}
                    color={color}
                    name="Home"
                    focused={focused}
                    />
                )

            }}
            />     

            <Tabs.Screen
            name="report"
            options={{
                title:'REPORT',
                tabBarIcon: ({color, focused}) =>(
                    <Tabicon
                    icons={icons.report}
                    color={color}
                    name="Report"
                    focused={focused}
                    />
                )

            }}
            />  

            <Tabs.Screen
            name="activity"
            options={{
                title:'ACTIVITY',
                tabBarIcon: ({color, focused}) =>(
                    <Tabicon
                    icons={icons.activities}
                    color={color}
                    name="Activity"
                    focused={focused}
                    />
                )

            }}
            />  

            <Tabs.Screen
            name="profile"
            options={{
                title:'PROFILE',
                tabBarIcon: ({color, focused}) =>(
                    <Tabicon
                    icons={icons.profile}
                    color={color}
                    name="Profile"
                    focused={focused}
                    />
                )

            }}
            />   
        </Tabs>

    </>
  )
}

export default BottomNav
