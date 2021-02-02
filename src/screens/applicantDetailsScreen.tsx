import React, { FC, memo } from 'react';
import {View, StyleSheet, Text, Pressable, FlatList} from 'react-native';
import { StackNavigationProp} from "@react-navigation/stack";
import {ApplicationStackParamList, AppScreens} from "../navigators/stackFlowNavigator";
import {IAnswer, IDefinition, IAnswerChoice, IAnswerChoices} from "../interfaces/interfaces";

type ApplicantDetailsScreenNavigationProps = StackNavigationProp<ApplicationStackParamList, AppScreens.Details>;
type ApplicantChoicesType = IAnswerChoice | IAnswerChoices;

export type DetailsParams = {
    definitions: IDefinition;
    answers: IAnswer[];
}

interface IProps {
    route: {params: DetailsParams},
    navigation: ApplicantDetailsScreenNavigationProps
}

export const ApplicantDetails: FC<IProps> = memo((props) => {
    const {navigation, route} = props;
    const {params} = route;
    const {definitions, answers} = params;

    const answersByKey = Object.assign(
        {},
        ...answers.map((item) => {
            return {[item.field.id]: item};
        })
    );
    console.log(answersByKey)

    const renderText = (item) => {
        return (
            <View style={styles.itemContainerStyle}>
                <Text style={styles.fontSize16}>{item.title}</Text>
                <Text style={styles.fontSize16}>{answersByKey[item.id].text}</Text>
            </View>
        );
    };

    const chooseProperLabel = (currentChoice: ApplicantChoicesType) => {
        let label;
        if ("labels" in currentChoice) {
            label = currentChoice.labels
        } else {
            label = currentChoice.label
        }
        return label;
    }

   const renderChoices = (item) => {
       const currentChoice: ApplicantChoicesType = !!answersByKey[item.id].choices ?
           answersByKey[item.id].choices
           : answersByKey[item.id].choice

       const currentLabel = chooseProperLabel(currentChoice)
       debugger;
        return (
            <View style={styles.itemContainerStyle}>
                <Text style={styles.fontSize16}>{item.title}</Text>
                <Text style={styles.fontSize16}>{currentLabel}</Text>
            </View>
        )
    };

    const renderDate = (item) => {
        return (
            <View style={styles.itemContainerStyle}>
                <Text style={styles.fontSize16}>{item.title}</Text>
                <Text style={styles.fontSize16}>{answersByKey[item.id].date}</Text>
            </View>
        )
    }

    const renderFile = (item) => {
        return (
            <View style={styles.itemContainerStyle}>
                <Text style={styles.fontSize16}>{item.title}</Text>
                <Text style={styles.fontSize16}>{answersByKey[item.id].file_url}</Text>
            </View>
        )
    }

    const renderPhone = (item) => {
        return (
            <View style={styles.itemContainerStyle}>
                <Text style={styles.fontSize16}>{item.title}</Text>
                <Text style={styles.fontSize16}>{answersByKey[item.id].phone_number}</Text>
            </View>
        )
    }

    const renderEmail = (item) => {
        return (
            <View style={styles.itemContainerStyle}>
                <Text style={styles.fontSize16}>{item.title}</Text>
                <Text style={styles.fontSize16}>{answersByKey[item.id].email}</Text>
            </View>
        )
    }

    const renderItem = ({item}) => {
        debugger;
        switch (item.type) {
            case 'short_text':
                return renderText(item);
           case 'multiple_choice':
                return renderChoices(item);
            case 'long_text':
                return renderText(item);
            case 'date':
                return renderDate(item);
            case 'file_upload':
                return renderFile(item);
            case 'phone_number':
                return renderPhone(item);
            case 'email':
                return renderEmail(item);
        }
    };

    return (
        <View style={styles.container}>
            <Text>Third Screen</Text>
            <Pressable onPress={() => navigation.popToTop()}>
                <Text>Next</Text>
            </Pressable>
            <View>
                <FlatList data={definitions.fields} renderItem={renderItem}/>
            </View>
        </View>
    );
});

const styles = StyleSheet.create({
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
});
