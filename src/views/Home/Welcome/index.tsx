import {
  View,
  Text,
  StyleSheet,
  Button,
  TextInput,
  Alert,
  Modal,
  Pressable,
  Image,
} from 'react-native';
import React from 'react';
import {StackNavigationProp} from '@react-navigation/stack';
import {IUser, NavigationParamsList} from '~/interfaces';
import Notify from '~/components/Notify';
import {CommonStyles} from '../../../styles/index';
import {useEffect} from 'react';
import Database from '~/utils/database';
import useAppContext from '~/hooks/useAppContext';
import {setUser} from '~/context/actions';
import {useTranslation} from 'react-i18next';
import {initialLevelNotify} from '../../../context/index';
type Props = {
  navigation: StackNavigationProp<NavigationParamsList, 'Home'>;
};

export default function Welcome() {
  const [name, setName] = React.useState('');
  const {state, dispatch} = useAppContext();
  const [modalVisible, setModalVisible] = React.useState(false);
  const {t} = useTranslation();
  const handleSubmit = async () => {
    console.log(123123123);
    console.log(name);
    if (name.length > 0) {
      const user: IUser = {
        name: name,
        level: initialLevelNotify,
      };
      await Database._storeData('user', JSON.stringify(user));
      dispatch(setUser(user));
    } else {
      setModalVisible(true);
    }
  };
  return (
    <View style={[style.container]}>
      <Image
        style={{
          marginBottom: 50,
        }}
        source={require('../../../assets/images/test1.png')}
      />
      <Text style={style.title}>{t('WelcomeTo')} Todo</Text>
      <Text style={style.subTitle}>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Amet.
      </Text>
      <TextInput
        style={CommonStyles.input}
        value={name}
        onChangeText={text => setName(text)}
        onKeyPress={async e => {
          if (e.nativeEvent.key === 'Enter') {
            handleSubmit();
          }
        }}
        placeholder={t('EnterYourName')}
      />
      <Pressable style={style.button} onPress={handleSubmit}>
        <Text
          style={{
            fontSize: 30,
            color: 'white',
          }}>
          {t('GetStarted')}
        </Text>
      </Pressable>
      <Notify
        title="Please enter your name"
        visible={modalVisible}
        onHide={() => {
          setModalVisible(!modalVisible);
        }}
      />
    </View>
  );
}
const style = StyleSheet.create({
  centerView: {
    flex: 1,
    // justifyContent: 'center',
    // alignItems: 'center',
    marginTop: 22,
  },
  title: {
    fontSize: 18,
    fontWeight: '700',
    margin: 5,
    marginTop: 50,
  },
  subTitle: {
    fontSize: 13,
    fontWeight: '500',
    margin: 5,
    width: '50%',
    textAlign: 'center',
  },
  container: {
    flex: 1,
    paddingTop: 100,
    alignItems: 'center',
    backgroundColor: '#fff',
    gap: 10,
  },
  button: {
    backgroundColor: '#FAA885',
    padding: 10,
    paddingVertical: 20,
    borderRadius: 10,
    width: '70%',
    alignItems: 'center',
    marginTop: 100,
  },
});
