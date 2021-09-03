//external
import { useHistory, useParams } from 'react-router-dom';
//internal
import logoImg from '../assets/images/logo.svg';
import { Button } from '../components/Button';
import AlertDialog from '../components/Dialog';
import { Question } from '../components/Question';
import { RoomCode } from '../components/RoomCode';
import { useRoom } from '../hooks/useRoom';
import deleteQuestion from '../assets/images/delete.svg';
import checkImg from '../assets/images/check.svg';
import answerImg from '../assets/images/answer.svg';
import { database } from '../service/firebase';
import GridItem from '../components/GridItem';
//styled
import '../styles/room.scss';

type RoomParams = {
  id: string;
}

export function AdminRoom() {
  const history = useHistory();
  const params = useParams<RoomParams>();
  const roomId = params.id;

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

  async function handleCheckQuestionsAnswer(questionId: string) {
    await database.ref(`rooms/${roomId}/questions/${questionId}`).update({
      isAnswered: true
    }); 
  }

  async function handleHighlightQuestion(questionId: string) {
    await database.ref(`rooms/${roomId}/questions/${questionId}`).update({
      isHighLighted: true
    }); 
  }
  
  return (
    <div id="page-room">
      <header>
        <div className="content">
          <img src={logoImg} alt="Letmeask" />
          <GridItem item xs={8} sm={6}>
              <RoomCode code={roomId} />
            </GridItem>
        </div>
        <div className="button-close">
          <Button onClick={handleEndRoom} isOutlined>Encerrar sala</Button>
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
                isAnswered={item.isAnswered}
                isHighLighted={item.isHighLighted}

              >
                {!item.isAnswered && (
                  <>
                    <button 
                      type="button"
                      onClick={() => handleCheckQuestionsAnswer(item.id)}
                    >
                      <img src={checkImg} alt="Marcar pergunta como respondida" />
                    </button>
                    <button 
                      type="button"
                      onClick={() => handleHighlightQuestion(item.id)}
                    >
                      <img src={answerImg} alt="Dar destaque á pergunta" />
                    </button>
                  </>
                )}
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