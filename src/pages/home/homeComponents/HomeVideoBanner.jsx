import { useEffect, useRef } from 'react';
import VideoBanner from '../../../assets/videos/homeBanner.mp4';
import styles from '../homeCss/homeVideoBaneer.module.css'

export default function HomeVideoBanner() {
    const videoRef = useRef(null);

    useEffect(() => {
        videoRef.current?.play().catch(() => console.log("Автовоспроизведение заблокировано"));
    }, []);

    return (
        <div className={styles.homeBannerVideo}>
            <video ref={videoRef} src={VideoBanner} autoPlay muted playsInline loop></video>
        </div>
    );
}
