/// <reference types="Cypress" />
describe('Oauth feature apis', () =>{
    let access_token = '';
    let userId = '';
    
    it('get the access token test', () =>{
        //get the user id
        cy.request({
            method: 'POST',
            url: 'http://coop.apps.symfonycasts.com/token',
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
                url: 'http://coop.apps.symfonycasts.com/api/me',
                headers: {
                    'Authorization': 'Bearer ' + access_token
                }
            }).then(response => {
                userId = response.body.id
                cy.log('user id ' + userId)
                cy.request({
                    method: 'POST',
                    url: 'http://coop.apps.symfonycasts.com/api/'+userId+'/chickens-feed',
                    headers: {
                        'Authorization': 'Bearer ' + access_token 
                    }
                }).then(response => {
                    cy.log(JSON.stringify(response))
                    expect(response.status).to.eq(200)
                })
            })
        })
    })
})