import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';
import Teams from '../database/models/SequelizeTeams';

import { Response } from 'superagent';

import teamsMocks from '../mocks/teamsMocks';

chai.use(chaiHttp);

const { expect } = chai;



describe('Testa os times', () => {
    let chaiHttpResponse: Response;

    afterEach(()=>{
        sinon.restore();
      });
    
  it('should return all teams', async () => {
    // Given
    sinon.stub(Teams, "findAll").resolves(teamsMocks.allTeams as any);

    // When
    const chaiHttpResponse = await chai.request(app).get('/teams');


    // Then
    expect(chaiHttpResponse.status).to.be.equal(200);
    expect(chaiHttpResponse.body).to.be.deep.equal(teamsMocks.allTeams);
   
  });

  it('should return a team by id', async () => {
    // Given
    const mock = Teams.build(teamsMocks.allTeams[0]);
    sinon.stub(Teams, "findOne").resolves(mock as any);

    // When
    const chaiHttpResponse = await chai.request(app).get('/teams/1');

    // Then

    expect(chaiHttpResponse.status).to.be.equal(200);
    expect(chaiHttpResponse.body).to.be.deep.equal(teamsMocks.allTeams[0]);


});
it('deve retornar erro 404 e mensagem quando time nao for encontrado', async () => {
    //when
    sinon.stub(Teams, "findOne").resolves(null as any);  
    const chaiHttpResponse = await chai.request(app).get('/teams/1');
    //then
    expect(chaiHttpResponse.status).to.be.equal(404);
    expect(chaiHttpResponse.body).to.have.key('message');
})

});