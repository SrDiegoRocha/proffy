import React from 'react';
import './styles.css';

import zapIcon from '../../assets/images/icons/whatsapp.svg';

const TeacherItem: React.FC = () => {
  return (
    <article className="teacher-item">
      <header>
        <img src="https://avatars0.githubusercontent.com/u/53841162?s=60&v=4" alt="Diego Rocha"/>
        <div>
          <strong>Diego Rocha</strong>
          <span>Programação</span>
        </div>
      </header>

      <p>
        Lorem, ipsum dolor sit amet consectetur adipisicing elit. Quis tempora sint nemo praesentium reiciendis facere eum eveniet hic quidem id vitae sunt, eos quam aspernatur perferendis repellendus necessitatibus. Nesciunt, cupiditate.
      </p>

      <footer>
        <p>
          Preço/hora
          <strong>$20,00</strong>
        </p>

        <button type="button">
          <img src={zapIcon} alt="Whatsapp"/>
          Entrar em contato
        </button>
      </footer>
    </article>
  );
}

export default TeacherItem;