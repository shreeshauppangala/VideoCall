import React from "react";
import { Box, Typography, FormGroup, FormControl, InputLabel, FormHelperText, Input, Button, Card } from '@mui/material';
import LoadingButton from '@mui/lab/LoadingButton';
import './Lobby.scss'


const Lobby = ({
  username,
  handleUsernameChange,
  roomName,
  handleRoomNameChange,
  handleSubmit,
  connecting,
}) => {
  return (
    <Box className='lobby'>
      <Typography className="enter_text">Enter a room</Typography>

      <Box className="login">
        <Card className='card'>
          <form onSubmit={handleSubmit}>
            <FormGroup className='form_grp'>
              <FormControl>
                <InputLabel htmlFor="name">Your Name</InputLabel>
                <Input
                  type="text"
                  id="name"
                  value={username}
                  onChange={handleUsernameChange}
                  readOnly={connecting}
                  required
                />
              </FormControl>
            </FormGroup>

            <FormGroup className='form_grp'>
              <FormControl>
                <InputLabel htmlFor="room">Room name</InputLabel>
                <Input
                  type="text"
                  id="room"
                  value={roomName}
                  onChange={handleRoomNameChange}
                  readOnly={connecting}
                  required
                />
                <FormHelperText className="insruction">
                  Enter New Room Name OR Room Name Which Your Friend has Sent.
                </FormHelperText>
              </FormControl>
            </FormGroup>

            {connecting ? (
              <LoadingButton className="loading" loading variant="outlined" disabled>Join</LoadingButton>
            ) : (
              <Button className="join_button" type="submit">Join</Button>
            )}

          </form>
        </Card>
      </Box>
    </Box>
  );
};

export default Lobby;
