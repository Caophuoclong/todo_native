import {View, Text, TouchableOpacity} from 'react-native';
import React, {useContext, useRef} from 'react';
import {BottomTabBarProps} from '@react-navigation/bottom-tabs';
import AntIcon from 'react-native-vector-icons/AntDesign';
import BottomSheet, {BottomSheetPropsRef} from '../BottomSheet';
import {AppContext} from '../../context/index';
import useAppContext from '~/hooks/useAppContext';
import {dracula, snazzyLight} from '../../constants/color';
interface Props {
  setShowBottomSheet: () => void;
}
const MyTab: React.FC<BottomTabBarProps & Props> = ({
  state,
  descriptors,
  insets,
  navigation,
  setShowBottomSheet,
}) => {
  const [isFocused, setIsFocous] = React.useState(false);
  const index = state.index;
  const route = state.routes[index];
  const {state: contextState} = useAppContext();
  const {
    systemSetting: {colorScheme},
  } = contextState;
  const onLongPress = () => {
    navigation.emit({
      type: 'tabLongPress',
      target: route.key,
    });
  };
  const onPress = (name: 'Home' | 'Setting') => {
    const event = navigation.emit({
      type: 'tabPress',
      target: route.key,
      canPreventDefault: true,
    });
    // setFocusWhat(name);
    const isFocused = state.routeNames[index] === name;
    if (!isFocused && !event.defaultPrevented) {
      // The `merge: true` option makes sure that the params inside the tab screen are preserved
      navigation.navigate(name, {
        merge: true,
      });
    }
  };
  return (
    <View
      style={{
        // flex: 1,
        flexDirection: 'row',
        // height: 10,
        // borderWidth: 1,
        backgroundColor:
          colorScheme === 'dark' ? dracula.background : snazzyLight.background,
      }}>
      <View
        style={{
          flex: 1,
          flexDirection: 'row',
          padding: 10,
          justifyContent: 'space-around',
        }}>
        <TouchableOpacity
          accessibilityRole="button"
          onPress={() => {
            onPress('Home');
          }}
          onLongPress={onLongPress}
          style={{}}>
          <AntIcon
            name="home"
            size={32}
            color={colorScheme === 'dark' ? dracula.purple : snazzyLight.purple}
          />
        </TouchableOpacity>
        <TouchableOpacity
          style={{
            width: 40,
            height: 40,
            padding: 5,
            borderRadius: 10,
            backgroundColor:
              colorScheme === 'dark' ? snazzyLight.pink : dracula.pink,
            justifyContent: 'center',
            alignItems: 'center',
          }}
          onPress={setShowBottomSheet}>
          <AntIcon name="plus" size={24} color="white" />
        </TouchableOpacity>
        <TouchableOpacity
          accessibilityRole="button"
          onPress={() => {
            onPress('Setting');
          }}
          onLongPress={onLongPress}>
          <AntIcon
            name="setting"
            size={32}
            color={
              colorScheme === 'dark'
                ? dracula.foreground
                : snazzyLight.foreground
            }
          />
        </TouchableOpacity>
      </View>
    </View>
  );
};
export default MyTab;
