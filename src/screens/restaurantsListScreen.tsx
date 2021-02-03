import React, {FC, memo} from 'react';
import {
  View,
  StyleSheet,
  Text,
  FlatList,
  TouchableOpacity,
  SafeAreaView,
} from 'react-native';
import {StackNavigationProp} from '@react-navigation/stack';
import {
  ApplicationStackParamList,
  AppScreens,
} from '../navigators/stackFlowNavigator';
import {Restaurants} from '../data/restaurantsModel';
import {IResultData} from '../interfaces/interfaces';

interface IProps {
  navigation: StackNavigationProp<
    ApplicationStackParamList,
    AppScreens.Restaurants
  >;
}

export const RestaurantsList: FC<IProps> = memo(({navigation}) => {
  const data = new Restaurants();

  const renderItem = ({item}: {item: IResultData}) => {
    return (
      <TouchableOpacity
        style={styles.listItem}
        onPress={() =>
          navigation.navigate(AppScreens.Applicants, {
            applicants: item.applicants,
          })
        }>
        <View style={styles.listItemViewStyle}>
          <Text style={styles.fontStyle}>{item.label}</Text>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        contentContainerStyle={styles.contentContainerStyle}
        data={data.convertData}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
      />
    </SafeAreaView>
  );
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  contentContainerStyle: {
    flexGrow: 1,
    justifyContent: 'center',
  },
  listItemViewStyle: {
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
  fontStyle: {
    fontWeight: 'bold',
  },
});
