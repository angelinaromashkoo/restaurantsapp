import data from '../mockedData/applications.json';

export const restaurantsData = () : any[] => {
        return data.reduce((array: any[] , item: any): any[] => {
            const foundedItem = array.find((i) => {
                if(i.id) {
                    return i.id === item.restaurant.id;
                }
                return false;
            });

            if (foundedItem) {
                const applicants = [...foundedItem.applicants, ...[item.form_response]]
                const currentItem = array.find(({ id }) => id === foundedItem.id);

                if (currentItem) {
                    currentItem.applicants = applicants;
                }
                return array
            }
            return [
                ...array,
                {
                    id: item.restaurant.id,
                    label: item.restaurant.label,
                    applicants: [item.form_response],
                },
            ]
        }, []);
    }

