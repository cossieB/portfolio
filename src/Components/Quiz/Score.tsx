import styles from "./quiz.module.scss";

interface Props {
    idx: number,
    item: {
        name: string,
        score: number,
        date: Date
    }
}

export default function ({ idx, item }: Props) {
    return (
        <div className={styles.leadership} key={idx}>
            <div><strong>{item.name}</strong></div>
            <div>{item.score}</div>
            <div>{item.date.toLocaleString('en-za', { day: "2-digit", month: 'short', year: 'numeric' }) + " " + item.date.toLocaleTimeString('en-za')}</div>
        </div>
    )
}