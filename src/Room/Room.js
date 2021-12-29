import React, { useEffect, useState } from "react";
import { Box, Typography, Card } from '@mui/material';
import Participant from "../Participant/Participant";
import './Room.scss'

const Room = ({ roomName, room, handleLogout }) => {
  const [participants, setParticipants] = useState([]);

  useEffect(() => {
    const participantConnected = (participant) => {
      setParticipants((prevParticipants) => [...prevParticipants, participant]);
    };

    const participantDisconnected = (participant) => {
      setParticipants((prevParticipants) =>
        prevParticipants.filter((p) => p !== participant)
      );
    };

    room.on("participantConnected", participantConnected);
    room.on("participantDisconnected", participantDisconnected);
    room.participants.forEach(participantConnected);
    return () => {
      room.off("participantConnected", participantConnected);
      room.off("participantDisconnected", participantDisconnected);
    };
  }, [room]);

  const remoteParticipants = participants.map((participant) => (
    <Participant key={participant.sid} participant={participant} />
  ));

  return (
    <Box className="room">
      <Box className="head">
        <Typography className="your_room">Your Room: {roomName}</Typography>
        <i class="fas fa-phone-slash" onClick={handleLogout} />
      </Box>
      <Card className="local_participant">
        {room ? (
          <Participant
            key={room.localParticipant.sid}
            participant={room.localParticipant}
          />
        ) : (
          ""
        )}
      </Card>
      <Typography className="remote_text">Remote Participants</Typography>
      <Card className="remote_participants">{remoteParticipants}</Card>
    </Box>
  );
};

export default Room;
