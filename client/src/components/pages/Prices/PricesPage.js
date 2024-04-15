import { Alert, Container, Progress} from 'reactstrap';
import { useSelector, useDispatch } from 'react-redux';
import { getConcerts, getRequest, loadConcertsRequest } from '../../../redux/concertsRedux';
import { useEffect } from 'react';

var converter = require('number-to-words');

const Prices = () => {
  const concerts = useSelector(getConcerts);
  const dispatch = useDispatch();
  const request = useSelector(getRequest);

  useEffect(() => {
    if(concerts.length === 0) dispatch(loadConcertsRequest())
  }, [dispatch]);

  const workshop = (concert) => (
      <>
        <h2>Day {converter.toWords(concert.day)}</h2>
        <p>Price: {concert.price}$</p>
        <p>Workshops: {concert.workshops.map(item => `"${item}"`).join(', ')}</p>
      </>
    );

  if(request.pending) return <Progress animated color="primary" value={50} />; 
  else if(request.error) return <Alert color="warning">{request.error}</Alert>;
  else if(!request.success || !concerts.length) return <Alert color="info">No concerts</Alert>;
  else if(request.success) return (
    <Container>
      <h1>Prices</h1>
      <p>Prices may differ according the day of the festival. Remember that ticket includes not only the star performance, but also 10+ workshops. We gathered several genre teachers to help you increase your vocal skills, as well as self confidence.</p>
      
      <Alert color="info">
          Attention! <strong>Children under 4 can go freely with you without any other fee!</strong>
      </Alert>

      {concerts.map((concert, i) => (<div key={i}> {workshop(concert)} </div>))}
    </Container>
  )};

export default Prices;