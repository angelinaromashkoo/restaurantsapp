import React, { FC, memo } from 'react';
import {View, StyleSheet, Text, TouchableOpacity, FlatList} from 'react-native';
import { StackNavigationProp} from "@react-navigation/stack";
import {ApplicationStackParamList, AppScreens} from "../navigators/stackFlowNavigator";

type ApplicantsListScreenNavigationProps = StackNavigationProp<ApplicationStackParamList, AppScreens.Applicants>;

export type ApplicantsParams = {
    applicants: any[];
}

interface IProps {
    route: {params: ApplicantsParams},
    navigation: ApplicantsListScreenNavigationProps
}

export const ApplicantsList: FC<IProps> = memo((props) => {
    const { navigation, route } = props;
    const { params } = route;
    const { applicants } = params;

    const renderItem = (item: any) => {
        return <TouchableOpacity>
            <View>
                <Text>{item.index + 1} Applicant</Text>
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
