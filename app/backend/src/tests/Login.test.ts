import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';
import Users from '../database/models/SequelizeUser';

import { Response } from 'superagent';

import UsersMock from '../mocks/userMocks';

chai.use(chaiHttp);

const { expect } = chai;

describe('Testa a rota login', () => {
    let chaiHttpResponse: Response;

    afterEach(() => {
        sinon.restore();
    });

    it('deve realizar o login com sucesso e devolver token', async () => {
       
        const Response =  await chai.request(app).post('/login').send({
            email:UsersMock.validUser.email, password:UsersMock.validUser.password});
        expect(Response.status).to.be.equal(200);
        expect(Response.body).to.have.key( 'token');
    });
    it('deve retornar erro 400 e mensagem quando senha nao for informada', async () => {
        //when
        const noPasswordUser = Users.build(UsersMock.noPasswordUser);
        sinon.stub(Users, "findOne").resolves(noPasswordUser as any);  
        const chaiHttpResponse = await chai.request(app).post('/login').send(UsersMock.noPasswordUser);
        //then
        expect(chaiHttpResponse.status).to.be.equal(400);
        expect(chaiHttpResponse.body).to.have.key('message');
    })
    it ('deve retornar erro 401 e mensagem quando email nao for informado', async () => {
        //when
        const noEmailUser = Users.build(UsersMock.noEmailUser);
        sinon.stub(Users, "findOne").resolves(noEmailUser as any);  
        const chaiHttpResponse = await chai.request(app).post('/login').send(UsersMock.noEmailUser);
        //then
        expect(chaiHttpResponse.status).to.be.equal(400);
        expect(chaiHttpResponse.body).to.have.key('message');
    })
    it('deve retornar erro 401 e mensagem quando email for invalido', async () => {
        //when
        const invalidEmailUser = Users.build(UsersMock.invalidEmailUser);
        sinon.stub(Users, "findOne").resolves(invalidEmailUser as any);  
        const chaiHttpResponse = await chai.request(app).post('/login').send(UsersMock.invalidEmailUser);
        //then
        expect(chaiHttpResponse.status).to.be.equal(401);
        expect(chaiHttpResponse.body).to.have.key('message');
    })   
    it ('deve retornar erro 401 e mensagem quando senha for invalida', async () => {
        //when
        const invalidPasswordUser = Users.build(UsersMock.invalidPasswordUser);
        sinon.stub(Users, "findOne").resolves(invalidPasswordUser as any);  
        const chaiHttpResponse = await chai.request(app).post('/login').send(UsersMock.invalidPasswordUser);
        //then
        expect(chaiHttpResponse.status).to.be.equal(401);
        expect(chaiHttpResponse.body).to.have.key('message');
    })

    it( 'deve retornar erro ao fazer requisicao sem token', async () => {
        //when
        const {status, body} = await chai.request(app).get('/login/role/');
        expect(status).to.be.equal(401);
        expect(body).to.have.key('message');
    })

    it('retorna erro quando toke é invalid', async () => {
        const Response = await chai.request(app).get('/login/role').set('authorization', 'invalid_token')
        expect(Response.status).to.be.equal(401);
        expect(Response.body).to.have.property('message');
        
    })
    




});
