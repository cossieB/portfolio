import { AnimatePresence } from 'framer-motion';
import styles from './2048.module.scss';
import { Props2048, ControlElem } from './ControlElem';

interface P {
    array: Props2048[]
    move?: (direction: 'up' | 'down' | 'left' | 'right') => void 
}

export function Board({ array, move }: P) {
    let x1: number;
    let y1: number;

    function handleTouchEnd(e: React.TouchEvent<HTMLDivElement>) {
        const {clientX: x2, clientY: y2} = e.changedTouches.item(0)
        const m = (y1 - y2) / (x2 - x1) // High school gradient formula. clientY starts from the top. That's why I swapped y1 and y2 
        const arctan = Math.atan(m)
        const angle = arctan * 180 / Math.PI;
        if (angle > -30 && angle < 30) {
            if (x2 > x1) {
                move!('right')
            }
            else {
                move!("left")
            }
        }
        else if ( (angle > 60 && angle <= 90) || (angle < -60 && angle > -90)  ) {
            if (y2 < y1) {
                move!("up")
            }
            else {
                move!("down")
            }
        }
         
        
    }
    return (
        <div className={styles.board} 
            onTouchStart={e => {
                x1 = e.touches.item(0).clientX;
                y1 = e.touches.item(0).clientY;
            }}
            onTouchEnd={handleTouchEnd}
            >
            {new Array(16).fill(0).map((_, i) => <div className={styles.block} key={i} />)}
            <AnimatePresence>
                {array.map(item => <ControlElem
                    id={item.id}
                    value={item.value}
                    key={item.id}
                    top={item.top}
                    left={item.left} />
                )}
            </AnimatePresence>
        </div>);
}
