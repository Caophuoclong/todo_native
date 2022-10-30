import {
  View,
  Text,
  StyleSheet,
  Pressable,
  Switch,
  TextInput,
  ScrollView,
  TouchableOpacity,
  Keyboard,
} from 'react-native';
import React, {useContext, useEffect, useState} from 'react';
import BottomSheet from '~/components/BottomSheet';
import {BottomSheetPropsRef} from '../../../../components/BottomSheet/index';
import DatePicker from 'react-native-date-picker';
import AntIcon from 'react-native-vector-icons/AntDesign';
import moment from 'moment';
import {Task, TaskType} from '~/interfaces';
import useAppContext from '~/hooks/useAppContext';
import {addTask, setTask} from '~/context';
import {setEmptyTask} from '../../../../context/index';
import Database from '~/utils/database';

interface Props {}
const CreateTask = React.forwardRef<BottomSheetPropsRef, Props>(({}, ref) => {
  const {state, dispatch} = useAppContext();
  const [openTimePickerStart, setOpenTimePickerStart] =
    useState<boolean>(false);
  const [openDatePickerStart, setOpenDatePickerStart] =
    useState<boolean>(false);
  const [openTimePickerEnd, setOpenTimePickerEnd] = useState<boolean>(false);
  const [openDatePickerEnd, setOpenDatePickerEnd] = useState<boolean>(false);
  // const [isDelete]

  const taskType: Array<TaskType> = [
    {
      title: 'important',
      name: 'Important',
    },
    {
      title: 'normal',
      name: 'Normal',
    },
    {
      title: 'unimportant',
      name: 'Unimportant',
    },
  ];
  const selected = state.task.type;
  const [isEnable, setIsEnable] = useState(state.task.isAlert);
  const [inputDesHeight, setInputDesHeight] = useState(0);
  const [timePress, setTimePress] = useState(0);
  useEffect(() => {
    const dateStart = state.task.start.date;
    const dateEnd = state.task.end.date;
    if (dateStart && !dateEnd) {
      dispatch(
        setTask({
          end: {
            ...state.task.end,
            date: dateStart,
          },
        }),
      );
    }
  }, [state.task.start.date]);
  useEffect(() => {
    const dateStart = state.task.start.date;
    const timeStart = state.task.start.time;
    const timeEnd = state.task.end.time;
    const date = dateStart.split('/').join('-');
    const dateTime = new Date(`${date} ${timeStart}`);

    if (timeStart && !timeEnd) {
      const nextHour = new Date(dateTime.getTime() + 60 * 60 * 1000);
      dispatch(
        setTask({
          end: {
            ...state.task.end,
            time: nextHour.toLocaleTimeString('vi-VN', {
              hour12: false,
              hour: '2-digit',
              minute: '2-digit',
            }),
          },
        }),
      );
    }
  }, [state.task.start.time]);
  const toggleSwitch = () =>
    dispatch(
      setTask({
        isAlert: !state.task.isAlert,
      }),
    );
  const handleSubmit = async () => {
    const _id = new Date().getTime().toString();
    dispatch(
      setTask({
        _id: _id,
      }),
    );
    dispatch(addTask());
    dispatch(setEmptyTask());
    // Hide keyboard
    Keyboard.dismiss();
  };
  useEffect(() => {
    (async () => {
      await Database._storeData('tasks', JSON.stringify(state.tasks));
    })();
  }, [state.tasks]);
  // console.log(timePress);
  return (
    <BottomSheet ref={ref}>
      <Text
        style={{
          textAlign: 'center',
          fontSize: 30,
          marginVertical: 10,
          fontWeight: 'bold',
        }}>
        Create Task
      </Text>

      <View style={style.box}>
        <Text style={style.title}>Task Title</Text>
        <TextInput
          style={style.inpTaskTitle}
          placeholder="Task title"
          placeholderTextColor={'#E1E0E5'}
          value={state.task.title}
          onChangeText={text => {
            dispatch(setTask({title: text}));
          }}
        />
      </View>
      <View style={style.box}>
        <Text style={style.title}>Task Type</Text>
        <ScrollView horizontal={true} showsVerticalScrollIndicator={false}>
          {taskType.map((item, index) => (
            <TouchableOpacity
              key={index}
              style={[
                style.taskType,
                selected.title === item.title &&
                  ((selected.title === 'important' && {
                    backgroundColor: 'red',
                  }) ||
                    (selected.title === 'normal' && {
                      backgroundColor: 'orange',
                    }) ||
                    (selected.title === 'unimportant' && {
                      backgroundColor: 'blue',
                    })),
              ]}
              onPress={() => {
                dispatch(setTask({type: item}));
              }}>
              <Text
                style={[
                  style.text,
                  selected.title === item.title && {color: '#fff'},
                ]}>
                {item.name}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>
      <View style={style.box}>
        <Text style={style.title}>Choose date & time start</Text>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'center',
          }}>
          <Pressable
            style={{
              marginHorizontal: 10,
            }}
            onPress={() => setOpenDatePickerStart(true)}>
            {state.task.start.date.length > 0 ? (
              <View style={style.btnIcon}>
                <AntIcon name="calendar" size={24} />
                <Text style={[style.text, {marginLeft: 10}]}>
                  {state.task.start.date}
                </Text>
              </View>
            ) : (
              <View style={style.btnIcon}>
                <AntIcon name="calendar" size={24} />
                <Text style={[style.text, {marginLeft: 10}]}>Select Date</Text>
              </View>
            )}
          </Pressable>
          <Pressable
            style={{
              marginHorizontal: 10,
            }}
            onPress={() => setOpenTimePickerStart(true)}>
            {state.task.start.time.length > 0 ? (
              <View style={style.btnIcon}>
                <AntIcon name="clockcircleo" size={24} />

                <Text style={[style.text, {marginLeft: 10}]}>
                  {state.task.start.time}
                </Text>
              </View>
            ) : (
              <View style={style.btnIcon}>
                <AntIcon name="clockcircleo" size={24} />
                <Text style={[style.text, {marginLeft: 10}]}>Select time</Text>
              </View>
            )}
          </Pressable>
        </View>
      </View>
      <View style={style.box}>
        <Text style={style.title}>Choose date & time end</Text>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'center',
          }}>
          <Pressable
            style={{
              marginHorizontal: 10,
            }}
            onPress={() => setOpenDatePickerEnd(true)}>
            {state.task.end.date.length > 0 ? (
              <View style={style.btnIcon}>
                <AntIcon name="calendar" size={24} />

                <Text style={[style.text, {marginLeft: 10}]}>
                  {state.task.end.date}
                </Text>
              </View>
            ) : (
              <View style={style.btnIcon}>
                <AntIcon name="calendar" size={24} />
                <Text style={[style.text, {marginLeft: 10}]}>Select time</Text>
              </View>
            )}
          </Pressable>
          <Pressable
            style={{
              marginHorizontal: 10,
            }}
            onPress={() => setOpenTimePickerEnd(true)}>
            {state.task.end.time.length > 0 ? (
              <View style={style.btnIcon}>
                <AntIcon name="clockcircleo" size={24} />

                <Text style={[style.text, {marginLeft: 10}]}>
                  {state.task.end.time}
                </Text>
              </View>
            ) : (
              <View style={style.btnIcon}>
                <AntIcon name="clockcircleo" size={24} />
                <Text style={[style.text, {marginLeft: 10}]}>Select time</Text>
              </View>
            )}
          </Pressable>
        </View>
      </View>
      <View>
        <Text style={style.title}>Description (optional)</Text>
        <TextInput
          value={state.task.description}
          onContentSizeChange={e => {
            setInputDesHeight(e.nativeEvent.contentSize.height);
          }}
          onChangeText={text => {
            text.length >= 1
              ? dispatch(
                  setTask({
                    description: text,
                  }),
                )
              : dispatch(
                  setTask({
                    description: '',
                  }),
                );
          }}
          style={[
            style.inpTaskTitle,
            {
              fontSize: 16,
              textAlignVertical: 'top',
            },
            {
              height: Math.max(40, Math.min(100, inputDesHeight)),
            },
          ]}
          placeholder="Enter description"
          multiline={true}
          scrollEnabled={true}
          returnKeyType="done"
          blurOnSubmit={true}
        />
      </View>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}>
        <Text
          style={{
            fontSize: 16,
            fontWeight: 'bold',
            color: 'black',
          }}>
          Get alert for this task
        </Text>
        <Switch
          trackColor={{false: '#767577', true: '#81b0ff'}}
          thumbColor={isEnable ? '#5A3DA4' : '#f4f3f4'}
          ios_backgroundColor="#3e3e3e"
          onValueChange={toggleSwitch}
          value={state.task.isAlert}
        />
      </View>

      <Pressable
        disabled={
          !state.task.title.length ||
          !state.task.start.date.length ||
          !state.task.start.time.length ||
          !state.task.end.date.length ||
          !state.task.end.time.length
        }
        style={style.btnSubmit}
        onPress={handleSubmit}>
        <Text
          style={{
            color: '#fff',
            fontSize: 20,
            fontWeight: 'bold',
            textAlign: 'center',
          }}>
          Done
        </Text>
      </Pressable>
      <DatePicker
        mode="date"
        modal
        open={openDatePickerStart}
        date={new Date()}
        onConfirm={date => {
          setOpenDatePickerStart(false);
          const date1 = date.toLocaleDateString();
          dispatch(
            setTask({
              start: {
                ...state.task.start,
                date: date1,
              },
            }),
          );
        }}
        onCancel={() => {
          setOpenDatePickerStart(false);
        }}
      />
      <DatePicker
        mode="time"
        modal
        open={openTimePickerStart}
        date={new Date()}
        onConfirm={date => {
          setOpenTimePickerStart(false);
          const time = date.toLocaleTimeString('vi-VN', {
            hour12: false,
            hour: '2-digit',
            minute: '2-digit',
          });
          dispatch(
            setTask({
              start: {
                ...state.task.start,
                time: time,
              },
            }),
          );
        }}
        onCancel={() => {
          setOpenTimePickerStart(false);
        }}
      />
      <DatePicker
        mode="date"
        modal
        open={openDatePickerEnd}
        date={new Date()}
        onConfirm={date => {
          setOpenDatePickerEnd(false);
          const date1 = date.toLocaleDateString();
          dispatch(
            setTask({
              end: {
                ...state.task.end,
                date: date1,
              },
            }),
          );
        }}
        onCancel={() => {
          setOpenDatePickerEnd(false);
        }}
      />
      <DatePicker
        mode="time"
        modal
        open={openTimePickerEnd}
        date={new Date()}
        onConfirm={date => {
          setOpenTimePickerEnd(false);
          const time = date.toLocaleTimeString('vi-VN', {
            hour12: false,
            hour: '2-digit',
            minute: '2-digit',
          });
          dispatch(
            setTask({
              end: {
                ...state.task.end,
                time: time,
              },
            }),
          );
        }}
        onCancel={() => {
          setOpenTimePickerEnd(false);
        }}
      />
    </BottomSheet>
  );
});
const PRIMARY_COLOR = '#593DA6';
const SECONDARY_COLOR = '#FC94A0';
const style = StyleSheet.create({
  tasks: {
    flex: 3,
    backgroundColor: '#fff',
  },
  completed: {},
  btnFilter: {
    backgroundColor: '#F7F8FA',
    margin: 10,
    minWidth: 150,
    padding: 10,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  filterSelected: {
    backgroundColor: PRIMARY_COLOR,
  },
  btnSubmit: {
    backgroundColor: SECONDARY_COLOR,
    paddingVertical: 20,
    borderRadius: 10,
    marginTop: 30,
  },
  btnIcon: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#E1E0E5',
    padding: 10,
    paddingHorizontal: 20,
    borderRadius: 10,
    minWidth: 150,
  },
  text: {
    color: 'black',
    fontWeight: 'bold',
    fontSize: 16,
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    marginVertical: 5,
  },
  box: {
    backgroundColor: 'white',
    marginBottom: 10,
  },

  inpTaskTitle: {
    borderRadius: 10,
    backgroundColor: '#F6F8FA',
    padding: 10,
    color: 'gray',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.01,
    shadowRadius: 2.22,

    elevation: 2,
  },
  taskType: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    backgroundColor: '#F6F8FA',
    marginHorizontal: 10,
    borderRadius: 10,
  },
  selected: {
    backgroundColor: PRIMARY_COLOR,
  },
  dateTime: {},
});

export default CreateTask;
