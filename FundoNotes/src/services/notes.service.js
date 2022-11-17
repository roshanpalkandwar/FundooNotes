import Notes from '../models/notes.model';

//create for new note
export const createNote = async (body) => {
  const data = await Notes.create(body);
  return data;
};