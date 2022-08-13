interface Owner {
  id: number;
  name: string;
  pets?: Pet[];
}

interface Pet {
  id: number;
  name: string;
  type?: string;
  ownerId: number;
  owner: Owner;
}
