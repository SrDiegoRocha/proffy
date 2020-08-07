import React, { useState } from 'react';
import './styles.css';

import PageHeader from '../../components/PageHeader';
import TeacherItem, { Teacher } from '../../components/TeacherItem';
import Input from '../../components/Input';
import Select from '../../components/Select';
import api from '../../services/api';

const TeacherList: React.FC = () => {
  const [teachers, setTeachers] = useState([]);
  const [subject, setSubject] = useState('');
  const [time, setTime] = useState('');
  const [week_day, setWeekDay] = useState('');

  const searchTeachers = async () => {

    if(subject !== '' && time !== '' && week_day !== '') {
      const response = await api.get('classes', {
        params: {
          subject,
          week_day,
          time
        }
      });
  // console.log(response.data)
      setTeachers(response.data.classes);
    }

  }

  return (
      <div id="page-teacher-list" className="container">
          <PageHeader title="Estes são os proffys disponíveis">
            <form id="search-teachers">

            <Select
              label="Matéria" 
              name="subject"
              value={subject}
              onChange={e => {
                setSubject(e.target.value);
                searchTeachers();
              }}
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
              
              <Select 
                label="Dia da semana" 
                name="week_day"
                value={week_day}
                onChange={e => {
                  setWeekDay(e.target.value);
                  searchTeachers();
                }}
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
                type="time" 
                label="Hora" 
                name="time"
                value={time}
                onChange={e => {
                  setTime(e.target.value);
                  searchTeachers();
                }}
              />

            </form>
          </PageHeader>

          <main>
            {
              teachers.map((teacher: Teacher) => {
                return <TeacherItem key={teacher.id} teacher={teacher} />
              })
            }

          </main>
      </div>
  );
}

export default TeacherList;