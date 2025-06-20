import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { fetchMyEdits } from '../../../api/editsApi';
import Loading from '../../../components/Loading/Loading';
import { Link } from 'react-router-dom';
import { useUser } from '../../../context/UserContext';
import Sidebar from '../../../components/Sidebar/Sidebar';
import './MyEdits.sass';

const MyEdits = () => {
    const [edits, setEdits] = useState([]);
    const [editsLoading, setEditsLoading] = useState(true);
    const [error, setError] = useState(null);

    const navigate = useNavigate();
    const { user, loading: userLoading } = useUser();

    useEffect(() => {
        if (user?._id) {
            fetchMyEdits()
                .then((data) => {
                    setEdits(data);
                    setEditsLoading(false);
                })
                .catch((err) => {
                    console.error('Ошибка загрузки эдитов:', err);
                    setError('Не удалось загрузить эдиты');
                    setEditsLoading(false);
                });
        }
    }, [user]);

    const handleEditClick = (id) => {
        navigate(`/edit/${id}/modify`);
    };

    if (userLoading) return <Loading />;

    if (!user) {
        return (
            <main className="my-edits-wrapper">
                <Sidebar />
                <div className="void__field"></div>
                <div className="login-required">
                    <p>Пожалуйста, войдите в систему, чтобы добавить эдит.</p>
                </div>
            </main>
        );
    }

    return (
        <div className="my-edits-wrapper">
            <Sidebar />
            <div className="my-edits__wrapper">
                <div className="void__field"></div>
                <div className="my-edits">
                    <h2>Мои эдиты</h2>

                    {editsLoading ? (
                        <Loading />
                    ) : error ? (
                        <p className="error">{error}</p>
                    ) : edits.length === 0 ? (
                        <p>Вы ещё не добавили ни одного эдита</p>
                    ) : (
                        <ul>
                            {edits.map((edit) => (
                                <li key={edit._id} className="edit-card">
                                    <div className="info">
                                        <h3>
                                            Название: <span>{edit.title}</span>
                                        </h3>
                                        <div className="tags__wrapper">
                                            Теги:
                                            <p className="tags">
                                                {edit.tags?.join(', ')}
                                            </p>
                                        </div>
                                    </div>
                                    <div className="button__wrapper">
                                        <Link
                                            to={`/edit/${edit._id}`}
                                            className="details-btn"
                                        >
                                            Перейти на страницу эдита
                                        </Link>
                                        <button
                                            onClick={() =>
                                                handleEditClick(edit._id)
                                            }
                                        >
                                            Изменить
                                        </button>
                                    </div>
                                </li>
                            ))}
                        </ul>
                    )}
                </div>
            </div>
        </div>
    );
};

export default MyEdits;
