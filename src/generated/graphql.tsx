import { GraphQLClient } from 'graphql-request';
import { RequestInit } from 'graphql-request/dist/types.dom';
import { useMutation, useQuery, UseMutationOptions, UseQueryOptions } from '@tanstack/react-query';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };

function fetcher<TData, TVariables>(client: GraphQLClient, query: string, variables?: TVariables, headers?: RequestInit['headers']) {
  return async (): Promise<TData> => client.request<TData, TVariables>(query, variables, headers);
}
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
};

export type CreateOwnerInput = {
  name: Scalars['String'];
};

/** field errors while creating a pet */
export type CreatePetError = {
  __typename?: 'CreatePetError';
  nameErrors?: Maybe<Array<Scalars['String']>>;
  ownerIdErrors?: Maybe<Array<Scalars['String']>>;
  typeErrors?: Maybe<Array<Scalars['String']>>;
};

/** fields required to create a pet */
export type CreatePetInput = {
  name: Scalars['String'];
  ownerId: Scalars['Int'];
  type?: InputMaybe<Scalars['String']>;
};

export type CreatePetResult = CreatePetError | Pet;

export type CreateUserInput = {
  email: Scalars['String'];
  password: Scalars['String'];
};

export type LoginUserInput = {
  email: Scalars['String'];
  password: Scalars['String'];
};

export type Mutation = {
  __typename?: 'Mutation';
  createOwner: Owner;
  createPet: CreatePetResult;
  createUser: User;
  login: User;
};


export type MutationCreateOwnerArgs = {
  createOwnerInput: CreateOwnerInput;
};


export type MutationCreatePetArgs = {
  createPetInput: CreatePetInput;
};


export type MutationCreateUserArgs = {
  createUserInput: CreateUserInput;
};


export type MutationLoginArgs = {
  loginUserInput: LoginUserInput;
};

/** entity representing an owner */
export type Owner = {
  __typename?: 'Owner';
  /** unique id of the owner */
  id: Scalars['Int'];
  /** name of the owner */
  name: Scalars['String'];
  /** list of pets owned by the owner */
  pets: Array<Pet>;
};

/** entity representing a pet */
export type Pet = {
  __typename?: 'Pet';
  /** unique id of the pet */
  id: Scalars['Int'];
  /** name of the pet */
  name: Scalars['String'];
  /** owner of the pet */
  owner: Owner;
  /** id of the owner */
  ownerId: Scalars['Int'];
  /** type of the pet */
  type?: Maybe<Scalars['String']>;
};

export type Query = {
  __typename?: 'Query';
  owner?: Maybe<Owner>;
  owners?: Maybe<Array<Owner>>;
  pet?: Maybe<Pet>;
  pets?: Maybe<Array<Pet>>;
  user: User;
  users: Array<User>;
};


export type QueryOwnerArgs = {
  id: Scalars['Int'];
};


export type QueryPetArgs = {
  id: Scalars['Int'];
};


export type QueryUserArgs = {
  id: Scalars['Int'];
};

export type Subscription = {
  __typename?: 'Subscription';
  petAdded: Pet;
};

export type User = {
  __typename?: 'User';
  /** email of the user */
  email: Scalars['String'];
  /** unique id of the user */
  id: Scalars['Int'];
};

export type CreatePetMutationVariables = Exact<{
  createPetInput: CreatePetInput;
}>;


export type CreatePetMutation = { __typename?: 'Mutation', createPet: { __typename: 'CreatePetError', nameErrors?: Array<string> | null, typeErrors?: Array<string> | null, ownerIdErrors?: Array<string> | null } | { __typename: 'Pet', id: number, name: string, type?: string | null } };

export type PetsQueryVariables = Exact<{ [key: string]: never; }>;


export type PetsQuery = { __typename?: 'Query', pets?: Array<{ __typename?: 'Pet', id: number, name: string, type?: string | null, owner: { __typename?: 'Owner', id: number, name: string } }> | null };


export const CreatePetDocument = `
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
export const useCreatePetMutation = <
      TError = unknown,
      TContext = unknown
    >(
      client: GraphQLClient,
      options?: UseMutationOptions<CreatePetMutation, TError, CreatePetMutationVariables, TContext>,
      headers?: RequestInit['headers']
    ) =>
    useMutation<CreatePetMutation, TError, CreatePetMutationVariables, TContext>(
      ['createPet'],
      (variables?: CreatePetMutationVariables) => fetcher<CreatePetMutation, CreatePetMutationVariables>(client, CreatePetDocument, variables, headers)(),
      options
    );
export const PetsDocument = `
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
export const usePetsQuery = <
      TData = PetsQuery,
      TError = unknown
    >(
      client: GraphQLClient,
      variables?: PetsQueryVariables,
      options?: UseQueryOptions<PetsQuery, TError, TData>,
      headers?: RequestInit['headers']
    ) =>
    useQuery<PetsQuery, TError, TData>(
      variables === undefined ? ['pets'] : ['pets', variables],
      fetcher<PetsQuery, PetsQueryVariables>(client, PetsDocument, variables, headers),
      options
    );