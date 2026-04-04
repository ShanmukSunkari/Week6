import test from "@playwright/test"
import { parse } from "csv-parse/sync"
import fs from "fs"

let records: any[] = parse(fs.readFileSync("Data/testLeafData.csv"), { columns: true, skip_empty_lines: true, relax_column_count: true })


test.describe.serial("Test to be executed in serial mode", async () => {


    for (let data of records) {

        test(`Learn to Handle CSV ${data.tcid}`, async ({ page }) => {
            await page.goto("http://leaftaps.com/opentaps/control/main")  // Launching web page
            await page.getByRole("textbox", { name: "Username" }).fill(data.username);
            await page.getByRole("textbox", { name: "Password" }).fill(data.password);
            await page.getByRole("button", { name: "Login" }).click();
            await page.getByRole("link", { name: "CRM/SFA" }).click();
            await page.getByRole("link", { name: "Leads" }).click();
            await page.getByRole("link", { name: "Create Lead" }).click();
            await page.locator(`//input[@id="createLeadForm_companyName"]`).fill(data.companyname); // Fill the data from CSV file 
            await page.locator(`//input[@id="createLeadForm_firstName"]`).fill(data.firstname);// Fill the data from CSV file 
            await page.locator(`//input[@id="createLeadForm_lastName"]`).fill(data.lastname);// Fill the data from CSV file 
            await page.locator(`//select[@id="createLeadForm_dataSourceId"]`).selectOption({ label: 'Direct Mail' });
            await page.locator(`//select[@id="createLeadForm_marketingCampaignId"]`).selectOption({ value: 'DEMO_MKTG_CAMP' });
            // Getting dropdown values and count 
            const marketingDropDownvalues = page.locator(`//select[@id="createLeadForm_marketingCampaignId"]/option`);
            const ddcount = await marketingDropDownvalues.count()
            console.log(ddcount);

            for (let i = 0; i < ddcount; i++) {
                console.log(await marketingDropDownvalues.nth(i).innerText());
            }

            await page.locator(`//select[@id="createLeadForm_industryEnumId"]`).selectOption({ index: 6 });
            await page.locator(`//select[@id="createLeadForm_currencyUomId"]`).selectOption({ value: "INR" });
            await page.locator(`//select[@id="createLeadForm_generalCountryGeoId"]`).selectOption({ label: "India" });
            await page.locator(`//select[@id="createLeadForm_generalStateProvinceGeoId"]`).selectOption({ label: "ANDHRA PRADESH" });

            // Getting dropdown values and count 
            const listofStates = page.locator(`//select[@id="createLeadForm_generalStateProvinceGeoId"]/option`)
            const countofstates = await listofStates.count();
            console.log(countofstates);
            for (let i = 0; i < countofstates; i++) {
                console.log(await listofStates.nth(i).innerText())

            }

            await page.locator(`//input[@class="smallSubmit"]`).click();
   



        })
    }
})