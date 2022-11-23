import { P24235 } from "./interfaces";
import styles from './memory.module.scss';

export default function Leaders({ leaders, header }: P24235) {
    return (
        <div className={styles.leaderboardContainer}>
            {leaders.length > 0 && <h4> {header} </h4>}
            {leaders.length > 0 &&
                <div className={styles.leaderboard}>
                    {leaders.map(item =>
                        <div key={item.date.toString()} className={styles.leadership}>
                            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                <strong>{item.name}</strong>
                            </div>
                            <div className={styles.memscorediv} >
                                <div className={styles.memScores}>
                                    <div>Time: {item.time} </div>
                                    <div>Flips: {item.flips} </div>
                                </div>
                                <div>{item.date.toLocaleString('en-za', { day: "2-digit", month: 'short', year: 'numeric' }) + " " + item.date.toLocaleTimeString('en-za')}</div>
                                <div>{item.total}</div>
                            </div>
                        </div>)}
                </div>}
        </div>
    )
}