import { expect } from 'chai';
import request from 'supertest';
import mongoose from 'mongoose';

import app from '../../src/index';
import { id } from '@hapi/joi/lib/base';

describe('User APIs Test', () => {
  before((done) => {
    const clearCollections = () => {
      for (const collection in mongoose.connection.collections) {
        mongoose.connection.collections[collection].deleteOne(() => {});
      }
    };

    const mongooseConnect = async () => {
      await mongoose.connect(process.env.DATABASE_TEST);
      clearCollections();
    };

    if (mongoose.connection.readyState === 0) {
      mongooseConnect();
    } else {
      clearCollections();
    }

    done();
  });

    //1 Test case for user registration

    describe('UserRegistration', () => {
      const inputBody={
        "Firstname":"vikas",
        "Lastname":"Mehtra",
        "Username":"vikasmehtra@gmail.com",
        "Passaword":"576778"
      }
      it('user details should be saved in database', (done) => {
        request(app)
          .post('/api/v1/users/register')
          .send(inputBody)
          .end((err, res) => {
            expect(res.statusCode).to.be.equal(201);
            done();
          });
      });
    });
    //2.Test case for invalid FirstName
  describe('UserRegistration', () => {
    const inputBody={
       "Firstname":"vi",
        "Lastname":"Mehtra",
        "Username":"vikasmehtra@gmail.com",
        "Passaword":"576778"
    }
    it('user details should be saved in database', (done) => {
      request(app)
        .post('/api/v1/users/register')
        .send(inputBody)
        .end((err, res) => {
        expect(res.statusCode).to.be.equal(500);
        done();
      });
     });
  });

  //3.Test case for invalid Lastname
  describe('UserRegistration', () => {
    const inputBody={
       "Firstname":"vikas",
        "Lastname":"",
        "Username":"vikasmehtra@gmail.com",
        "Passaword":"576778"
    }
    it('user details should be saved in database', (done) => {
      request(app)
        .post('/api/v1/users/register')
        .send(inputBody)
        .end((err, res) => {
        expect(res.statusCode).to.be.equal(500);
        done();
      });
     });
  });


  //4.Test case for valid email
  describe('UserRegistration', () => {
    const inputBody={
       "Firstname":"vikas",
        "Lastname":"mehtra",
        "Username":"vikasmehtrgmail.com",
        "Passaword":"576778"
    }
    it('user details should be saved in database', (done) => {
      request(app)
        .post('/api/v1/users/register')
        .send(inputBody)
        .end((err, res) => {
        expect(res.statusCode).to.be.equal(500);
        done();
      });
     });
  });

  //5.Test case for valid Password
  describe('UserRegistration', () => {
    const inputBody={
       "Firstname":"vikas",
        "Lastname":"mehtra",
        "Username":"vikasmehtr@gmail.com",
        "Passaword":"57"
    }
    it('user registration With Invalid', (done) => {
      request(app)
        .post('/api/v1/users/register')
        .send(inputBody)
        .end((err, res) => {
        expect(res.statusCode).to.be.equal(500);
        done();
      });
     });
  });

  //1.Test case for  user login
  var token;
  describe('UserLogin', () => {
    const inputBody={
      "Username":"vikasmehtra@gmail.com",
        "Passaword":"576778"
    }
    it('user login Succesfully', (done) => {
      request(app)
        .post('/api/v1/users/login')
        .send(inputBody)
        .end((err, res) => {
          token=res.body.data;
        expect(res.statusCode).to.be.equal(200);
        done();
      });
     });
  });
 

   //2.Test case for invalid  Email login

   describe('UserLogin', () => {
    const inputBody={
      "Username":"vimehtra@gmail.com",
        "Passaword":"576778"
    }
    it('user pass invalid Email', (done) => {
      request(app)
        .post('/api/v1/users/login')
        .send(inputBody)
        .end((err, res) => {
        expect(res.statusCode).to.be.equal(500);
        done();
      });
     });
  });

  //3.Test case for invalid  password login

  describe('UserLogin', () => {
    const inputBody={
      "Username":"vimehtra@gmail.com",
        "Passaword":"57666778"
    }
    it('user Invalid Password saved in database', (done) => {
      request(app)
        .post('/api/v1/users/login')
        .send(inputBody)
        .end((err, res) => {
        expect(res.statusCode).to.be.equal(500);
        done();
      });
     });
  });

  //4.Test case for missing passaword 

  describe('UserLogin', () => {
    const inputBody={
      "Username":"vimehtra@gmail.com",
        "Passaword":"57666778"
    }
    it('user missing passaword saved in database', (done) => {
      request(app)
        .post('/api/v1/users/login')
        .send(inputBody)
        .end((err, res) => {
        expect(res.statusCode).to.be.equal(500);
        done();
      });
     });
  });
    
  //1.create new token //
  var noteId;
  describe('creating new note',()=>{
    const inputBody={
      "title":"old old",
      "description":"even even"
    }
    it('note created successfully',(done)=>{
      request(app)
      .post('/api/v1/notes')
      .set('Authorization',`Bearer ${token}`)
      .send(inputBody)
      .end((err,res)=>{

        noteId=res.body.data._id;
        console.log("req NoteId=========>",res.body.data._id)
        expect(res.statusCode).to.be.equal(200);
        done();
      });
    });
  });

  //2.create note with invalid title//
  
  describe('creating new note',()=>{
    const inputBody={
      "title":"ol",
      "description":"even even"
    }
    it('note created invalid title',(done)=>{
      request(app)
      .post('/api/v1/notes')
      .set('Authorization',`Bearer ${token}`)
      .send(inputBody)
      .end((err,res)=>{
        
        expect(res.statusCode).to.be.equal(500);
        done();
      });
    });
  });

  //3.create note with inavalid Descripation//
  
   describe('creating new note',()=>{
     const inputBody={
       "title":"ol",
       "description":"even even"
     }
     it('note created invalid Descripation',(done)=>{
       request(app)
       .post('/api/v1/notes')
       .set('Authorization',`Bearer ${token}`)
       .send(inputBody)
       .end((err,res)=>{
         
         expect(res.statusCode).to.be.equal(500);
         done();
       });
     });
   });

 //4.get all note//
   
   describe('get all note',()=>{
     
     it('get All Note should Get',(done)=>{
       request(app)
       .get('/api/v1/notes')
       .set('Authorization',`Bearer ${token}`)
       
       .end((err,res)=>{
         
         expect(res.statusCode).to.be.equal(200);
         done();
       });
     });
   });


   //5.get notes by Id
   describe('Get By Id', () => 
   { it('Given Note By Id Should Get', (done) => 
   { request(app) 
   .get(`/api/v1/notes/${noteId}`) 
   .set('authorization', `Bearer ${token}`) 
   .end((err, res) => {
    expect(res.statusCode).to.be.equal(200); 
    done(); 
     });
    });
  });

  //6.get notes with invalid Id
  describe('Get invalid Id', () => 
  { it('Given Note By invalid Id Should Get', (done) => 
  { request(app) 
  .get(`/api/v1/notes/$`) 
  .set('authorization', `Bearer ${token}`) 
  .end((err, res) => {
   expect(res.statusCode).to.be.equal(400); 
   done(); 
    });
   });
 });
  
   
});

