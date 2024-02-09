import { getAllUsers } from '../../consts/api';
import { useState, useEffect, useRef } from 'react';

const UserTable = () => {
  const users = useRef([]);
  const [sortedUsers, setSortedUsers] = useState([]);
  const [sorting, setSorting] = useState();
  const [dialogUser, setDialogUser] = useState();

  const showDetails = (user) => {
    setDialogUser(user);
  };

  useEffect(() => {
    getAllUsers()
      .then((res) => {
        users.current = res.users;
        setSortedUsers(res.users);
      })
      .catch((e) => alert(e));
  }, []);

  useEffect(() => {
    if (sorting && users.current) {
      switch (sorting?.column) {
        case 'Age':
          const sorted = [...users.current].sort((a, b) => a.age - b.age);
          setSortedUsers(sorting.order === 'asc' ? sorted : sorted.reverse());
          return;
        case 'Name':
          const sortedByName = [...users.current].sort((a, b) => {
            const first = `${a.lastName} ${a.firstName} ${a.maidenName}`;
            const second = `${b.lastName} ${b.firstName} ${b.maidenName}`;

            return first.localeCompare(second);
          });
          setSortedUsers(
            sorting.order === 'asc' ? sortedByName : sortedByName.reverse()
          );
          return;
        case 'Address':
          const sortedByAddress = [...users.current].sort((a, b) =>
            a.address.address.localeCompare(b.address.address)
          );
          setSortedUsers(
            sorting.order === 'asc'
              ? sortedByAddress
              : sortedByAddress.reverse()
          );
        case 'Gender':
          const sortedByGender = [...users.current].sort((a, b) =>
            a.gender.localeCompare(b.gender)
          );
          setSortedUsers(
            sorting.order === 'asc' ? sortedByGender : sortedByGender.reverse()
          );
      }
    } else {
      setSortedUsers([...users.current]);
    }
  }, [sorting]);

  const setSort = (column) => {
    setSorting((pv) => {
      if (pv?.column !== column) {
        return { column: column, order: 'asc' };
      }

      switch (pv?.order) {
        case undefined:
          return { column: column, order: 'asc' };
        case 'asc':
          return { column: column, order: 'desc' };
        case 'desc':
          return undefined;
      }
    });
  };

  return (
    <>
      <UserDataDialog user={dialogUser} onClose={() => setDialogUser(undefined)}/>

      <div
        style={{
          border: '1px solid #dddddd',
          borderRadius: 8,
          overflow: 'hidden',
        }}
      >
        <table>
          <tbody>
            <tr>
              <HeaderCell column={'Name'} onClick={setSort} sorting={sorting} />
              <HeaderCell column={'Age'} onClick={setSort} sorting={sorting} />
              <HeaderCell
                column={'Gender'}
                onClick={setSort}
                sorting={sorting}
              />
              <HeaderCell
                column={'Address'}
                onClick={setSort}
                sorting={sorting}
              />
              <th></th>
            </tr>
            {sortedUsers.map((user, index) => (
              <tr key={index}>
                <td>
                  {user.lastName} {user.firstName} {user.maidenName}
                </td>
                <td>{user.age}</td>
                <td>{user.gender}</td>
                <td>{user.address.address}</td>
                <td>
                  <button onClick={() => showDetails(user)}>details</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

const HeaderCell = ({ column, sorting, onClick }) => {
  const isSelected = sorting?.column === column;

  return (
    <th onClick={() => onClick?.(column)}>
      <div style={{ display: 'flex', gap: 8, cursor: 'pointer' }}>
        <div>{column}</div>
        {isSelected && sorting?.order === 'asc' && <div>▲</div>}
        {isSelected && sorting?.order === 'desc' && <div>▼</div>}
      </div>
    </th>
  );
};

const UserDataDialog = ({ user, onClose }) => {
  if (!user) return null;

  return (
    <dialog open style={{ minWidth: 200 }}>
      <p>{user.lastName} {user.firstName} {user.maidenName}</p>
      <p>{user.age}</p>
      <p>{user.address.city} {user.address.address}</p>
      <p>{user.height}</p>
      <p>{user.weight}</p>
      <p>{user.phone}</p>
      <p>{user.email}</p>
      <button onClick={() => onClose?.()}>Close</button>
    </dialog>
  );
};

export default UserTable;
