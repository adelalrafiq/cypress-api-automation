/// <reference types="Cypress" />
describe('Oauth feature apis', () =>{
    let access_token = '';
    let userId = '';

    beforeEach('Oauth feature apis', () => {
        // to get the token id (access token)
        cy.request({
            method: 'POST',
            url: '/token',
            form: true,
            body:{
                "client_id": "Cypress-App",
                "client_secret": "b9e1a807cbc6cfba5a01ffd5082a1947",
                "grant_type": "client_credentials"
            }
        }).then(response => {
            cy.log(JSON.stringify(response));
            cy.log(response.body.access_token);
            access_token = response.body.access_token;
            cy.request({
                method: 'GET',
                url: '/api/me',
                headers: {
                    'Authorization': 'Bearer ' + access_token
                }
            }).then(response => {
                userId = response.body.id
                cy.log('user id ' + userId) 
            })
        })
    })

    it('Unlock the Barn Test', () =>{       
        cy.request({
            method: 'POST',
            url: '/api/'+userId+'/barn-unlock',
            headers: {
                'Authorization': 'Bearer ' + access_token 
            }
        }).then(response => {
            cy.log(JSON.stringify(response))
            expect(response.status).to.eq(200)
        })
    })  

    it('Put the Toilet Seat Down Test', () =>{       
        cy.request({
            method: 'POST',
            url: '/api/'+userId+'/toiletseat-down',
            headers: {
                'Authorization': 'Bearer ' + access_token 
            }
        }).then(response => {
            cy.log(JSON.stringify(response))
            expect(response.status).to.eq(200)
        })
    })    

    it('Chikens Feed Test', () =>{       
        cy.request({
            method: 'POST',
            url: '/api/'+userId+'/chickens-feed',
            headers: {
                'Authorization': 'Bearer ' + access_token 
            }
        }).then(response => {
            cy.log(JSON.stringify(response))
            expect(response.status).to.eq(200)
        })
    })    
})