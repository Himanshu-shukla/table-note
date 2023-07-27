'use strict';

const NoteRepository = require('./NoteRepository');
const noteRepository = new NoteRepository();

const mapToNoteDto = (note) => {

    return {
        id: note._id,
        title: note.title,
        content: note.content,
        tags: note.tags,
        createdDate: note.created_date,
        updatedDate: note.updated_date
    };
};

const createUpdatedNote = (title, content, tags) => {
    return { 
        title: title, 
        content: content,
        tags: !Array.isArray(tags) ? convertTagsCsvToArray(tags) : tags,
        updated_date: new Date() 
    };
};

const createNewNote = (title, content, tags) => {
    return {
        title: title,
        content: content,
        tags: convertTagsCsvToArray(tags),
        created_date: new Date(),
        updated_date: new Date()
    };
};

const convertTagsCsvToArray = (tags) => {
    
    var exp = new RegExp(/^((\w+)((,)?|(,\s)))*$/);
    
    return tags 
        ? Array.from(new Set(tags.split(',').map(tag => tag.toLowerCase()))) 
        : [];
};

class NoteManager {    

    addNote(title, content, tags) {
        
        const note = createNewNote(title, content, tags);

        return new Promise((resolve, reject) => {
            noteRepository
                .addNote(note)
                .then(result => resolve(result.id))
                .catch(error => reject(error));
        });
    }


    findNoteById(id) {
              
        return new Promise((resolve, reject) => {
            noteRepository
                .findNoteById(id)
                .then(note => resolve(mapToNoteDto(note)))
                .catch(error => reject(error));
        });
    }


    findNotesByTag(tag) {

        return new Promise((resolve, reject) => {
            noteRepository
                .findNotesByTag(tag)
                .then(notes => resolve(notes.map(note => mapToNoteDto(note))))
                .catch(error => reject(error));
        });
    }


    findNotesByTitle(title) {
 
        return new Promise((resolve, reject) => {
            noteRepository
                .findNotesByTitle(title)
                .then(notes => resolve(notes.map(note => mapToNoteDto(note))))
                .catch(error => reject(error));
        });
    }


    listNotes() {

        return new Promise((resolve, reject) => {
            noteRepository
                .listNotes()
                .then(notes => resolve(notes.map(note => mapToNoteDto(note))))
                .catch(error => reject(error));
        });
    }


    removeNote(id) {

        return new Promise((resolve, reject) => {
            noteRepository
                .removeNote(id)
                .then(() => resolve())
                .catch(error => reject(error));
        });
    }


    tagNote(id, tags) {

        var exp = new RegExp(/^([\w]+[,]?)*$/);

        const uniqueTags = tags ? Array.from(new Set(tags.split(',').map(tag => tag.toLowerCase()))) : [];

        return new Promise((resolve, reject) => {
            noteRepository
                .tagNote(id, uniqueTags)
                .then(() => resolve())
                .catch(error => reject(error));
        });
    }


    updateNote(id, title, content, tags) {

        const note = createUpdatedNote(title, content, tags);

        return new Promise((resolve, reject) => {
            noteRepository
                .updateNote(id, note)
                .then(() => resolve())
                .catch(error => reject(error));
        });        
    }
}

module.exports = NoteManager;