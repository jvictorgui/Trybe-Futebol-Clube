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
        //given
        const userBody = Users.build(UsersMock.loginBodyRequest);
        sinon.stub(Users, "findOne").resolves(userBody as any);
        //when
        const chaiHttpResponse = await chai.request(app).post('/login').send(UsersMock.loginBodyRequest);
        //then
        expect(chaiHttpResponse.status).to.be.equal(200);
        expect(chaiHttpResponse.body).to.have.key( 'token');
    });
    it('deve retornar erro 400 e mensagem quando senha nao for informada', async () => {
        //when
        const noPasswordUser = Users.build(UsersMock.noPasswordUser);
        sinon.stub(Users, "findOne").resolves(noPasswordUser as any);  
        const chaiHttpResponse = await chai.request(app).post('/login').send(UsersMock.noPasswordUser);
        //then
        expect(chaiHttpResponse.status).to.be.equal(401);
        expect(chaiHttpResponse.body).to.have.key('message');
    })
    it ('deve retornar erro 400 e mensagem quando email nao for informado', async () => {
        //when
        const noEmailUser = Users.build(UsersMock.noEmailUser);
        sinon.stub(Users, "findOne").resolves(noEmailUser as any);  
        const chaiHttpResponse = await chai.request(app).post('/login').send(UsersMock.noEmailUser);
        //then
        expect(chaiHttpResponse.status).to.be.equal(401);
        expect(chaiHttpResponse.body).to.have.key('message');
    })

});
