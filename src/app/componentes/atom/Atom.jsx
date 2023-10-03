import React from 'react';
import './styles.css'; // Substitua pelo caminho correto para o seu arquivo CSS

const AtomComponent = () => {
  return (
    <div id="atom">
      <div id="nucleus"></div>
      <div className="orbit">
        <div className="electron"></div>
      </div>
      <div className="orbit">
        <div className="electron"></div>
      </div>
      <div className="orbit">
        <div className="electron"></div>
      </div>
    </div>
  );
}

export default AtomComponent;
