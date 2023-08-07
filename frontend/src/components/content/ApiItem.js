import React from 'react';
import keyImage from '../../images/key-alt-back.svg';
import lockImage from '../../images/lock.svg';
import serverImage from '../../images/server.svg';
import './ApiItem.css';
const ApiItem = ({ record }) => {
  return (
    <>
      <div className="col-auto" style={{ marginBottom: '1em' }}>
        <div className="card" style={{ height: '100%', width: '20rem' }}>
          <a href={record.url} target='_blank' rel="noreferrer" style={{ height: '100%' }}>
            <div className="card-body">
              <h5 className="card-title">{record.title}</h5>
              <h6 className="card-subtitle mb-2 text-muted">
                {record.category}
              </h6>
              <p className="card-text">{record.description}</p>
              <div className="row justify-content-center text-center">
                {record.auth !== '' ? (
                  <div className="col-auto">
                    <img src={keyImage} alt="auth" className="img img-fluid" />
                    {` ${record.auth}`}
                  </div>
                ) : null}
                {record.https ? (
                  <div className="col-auto">
                    <img src={lockImage} alt="https" className="img img-fluid" />{' '}
                    HTTPS
                  </div>
                ) : null}
                {record.cors !== 'no' ? (
                  <div className="col-auto">
                    <img src={serverImage} alt="https" className="img img-fluid" />{' '}
                    Cors
                  </div>
                ) : null}
              </div>
            </div>
          </a>
        </div>
      </div>
    </>
  );
};

export default ApiItem;
