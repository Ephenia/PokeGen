import '../css/Content.css';
import { saveData } from '../components/SaveSystem.jsx';

export function renderContent() {
    return (
        <>
            <button onClick={() => saveData.energy++}>⚡{saveData.energy.toLocaleString('en-US')}&nbsp;</button>
        </>
    )
}