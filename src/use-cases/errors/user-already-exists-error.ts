export class UserAlreadyExistsErro extends Error {
  constructor(){
    super('E-mail already exists.');
  }
}