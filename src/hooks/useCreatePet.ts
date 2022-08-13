import { useMutation } from '@tanstack/react-query';
import { gql } from 'graphql-request';
import graphQLClient from '../config/graphQLClient';

const CREATE_PET = gql`
  mutation createPet($createPetInput: CreatePetInput!) {
    createPet(createPetInput: $createPetInput) {
      __typename
      ... on CreatePetError {
        nameErrors
        typeErrors
        ownerIdErrors
      }

      ... on Pet {
        id
        name
        type
      }
    }
  }
`;

interface CreatePetResult {
  createPet: {
    __typename: string;
  } & CreatePetError &
    Pet;
}

interface CreatePetError {
  nameErrors?: [string];
  typeErrors?: [string];
  ownerIdErrors?: [string];
}

interface CreatePetInput {
  name: string;
  type?: string;
  ownerId: number;
}
const createPet = async (createPetInput: CreatePetInput) => {
  const data = await graphQLClient.request<CreatePetResult, { createPetInput: CreatePetInput }>(
    CREATE_PET,
    {
      createPetInput,
    }
  );
  return data;
};

const useCreatePet = () => {
  return useMutation((createPetInput: CreatePetInput) => createPet(createPetInput));
};

export default useCreatePet;
