// @ts-nocheck
import { useState } from 'react';
import useCreatePet from '../hooks/useCreatePet';

const AddPet: React.FC = () => {
  const [name, setName] = useState<string>('');
  const [type, setType] = useState<string>('');
  const [ownerId, setOwnerId] = useState<number>(1);

  const { mutate, data, status } = useCreatePet();

  const handleSubmit = () => {
    mutate(
      { name, type, ownerId },
      {
        onSuccess: data => {
          console.log(data);
          if (data.createPet.__typename === 'CreatePetError') {
            // handle error
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
          <h1>{data?.createPet.name}</h1>
          <h1>{data?.createPet.type}</h1>
          <h1>{data?.createPet.ownerId}</h1>
        </div>
      )}
    </div>
  );
};

export default AddPet;
