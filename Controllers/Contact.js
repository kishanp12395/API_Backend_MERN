import mongoose from "mongoose";
import { Contact } from "../models/Contact.js";




//get all contact
export const getAllContact = async (req, res) => {
    try {
        const contacts = await Contact.find().sort({createdAt:-1});
        res.status(200).json({ msg: 'All Contact Fetched Successfully', contacts });
    } catch (error) {
        res.status(500).json({ msg: 'Internal Server Error', error: error.message });
    }
}

// add contact
export const addContact = async (req, res) => {
    const { name, email, phone } = req.body;
    if (!name || !email || !phone) {
        return res.status(400).json({ msg: 'Please provide name, email, and phone' });
    }

    try {
        let contact = await Contact.findOne({email})
        if(contact) return res.status(400).json({msg:'Contact already exist.. or Duplicate email'})

        contact = await Contact.create({ name, email, phone });
        res.status(201).json({ msg: 'Contact saved successfully', contact });
    } catch (error) {
        res.status(500).json({ msg: 'Internal Server Error', error: error.message });
    }
}

//update contact
export const updateContact = async (req,res) => {
    const id = req.params.id;
    const updatedData = req.body;
      // Check if id is a valid MongoDB ObjectId
      if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({ msg: 'Invalid contact ID' });
    }

    try {
        let contact = await Contact.findByIdAndUpdate(id,updatedData,{new:true})
        
        if (!contact) {
            return res.status(404).json({ msg: 'Contact not found' });
        }

        res.status(200).json({msg:'User contact has been updated',contact})
    } catch (error) {
        res.status(500).json({ msg: 'Internal Server Error', error: error.message });
    }
}


//delete contact
export const deleteContact = async (req,res) => {
    const id = req.params.id;

     // Check if id is a valid MongoDB ObjectId
     if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({ msg: 'Invalid contact ID' });
    }

    try {
        let contact = await Contact.findById(id)

        if (!contact) {
            return res.status(404).json({ msg: 'Contact not found' });
        }

        if(!contact) return res.json({msg:'Contact not exist'})
            await  contact.deleteOne()
            res.status(200).json({ msg: 'Your contact has been deleted successfully' });        
    } catch (error) {
        res.status(500).json({ msg: 'Internal Server Error', error: error.message });

    }
}