import { MiniVideoContainer } from './MiniVideo/MiniVideoContainer'
import './Sidebar.css'

export const SidebarVideos = ({ videos }) => {
  return (
    <aside className="sidebar-videos">
      {videos.map((video, idx) => (
        <MiniVideoContainer key={idx} data={video} />
      ))}
    </aside>
  )
}
