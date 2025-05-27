import './Filters.sass';

export default function Filters({
    tags,
    selectedTag,
    onSelectTag,
    totalEditsCount,
}) {
    return (
        <div className="filters">
            <h4>Фильтры по тегам</h4>
            <div className="tags-list">
                <button
                    className={`tag-btn ${
                        selectedTag === null ? 'active' : ''
                    }`}
                    onClick={() => onSelectTag(null)}
                    aria-label="Сбросить фильтр"
                >
                    Все ({totalEditsCount})
                </button>
                {tags.map(({ tag, count }) => (
                    <button
                        key={tag}
                        className={`tag-btn ${
                            selectedTag === tag ? 'active' : ''
                        }`}
                        onClick={() => onSelectTag(tag)}
                    >
                        #{tag} ({count})
                    </button>
                ))}
            </div>
        </div>
    );
}
