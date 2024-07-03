import * as cheerio from 'cheerio';
import puppeteer from 'puppeteer';
import * as fs from 'fs';
import * as path from 'path';

const MAX_RETRIES = 3;
const TIMEOUT = 120000; // Increase timeout to 120 seconds

// Function to fetch HTML content using Puppeteer with retries
export const fetchHTMLWithPuppeteer = async (url: string): Promise<string> => {
    for (let attempt = 1; attempt <= MAX_RETRIES; attempt++) {
        const browser = await puppeteer.launch({
            headless: true,
            args: [
                '--disable-http2',
                '--no-sandbox',
                '--disable-setuid-sandbox',
                '--disable-gpu', // Disable GPU acceleration
                '--disable-extensions', // Disable extensions
                '--disable-dev-shm-usage', // Overcome limited resource problems
                '--disable-software-rasterizer',
                '--disable-features=IsolateOrigins,site-per-process', // Disable site-per-process
            ]
        });
        const page = await browser.newPage();

        // Block unnecessary resources
        await page.setRequestInterception(true);
        page.on('request', (request) => {
            const resourceType = request.resourceType();
            if (resourceType === 'image' || resourceType === 'stylesheet' || resourceType === 'font') {
                request.abort();
            } else {
                request.continue();
            }
        });

        try {
            await page.goto(url, { waitUntil: 'domcontentloaded', timeout: TIMEOUT });
            await page.waitForSelector('table', { timeout: TIMEOUT }); // Wait for the table selector

            const html = await page.content();
            await browser.close();
            return html;
        } catch (error) {
            console.error(`Error fetching data (attempt ${attempt}/${MAX_RETRIES}):`, error);
            await browser.close();
            if (attempt === MAX_RETRIES) {
                throw error;
            }
        }
    }
    throw new Error('Failed to fetch HTML after multiple attempts');
};

// Function to extract data from the table
export const getTableData = (html: string): { symbol: string, name: string, price: string, change: string, percentageChange: string, volume: string }[] => {
    const $ = cheerio.load(html);
    const data: { symbol: string, name: string, price: string, change: string, percentageChange: string, volume: string }[] = [];

    $('table tbody tr').each((index, element) => {
        const symbol = $(element).find('td[aria-label="Symbol"]').text().trim();
        const name = $(element).find('td[aria-label="Name"]').text().trim();
        const price = $(element).find('td[aria-label="Price (Intraday)"]').text().trim();
        const change = $(element).find('td[aria-label="Change"]').text().trim();
        const percentageChange = $(element).find('td[aria-label="% Change"]').text().trim();
        const volume = $(element).find('td[aria-label="Volume"]').text().trim();

        console.log('Extracted data:', { symbol, name, price, change, percentageChange, volume }); // Debug: Log each extracted data

        // Only push data that has essential fields
        if (symbol && name && price && change && percentageChange && volume) {
            data.push({ symbol, name, price, change, percentageChange, volume });
        }
    });

    return data;
};

// Function to save data
export const saveTableData = (data: { symbol: string, name: string, price: string, change: string, percentageChange: string, volume: string }[], parentDir: string) => {
    const dirPath = path.join(parentDir, 'finance');
    if (!fs.existsSync(dirPath)) {
        fs.mkdirSync(dirPath, { recursive: true });
    }
    const filePath = path.join(dirPath, 'finance_data.json');
    fs.writeFileSync(filePath, JSON.stringify(data, null, 2), 'utf-8');
    console.log(`Finance data saved to ${filePath}`);
};

// Function to scrape the site
export async function scrapeSite(url: string, parentDir: string): Promise<any> {
    const rawHTML = await fetchHTMLWithPuppeteer(url);

    if (!rawHTML) {
        console.log('Failed to fetch HTML');
        return [];
    }

    const tableData = getTableData(rawHTML);
    saveTableData(tableData, parentDir);

    return tableData;
}
