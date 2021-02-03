import React, {FC, memo} from 'react';
import {TouchableOpacity, StyleSheet, Text, Linking} from 'react-native';

interface IProps {
  url: string;
  text: string;
}

export const ExternalLink: FC<IProps> = memo((props) => {
  const {url, text} = props;

  const onPress = () =>
    Linking.canOpenURL(url).then(() => {
      Linking.openURL(url);
    });

  return (
    <TouchableOpacity onPress={onPress}>
      <Text style={styles.text}>{text}</Text>
    </TouchableOpacity>
  );
});

const styles = StyleSheet.create({
  text: {
    paddingTop: 5,
    fontSize: 16,
    color: '#1380de',
  },
});
