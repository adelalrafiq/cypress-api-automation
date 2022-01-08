
// How to pass single value or complete array from one request to another request using chaining in Cypress ?
describe('',() =>{

    it('get weather information for cities', () => {
        //1st request: GET city
        cy.request({
            method: 'GET',
            url: 'https://www.metaweather.com/api/location/search/?query=San'
        }).then(res =>{
            const city = res.body[0].title
            return city
        }).then(city => {
            //2de request for the first city
            cy.request({
                method: 'GET',
                url: 'https://www.metaweather.com/api/location/search/?query=' + city
            }).then(res => {
                expect(res.status).to.eq(200)
                expect(res.body[0]).to.have.property('title', city)
            })
        })
    });

    it.only('get weather information for all cities', () => {
        //1st request: GET city
        cy.request({
            method: 'GET',
            url: 'https://www.metaweather.com/api/location/search/?query=Am'
        }).then(res =>{
            const location = res.body
            return location
        }).then(location => {
            for(let i = 0; i < location.length; i++){
                //2de request for the first city
                cy.request({
                    method: 'GET',
                    url: 'https://www.metaweather.com/api/location/search/?query=' + location[i].title
                }).then(res => {
                    expect(res.status).to.eq(200)
                    expect(res.body[0]).to.have.property('title', location[i].title)
                })
            }
        })
    });
})