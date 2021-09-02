//external
import { useHistory, useParams } from 'react-router-dom';
//internal
import logoImg from '../assets/images/logo.svg';
import { Button } from '../components/Button';
import AlertDialog from '../components/Dialog';
import { Question } from '../components/Question';
import { RoomCode } from '../components/RoomCode';
import { useRoom } from '../hooks/useRoom';
import deleteQuestion from '../assets/images/delete.svg'
import { database } from '../service/firebase';
//styled
import '../styles/room.scss';

type RoomParams = {
  id: string;
}

export function AdminRoom() {
  const history = useHistory();
  const params = useParams<RoomParams>();
  const roomId = params.id;
 // const { user } = useAuth();
  const { title, questions } = useRoom(roomId)

  async function handleEndRoom() {
    await database.ref(`rooms/${roomId}`).update({
      endedAt: new Date(),
    })

    history.push('/')
  }

  async function handleDeleteQuestion(questionId: string) {
    await database.ref(`rooms/${roomId}/questions/${questionId}`).remove(); 
  }
  
  return (
    <div id="page-room">
      <header>
        <div className="content">
          <img src={logoImg} alt="Letmeask" />
          <div>
            <RoomCode code={roomId} />
            <Button onClick={handleEndRoom} isOutlined>Encerrar sala</Button>
          </div>
        </div>
      </header>

      <main>
        <div className="room-title">
          <h1>Sala {title}</h1>
          {questions.length > 0 && (
            <span>{questions.length} pergunta(s)</span>
          )}
        </div>
        {questions.map(item => {
          return (
            <div key={item.id} className="question-list">
              <Question
                key={item.id}
                content={item.content}
                author={item.author}
              >
                <AlertDialog 
                  buttonChildren={<img src={deleteQuestion} alt="Remover pergunta" />}
                  onClickConfirm={() => handleDeleteQuestion(item.id)}
                >
                  <span>Deseja realmente excluir essa pergunta?</span>
                </AlertDialog>
              </Question>
            </div>
          );
        })}
      </main>
    </div>
  );
}