import { useQuery } from '@tanstack/react-query';
import { gql } from 'graphql-request';
import graphQLClient from '../config/graphQLClient';

const GET_PETS = gql`
  query pets {
    pets {
      id
      name
      type
      owner {
        id
        name
      }
    }
  }
`;

interface PetsData {
  pets: Pet[];
}

const getPets = async () => {
  const data = graphQLClient.request<PetsData>(GET_PETS);
  return data;
};

const usePets = () => {
  return useQuery(['get-pets'], getPets);
};

export default usePets;
