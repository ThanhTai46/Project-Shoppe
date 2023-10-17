import { useEffect, useRef } from "react";
import VideoComp from "./VideoComp";

export default function Video() {
    const videoRef = useRef<any>(null)
    console.log("🚀 ~ file: index.tsx:6 ~ Video ~ videoRef:", videoRef.current)

    const playVideo = () => {
        videoRef && videoRef?.current?.play()
    }

    const pauseVideo = () => {
        videoRef && videoRef?.current?.pause()
    }

    return (
        <div>
            <VideoComp ref={videoRef} />
            <button onClick={playVideo}>Play</button>
            <button onClick={pauseVideo}>Pause</button>
        </div>
    )
}