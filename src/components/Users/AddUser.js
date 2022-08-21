import React, { useState , useRef} from 'react';

import Card from '../UI/Card';
import Button from '../UI/Button';
import ErrorModal from '../UI/ErrorModal';
import classes from './AddUser.module.css';
import Wrapper from '../Helper/Wrapper';

const AddUser = (props) => {

  const nameInputRef=useRef();
  const ageInputRef=useRef();
  const collegeNameInputRef=useRef();

  // const [enteredUsername, setEnteredUsername] = useState('');
  // const [enteredAge, setEnteredAge] = useState('');
  const [error, setError] = useState();

  const addUserHandler = (event) => {
    event.preventDefault();
    const enteredUsername=nameInputRef.current.value;
    const enteredAge=ageInputRef.current.value;
    const enteredCollegeName=collegeNameInputRef.current.value;
    if (enteredUsername.trim().length === 0 || enteredAge.trim().length === 0 || enteredCollegeName.trim().length===0 ){
      setError({
        title: 'Invalid input',
        message: 'Please enter a valid name ,age and college name(non-empty values).',
      });
      return;
    }
    if (+enteredAge < 1) {
      setError({
        title: 'Invalid age',
        message: 'Please enter a valid age (> 0).',
      });
      return;
    }
    props.onAddUser(enteredUsername, enteredAge, enteredCollegeName);
    nameInputRef.current.value='';
    ageInputRef.current.value='';
    collegeNameInputRef.current.value='';
    // setEnteredUsername('');
    // setEnteredAge('');
  };

  // const usernameChangeHandler = (event) => {
  //   setEnteredUsername(event.target.value);
  // };

  // const ageChangeHandler = (event) => {
  //   setEnteredAge(event.target.value);
  // };

  const errorHandler = () => {
    setError(null);
  };

  return (
    <Wrapper>
      {error && (
        <ErrorModal
          title={error.title}
          message={error.message}
          onConfirm={errorHandler}
        />
      )}
      <Card className={classes.input}>
        <form onSubmit={addUserHandler}>
          <label htmlFor="username">Username</label>
          <input
            id="username"
            type="text"
            // value={enteredUsername}
            // onChange={usernameChangeHandler}
            ref={nameInputRef}
          />
          <label htmlFor="age">Age (Years)</label>
          <input
            id="age"
            type="number"
            // value={enteredAge}
            // onChange={ageChangeHandler}
            ref={ageInputRef}
          />
          <label htmlFor='college'> College Name</label>
          <input
          id="college"
          type="text"
          ref={collegeNameInputRef}
          >
          </input>
          <Button type="submit">Add User</Button>
        </form>
      </Card>
    </Wrapper>
  );
};

export default AddUser;
