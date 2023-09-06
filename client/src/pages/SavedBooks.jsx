//import { useState, useEffect } from 'react';
import {
  Container,
  Card,
  Button,
  Row,
  Col
} from 'react-bootstrap';
import { useQuery, useMutation } from '@apollo/client';
import Auth from '../utils/auth';
import { QUERY_ME } from '../utils/queries';
import { DELETE_BOOK } from '../utils/mutations';
import { removeBookId } from '../utils/localStorage';

const SavedBooks = () => {
  //const [userData, setUserData] = useState({});

  // use this to determine if `useEffect()` hook needs to run again
  //const userDataLength = Object.keys(userData).length;

  const { data: userData, loading } = useQuery(QUERY_ME);
  const [deleteBook] = useMutation(DELETE_BOOK);
  
  // useEffect(() => {
  //   const getUserData = async () => {
  //     try {
  //       const token = Auth.loggedIn() ? Auth.getToken() : null;
  //       if (!token) {
  //         return false;
  //       }
  //       //const user = Auth.getProfile(token);
        
  //       const data = getUser;
        

        

  //       // if (!data) {
  //       //   throw new Error('something went wrong!');
  //       // }

  //       //const user = await response.json();
  //       setUserData(data);
  //     } catch (err) {
  //       console.error(err);
  //     }
  //   };

  //   getUserData();
  // }, [userDataLength, getUser]);

  // create function that accepts the book's mongo _id value as param and deletes the book from the database
  const handleDeleteBook = async (book) => {
    const token = Auth.loggedIn() ? Auth.getToken() : null;
    book = { bookId: book.bookId, authors: book.authors, image: book.image, description: book.description, title: book.title }
    if (!token) {
      return false;
    }

    try {
      await deleteBook({variables: { book }});

      // if (!response.ok) {
      //   throw new Error('something went wrong!');
      // }

      //const updatedUser = await response.json();
      //setUserData(updatedUser);
      // upon success, remove book's id from localStorage
      removeBookId(book.bookId);
      window.location.reload(true);
    } catch (err) {
      console.error(err);
    }
  };

  // if data isn't here yet, say so
  if (loading) {
    return <h2>LOADING...</h2>;
  }

  return (
    <>
      <div className="text-light bg-dark p-5">
        <Container>
          <h1>Viewing saved books!</h1>
        </Container>
      </div>
      <Container>
        <h2 className='pt-5'>
          {userData.me.savedBooks.length
            ? `Viewing ${userData.me.savedBooks.length} saved ${userData.me.savedBooks.length === 1 ? 'book' : 'books'}:`
            : 'You have no saved books!'}
        </h2>
        <Row>
          {userData.me.savedBooks.map((book) => {
            return (
              <Col key={book.bookId} md="4">
                <Card border='dark'>
                  {book.image ? <Card.Img src={book.image} alt={`The cover for ${book.title}`} variant='top' /> : null}
                  <Card.Body>
                    <Card.Title>{book.title}</Card.Title>
                    <p className='small'>Authors: {book.authors}</p>
                    <Card.Text>{book.description}</Card.Text>
                    <Button className='btn-block btn-danger' onClick={() => handleDeleteBook(book)}>
                      Delete this Book!
                    </Button>
                  </Card.Body>
                </Card>
              </Col>
            );
          })}
        </Row>
      </Container>
    </>
  );
};

export default SavedBooks;
