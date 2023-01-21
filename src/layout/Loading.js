import { Figure } from 'react-bootstrap';
import styles from './Loading.module.css'

function Loading() {
    return (
        <div className={styles.loader_container}>
            
            <Figure>
                <Figure.Image
                    width={500}
                    height={500}
                    alt="Carregando..."
                    src="https://upload.wikimedia.org/wikipedia/commons/b/b1/Loading_icon.gif"
                />
            </Figure>
        </div>
    )
}

export default Loading;