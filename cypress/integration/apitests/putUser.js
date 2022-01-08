/// <reference types="Cypress"/>

let dataJson = require('../../fixtures/createuser')

describe('post user request', ()=>{
    let accesToken = '819118bbf6c1443eb7f47cd627c8876a8d1c55fbbdb418df90f35c19c3587a3c'
    let randomText = ""
    let testEmail = ""
    it('create user test', () => {

        let pattern = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"
        for(let i = 0; i < 10; i++)
        randomText += pattern.charAt(Math.floor(Math.random() * pattern.length))
        testEmail = randomText + '@gmail.com'

       
        // 1st POST call to create user
        cy.request({
            method: 'POST',
            url: 'https://gorest.co.in/public/v1/users',
            headers: {
                'authorization': 'Bearer ' + accesToken 
            },
            body: {
                "name": "Test Automation Cypress",
                "gender": "male",
                "email": "naveencypress@gmail.com",
                "status": "active"
            }
        }).then(res => {
            cy.log(JSON.stringify(res))
            expect(res.status).to.eq(201)            
            expect(res.body.data).has.property('name', "Test Automation Cypress")
            expect(res.body.data).has.property('gender', "male")
            expect(res.body.data).has.property('email', "naveencypress@gmail.com")
            expect(res.body.data).has.property('status', "active")
        }).then(res =>{
            const userId = res.body.data.id
            cy.log("user id is " + userId)
            //2de PUT call to update user
            cy.request({
                method: 'PUT',
                url: 'https://gorest.co.in/public/v1/users/' + userId,
                headers: {
                    'authorization': 'Bearer ' + accesToken 
                },
                body: {
                    "name": "Test Automation Cypress Updated",
                    "gender": "male",
                    "email": "naveencypressupdated@gmail.com",
                    "status": "inactive"
                }
            }).then(res => {
                expect(res.status).to.eq(200)
                expect(res.body.data).has.property('id', userId)
                expect(res.body.data).has.property('name', "Test Automation Cypress Updated")
                expect(res.body.data).has.property('gender', "male")
                expect(res.body.data).has.property('email', "naveencypressupdated@gmail.com")
                expect(res.body.data).has.property('status', "inactive")
            })
        })
        
    });    
})