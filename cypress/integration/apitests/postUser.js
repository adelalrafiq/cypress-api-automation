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

        cy.fixture('createuser').then(payload => {
        // 1st POST call to create user
        cy.request({
            method: 'POST',
            url: 'https://gorest.co.in/public/v1/users',
            headers: {
                'authorization': 'Bearer ' + accesToken 
            },
            body: {
                // "name":dataJson.name,
                // "gender":dataJson.gender,
                // "email":testEmail,
                // "status":dataJson.status
                "name":payload.name,
                "gender":payload.gender,
                "email":testEmail,
                "status":payload.status
            }
        }).then(res => {
            cy.log(JSON.stringify(res))
            expect(res.status).to.eq(201)
            // expect(res.body.data).has.property('name', dataJson.name)
            // expect(res.body.data).has.property('gender', dataJson.gender)
            // expect(res.body.data).has.property('email', testEmail)
            // expect(res.body.data).has.property('status', dataJson.status)
            expect(res.body.data).has.property('name', payload.name)
            expect(res.body.data).has.property('gender', payload.gender)
            expect(res.body.data).has.property('email', testEmail)
            expect(res.body.data).has.property('status', payload.status)
        }).then(res =>{
            const userId = res.body.data.id
            cy.log("user id is " + userId)
            //2de GET call to get user
            cy.request({
                method: 'GET',
                url: 'https://gorest.co.in/public/v1/users/' + userId,
                headers: {
                    'authorization': 'Bearer ' + accesToken 
                }
                }).then(res => {
                    expect(res.status).to.eq(200)
                    expect(res.body.data).has.property('id', userId)
                    expect(res.body.data).has.property('name', payload.name)
                    expect(res.body.data).has.property('gender', payload.gender)
                    expect(res.body.data).has.property('email', testEmail)
                    expect(res.body.data).has.property('status', payload.status)
                })
            })
        })
    });    
})