import React, { useState, useEffect, useRef } from "react";

const Participant = ({ participant }) => {
  // console.log(participant.videoTracks)
  const [videoTracks, setVideoTracks] = useState([]);
  const [audioTracks, setAudioTracks] = useState([]);
  // const [audio, setAudio] = useState(false);

  const videoRef = useRef();
  const audioRef = useRef();

  const trackpubsToTracks = (trackMap) =>
    Array.from(trackMap.values())
      .map((publication) => publication.track)
      .filter((track) => track !== null);

  useEffect(() => {
    setVideoTracks(trackpubsToTracks(participant.videoTracks));
    setAudioTracks(trackpubsToTracks(participant.audioTracks));

    const trackSubscribed = (track) => {
      if (track.kind === "video") {
        setVideoTracks((videoTracks) => [...videoTracks, track]);
      } else if (track.kind === "audio") {
        setAudioTracks((audioTracks) => [...audioTracks, track]);
      }
    };

    const trackUnsubscribed = (track) => {
      if (track.kind === "video") {
        setVideoTracks((videoTracks) => videoTracks.filter((v) => v !== track));
      } else if (track.kind === "audio") {
        setAudioTracks((audioTracks) => audioTracks.filter((a) => a !== track));
      }
    };

    participant.on("trackSubscribed", trackSubscribed);
    participant.on("trackUnsubscribed", trackUnsubscribed);

    return () => {
      setVideoTracks([]);
      setAudioTracks([]);
      participant.removeAllListeners();
    };
  }, [participant]);

  useEffect(() => {
    const videoTrack = videoTracks[0];
    if (videoTrack) {
      videoTrack.attach(videoRef.current);
      return () => {
        videoTrack.detach();
      };
    }
  }, [videoTracks]);

  useEffect(() => {
    const audioTrack = audioTracks[0];
    if (audioTrack) {
      audioTrack.attach(audioRef.current);
      return () => {
        audioTrack.detach();
      };
    }
  }, [audioTracks]);

  const startStopVideo = () => {
    if (videoTracks.length >= 1) {
      setVideoTracks([])
    } else {
      setVideoTracks(trackpubsToTracks(participant.videoTracks))
    }
  };

  return (
    <div className="participant">
      <h3>{participant.identity}</h3>
      {/* <i className="fas fa-microphone" onClick={() => setAudio(!audio)}/> */}
      {/* <i className="fas fa-microphone-slash" onClick={() => setAudio(!audio)}></i> */}
      <video ref={videoRef} autoPlay />
      <audio ref={audioRef} autoPlay />
      <span onClick={startStopVideo}>
        {videoTracks.length >= 1 ? (<i className="fas fa-video" />)
          : (<i style={{ color: 'red' }} className="fas fa-video-slash" />)
        }
      </span>
    </div>
  );
};

export default Participant;
