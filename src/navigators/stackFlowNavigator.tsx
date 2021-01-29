import React, {FC} from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import {RestaurantsList, ApplicantsList, ApplicantDetails} from "../screens";

export enum AppScreens {
    Restaurants = 'Restaurants',
    Applicants = 'Applicants',
    Details = 'Details'
}

export type ApplicationStackParamList = {
    Restaurants: undefined;
    Applicants: undefined;
    Details: undefined;
};

const ApplicationStack = createStackNavigator<ApplicationStackParamList>();

export const ApplicationFlowNavigator: FC = () => {
    return (
        <ApplicationStack.Navigator>
            <ApplicationStack.Screen name={AppScreens.Restaurants} component={RestaurantsList} />
            <ApplicationStack.Screen name={AppScreens.Applicants} component={ApplicantsList} />
            <ApplicationStack.Screen name={AppScreens.Details} component={ApplicantDetails} />
        </ApplicationStack.Navigator>
    );
};
