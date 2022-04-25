import { P01955 } from "./interfaces";

export default function Card({ card, showCard, idx, activeCards, matches }: P01955) {
    let active = activeCards.some(card => card.id == 'card' + idx);
    let match = matches.some(card => card == 'card' + idx)
    return (
        <div id={'card' + idx} onClick={showCard} style={{ backgroundColor: match ? 'green' : active ? 'thistle' : 'black' }} className="memoryCard hide flexCenter" >
            {card.html}
        </div>
    )
}