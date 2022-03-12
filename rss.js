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
        res.end(`${now.toLocaleString("fr-FR")} \nTwitter account: ${twitter_account} -  ${result.length} tweets`);
    })
    .listen(8080);

// http://127.0.0.1:8080/?from=playlostark

async function tweet2rss(twitter_account) {
    const browser = await puppeteer.launch({ defaultViewport: null });
    const page = await browser.newPage();
    await page.setCacheEnabled(false);
    let width = 1080;
    let height = 1920;
    await page.setViewport({ width, height });
    await page.goto('https://twitter.com/' + twitter_account, {
        headless: true,
        waitUntil: 'networkidle2',
    });


    let html = await page.evaluate(() => { return document.documentElement.innerHTML; });
    const regexp = /<span class="css-901oao css-16my406 r-poiln3 r-bcqeeo r-qvutc0">(.*)<\/span>/gm;

    if (html !== undefined) {
        // html = html.split('<h1')[1];
        // html = html.split('</header>')[0];
        result = [...html.matchAll(regexp)];

        for (let index = 0; index < result.length; ++index) {
            // console.log(result[index]);
        }
    }


    await page.screenshot({ path: 'tweets.png' });
    await browser.close();
    return result;
}