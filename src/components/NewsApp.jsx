import React, { useEffect, useState } from 'react';
import newsapi from '../newsapi.js';
import '../components-style/newsapi.css';

import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const NewsApp = ({ quary }) => {
    const [news, setNews] = useState([]);
    const [breakingNews, setBreakingnews] = useState([]);
    const [error, setError] = useState(null);

   
    var settings = {
        dots: false,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
    };

    
    const truncateText = (text, maxLength) => {
        if (!text) return "N/A"; 
        return text.length > maxLength ? `${text.slice(0, maxLength)}...` : text;
    };

   
    const fetchNews = async (quary) => {
        try {
            const data = await newsapi(quary, "everything");
            const hn = await newsapi(quary, "top-headlines");
            setNews(data?.articles?.filter((article) => article?.title && article?.description && article?.urlToImage) || []);
            setBreakingnews(hn?.articles?.filter((article) => article?.title && article?.description && article?.urlToImage) || []);
            console.log(breakingNews);
        } catch (error) {
            console.error(error.message || error);
            setError(error.message || "Error fetching news");
        }
    };

    useEffect(() => {
        if (quary) {
            fetchNews(quary);
        }
    }, [quary]);

    return (
        <div className="newsapp">
            {error && <p className="error">Error: {error}</p>}
            {breakingNews.length > 0 ? (
                <>
                   
                    <Slider {...settings}>
                        {breakingNews.map((article, i) => (
                            <div key={i} className="highlight-card">
                                
                                <div className="highlight-img-container">
                                    <img className="highlight-img" src={article?.urlToImage} alt={article?.title} />
                                </div>

                                <div className="highlight-content">
                                    <h2>{truncateText(article?.title, 100)}</h2>
                                    <p>{truncateText(article?.description, 200)}</p>
                                    <span>By: {article?.author || "Unknown"}</span>
                                    <span>Published: {new Date(article?.publishedAt).toLocaleString()}</span>
                                    <a href={article?.url} target="_blank" rel="noopener noreferrer" className="read-more-btn">
                                        Read more
                                    </a>
                                </div>
                            </div>
                        ))}
                    </Slider>

                    
                    <div className="news-articles">
                        {news.slice(1).map((article, i) => (
                            <div key={i} className="news-card">
                                <img className="news-img" src={article?.urlToImage} alt={article?.title} />
                                <div className="news-content">
                                    <h3>{truncateText(article?.title, 50)}</h3>
                                    <p>{truncateText(article?.description, 100)}</p>
                                    <span>By: {article?.author || "Unknown"}</span>
                                    <span>Published: {new Date(article?.publishedAt).toLocaleString()}</span>
                                    <a href={article?.url} target="_blank" rel="noopener noreferrer" className="read-more-btn">
                                        Read more
                                    </a>
                                </div>
                            </div>
                        ))}
                    </div>
                </>
            ) : (
                <p className="loading">Loading...</p>
            )}
        </div>
    );
};

export default NewsApp;
