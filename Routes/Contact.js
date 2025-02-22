import express from 'express'

import { addContact, deleteContact, getAllContact, updateContact } from '../Controllers/Contact.js'

//router
const Router = express.Router()




//Get all contacts
Router.get('/', getAllContact)

//add contact
Router.post('/contact', addContact)

//updated contact
Router.put('/update/contact/:id', updateContact)

//delete contact
Router.delete('/delete/contact/:id', deleteContact)


export default Router;
