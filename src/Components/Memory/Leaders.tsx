import { P24235 } from "./interfaces";

export default function Leaders({ leaders, header }: P24235) {
    return (
        <div className="leaderboardContainer">
            {leaders.length > 0 && <h4> {header} </h4>}
            {leaders.length > 0 &&
                <div className="leaderboard">
                    {leaders.map(item =>
                        <div key={item.date.toString()} className="leadership">
                            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                <strong>{item.name}</strong>
                            </div>
                            <div className="memscorediv" >
                                <div className="memScores">
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