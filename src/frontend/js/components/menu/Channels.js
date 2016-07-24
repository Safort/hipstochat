import React from 'react';
import { Link } from 'react-router';

let Channel = ({ address, name }) => {
  return (
    <Link className="menu-channels__item" to={`/channels/${address}`}>
      {name}
    </Link>
  );
};

let Plus = () => {
  return (
    <Link className="menu-channels__plus" to={'/channels/add'}>+</Link>
  );
};

export default ({ list }) => {
  const channels = list.map(({name, address}, i) => {
    return <Channel key={i} name={name} address={address} />;
  });

  return (
    <div className="menu-channels">
      <header className="menu-channels__header">
        <div className="menu-channels__title">
          Channels {`(${channels.length})`}
        </div>
        <Plus />
      </header>
      <div className="menu-channels__list">{channels}</div>
    </div>
  );
};
