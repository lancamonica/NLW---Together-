//internal
import copyImg from '../assets/images/copy.svg';
//styled
import '../styles/room-code.scss';

export function RoomCode() {
  /* function copyRoomCodeToClipboard() {
    navigator.clipboard.writeText('-MdIK6AHxfgv8m1eLZ16')
  } */

  return (
    <button className="room-code">
      <div>
        <img src={copyImg} alt="Copy room code" />
      </div>
      <span>Sala #2367367364736</span>
    </button>
  );
}