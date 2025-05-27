import { useEffect, useState } from 'react';
import { fetchRandomEdits } from '../../../api/editsApi';
import EditModal from '../../../components/EditModal/EditModal';
import './RandomEditsList.sass';

export default function RandomEditsList({ currentUser }) {
    const [edits, setEdits] = useState([]);
    const [selectedEdit, setSelectedEdit] = useState(null);

    useEffect(() => {
        fetchRandomEdits()
            .then((data) => setEdits(data))
            .catch((err) => console.error('Ошибка при загрузке эдитов:', err));
    }, []);

    const handleCloseModal = () => {
        setSelectedEdit(null);
    };

    const handleToggleFavorite = (editId, add) => {
        // Здесь должна быть логика добавления/удаления из избранного с запросом на API
        console.log(
            editId,
            add ? 'Добавить в избранное' : 'Удалить из избранного'
        );
    };

    return (
        <section className="random-edits-list">
            <h3>Рандомные эдиты</h3>
            {edits.length === 0 ? (
                <p className="no-edits">Эдитов пока нет</p>
            ) : (
                <div className="cards-container">
                    {edits.map((edit) => (
                        <div
                            key={edit._id}
                            className="edit-card"
                            title={edit.title}
                            style={{
                                backgroundImage: `url(https://img.youtube.com/vi/${edit.video}/hqdefault.jpg)`,
                                cursor: 'pointer',
                            }}
                            onClick={() => setSelectedEdit(edit)}
                        />
                    ))}
                </div>
            )}

            {selectedEdit && (
                <EditModal
                    edit={selectedEdit}
                    currentUser={currentUser}
                    onClose={handleCloseModal}
                    onToggleFavorite={handleToggleFavorite}
                />
            )}
        </section>
    );
}
