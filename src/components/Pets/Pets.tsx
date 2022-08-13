import graphQLClient from '../../config/graphQLClient';
import { usePetsQuery } from '../../generated/graphql';

const Pets: React.FC = () => {
  const { data, status } = usePetsQuery(graphQLClient);
  return (
    <div>
      <h1>All pets</h1>
      {status === 'error' && <div>something went wrong</div>}
      {status === 'loading' && <div>loading</div>}
      {status === 'success' && (
        <div>
          {data?.pets?.map(pet => (
            <div key={pet.id}>
              <h1>{pet.name}</h1>
              <h2>owned by {pet.owner.name}</h2>
              <h2>type is {pet.type}</h2>
              <hr />
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Pets;
