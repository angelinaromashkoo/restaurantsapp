import React, { FC, memo } from 'react';
import { View, StyleSheet, Text, Pressable, FlatList, TouchableOpacity } from 'react-native';
import { StackNavigationProp} from "@react-navigation/stack";
import {ApplicationStackParamList, AppScreens} from "../navigators/stackFlowNavigator";
import {restaurantsData} from "../data/restaurantsModel";

interface IProps {
    navigation: StackNavigationProp<ApplicationStackParamList, AppScreens.Restaurants>
}

export const RestaurantsList: FC<IProps> = memo(({navigation}) => {
    const renderItem = ({item}: any) => {
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
                data={restaurantsData()}
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
