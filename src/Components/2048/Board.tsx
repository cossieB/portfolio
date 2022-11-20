import { AnimatePresence } from 'framer-motion';
import styles from './2048.module.scss';
import { Props2048, ControlElem } from './ControlElem';

interface P {
    array: Props2048[]
}

export function Board({ array }: P) {
    return (
        <div className={styles.board}>
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
