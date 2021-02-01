import data from '../mockedData/applications.json';
import {IResultData, IApplicantResponse} from "../interfaces/interfaces";

export class Restaurants {
    get convertData(): IResultData[] {
        return data.reduce((array: IResultData[], item: IApplicantResponse): IResultData[] => {
            const foundedItem = array
                .find((i) => i.id === item.restaurant.id);

            if (foundedItem) {
                const applicants = [...foundedItem.applicants, ...[item.form_response]];
                const currentItem= array
                    .find(({ id }) => id === foundedItem.id);

                if (currentItem) {
                    currentItem.applicants = applicants;
                }
                return array;
            }
            return [
                ...array,
                {
                    id: item.restaurant.id,
                    label: item.restaurant.label,
                    applicants: [item.form_response],
                },
            ];
        }, []);
    }
}

