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
    sinon.stub(Teams, "findAll").resolves(teamsMocks as any);

    // When
    const chaiHttpResponse = await chai.request(app).get('/teams');


    // Then
    expect(chaiHttpResponse.status).to.be.equal(200);
    expect(chaiHttpResponse.body).to.be.deep.equal(teamsMocks);
   
  });

});
