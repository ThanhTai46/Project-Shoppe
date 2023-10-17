import videoMp4 from "./file/Download.mp4"
import { forwardRef, useImperativeHandle, useRef } from "react"
const VideoComp = (props, ref: any) => {
    const videoRef = useRef<any>(null);

    useImperativeHandle(ref, () => ({
        play() {
            videoRef.current.play()
        },
        pause() {
            videoRef.current.pause()
        }
    }))
    return (
        <div>
            <video src={videoMp4} width={280} ref={videoRef} />
        </div>
    )
}
export default forwardRef(VideoComp)
