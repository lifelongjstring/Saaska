exports.handler = async function(event, context) {
    const appID = process.env.ADZUNA_APP_ID;
    const appKey = process.env.ADZUNA_APP_KEY;

    const res = await fetch(`https://api.adzuna.com/v1/api/jobs/gb/search/1?app_id=${appID}&app_key=${appKey}&results_per_page=20&what=javascript&where=Saskatoon`);
    const data = await res.json();

    return {
        statusCode: 200,
        body: JSON.stringify(data),
    }
}