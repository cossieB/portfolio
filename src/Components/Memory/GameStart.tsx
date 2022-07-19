import { useState } from "react"
import Card from "./Card"
import Counter from "./Counter"
import { P54424 } from "./interfaces"
import { cards } from "./svgs"

export default function GameStart(props: P54424) {
    const { time, setTime, setFinished, setFlips } = props

    const [activeCards, setActiveCards] = useState<{ id: string, value: string }[]>([])
    const [matches, setMatches] = useState<string[]>([])
    const flipAudio = document.getElementById('flipAudio') as HTMLAudioElement
    const correctAudio = document.getElementById('correctAudio') as HTMLAudioElement

    function showCard(e: React.MouseEvent<HTMLDivElement, MouseEvent>) {
        let id = e.currentTarget.id;
        let value = (e.currentTarget.innerHTML);
        let obj = { id, value }
        let audio: HTMLAudioElement = flipAudio
        if (activeCards.length == 2) {
            setActiveCards([obj])
        }

        if (activeCards.length < 2 && !matches.includes(id) && !activeCards.some(item => item.id == id)) {

            setActiveCards(prev => [...prev, obj])
            e.currentTarget.classList.toggle('hide');

            if (value == activeCards[0]?.value) {
                audio = correctAudio
                e.currentTarget.classList.add('matched')
                document.getElementById(activeCards[0].id)?.classList.add('matched')
                setMatches(prev => [...prev, id, activeCards[0].id]);
            }
        }
        audio.play()
        setFlips(f => f + 1)
    }
    if (matches.length == 16) setFinished(true)
    return (
        <>
            <Counter time={time} setTime={setTime} />
            <div id="memoryBlock">
                {cards.map((card, idx) => <Card key={idx} activeCards={activeCards} matches={matches} idx={idx} showCard={showCard} card={card} />)}
            </div>
            <audio id="flipAudio" src="https://cdn.videvo.net/videvo_files/audio/premium/audio0124/watermarked/LampSwitchFlipOno%20TE2035601_preview.mp3"/>
            <audio id="correctAudio" src="https://upload.wikimedia.org/wikipedia/commons/4/4e/Comic_spring_up_or_magic_trick.ogg"/>

        </>
    )
}