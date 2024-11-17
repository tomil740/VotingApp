const UserTableItem = ({ user }) => {
  return (
    <tr>
      <td>{user.id}</td>
      <td>{user.name}</td>
      <td>{user.email}</td>
      <td>{user.passWord}</td>
      <td>{user.isAdmin ? 'Yes' : 'No'}</td>
      <td>{user.userVote}</td>
    </tr>
  );
};

export default UserTableItem;