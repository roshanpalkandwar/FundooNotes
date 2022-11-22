import { expect } from 'chai';
import request from 'supertest';
import mongoose from 'mongoose';

import app from '../../src/index';

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

  //1.Test case for  user login

  describe('UserLogin', () => {
    const inputBody={
      "Username":"vikasmehtra@gmail.com",
        "Passaword":"576778"
    }
    it('user details should be saved in database', (done) => {
      request(app)
        .post('/api/v1/users/login')
        .send(inputBody)
        .end((err, res) => {
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
    it('user details should be saved in database', (done) => {
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
    it('user details should be saved in database', (done) => {
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
    it('user details should be saved in database', (done) => {
      request(app)
        .post('/api/v1/users/login')
        .send(inputBody)
        .end((err, res) => {
        expect(res.statusCode).to.be.equal(500);
        done();
      });
     });
  });
});
