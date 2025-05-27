import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Sidebar from '../../components/Sidebar/Sidebar';
import { fetchEditById } from '../../api/editsApi';
import './EditPage.sass';

export default function EditPage() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [edit, setEdit] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // Форматируем дату в удобный вид
    const formatDate = (dateStr) => {
        const d = new Date(dateStr);
        return d.toLocaleDateString('ru-RU', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
        });
    };

    useEffect(() => {
        setLoading(true);
        setError(null);
        fetchEditById(id)
            .then((data) => {
                setEdit(data);
                setLoading(false);
            })
            .catch((err) => {
                setError(err.message);
                setLoading(false);
            });
    }, [id]);

    return (
        <main className="edit-detail-page">
            <Sidebar />
            <div className="edit-detail-content">
                <button className="back-button" onClick={() => navigate(-1)}>
                    ← Назад
                </button>

                {loading && <p>Загрузка...</p>}
                {error && <p className="error">{error}</p>}

                {edit && (
                    <article className="edit-card">
                        <h1 className="edit-title">{edit.title}</h1>
                        <p className="edit-author">
                            Автор: <b>{edit.author}</b>
                        </p>

                        <div className="video-wrapper">
                            <iframe
                                src={`https://www.youtube.com/embed/${edit.video}`}
                                allowFullScreen
                                title={`Видео к эдиту: ${edit.title}`}
                            />
                        </div>

                        <p className="edit-tags">
                            Теги:{' '}
                            {edit.tags && edit.tags.length > 0
                                ? edit.tags.map((tag, i) => (
                                      <span key={i} className="tag">
                                          #{tag}
                                      </span>
                                  ))
                                : '— нет тегов —'}
                        </p>

                        <p className="edit-meta">
                            Создан:{' '}
                            <time dateTime={edit.createdAt}>
                                {formatDate(edit.createdAt)}
                            </time>
                        </p>
                        <p className="edit-meta">
                            Обновлён:{' '}
                            <time dateTime={edit.updatedAt}>
                                {formatDate(edit.updatedAt)}
                            </time>
                        </p>
                        <p className="edit-meta">
                            ID эдита: <code>{edit._id}</code>
                        </p>
                    </article>
                )}
            </div>
        </main>
    );
}
