import React, {FC, memo} from 'react';
import {
  View,
  StyleSheet,
  Text,
  FlatList,
  SafeAreaView,
  TouchableOpacity,
} from 'react-native';
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
import {ExternalLink} from '../common/externalLink';

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

  const renderChoices = (item: IFields, index: number) => {
    const currentChoice: ApplicantChoicesType = answersByKey[item.id].choices
      ? answersByKey[item.id].choices
      : answersByKey[item.id].choice;

    const currentLabel = chooseProperLabel(currentChoice);
    return (
      <View style={styles.itemContainerStyle}>
        <View style={styles.questionStyle}>
          <Text>{index + 1} Question</Text>
          <Text style={styles.textStyle}>{item.title}</Text>
        </View>
        <View style={styles.answerStyle}>
          <Text>Answer:</Text>
          <Text style={styles.textStyle}>{currentLabel}</Text>
        </View>
      </View>
    );
  };

  const renderMainInfo = (item: IFields, index: number) => {
    const answerField = chooseProperField(item);
    return (
      <View style={styles.itemContainerStyle}>
        <View style={styles.questionStyle}>
          <Text>{index + 1} Question:</Text>
          <Text style={styles.textStyle}>{item.title}</Text>
        </View>
        <View style={styles.answerStyle}>
          <Text>Answer:</Text>
          <Text style={styles.textStyle}>{answerField}</Text>
        </View>
      </View>
    );
  };

  const renderFile = (item: IFields, index: number) => {
    return (
      <View style={styles.itemContainerStyle}>
        <View style={styles.questionStyle}>
          <Text>{index + 1} Question</Text>
          <Text style={styles.textStyle}>{item.title}</Text>
        </View>
        <View style={styles.answerStyle}>
          <Text>Answer:</Text>
          <ExternalLink
            url={answersByKey[item.id].file_url}
            text={answersByKey[item.id].file_url}
          />
        </View>
      </View>
    );
  };

  const renderItem = ({item, index}: {item: IFields; index: number}) => {
    switch (item.type) {
      case 'multiple_choice':
        return renderChoices(item, index);
      case 'file_upload':
        return renderFile(item, index);
      default:
        return renderMainInfo(item, index);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <TouchableOpacity
        onPress={() => navigation.goBack()}
        style={styles.goBackStyle}>
        <View style={styles.viewStyle}>
          <Text style={styles.fontStyle}>Go back</Text>
        </View>
      </TouchableOpacity>
      <FlatList data={definitions.fields} renderItem={renderItem} />
    </SafeAreaView>
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
    paddingHorizontal: 16,
    paddingBottom: 16,
  },
  textStyle: {
    fontSize: 16,
    paddingTop: 5,
  },
  fontStyle: {
    fontWeight: 'bold',
  },
  viewStyle: {
    alignItems: 'center',
    flex: 1,
  },
  goBackStyle: {
    margin: 15,
    padding: 15,
    paddingHorizontal: 75,
    backgroundColor: '#dedede',
    width: '50%',
    alignSelf: 'center',
    flexDirection: 'row',
    borderRadius: 5,
  },
  questionStyle: {
    backgroundColor: '#dedede',
    borderRadius: 5,
    borderBottomLeftRadius: 0,
    borderBottomRightRadius: 0,
    padding: 5,
    alignItems: 'center',
  },
  answerStyle: {
    backgroundColor: '#AFF8C2',
    borderTopLeftRadius: 0,
    borderTopRightRadius: 0,
    borderRadius: 5,
    marginBottom: 10,
    padding: 5,
    alignItems: 'center',
  },
});
