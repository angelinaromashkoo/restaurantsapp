import React, {FC, memo} from 'react';
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

  const renderItem = ({item, index}: {item: IFormResponse; index: number}) => {
    return (
      <TouchableOpacity
        style={styles.listItem}
        onPress={() =>
          navigation.navigate(AppScreens.Details, {
            definitions: item.definition,
            answers: item.answers,
          })
        }>
        <View style={styles.viewStyle}>
          <Text style={styles.fontStyle}>
            {applicantsCount[index]} applicant
          </Text>
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
