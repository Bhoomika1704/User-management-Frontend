import React, { useState, useEffect } from 'react';

const UserForm = ({ onSubmit, editingUser }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');

  useEffect(() => {
    if (editingUser) {
      setName(editingUser.name);
      setEmail(editingUser.email);
    }
  }, [editingUser]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const user = { id: editingUser ? editingUser.id : Date.now(), name, email };
    onSubmit(user);
    setName('');
    setEmail('');
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>{editingUser ? 'Edit User' : 'Add User'}</h2>
      <div>
        <label>Name:</label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </div>
      <div>
        <label>Email:</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>
      <button type="submit">{editingUser ? 'Update' : 'Add'}</button>
    </form>
  );
};

export default UserForm;
