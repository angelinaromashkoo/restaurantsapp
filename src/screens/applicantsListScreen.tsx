import React, { FC, memo } from 'react';
import {View, StyleSheet, Text, Button, Pressable} from 'react-native';
import { StackNavigationProp} from "@react-navigation/stack";
import {ApplicationStackParamList, AppScreens} from "../navigators/stackFlowNavigator";

interface IProps {
    navigation: StackNavigationProp<ApplicationStackParamList, AppScreens.Applicants>
}

export const ApplicantsList: FC<IProps> = memo(({navigation}) => {
    return (
        <View style={styles.container}>
            <Text>Second Screen</Text>
            <Pressable onPress={() => navigation.navigate(AppScreens.Details)}>
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
