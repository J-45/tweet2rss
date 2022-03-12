const http = require('http');
const url = require('url');
const puppeteer = require('puppeteer-extra');
const StealthPlugin = require('puppeteer-extra-plugin-stealth');
puppeteer.use(StealthPlugin());
var now = "";

http.createServer(async function(req, res) {

        const queryObject = url.parse(req.url, true).query;
        let twitter_account = queryObject.from;
        console.log(queryObject);
        result = await tweet2rss(twitter_account);
        let now = new Date();

        let rss = "";
        for (let index = 0; index < result.length; ++index) {
            let post = result[index];
            rss += `>>>${post}<<<\n\n`;
        }
        rss += `\n\n${now.toLocaleString("fr-FR")} \nTwitter account: ${twitter_account} -  ${result.length} tweets`;

        res.end(rss);
    })
    .listen(8080);

// http://127.0.0.1:8080/?from=playlostark

async function tweet2rss(twitter_account) {
    let tweets = [];
    const browser = await puppeteer.launch({ defaultViewport: null });
    const page = await browser.newPage();
    await page.setExtraHTTPHeaders({
        'accept-language': 'fr-FR,cs;q=0.8'
    });
    await page.setCacheEnabled(false);
    let width = 1080;
    let height = 1920;
    await page.setViewport({ width, height });
    await page.goto('https://twitter.com/' + twitter_account, {
        headless: true,
        waitUntil: 'networkidle2',
    });

    let html = await page.evaluate(() => { return document.documentElement.outerHTML; });
    const regexp = /id="id__\w+"><span class="css-901oao css-16my406 r-poiln3 r-bcqeeo r-qvutc0">([^<]+)<\/span>/gm;
    // console.log(html.toString('utf8'));
    // return html.toString('utf8');
    if (html !== undefined) {
        // html = html.split(`<span class="css-901oao css-16my406 r-poiln3 r-bcqeeo r-qvutc0">J'aime</span>`)[1];
        // html = html.split('</header>')[0];
        // result = html.split('data-testid="tweet">');
        result = [...html.matchAll(regexp)];

        for (let index = 0; index < result.length; ++index) {
            let post = result[index][1].trim()
            console.log(`>>>${post}<<<`);
            tweets.push(post);
        }
    }


    await page.screenshot({ path: 'tweets.png' });
    await browser.close();
    return tweets;
}