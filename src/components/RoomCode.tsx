//internal
import copyImg from '../assets/images/copy.svg';
//styled
import '../styles/room-code.scss';
import GridItem from './GridItem';

type RoomCodeProps = {
  code: string;
}

export function RoomCode(props: RoomCodeProps) {
  function copyRoomCodeToClipboard() {
    navigator.clipboard.writeText(props.code)
  } 

  return (
    <GridItem item xs={7} sm={6} md={4} lg={4} xl={5}>
      <button className="room-code" onClick={copyRoomCodeToClipboard}>
        <div>
          <img src={copyImg} alt="Copy room code" />
        </div>
        <span>Sala {props.code}</span>
      </button>
    </GridItem>
  );
}