import React, {FC, memo} from 'react';
import {View, StyleSheet, Text, Pressable, FlatList} from 'react-native';
import {StackNavigationProp} from '@react-navigation/stack';
import {
    ApplicationStackParamList,
    AppScreens,
} from '../navigators/stackFlowNavigator';
import {
    IAnswer,
    IDefinition,
    IAnswerChoice,
    IAnswerChoices,
    IFields,
} from '../interfaces/interfaces';
import {ExternalLink} from "../common/externalLink";

type ApplicantDetailsScreenNavigationProps = StackNavigationProp<
    ApplicationStackParamList,
    AppScreens.Details
    >;
type ApplicantChoicesType = IAnswerChoice | IAnswerChoices;

export type DetailsParams = {
    definitions: IDefinition;
    answers: IAnswer[];
};

interface IProps {
    route: {params: DetailsParams};
    navigation: ApplicantDetailsScreenNavigationProps;
}

export const ApplicantDetails: FC<IProps> = memo((props) => {
    const {navigation, route} = props;
    const {params} = route;
    const {definitions, answers} = params;

    const answersByKey = Object.assign(
        {},
        ...answers.map((item) => {
            return {[item.field.id]: item};
        }),
    );

    const chooseProperLabel = (currentChoice: ApplicantChoicesType) => {
        let label;
        if ('labels' in currentChoice) {
            label = currentChoice.labels;
        } else {
            label = currentChoice.label;
        }
        return label;
    };

    const chooseProperField = (item: IFields): string | undefined => {
        switch (item.type) {
            case 'short_text':
            case 'long_text':
                return answersByKey[item.id].text;
            case 'date':
                return answersByKey[item.id].date;
            case 'phone_number':
                return answersByKey[item.id].phone_number;
            case 'email':
                return answersByKey[item.id].email;
        }
    };

    const renderChoices = (item: IFields) => {
        const currentChoice: ApplicantChoicesType = answersByKey[item.id].choices
            ? answersByKey[item.id].choices
            : answersByKey[item.id].choice;

        const currentLabel = chooseProperLabel(currentChoice);
        return (
            <View style={styles.itemContainerStyle}>
                <Text style={styles.fontSize16}>{item.title}</Text>
                <Text style={styles.fontSize16}>{currentLabel}</Text>
            </View>
        );
    };

    const renderMainInfo = (item: IFields) => {
        const answerField = chooseProperField(item);
        return (
            <View style={styles.itemContainerStyle}>
                <Text style={styles.fontSize16}>{item.title}</Text>
                <Text style={styles.fontSize16}>{answerField}</Text>
            </View>
        );
    };

    const renderFile = (item: IFields) => {
        return (
            <View style={styles.itemContainerStyle}>
                <Text style={styles.fontSize16}>{item.title}</Text>
                <ExternalLink
                    url={answersByKey[item.id].file_url}
                    text={answersByKey[item.id].file_url}
                />
            </View>
        );
    };

    const renderItem = ({item}: {item: IFields}) => {
        switch (item.type) {
            case 'multiple_choice':
                return renderChoices(item);
            case 'file_upload':
                return renderFile(item);
            default:
                return renderMainInfo(item);
        }
    };

    return (
        <View style={styles.container}>
            <Text>Third Screen</Text>
            <Pressable onPress={() => navigation.popToTop()}>
                <Text>Next</Text>
            </Pressable>
            <View>
                <FlatList data={definitions.fields}
                          renderItem={renderItem}
                          keyExtractor={(item) => item.id}
                />
            </View>
        </View>
    );
});

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
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
});
