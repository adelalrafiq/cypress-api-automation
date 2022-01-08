/// <reference types="Cypress"/>

let dataJson = require('../../fixtures/createuser')

describe('Delete user request', ()=>{
    let accesToken = '819118bbf6c1443eb7f47cd627c8876a8d1c55fbbdb418df90f35c19c3587a3c'
    let randomText = ""
    let testEmail = ""
    it('create user test', () => {
        // 1st POST call to create user
        cy.request({
            method: 'POST',
            url: 'https://gorest.co.in/public/v1/users',
            headers: {
                'authorization': 'Bearer ' + accesToken 
            },
            body: {
                "name": "Test Automation Cypress User",
                "gender": "male",
                "email": "naveencypressuser@gmail.com",
                "status": "active"
            }
        }).then(res => {
            cy.log(JSON.stringify(res))
            expect(res.status).to.eq(201)
         
            expect(res.body.data).has.property('name', "Test Automation Cypress User")
            expect(res.body.data).has.property('gender', "male")
            expect(res.body.data).has.property('email', "naveencypressuser@gmail.com")
            expect(res.body.data).has.property('status', "active")
        }).then(res =>{
            const userId = res.body.data.id
            cy.log("user id is " + userId)
            //2de DELETE call to delete user
            cy.request({
                method: 'DELETE',
                url: 'https://gorest.co.in/public/v1/users/' + userId,
                headers: {
                    'authorization': 'Bearer ' + accesToken 
                }
            }).then(res => {
                expect(res.status).to.eq(204) 
            })
        })
    })        
})