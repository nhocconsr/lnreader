import cheerio from "react-native-cheerio";

const baseUrl = "https://freewebnovel.com/";

const popularNovels = async (page) => {
    let totalPages = 30;
    let url = baseUrl + "completed-novel/" + page;

    const result = await fetch(url);
    const body = await result.text();

    $ = cheerio.load(body);

    let novels = [];

    $(".li-row").each(function (result) {
        const novelName = $(this).find(".tit").text();
        const novelCover = $(this).find("img").attr("src");

        let novelUrl = $(this)
            .find("h3 > a")
            .attr("href")
            .replace(".html", "")
            .slice(1);

        const novel = {
            sourceId: 13,
            novelName,
            novelCover,
            novelUrl,
        };

        novels.push(novel);
    });

    return { totalPages, novels };
};

const parseNovelAndChapters = async (novelUrl) => {
    const url = `${baseUrl}${novelUrl.replace("/", "")}.html`;

    const result = await fetch(url);
    const body = await result.text();

    $ = cheerio.load(body);

    let novel = {};

    novel.sourceId = 13;

    novel.sourceName = "FreeWebNovel";

    novel.url = url;

    novel.novelUrl = novelUrl;

    novel.novelName = $("h1.tit").text();

    novel.novelCover = $(".pic > img").attr("src");

    novel.genre = $("[title=Genre]")
        .next()
        .text()
        .replace(/[\t\n]/g, "");

    novel.author = $("[title=Author]")
        .next()
        .text()
        .replace(/[\t\n]/g, "");

    novel.artist = null;

    novel.status = $("[title=Status]")
        .next()
        .text()
        .replace(/[\t\n]/g, "");

    let novelSummary = $(".inner").text().trim();
    novel.summary = novelSummary;

    let novelChapters = [];

    let latestChapter;

    $("h3.tit").each(function (res) {
        if ($(this).find("a").text() === novel.novelName) {
            latestChapter = $(this).next().find("span.s3").text().match(/\d+/);
        }
    });

    latestChapter = latestChapter[0];

    for (let i = 1; i <= parseInt(latestChapter); i++) {
        const chapterName = "Chapter " + i;

        const releaseDate = null;

        const chapterUrl = "chapter-" + i;

        const chapter = { chapterName, releaseDate, chapterUrl };

        novelChapters.push(chapter);
    }

    novel.chapters = novelChapters;

    return novel;
};

const parseChapter = async (novelUrl, chapterUrl) => {
    let novelId = novelUrl.replace("/", "");

    const url = `${baseUrl}${novelId}/${chapterUrl}.html`;

    const result = await fetch(url);
    const body = await result.text();

    $ = cheerio.load(body);

    let chapterName = $("h1.tit").text();

    let chapterText = $("div.txt").html();

    const chapter = {
        sourceId: 13,
        novelUrl,
        chapterUrl,
        chapterName,
        chapterText,
    };

    return chapter;
};

const searchNovels = async (searchTerm) => {
    const url = baseUrl + "search/";

    const formData = new FormData();
    formData.append("searchkey", searchTerm);

    const result = await fetch(url, {
        method: "POST",
        body: formData,
    });
    const body = await result.text();

    $ = cheerio.load(body);

    let novels = [];

    $(".li-row > .li > .con").each(function (result) {
        const novelName = $(this).find(".tit").text();
        const novelCover = $(this).find(".pic > a > img").attr("data-cfsrc");

        let novelUrl = $(this)
            .find("h3 > a")
            .attr("href")
            .replace(".html", "")
            .slice(1);

        novelUrl += "/";

        const novel = {
            sourceId: 13,
            novelName,
            novelCover,
            novelUrl,
        };

        novels.push(novel);
    });

    return novels;
};

const FreeWebNovelScraper = {
    popularNovels,
    parseNovelAndChapters,
    parseChapter,
    searchNovels,
};

export default FreeWebNovelScraper;
