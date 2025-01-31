
const newsapi = async (quary , type) => {
    try {
        const news = await fetch(`https://newsapi.org/v2/${type}?q=${quary}&apiKey=f8532ad8207d416aa55bfefaced037ed`)
        const data = await news.json();
        return data;
    } catch (error) {
        console.log(error.message || error);
        return { articles: [] };
    }
}

export default newsapi;