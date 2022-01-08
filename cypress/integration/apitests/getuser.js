/// <reference types = "Cypress" />

let accesToken = '819118bbf6c1443eb7f47cd627c8876a8d1c55fbbdb418df90f35c19c3587a3c'

describe('get api user tests', ()=>{

    it('get users', ()=>{
        cy.request({
            method: 'GET',
            url: 'https://gorest.co.in/public/v1/users',
            headers: {
                'authorization': 'Bearer ' + accesToken
            }
        }).then(res => {
            expect(res.status).to.eq(200)
            expect(res.body.meta.pagination.limit).to.eq(20)
        })
    })

    it('get users by id test', ()=>{
        cy.request({
            method: 'GET',
            url: 'https://gorest.co.in/public/v1/users/333',
            headers: {
                'authorization': 'Bearer ' + accesToken
            }
        }).then(res => {
            expect(res.status).to.eq(200)
            expect(res.body.data.name).to.eq('Chitramala Ahuja')
        })
    })

})