import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';

import { Response } from 'superagent';
import Matches from '../database/models/SequelizeMatches'
import JwtService from '../utils/JWT';
import matchesMocks from '../mocks/matchesMocks';

chai.use(chaiHttp);
const { expect } = chai;
const testPayload = {
    id: 2, // replace with a valid user id
    email: 'user@user.com', // replace with a valid email
    role: 'user', // replace with a valid role
  };
const token = JwtService.sign(testPayload);


describe('Testa as matches', () => {
    let chaiHttpResponse: Response;
    afterEach(()=>{
        sinon.restore();
      });
      it('should return all matches', async () => {
        // Given
        sinon.stub(Matches, "findAll").resolves(matchesMocks.match as any);
    
        // When
        const chaiHttpResponse = await chai.request(app).get('/matches');
    
        // Then
        expect(chaiHttpResponse.status).to.be.equal(200);
        expect(chaiHttpResponse.body).to.be.deep.equal(matchesMocks.match);
      });

      it('deve retornar uma partida em andamento', async () => {
        sinon.stub(Matches,"findAll").resolves(matchesMocks.onGoingMatch as any);
        const chaiHttpResponse = await chai.request(app).get('/matches?inProgress=true');
        expect(chaiHttpResponse.status).to.be.equal(200);
        expect(chaiHttpResponse.body).to.be.deep.equal(matchesMocks.onGoingMatch);
      });

      it('deve retornar erro ao tentar finalizar partida sem token', async () => {
        sinon.stub(Matches,"findOne").resolves(matchesMocks.match as any);
        const chaiHttpResponse = await chai.request(app).patch('/matches/1/finish');
        expect(chaiHttpResponse.status).to.be.equal(401);
        expect(chaiHttpResponse.body).to.be.deep.equal({message: 'Token not found'});
       
      })
      it('deve ser possivel finalizar uma partida quando token validado', async () => {
        sinon.stub(Matches,'update').resolves([1])
        // sinon.stub(Matches,"findOne").resolves(matchesMocks.match as any);
        const chaiHttpResponse = await chai.request(app).patch('/matches/1/finish').set('authorization', `Bearer ${token}`);
        expect(chaiHttpResponse.status).to.be.equal(200);
        
    
    } )
})