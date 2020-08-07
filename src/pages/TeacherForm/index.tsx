import React, { useState, FormEvent } from 'react';
import './styles.css';
import { useHistory } from 'react-router-dom';

import warningIcon from '../../assets/images/icons/warning.svg';

import PageHeader from '../../components/PageHeader';
import Input from '../../components/Input';
import Textarea from '../../components/Textarea';
import Select from '../../components/Select';
import api from '../../services/api';

interface ScheduleItems {
  week_day: number;
  from: string;
  to: string;
}

const TeacherForm: React.FC = () => {
  const history = useHistory();

  const [name, setName] = useState('');
  const [avatar, setAvatar] = useState('');
  const [whatsapp, setWhatsapp] = useState('');
  const [bio, setBio] = useState('');

  const [subject, setSubject] = useState('');
  const [cost, setCost] = useState('');

  const [scheduleItems, setScheduleItems] = useState([
    { week_day: 0, from: '', to: '' },
  ]);

  const addNewScheduleItem = () => {
    setScheduleItems([...scheduleItems, { week_day: 0, from: '8:00', to: '10:00' }]);
  }

  const handleCreateClass = (e: FormEvent) => {
    e.preventDefault();
    
    api.post('classes', {
      name, avatar, whatsapp, bio, subject, cost: Number(cost), schedule: scheduleItems
    }).then(() => {
      alert('Aula cadastrada com sucesso!');

      history.push('/');
    }).catch(error => {
      alert('Erro no cadastro!')
    })
  }

  const setScheduleItemValue = (position: number, field: string, value: string) => {
    const updatedScheduleItems = scheduleItems.map((scheduleItem, index) => {
      if(index === position) {
        return { ...scheduleItem, [field]: value }
      }

      return scheduleItem;
    });
    
    setScheduleItems(updatedScheduleItems);
    
  }

  return (
    <div id="page-teacher-form" className="container">
        <PageHeader 
          title="Que incrível que você quer dar aulas."
          description="O primeiro passo é preencher esse formúlario de inscrição"
        />

        <main>
          <form onSubmit={handleCreateClass}>
            <fieldset>
              <legend>Seus dados</legend>

              <Input label="Nome completo" name="name" value={name} onChange={e => setName(e.target.value) } required/>
              
              <Input label="Avatar" name="avatar" value={avatar} onChange={e => setAvatar(e.target.value) } required/>

              <Input label="Whatsapp" name="whatsapp" value={whatsapp} onChange={e => setWhatsapp(e.target.value) } required/>

              <Textarea label="Bio" name="bio" value={bio} onChange={e => setBio(e.target.value) } required/>

            </fieldset>

            <fieldset>
              <legend>Sobre a aula</legend>

              <Select
                required
                label="Matéria" 
                name="subject"
                value={subject}
                onChange={e => setSubject(e.target.value)}
                options={[
                  { value: 'Artes', label: 'Artes' },
                  { value: 'Matemática', label: 'Matemática' },
                  { value: 'Português', label: 'Português' },
                  { value: 'Educação Fisíca', label: 'Educação Fisíca' },
                  { value: 'Inglês', label: 'Inglês' },
                  { value: 'Fisíca', label: 'Fisíca' },
                  { value: 'Química', label: 'Química' }
                ]}
              />
              
              <Input type="number" label="Custa da sua hora por aula" name="cost" value={cost} onChange={e => setCost(e.target.value)} required/>
              
            </fieldset>

            <fieldset>
              <legend>
                Horários Disponíveis
                <button type="button" onClick={addNewScheduleItem}>
                  + Novo Horário
                </button>
              </legend>

                
                {
                  scheduleItems.map((item, index) => {
                    return (
                      <div key={index} className="schedule-item">
                        <Select
                          required
                          label="Dia da semana"
                          value={item.week_day}
                          onChange={e => setScheduleItemValue(index, 'week_day', e.target.value)}
                          name="week_day"
                          options={[
                            { value: '0', label: 'Domingo' },
                            { value: '1', label: 'Segunda-feira' },
                            { value: '2', label: 'Terça-feira' },
                            { value: '3', label: 'Quarta-feira' },
                            { value: '4', label: 'Quinta-feira' },
                            { value: '5', label: 'Sexta-feira' },
                            { value: '6', label: 'Sábado' }
                          ]}
                        />

                        <Input 
                          name="from" 
                          label="Das" 
                          type="time"
                          value={item.from}
                          onChange={e => setScheduleItemValue(index, 'from', e.target.value)}
                          required
                        />

                        <Input 
                          name="to" 
                          label="Até" 
                          type="time" 
                          value={item.to}
                          onChange={e => setScheduleItemValue(index, 'to', e.target.value)}
                          required
                        />
                      </div>
                    );
                  })
                }


            </fieldset>

            <footer>
              <p>
                <img src={warningIcon} alt="Aviso importante!"/>
                Importante! <br />
                Preencha todos os dados
              </p>

              <button type="submit">
                Salvar cadastro
              </button>
            </footer>
          </form>
        </main>
    </div>
);
}

export default TeacherForm;