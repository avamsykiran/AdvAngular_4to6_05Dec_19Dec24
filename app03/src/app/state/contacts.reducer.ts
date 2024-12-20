import { createReducer, on } from "@ngrx/store";
import { Contact } from "../models/contact";
import { ContactActions } from "./contacts.actions";

export const initialContactsState: {contacts:Contact[],errMsg:string|null} = {
    contacts:[],
    errMsg:null
};

export const contactsReducer = createReducer(
    initialContactsState,
    on(ContactActions.refresh, (state, { contacts }) => ({contacts,errMsg:null})),
    on(ContactActions.error,  (state, { errMsg }) => ({...state,errMsg}))
);