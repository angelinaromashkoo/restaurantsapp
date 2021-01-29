import React, { FC, memo } from 'react';
import { View, StyleSheet, Text, Pressable } from 'react-native';
import { StackNavigationProp} from "@react-navigation/stack";
import {ApplicationStackParamList, AppScreens} from "../navigators/stackFlowNavigator";

interface IProps {
    navigation: StackNavigationProp<ApplicationStackParamList, AppScreens.Restaurants>
}

export const RestaurantsList: FC<IProps> = memo(({navigation}) => {
    return (
        <View style={styles.container}>
            <Text>First Screen</Text>
            <Pressable onPress={() => navigation.navigate(AppScreens.Applicants)}>
                <Text>Next</Text>
            </Pressable>
        </View>
    );
});

const styles = StyleSheet.create(({
    container: {
        flex: 1,
        backgroundColor:  'white'
    },
}));
