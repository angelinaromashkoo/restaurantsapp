import React, {FC, memo, useEffect, useState} from 'react';
import {
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  FlatList,
  SafeAreaView,
} from 'react-native';
import {StackNavigationProp} from '@react-navigation/stack';
import {
  ApplicationStackParamList,
  AppScreens,
} from '../navigators/stackFlowNavigator';
import {IFormResponse} from '../interfaces/interfaces';
import AsyncStorage from '@react-native-async-storage/async-storage';

type ApplicantsListScreenNavigationProps = StackNavigationProp<
  ApplicationStackParamList,
  AppScreens.Applicants
>;

export type ApplicantsParams = {
  applicants: IFormResponse[];
};

interface IProps {
  route: {params: ApplicantsParams};
  navigation: ApplicantsListScreenNavigationProps;
}

export const ApplicantsList: FC<IProps> = memo((props) => {
  const {navigation, route} = props;
  const {params} = route;
  const {applicants} = params;
  const applicantsCount = ['First', 'Second', 'Third', 'Fourth', 'Fifth'];
  const [viewedItemTokens, setViewedItemTokens] = useState(['']);

  useEffect(() => {
    getData();
  }, [viewedItemTokens]);

  const storeData = async (key: string, value: string) => {
    try {
      await AsyncStorage.setItem(key, value);
    } catch (e) {
      console.log('Error while storing token');
    }
  };

  const getData = async () => {
    try {
      const arrayOfValues = await AsyncStorage.getAllKeys();
      if (arrayOfValues !== null) {
        setViewedItemTokens(arrayOfValues);
      }
    } catch (e) {
      console.log('Error while reading token');
    }
  };

  const onPress = (item: IFormResponse): void => {
    navigation.navigate(AppScreens.Details, {
      definitions: item.definition,
      answers: item.answers,
    });

    if (viewedItemTokens.indexOf(item.token) > -1) {
      console.log('already in storage!');
    } else {
      storeData(item.token, item.token).then(() => console.log('token saved'));
    }
  };

  const renderItem = ({item, index}: {item: IFormResponse; index: number}) => {
    let viewedText;
    if (viewedItemTokens.indexOf(item.token) > -1) {
      viewedText = 'viewed';
    } else {
      viewedText = 'not viewed';
    }

    return (
      <TouchableOpacity style={styles.listItem} onPress={() => onPress(item)}>
        <View style={styles.viewStyle}>
          <Text style={styles.fontStyle}>
            {applicantsCount[index]} applicant
          </Text>
          <Text>{viewedText}</Text>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <TouchableOpacity
        onPress={() => navigation.goBack()}
        style={styles.goBackStyle}>
        <View style={styles.viewStyle}>
          <Text style={styles.fontStyle}>Go back</Text>
        </View>
      </TouchableOpacity>
      <FlatList
        data={applicants}
        renderItem={renderItem}
        keyExtractor={(item, index) => index.toString()}
      />
    </SafeAreaView>
  );
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  viewStyle: {
    alignItems: 'center',
    flex: 1,
  },
  listItem: {
    margin: 25,
    padding: 25,
    backgroundColor: '#dedede',
    width: '80%',
    flex: 1,
    alignSelf: 'center',
    flexDirection: 'row',
    borderRadius: 5,
  },
  goBackStyle: {
    margin: 15,
    padding: 15,
    paddingHorizontal: 75,
    backgroundColor: '#dedede',
    width: '50%',
    alignSelf: 'center',
    flexDirection: 'row',
    borderRadius: 5,
  },
  fontStyle: {
    fontWeight: 'bold',
  },
});
