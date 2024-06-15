
import '../css/Resources.css';
import { saveData } from './SaveSystem.jsx';

export function renderResources() {
    return (
        <div id="resources">
            <h2>Resources</h2>
            <details open>
                <summary>Energy</summary>
                <div className={'energy'}>
                    ⚡{saveData.energy.toLocaleString('en-US')}&nbsp;
                </div>
            </details>
        </div>
    );
}