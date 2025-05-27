import { useState, useMemo } from 'react';
import './FavoritesSection.sass';

export default function FavoritesSection({ favorites }) {
    const [sortBy, setSortBy] = useState('date');
    const [selectedVideo, setSelectedVideo] = useState(null);

    const topTags = useMemo(() => {
        const tagCounts = favorites
            .flatMap((edit) => edit.tags)
            .reduce((acc, tag) => {
                acc[tag] = (acc[tag] || 0) + 1;
                return acc;
            }, {});

        return Object.entries(tagCounts)
            .sort((a, b) => b[1] - a[1])
            .slice(0, 3)
            .map(([tag]) => tag);
    }, [favorites]);

    const sortedFavorites = useMemo(() => {
        const arr = [...favorites];
        if (sortBy === 'date') {
            return arr.sort((a, b) => new Date(b.date) - new Date(a.date));
        }
        if (sortBy === 'title') {
            return arr.sort((a, b) => a.title.localeCompare(b.title));
        }
        if (sortBy === 'author') {
            return arr.sort((a, b) => a.author.localeCompare(b.author));
        }
        return arr;
    }, [favorites, sortBy]);

    const getEmbedUrl = (url) => {
        if (!url.includes('embed')) {
            const videoIdMatch = url.match(/v=([^&]+)/);
            if (videoIdMatch) {
                return `https://www.youtube.com/embed/${videoIdMatch[1]}`;
            }
        }
        return url;
    };

    return (
        <div className="favorites-section">
            <div className="favorites-header">
                <div className="favorites-section__header__wrapper">
                    <h3>Избранные эдиты</h3>
                </div>
                <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                >
                    <option value="date">По дате</option>
                    <option value="title">По названию</option>
                    <option value="author">По автору</option>
                </select>
            </div>

            <div className="stats">
                <span className="total">Всего: {favorites.length}</span>
                <div className="top-tag">
                    Топ теги:
                    <div className="tags-list">
                        {topTags.map((tag) => (
                            <span key={tag}>{tag}</span>
                        ))}
                    </div>
                </div>
            </div>

            <div className="favorites-list">
                {sortedFavorites.map((edit) => (
                    <div
                        key={edit.id}
                        className="edit-card"
                        onClick={() => setSelectedVideo(edit.video)}
                    >
                        <img src={edit.preview} alt={edit.title} />
                        <div className="info">
                            <h4>{edit.title}</h4>
                            <p>{edit.author}</p>
                            <span>{edit.date}</span>
                        </div>
                    </div>
                ))}
            </div>

            {selectedVideo && (
                <div className="modal" onClick={() => setSelectedVideo(null)}>
                    <div
                        className="modal-content"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <iframe
                            width="560"
                            height="315"
                            src={getEmbedUrl(selectedVideo)}
                            title="YouTube video"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                            allowFullScreen
                        ></iframe>
                    </div>
                </div>
            )}
        </div>
    );
}
