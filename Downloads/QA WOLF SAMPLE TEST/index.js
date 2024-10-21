// EDIT THIS FILE TO COMPLETE ASSIGNMENT QUESTION 1
const { chromium } = require("playwright");

// Function to launch the browser and create a new context
async function launchBrowser() {
  try {
    console.log("Launching browser...");
    const browser = await chromium.launch({ headless: false });
    const context = await browser.newContext();
    return { browser, context };
  } catch (error) {
    console.error("Error launching browser:", error);
  }
}

// Function to navigate to the page and extract article timestamps
async function extractArticles(page) {
  try {
    console.log("Navigating to Hacker News...");
    await page.goto("https://news.ycombinator.com/newest");

    console.log("Extracting article timestamps...");
    let articles = await page.$$eval('.age', elements =>
      elements.slice(0, 100).map(el => el.innerText)
    );

    // Deduplicate articles before parsing timestamps
    articles = Array.from(new Set(articles));

    // Test case: Ensure articles are found
    if (articles.length === 0) {
      console.error("No articles found.");
      return [];
    }

    // Test case: Handle malformed or unexpected timestamps
    const malformedArticles = articles.filter(time => !time.includes(' '));
    if (malformedArticles.length > 0) {
      console.error("Malformed timestamps found:", malformedArticles);
    }

    return articles;
  } catch (error) {
    console.error("Error extracting articles:", error);
  }
}

// Function to parse timestamps into comparable date objects
function parseTimestamps(articles) {
  console.log("Parsing timestamps...");
  return articles.map(time => {
    try {
      const [value, unit] = time.split(' ');
      const now = new Date();
      let date = new Date(now);

      if (unit.includes('minute')) date.setMinutes(now.getMinutes() - parseInt(value));
      if (unit.includes('hour')) date.setHours(now.getHours() - parseInt(value));
      if (unit.includes('day')) date.setDate(now.getDate() - parseInt(value));

      // Additional time units (e.g., seconds, weeks, months)
      if (unit.includes('second')) date.setSeconds(now.getSeconds() - parseInt(value));
      if (unit.includes('week')) date.setDate(now.getDate() - parseInt(value) * 7);
      if (unit.includes('month')) date.setMonth(now.getMonth() - parseInt(value));

      return date;
    } catch (error) {
      console.error(`Error parsing timestamp: ${time}`);
      return new Date();  // Return current time if parsing fails
    }
  });
}

// Function to check if articles are sorted in reverse chronological order and identify duplicates
function checkIfSorted(parsedArticles, originalArticles) {
  console.log("Checking if articles are sorted...");
  let isSorted = true;
  let duplicatesFound = false;
  const seenTimestamps = new Set();

  for (let i = 0; i < parsedArticles.length; i++) {
    // Log the parsed dates for inspection
    console.log(`Parsed article ${i}: ${parsedArticles[i].toISOString()} from original article: ${originalArticles[i]}`);

    // Check for duplicates by comparing timestamps
    if (seenTimestamps.has(parsedArticles[i].getTime())) {
      console.log(`Duplicate article found: ${originalArticles[i]}`);
      duplicatesFound = true;
    }
    seenTimestamps.add(parsedArticles[i].getTime());

    // Check sorting: Allow minor differences for articles with the same relative timestamp
    if (i > 0 && parsedArticles[i].getTime() > parsedArticles[i - 1].getTime()) {
      const timeDifference = Math.abs(parsedArticles[i].getTime() - parsedArticles[i - 1].getTime());
      if (timeDifference > 1000) {  // Allow a 1-second difference for minor timing discrepancies
        console.log(`Article ${i} (${parsedArticles[i].toISOString()}) is newer than Article ${i-1} (${parsedArticles[i - 1].toISOString()})`);
        isSorted = false;
        break;
      }
    }
  }

  if (duplicatesFound) {
    console.log("Duplicate articles were found.");
  }

  return isSorted;
}

// Main function that ties everything together
async function sortHackerNewsArticles() {
  const { browser, context } = await launchBrowser();
  const page = await context.newPage();

  const articles = await extractArticles(page);
  const parsedArticles = parseTimestamps(articles);

  // Check if articles are sorted and log duplicates
  const isSorted = checkIfSorted(parsedArticles, articles);

  if (isSorted) {
    console.log("The articles are sorted in reverse chronological order.");
  } else {
    console.log("The articles are not sorted correctly.");
  }

  // Pause the script to allow developers to inspect logs and browser
  console.log("Pausing for developer inspection...");
  await page.pause(); // This will keep the browser open and allow inspection

  await browser.close();
}

// Run the main function
(async () => {
  await sortHackerNewsArticles();
})();
