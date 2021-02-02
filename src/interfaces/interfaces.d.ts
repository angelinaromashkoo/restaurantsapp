interface IRestaurant {
    id: string,
    label: string
}

interface IChoices {
    id: string,
    label: string,
}

interface IFields {
    id: string,
    title: string,
    type: string,
    ref: string,
    properties: Record<string, unknown>,
    choices?: IChoices[]
    allow_multiple_selections?: boolean,
    allow_other_choice?: boolean,
}

interface IDefinition {
    id: string,
    title: string,
    fields: IFields[]
}

interface IAnswer {
    type: string,
    text?: string,
    date?: string,
    file_url?: string,
    phone_number?: string,
    email?: string,
    choice?: IAnswerChoice,
    choices?: IAnswerChoices,
    field: IAnswerField
}

interface IAnswerField {
    id: string,
    type: string,
    ref: string
}

export interface IAnswerChoice {
    label: string
}

export interface IAnswerChoices {
    labels: string[]
}

interface IFormResponse {
    form_id: string,
    token: string,
    landed_at: string,
    submitted_at: string,
    definition: IDefinition
    answers: IAnswer[]
}

export interface IApplicantResponse {
    id: string,
    event_id: string,
    event_type: string,
    restaurant: IRestaurant,
    form_response: IFormResponse,
}

export interface IResultData {
    id: string,
    label: string,
    applicants: IFormResponse[],
}
