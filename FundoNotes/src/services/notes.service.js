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

  //get a note by id
export const getNote = async (_id) => {
    const data = await Notes.findOne({ _id: _id });
    return data;
  };

  //update a note
export const updateNote = async (_id, body) => {
    const data = await Notes.findByIdAndUpdate(
      {
        _id
      },
      body,
      {
        new: true
      }
    );
    return data;
  };

  //delete a Single note
    export const deleteNote = async (id) => {
    await Notes.findByIdAndDelete(id);
    return '';
};

/**
 * Controller to archieve a note
 * @param  {object} req - request object
 * @param {object} res - response object
 * @param {Function} next
 */
 export const archiveNote = async (req, res, next) => {
    try {
      const data = await NoteService.archiveNote(req.params._id);
      res.status(HttpStatus.ACCEPTED).json({
        code: HttpStatus.ACCEPTED,
        data: data,
        message: 'note archived successfully'
      });
    } catch (error) {
      res.status(HttpStatus.BAD_REQUEST).json({
        code: HttpStatus.BAD_REQUEST,
        message: 'enter the correct note id'
      });
    }
  };

  //trash a note
export const trashNote = async (_id) => {
    const note = await Notes.findOne({ _id: _id });
    const isTrash = note.isTrash === false ? true : false;
    const data = await Notes.findByIdAndUpdate(
      {
        _id
      },
      { isTrash: isTrash },
      {
        new: true
      }
    );
    return data;
  };