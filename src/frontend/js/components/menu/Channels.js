import React from 'react';
import { Link } from 'react-router';

const Channel = ({ address, name }) => (
  <Link className="menu-channels__item" to={`/channels/${address}`}>
    {name}
  </Link>
);

const Plus = () => (
  <Link className="menu-channels__plus" to={'/channels/add'}>+</Link>
);

export default ({ list }) => {
  const channels = list.map(({ name, address }, i) => (
    <Channel key={i} name={name} address={address} />
    )
  );

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
