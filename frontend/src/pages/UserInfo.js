import React, { useContext, useState, useEffect } from 'react';
import { Row, Col, Container, Table } from 'react-bootstrap';
import AuthContext from '../context/AuthContext';
import axios from 'axios';

function UserInfo() {
  const [data, setData] = useState('');
  const [error, setError] = useState('');
  const { user, authTokens } = useContext(AuthContext);
  const accessTokens = authTokens.access;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://127.0.0.1:8000/api/get_userInfo", {
          headers: {
            'Content-Type': 'multipart/form-data',
            'Authorization': `Bearer ${accessTokens}`,
          },
        });
        setData(response.data);
        console.log(response.data);
      } catch (error) {
        setError(error);
      }
    };
    fetchData();
  }, [user,accessTokens]);

  
  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div>
      {user ? (
        <Container>
          <Row>
            {data && (
              <Col >
                <h3 className='text-center text-light bg-primary p-3 mt-3'>Personal Info</h3>
                <div>
                  <Table responsive="sm">
                    <thead>
                      <tr>
                        <th>First Name</th>
                        <th>Last Name</th>
                        <th>Sex</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td>{data.first_name}</td>
                        <td>{data.last_name}</td>
                        <td>{data.sex}</td>
                      </tr>
                    </tbody>
                  </Table>
                </div>
                <h3 className='text-center text-light bg-secondary p-3 mt-3'>Contact Info</h3>
                <div>
                  <Table responsive="sm">
                    <thead>
                      <tr>
                        <th>Email Address</th>
                        <th>Phone Number</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td>{data.email}</td>
                        <td>{data.phone_number}</td>
                      </tr>
                    </tbody>
                  </Table>
                </div>
                <h3 className='text-center text-light bg-success p-3 mt-3'>Payment Info</h3>
                <div>
                  <Table responsive="sm">
                    <thead>
                      <tr>
                        <th>Phone Number</th>
                        <th>Account Number</th>
                        <th>Lipa Namba</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                          <td>{data.phone_number}</td>
                        <td>Table cell</td>
                      </tr>
                    </tbody>
                  </Table>
                </div>
              </Col>
            )}
          </Row>
        </Container>
      ) : <p>Loading...</p>}
    </div>
  );
}

export default UserInfo;
