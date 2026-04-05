
import { test } from "@playwright/test";
import { log } from "console";


let id : any // GLobal declaration


test.describe.serial(`Test executed in serial mode`,async () => {


test(`Creating an Change request in Service Now`, async ({ request }) => {


    // await page.goto(``)


    const response = await request.post(`https://dev231458.service-now.com/api/now/table/change_request`,
        {
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Basic YWRtaW46WjkqTGUwd0VMLWFo" //YWRtaW46WjkqTGUwd0VMLWFo --> btoa JS library
            },
            data: {
                "short_description": "Change request _using Playwright API"
            }
        }
    )


    const reponseBody = await response.json()
    console.log(reponseBody); // Convert the object to JSON structure to be printed in the terminal +> deserialization
    
    id = reponseBody.result.sys_id // Retreiving the sys_id from nested JSON // Local declaration




})



test(`Fetch the Change request in Service Now`, async ({ request }) => {


    // await page.goto(``)


    const response = await request.get(`https://dev231458.service-now.com/api/now/table/change_request${id}`,
        {
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Basic YWRtaW46WjkqTGUwd0VMLWFo" //YWRtaW46WjkqTGUwd0VMLWFo --> btoa JS library
            }
        }
    )


    console.log(await response.json()); // Convert the object to JSON structure to be printed in the terminal +> deserialization
    




})


test(`Updating an incident in Service Now`, async ({ request }) => {


    // await page.goto(``)


    const response = await request.post(`https://dev231458.service-now.com/api/now/table/change_request${id}`,
        {
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Basic YWRtaW46WjkqTGUwd0VMLWFo" //YWRtaW46WjkqTGUwd0VMLWFo --> btoa JS library
            },
            data: {
                "short_description": "Change request _using Playwright API_updated"
            }
        }
    )


  

})

test(`Delete the incident in Service Now`, async ({ request }) => {


    // await page.goto(``)


    const response = await request.get(`https://dev231458.service-now.com/api/now/table/change_request/${id}`,
        {
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Basic YWRtaW46WjkqTGUwd0VMLWFo" //YWRtaW46WjkqTGUwd0VMLWFo --> btoa JS library
            }
        }
    )


    console.log(await response.json()); // Convert the object to JSON structure to be printed in the terminal +> deserialization
    




})


})