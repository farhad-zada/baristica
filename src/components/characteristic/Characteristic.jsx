import ProgressBar from "../progressBar/ProgressBar"
import style from './characteristic.module.css'

const Characteristic = ({content, width= '32%'}) => {
    return(
        <div className={`${style.characteristic} flex column g8`} style={{width:width}}>
            <ProgressBar progress={content?.progress ? content.progress : 0} />
            <span className="fw400 f12 darkGrey_color">{content?.text ? content.text : 'Кислотность'}</span>
        </div>
    )
}

export default Characteristic