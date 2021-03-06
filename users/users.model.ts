import * as mongoose from 'mongoose'

export interface IUser extends mongoose.Document {
  name: string,
  email: string,
  password: string,
}

const userSchema = new mongoose.Schema({
  name: {
    type: String
  },
  email: {
    type: String,
    unique: true
  },
  password: {
    type: String,
    select: false
  }
});

export const User = mongoose.model('User', userSchema)

/*const users = [
    {id:'1', name: 'Peter parker', email: 'peter@marvel.com'},
    {id:'2', name: 'Bruce wayne', email: 'bruce@dc.com'}
]

export class User{
    static findAll(): Promise<any[]>{
        return Promise.resolve(users);
    }

    static findById(id: string):Promise<any>{
        return new Promise(resolve => {
            const filtered = users.filter(user => user.id === id);
            let user = undefined;
            if(filtered.length > 0){
                user = filtered[0];
            }
            resolve(user);
        })
    }
}*/