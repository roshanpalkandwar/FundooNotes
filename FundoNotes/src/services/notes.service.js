import Notes from '../models/notes.model';

//create for new note
export const createNote = async (body) => {
  const data = await Notes.create(body);
  return data;
};

//get all notes
export const getAllNotes = async () => {
    const data = await Notes.find();
    return data;
  };