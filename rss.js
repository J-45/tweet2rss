const http = require('http');
const url = require('url');
const puppeteer = require('puppeteer-extra');
const StealthPlugin = require('puppeteer-extra-plugin-stealth');
puppeteer.use(StealthPlugin());
var browser = null;
var page = null;

(async() => {

    browser = await puppeteer.launch({ defaultViewport: null });
    [page] = await browser.pages();


    http.createServer(async function(req, res) {
        const queryObject = url.parse(req.url, true).query;
        let twitter_account = queryObject.from;
        let tweets = [];

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

        if (html !== undefined) {
            result = [...html.matchAll(regexp)];
            for (let index = 0; index < result.length; ++index) {
                let post = result[index][1].trim()
                console.log(`>>>${post}<<<`);
                tweets.push(post);
            }
        }
        await page.screenshot({ path: 'tweets.png' });

        let now = new Date();
        console.log(now, queryObject);
        let rss = `<?xml version="1.0" encoding="UTF-8" ?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
<channel>
<title>${twitter_account}'s tweets</title>
<description>Twitter@${twitter_account}</description>
<link>https://twitter.com/${twitter_account}</link>
<atom:link href="http://127.0.0.1:8080/?from=${twitter_account}" rel="self" type="application/rss+xml"></atom:link>\n\n`;
<<<<<<< HEAD
        for (let index = 0; index < tweets.length; ++index) {
            let post = tweets[index];
            rss += `<item>
<title>${post.slice(0, 100)}</title>
<description>${post}</description>
=======
        for (let index = 0; index < result.length; ++index) {
            let post = result[index];
            rss += `<item>
    <title>${post.slice(0, 100)}</title>
    <description>${post}</description>
>>>>>>> cedb82188ef43e9b8863ef2979d5a53cff2e4778
<guid>http://127.0.0.1:8080/?from=${twitter_account}_${post.length}</guid>
</item>`;
        }
        rss += `\n\n</channel>
</rss>`;
        console.log(`${now.toLocaleString("fr-FR")} == Twitter account: ${twitter_account} - ${result.length} tweets`);
        res.end(rss);
<<<<<<< HEAD
    }).listen(8080);


    // await browser.close();
})();
=======
    })
    .listen(8080);

async function tweet2rss(page, twitter_account) {
    let tweets = [];

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


    if (html !== undefined) {
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
>>>>>>> cedb82188ef43e9b8863ef2979d5a53cff2e4778
