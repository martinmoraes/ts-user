import * as mongoDB from 'mongodb';

export interface IDefineCollection {
  definedCollection?: mongoDB.Collection;
}
