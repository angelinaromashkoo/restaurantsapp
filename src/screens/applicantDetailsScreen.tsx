import React, { FC, memo } from 'react';
import {View, StyleSheet, Text, Pressable, FlatList} from 'react-native';
import { StackNavigationProp} from "@react-navigation/stack";
import {ApplicationStackParamList, AppScreens} from "../navigators/stackFlowNavigator";
import {IAnswer, IDefinition} from "../interfaces/interfaces";

type ApplicantDetailsScreenNavigationProps = StackNavigationProp<ApplicationStackParamList, AppScreens.Details>;

export type DetailsParams = {
    definitions: IDefinition;
    answers: IAnswer[];
}

interface IProps {
    route: {params: DetailsParams},
    navigation: ApplicantDetailsScreenNavigationProps
}

export const ApplicantDetails: FC<IProps> = memo((props) => {
    const { navigation, route } = props;
    const { params } = route;
    const { definitions, answers } = params;

    const answersByKey = Object.assign(
        {},
        ...answers.map((item) => {
            return { [item.field.id]: item };
        })
    );
    console.log(answersByKey)

    const renderItem = ({item}) => {
        debugger;
        return (
            <View style={styles.itemContainerStyle}>
                <Text style={styles.fontSize16}>{item.title}</Text>
                <Text style={styles.fontSize16}>{answersByKey[item.id].text}</Text>
            </View>
        );
    };

    console.log(definitions.fields)

    return (
        <View style={styles.container}>
            <Text>Third Screen</Text>
            <Pressable onPress={() => navigation.popToTop()}>
                <Text>Next</Text>
            </Pressable>
            <View>
                <FlatList data={definitions.fields} renderItem={renderItem} />
            </View>
        </View>
    );
});

const styles = StyleSheet.create(({
    container: {
        flex: 1,
        backgroundColor:  'white'
    },
    itemContainerStyle: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'space-between',
        padding: 16,
        borderBottomWidth: 1,
        borderBottomColor: '#ccc',
        backgroundColor: '#ffffff',
    },
    fontSize16: {
        fontSize: 16,
    },
}));
