import { Parrafo } from '../../atomos/Parrafo'
import './VideoPlayer.css'

export const VideoPlayer = ({
  videoUrl,
  videoTitle,
  videoLikes,
  className = 'videoPlayer',
}) => {
  return (
    <div className={className}>
      <iframe
        src={videoUrl}
        title={videoTitle}
        allowFullScreen={true}
        loading="lazy"
      />
      <div>
        <Parrafo text={videoTitle} variante="variantMain" />
        <Parrafo text={`${videoLikes} views`} variante="variantMinor" />
      </div>
    </div>
  )
}
