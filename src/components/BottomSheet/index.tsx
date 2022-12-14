import {
  View,
  Text,
  Dimensions,
  StyleSheet,
  Keyboard,
  Pressable,
} from 'react-native';
import React, {
  useCallback,
  useContext,
  useEffect,
  useImperativeHandle,
  useState,
} from 'react';
import {
  Gesture,
  GestureDetector,
  GestureHandlerRootView,
  ScrollView,
} from 'react-native-gesture-handler';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from 'react-native-reanimated';
import useAppContext from '~/hooks/useAppContext';
import {dracula, snazzyLight} from '../../constants/color';
type BottomSheetProps = {
  maxHeight?: number;
  children?: React.ReactNode;
};
export type BottomSheetPropsRef = {
  scrollTo: (destination: number) => void;
  isActive: () => boolean;
};
export const {height: SCREEN_HEIGHT, width: SCREEN_WIDTH} =
  Dimensions.get('window');
const DEFINE_MAX_TRANSLATE_Y = -SCREEN_HEIGHT + 100;
const BottomSheet = React.forwardRef<BottomSheetPropsRef, BottomSheetProps>(
  ({children, maxHeight}, ref) => {
    const MAX_TRANSLATE_Y = maxHeight || DEFINE_MAX_TRANSLATE_Y;
    const translateY = useSharedValue(0);
    const context = useSharedValue({y: 0});
    const active = useSharedValue(false);
    const isKeyBoardVisible = useSharedValue(false);
    const {state, dispatch} = useAppContext();
    const scrollTo = useCallback((destination: number) => {
      'worklet';
      active.value = destination !== 0;
      if (destination === 0) {
        // console.log('Man an cut');
        // dispatch(setEmptyTask());
      }
      translateY.value = withSpring(destination, {damping: 50});
    }, []);
    const isActive = useCallback(() => {
      return active.value;
    }, []);
    useImperativeHandle(ref, () => ({scrollTo, isActive}), [
      scrollTo,
      isActive,
    ]);
    const rBottomSheetStyle = useAnimatedStyle(() => {
      return {
        transform: [{translateY: translateY.value}],
      };
    });
    const gesture = Gesture.Pan()
      .onStart(() => {
        context.value = {y: translateY.value};
      })
      .onUpdate(event => {
        translateY.value = event.translationY + context.value.y;
        if (!isKeyBoardVisible.value) {
          translateY.value = Math.max(MAX_TRANSLATE_Y, translateY.value);
        }
      })
      .onEnd(event => {
        const value = translateY.value;
        if (!isKeyBoardVisible.value) {
          if (value > -SCREEN_HEIGHT / 1.5) {
            scrollTo(0);
          } else if (value < -SCREEN_HEIGHT / 1.2) {
            scrollTo(MAX_TRANSLATE_Y);
          }
        } else {
          if (value < -SCREEN_HEIGHT - 300) {
            scrollTo(MAX_TRANSLATE_Y);
          }
        }
      });
    useEffect(() => {
      scrollTo(0);
    }, []);

    useEffect(() => {
      const keyboardDidShowListener = Keyboard.addListener(
        'keyboardDidShow',
        () => {
          isKeyBoardVisible.value = true;
        },
      );
      const keyboardDidHideListener = Keyboard.addListener(
        'keyboardDidHide',
        () => {
          isKeyBoardVisible.value = false;
          // scrollTo(MAX_TRANSLATE_Y);
        },
      );

      return () => {
        keyboardDidHideListener.remove();
        keyboardDidShowListener.remove();
      };
    }, []);
    const {
      systemSetting: {colorScheme},
    } = state;
    return (
      <GestureDetector gesture={gesture}>
        <Animated.View
          style={[
            style.bottomShetContainer,
            rBottomSheetStyle,
            {
              backgroundColor:
                colorScheme === 'dark'
                  ? dracula.background
                  : snazzyLight.background,
              shadowColor: colorScheme === 'dark' ? '#fff' : '#000',
            },
          ]}
          children={
            <View
              style={{
                paddingHorizontal: 10,
              }}>
              <Pressable
                onPress={() => scrollTo(0)}
                style={{
                  width: 100,
                  height: 5,
                  backgroundColor: '#ccc',
                  borderRadius: 10,
                  alignSelf: 'center',
                  marginTop: 10,
                }}></Pressable>
              {children}
            </View>
          }
        />
      </GestureDetector>
    );
  },
);

export default BottomSheet;

const style = StyleSheet.create({
  bottomShetContainer: {
    height: SCREEN_HEIGHT,
    width: '100%',
    position: 'absolute',
    alignSelf: 'center',
    top: SCREEN_HEIGHT,
    borderRadius: 25,
    zIndex: 1000,
    shadowOffset: {
      width: 0,
      height: 12,
    },
    shadowOpacity: 0.58,
    shadowRadius: 16.0,

    elevation: 24,
  },
});
