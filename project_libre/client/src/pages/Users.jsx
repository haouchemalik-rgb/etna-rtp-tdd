import React, { useContext, useEffect, useState } from 'react';
import { GridComponent, ColumnsDirective, ColumnDirective, Page, Selection, Inject, Edit, Toolbar, Sort, Filter } from '@syncfusion/ej2-react-grids';
import { Header } from '../components';
import { UserContext } from '../contexts/UserContext';// Importing User Context
import { getAllUsers, deleteUser, addUser, editUser } from '../services/User.services'; // importing db/api services

// Users Page
const Users = () => {
  // saving user connected with User context
  const {user} = useContext(UserContext);

  // some option of the Grid
  const toolbarAdmin = ['Delete', 'Add', 'Edit', 'Search'];
  const toolbar = ['Search'];
  
  // state to save all users in the tables
  const [users, setUsers] = useState(null);

  // Error messages showed when error occurs
  const [errorMessage, setErrorMessage] = useState('');

  // geting all Users in the construction of the page
  useEffect(() => {
    refreshGrid()
  }, [])

  // fonction to get all users
  function refreshGrid() {
    getAllUsers()
      .then(
        (res) => {
          setUsers(res.data);
        }
      );
  }

  // function to manage all changes/addes/deletes in the grid
  function actionComplete(state) { 
    if (state.action === "add") {
      addUser(state.data).then(
        (res) => {
          if (res.status === 201) {
            refreshGrid();
            setErrorMessage(res.data.message);
          } else if ( res.status === 400 ) {
            setErrorMessage(res.data.message);
          } else if ( res.status === 500 ) {
            setErrorMessage('Something went wrong.');
          }
        }
      )
    } else if (state.action === "edit") {
      delete state.data['createdAt'];
      delete state.data['updatedAt'];
      delete state.data['channels'];
      editUser(state.data).then( (res) => {
          if (res.status === 201 && res.status === 400) {
            setErrorMessage(res.data.message);
          } else if ( res.status === 500 ) {
            setErrorMessage('Something went wrong.');
          }
          refreshGrid();
        }
      )
      
    } else if (state.requestType === "delete") {
      state.data.forEach(element => {
        deleteUser(element.id).then(
          (res) => {
            refreshGrid();
            setErrorMessage(`Successfully deleted.`);
          }
        )
      });
    }
  }

  //HTML code
  return (
    <div className="m-2 md:m-10 mt-24 p-2 md:p-10 bg-white rounded-3xl">
      <Header title="Users" />
      <GridComponent
        dataSource={users}
        enableHover={true} allowPaging={true}
        pageSettings={{ pageCount: 5}}
        persistSelection={true} toolbar={user && user.admin? toolbarAdmin : toolbar}
        editSettings={{allowDeleting: true, allowEditing: true, allowAdding: true}}
        allowSorting={true}
        actionComplete={actionComplete}
      >
        <ColumnsDirective>
          <ColumnDirective type='checkbox' width='40px'/>
          <ColumnDirective field='userName'  headerText='userName' validationRules={{ required: true }}/>
          <ColumnDirective field='firstName' headerText='Prénom' validationRules={{ required: true }}/>
          <ColumnDirective field='lastName' headerText='Nom' validationRules={{ required: true }}/>
          <ColumnDirective field='email' headerText='email' validationRules={{ required: true }}/>
          <ColumnDirective field='password' headerText='password' type='password' validationRules={{ required: true }}/>
          <ColumnDirective type='boolean' displayAsCheckBox='true' editType="booleanedit" field='admin' headerText='Administrateur'/>
        </ColumnsDirective>
        <Inject services={user && user.admin ? [Page, Selection, Toolbar, Edit, Sort, Filter] : [Page, Selection, Toolbar, Sort, Filter]} />
      </GridComponent>
      {errorMessage}
    </div>
  );
};

export default Users;
