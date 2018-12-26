import { User } from '../entities/user';
import { hash } from './auth.service';
import { getManager } from 'typeorm';

export function saveUser(user: User): Promise<User> {
    user.password = hash(user.password);
    const manager = getManager();
    return manager.save(User, user);
}