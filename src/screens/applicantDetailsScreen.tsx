import React, { FC, memo } from 'react';
import {View, StyleSheet, Text, Pressable} from 'react-native';
import { StackNavigationProp} from "@react-navigation/stack";
import {ApplicationStackParamList, AppScreens} from "../navigators/stackFlowNavigator";

interface IProps {
    navigation: StackNavigationProp<ApplicationStackParamList, AppScreens.Details>
}

export const ApplicantDetails: FC<IProps> = memo(({navigation}) => {
    return (
        <View style={styles.container}>
            <Text>Third Screen</Text>
            <Pressable onPress={() => navigation.popToTop()}>
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
