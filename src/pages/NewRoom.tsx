//external
import { FormEvent, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
//internal
import illustrationImg from '../assets/images/illustration.svg';
import logoImg from '../assets/images/logo.svg';
import { Button } from '../components/Button';
import { database } from '../service/firebase';
import { useAuth } from '../hooks/useAuth';
import GridItem from '../components/GridItem';
//styled
import '../styles/auth.scss';

export function NewRoom() {
  const { user } = useAuth();
  const history = useHistory();
  const [newRoom, setNewRoom] = useState('');

  async function handleCreateRom(event: FormEvent) {
    event.preventDefault();

    if (newRoom.trim() === '') {
      return;
    }

    const roomRef = database.ref('rooms');

    const firebaseRoom = await roomRef.push({
      title: newRoom,
      authorId: user?.id,
    });

    history.push(`/rooms/${firebaseRoom.key}`);
  }

  return (
    <div id="page-auth">
      <GridItem item className="img-left" md={7}>
        <aside>
          <img src={illustrationImg} alt="Ilustração simbolizando perguntas e respotas"/>
          <strong>Crie salas de Q&amp;A ao-vivo</strong>
          <p>Tire as dúvidas da sua adiência em tempo-real</p>
        </aside>
      </GridItem>
      <main>
        <GridItem item xs={12} sm={12} md={5}>
          <div className="main-content">
            <img src={logoImg} alt="Letmeask"/>
            <h2>Criar uma nova sala</h2>
            <form onSubmit={handleCreateRom}>
              <input 
                type="text"
                placeholder="Digite o código da sala"
                onChange={event => setNewRoom(event.target.value)}
                value={newRoom}
              />
              <Button type="submit">
                Criar sala
              </Button>
            </form>
            <p>Quer entrar em uma sala existeste? <Link to="/">clique aqui</Link></p>
          </div>
        </GridItem>
      </main>
    </div>
  )
}