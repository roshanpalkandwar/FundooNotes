import Notes from '../models/notes.model';
import { client } from '../config/redis';
import { cli } from 'winston/lib/winston/config';
import User from '../models/user.model';

//create for new note
export const createNote = async (body) => {
  await client.del('getAllData');
  const data = await Notes.create(body);
  return data;
};

//get all notes
export const getAllNotes = async (UserId) => {
    const data = await Notes.find({UserId:UserId});
    await client.set('getAllData',JSON.stringify(data))
    return data;
  };

  //get a note by id
export const getNote = async (_id,UserId) => {
    const data = await Notes.findOne({ _id: _id,UserId:UserId });
    await client.set('getById', JSON.stringify(data));
    return data;
  };

  //update a note
export const updateNote = async (_id, body,UserId,) => {
    const data = await Notes.findByIdAndUpdate(
      {
        _id:_id,UserId:UserId
      },
      body,
      {
        new: true
      }
    );
    return data;
  };

  //delete a Single note
    export const deleteNote = async (_id,UserId) => {
    await Notes.findByIdAndDelete({_id:_id,UserId:UserId});
    return '';
};

//archieve a note
export const archiveNote = async (_id,UserId) => {
  const note = await Notes.findOne({ _id: _id,UserId:UserId });
  const isArchived = note.isArchived === false ? true : false;
  const data = await Notes.findByIdAndUpdate(
    {
      _id:_id,UserId:UserId
    },
    { isArchived: isArchived },
    {
      new: true
    }
  );
  return data;
};

  //trash a note
export const trashNote = async (_id,UserId) => {
    const note = await Notes.findOne({ _id: _id,UserId:UserId });
    const isTrash = note.isTrash === false ? true : false;
    const data = await Notes.findByIdAndUpdate(
      {
        _id:_id,UserId:UserId
      },
      { isTrash: isTrash },
      {
        new: true
      }
    );
    return data;
  };

  export const pinnotes = async (_id,UserId) => {
    const note = await Notes.findOne({ _id: _id,UserId:UserId });
    const pinnotes = note.pinnotes === false ? true : false;
    const data = await Notes.findByIdAndUpdate(
      {
        _id:_id,UserId:UserId
      },
      { pinnotes: pinnotes },
      {
        new: true
      }
    );
    return data;
  };

  //add Collaborators to note
export const addCollaborator = async (_id,body) => {
  const Check = await User.findOne({ Username:body.Collaborators })
  console.log("check==========>",Check)
  if (Check != null) {
    const data = await Notes.findOneAndUpdate({ _id:_id,UserId:body.UserId }, 
      { $addToSet: {  Collaborators:body.Collaborators } }, 
     // console.log("corabator=====================>",typeof:$addToSet),
     
      { new: true });
    return data;
  }
};