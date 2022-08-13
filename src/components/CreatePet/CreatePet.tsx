import { useState } from 'react';
import graphQLClient from '../../config/graphQLClient';
import { Pet, useCreatePetMutation } from '../../generated/graphql';

const CreatePet: React.FC = () => {
  const [name, setName] = useState<string>('');
  const [type, setType] = useState<string>('');
  const [ownerId, setOwnerId] = useState<number>(1);

  const { mutate, data, status } = useCreatePetMutation(graphQLClient);

  const handleSubmit = () => {
    mutate(
      { createPetInput: { name, type, ownerId } },
      {
        onSuccess: data => {
          console.log(data);
          if (data.createPet.__typename === 'CreatePetError') {
            console.log(data.createPet.nameErrors);
            console.log(data.createPet.typeErrors);
            console.log(data.createPet.ownerIdErrors);
          }
        },
      }
    );
  };

  return (
    <div>
      <h1>Add pets</h1>
      <input type='text' placeholder='name' onChange={e => setName(e.target.value)} />
      <br></br>
      <input type='text' placeholder='type' onChange={e => setType(e.target.value)} />
      <br></br>
      <input type='text' placeholder='owner id' onChange={e => setOwnerId(+e.target.value)} />
      <button onClick={() => handleSubmit()}>Submit</button>
      {status === 'loading' && <p>loading...</p>}
      {status === 'error' && <p>something went wrong</p>}
      {status === 'success' && (
        <div>
          <h1>{(data.createPet as Pet).name}</h1>
          <h1>{(data.createPet as Pet).type}</h1>
          <h1>{(data.createPet as Pet).ownerId}</h1>
        </div>
      )}
    </div>
  );
};

export default CreatePet;
