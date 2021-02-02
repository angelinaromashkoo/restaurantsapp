import React, { FC, memo } from 'react';
import {View, StyleSheet, Text, TouchableOpacity, FlatList} from 'react-native';
import { StackNavigationProp} from "@react-navigation/stack";
import {ApplicationStackParamList, AppScreens} from "../navigators/stackFlowNavigator";
import {IFormResponse} from "../interfaces/interfaces";

type ApplicantsListScreenNavigationProps = StackNavigationProp<ApplicationStackParamList, AppScreens.Applicants>;

export type ApplicantsParams = {
    applicants: IFormResponse[];
}

interface IProps {
    route: {params: ApplicantsParams},
    navigation: ApplicantsListScreenNavigationProps
}

export const ApplicantsList: FC<IProps> = memo((props) => {
    const { navigation, route } = props;
    const { params } = route;
    const { applicants } = params;

    const applicantsCount = ['First', 'Second', 'Third', 'Fourth', 'Fifth'];

    const renderItem = ({item, index}: {item: IFormResponse, index: number}) => {

        return <TouchableOpacity onPress={() => navigation.navigate(AppScreens.Details, {
            definitions: item.definition, answers: item.answers
        })}>
            <View>
                <Text>{applicantsCount[index]} applicant</Text>
            </View>
        </TouchableOpacity>
    }

    return (
        <View style={styles.container}>
            <Text>Second Screen</Text>
            <View style={{flex: 1}}>
                <FlatList
                    data={applicants}
                    renderItem={renderItem}
                    keyExtractor={(item, index) => index.toString()}
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
