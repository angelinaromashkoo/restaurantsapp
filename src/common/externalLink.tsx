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
        fontSize: 16,
        color: '#f4511e',
    },
});
