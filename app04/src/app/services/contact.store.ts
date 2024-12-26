import { patchState, signalStore, withComputed, withMethods, withState } from "@ngrx/signals";
import { Contact } from "../models/contact";
import { computed, inject } from "@angular/core";
import { ContactService } from "./contact.service";
import { lastValueFrom } from "rxjs";
import { MessagingService } from "./messaging.service";

interface ContactsStoreType {
    contacts: Contact[],
    selectedId: number | null
}

const initialState: ContactsStoreType = {
    contacts: [],
    selectedId: null
};

export const ContactsStore = signalStore(
    { providedIn: 'root' },

    withState(initialState),

    withComputed(({ selectedId, contacts }) => ({
        
        isContactsEmpty: computed(() => contacts().length===0),

        selectedContact: computed(() => {
            let contact: Contact | undefined = undefined;
            if (contacts().length > 0 && selectedId()) {
                contact = contacts().find(c => c.id === selectedId());
            }
            return contact;
        })

    })),

    withMethods((store, contactService = inject(ContactService), msgService = inject(MessagingService)) => ({
      
        selectContactId(id:number){
            patchState(store,{selectedId:id});
        },
        async loadAll() {
            try {
                msgService.add("Please wait while loading data!");
                const contacts = await lastValueFrom(contactService.getAll());
                patchState(store,{contacts});
                msgService.add("Data Loaded Successfully!");
            } catch (err) {
                console.error(err);
                msgService.add("Unable to fetech data! Please retry!");
            }
        },
        async add(contact: Contact) {
            try {
                msgService.add("Please wait while saving data!");
                contact = await lastValueFrom(contactService.addContact(contact));                
                msgService.add("Data Saved Successfully!");                
                patchState(store,{contacts:[...store.contacts(),contact]});                
            } catch (err) {
                console.error(err);
                msgService.add("Unable to save record! Pleae retry!");                                
            }
        },
        async update(contact: Contact) {
            try {
                msgService.add("Please wait while saving data!");
                contact = await lastValueFrom(contactService.updateContact(contact));                
                msgService.add("Data Saved Successfully!");                
                patchState(store,{contacts:store.contacts().map(c=>c.id!==contact.id?c:contact)});
            } catch (err) {
                console.error(err);
                msgService.add("Unable to save record! Pleae retry!");                                
            }
        },
        async del(id: number) {
            try {
                msgService.add("Please wait while saving data!");
                await lastValueFrom(contactService.deleteById(id));
                msgService.add("Data Deleted Successfully!");                
                patchState(store,{contacts:store.contacts().filter(c=>c.id!==id)});
            } catch (err) {
                console.error(err);
                msgService.add("Unable to delete record! Pleae retry!");                                
            }
        }
    })
);