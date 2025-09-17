import { useState } from 'react'
import SearchBar from '../SearchBar/SearchBar'
import { VideoPlayer } from '../VideoPlayer/VideoPlayer'
import './App.css'
import { SidebarVideos } from '../SideBarVideos/SideBarVideos'

import videos from '../../mock-data/videos.json'
import { PlayerController } from '../PlayerController/PlayerController'

const videoId = '0KSOMA3QBU0'
let initVideo = `https://www.youtube.com/embed/${videoId}`

function App() {
  const [selectedVideo, setSelectedVideo] = useState(initVideo)

  return (
    <div className="appContainer">
      <SearchBar className="searchBar" />
      <VideoPlayer
        className="videoPlayer"
        videoUrl={selectedVideo}
        videoTitle={'Queen'}
        videoLikes={'1 000 000'}
      />
      <PlayerController className="controls" />
      <SidebarVideos videos={videos} />
    </div>
  )
}

export default App
