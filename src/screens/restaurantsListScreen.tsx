import React, { FC, memo } from 'react';
import { View, StyleSheet, Text, FlatList, TouchableOpacity } from 'react-native';
import { StackNavigationProp} from "@react-navigation/stack";
import {ApplicationStackParamList, AppScreens} from "../navigators/stackFlowNavigator";
import {Restaurants} from "../data/restaurantsModel";
import {IResultData} from "../interfaces/interfaces";

interface IProps {
    navigation: StackNavigationProp<ApplicationStackParamList, AppScreens.Restaurants>
}

export const RestaurantsList: FC<IProps> = memo(({navigation}) => {
    const data = new Restaurants();

    const renderItem = ({item}: {item: IResultData}) => {
        return <TouchableOpacity onPress={() => navigation.navigate(AppScreens.Applicants, {applicants: item.applicants})}>
            <View>
                <Text>{item.label}</Text>
            </View>
        </TouchableOpacity>
    }


    return (
        <View style={styles.container}>
            <Text>First Screen</Text>
            <View style={{flex: 1}}>
            <FlatList
                data={data.convertData}
                renderItem={renderItem}
                keyExtractor={(item) => item.id}
            />
            </View>
        </View>
    );
});

const styles = StyleSheet.create(({
    container: {
        flex: 1,
        backgroundColor:  'white'
    },
}));
