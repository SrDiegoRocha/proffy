import React, { useState, useEffect } from 'react';
import './styles.css';

import { Link } from 'react-router-dom';

import Logo from '../../assets/images/logo.svg';
import LandingImg from '../../assets/images/landing.svg';
import studyIcon from '../../assets/images/icons/study.svg';
import giveClassesIcon from '../../assets/images/icons/give-classes.svg';
import purpleHeartIcon from '../../assets/images/icons/purple-heart.svg';
import api from '../../services/api';

const Landing: React.FC = () => {
  const [totalConnections, setTotalConnections] = useState<number>(0);

  useEffect(() => {
    api.get('connections').then(response => {
      setTotalConnections(response.data.total);
    });
  }, [totalConnections]);

  return (
      <div id="page-landing">
          <div id="page-landing-content" className="container">
              <div className="logo-container">
                <img src={Logo} alt="Proffy"/>
                <h2>Sua plataforma de estudos online.</h2>
              </div>

              <img 
                src={LandingImg} 
                alt="Plataforma de estudos"
                className="hero-image"
              />

              <div className="buttons-container">
                <Link to="study" className="study">
                  <img src={studyIcon} alt="Estudar"/>
                  Estudar
                </Link>
                <Link to="give-classes" className="give-classes">
                  <img src={giveClassesIcon} alt="Dar aulas"/>
                  Dar Aulas
                </Link>
              </div>

              <span className="total-connections">
                Total de {totalConnections} conexões
                <img src={purpleHeartIcon} alt="Coracao roxo"/>
              </span>
          </div>
      </div>
  );
}

export default Landing;