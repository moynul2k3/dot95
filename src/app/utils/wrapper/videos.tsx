"use client";

import React, { useEffect, useState } from "react";
import { CldVideoPlayer } from "next-cloudinary";
import "next-cloudinary/dist/cld-video-player.css";
import { Skeleton } from '@/components/ui/skeleton';

type VideoProps = {
  videoID: string;
};

const Video = ({ videoID }: VideoProps) => {
  const [isMuted, setIsMuted] = useState(true);
  const [isLoading, setLoading] = useState(true);

  // Use effect to toggle mute via native video element
	useEffect(() => {
		setLoading(false)
    const videoEl = document.querySelector(
      `#cld-player-${videoID} video`
    ) as HTMLVideoElement | null;

    if (videoEl) {
      videoEl.muted = isMuted;
    }
  }, [isMuted, videoID]);

  const toggleMute = () => setIsMuted((prev) => !prev);

	if (isLoading) {
		return (
			<Skeleton className='md:h-[500px] w-full rounded bg-black/70 flex justify-center items-center'>
				<i className='bx bx-play text-8xl'></i>
			</Skeleton>
		)
	}
	
	return (
    <div className="relative rounded">
      <CldVideoPlayer
        id={`cld-player-${videoID}`}
        width="1920"
        src={videoID}
        autoplay="on-scroll"
        muted={isMuted}
        controls={false}
        loop={true}
        className="md:rounded-lg rounded w-full h-auto"
      />
      <button
        onClick={toggleMute}
        className="absolute max-md:bottom-1.5 md:bottom-4 max-md:right-1.5 md:right-4 max-md:px-3 md:px-4 max-md:py-1 md:py-2 bg-black/50 text-white rounded hover:bg-black/70 transition-all duration-200 ease-in-out"
      >
				{ isMuted ? (
					<>
						🔇 <span className='max-md:hidden'>Unmute</span>
					</>
				) :
					<>
						🔊 <span className='max-md:hidden'>Mute</span>
					</>
				}
      </button>
    </div>
  );
};

export default Video;
