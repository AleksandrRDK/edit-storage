import EditCard from '../EditCard/EditCard';
import './EditsList.sass';

export default function EditsList({ edits }) {
    return (
        <div className="all-edits-list">
            {edits.length === 0 ? (
                <p className="no-results">Нет эдитов по вашему запросу.</p>
            ) : (
                edits.map((edit) =>
                    edit ? <EditCard key={edit._id} edit={edit} /> : null
                )
            )}
        </div>
    );
}
