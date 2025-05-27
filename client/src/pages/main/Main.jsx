import Sidebar from '../../components/Sidebar/Sidebar';
import EditOfTheDay from '../../components/main/EditOfTheDay/EditOfTheDay';
import RandomEditsList from '../../components/main/RandomEditsList/RandomEditsList';

import './Main.sass';

export default function Main() {
    return (
        <div className="main-page">
            <Sidebar />
            <main className="main-content">
                <EditOfTheDay />
                <RandomEditsList />
            </main>
        </div>
    );
}
