#!/usr/bin/env bun
import { scrapeSite } from './script';
import yargs from 'yargs';
import { hideBin } from 'yargs/helpers';

interface Argv {
    _: (string | number)[];
    $0: string;
}

const argv = yargs(hideBin(process.argv))
    .demandCommand(1, 'You need to provide a URL to scrape')
    .argv as unknown as Argv;

const { _: [url] } = argv;

const fullUrl = (url as string).startsWith('http') ? url : `https://${url}`;

console.log(`Scraping URL: ${fullUrl}`);

async function runScraper() {
    try {
        const result = await scrapeSite(fullUrl as string, 'scrapped');
        console.log('Scraping result:', result);
    } catch (error) {
        console.error('Error during scraping:', error);
    }
}

// Run the scraper initially and then every 3 minutes
runScraper();
setInterval(runScraper, 180000); // 180000 milliseconds = 3 minutes
