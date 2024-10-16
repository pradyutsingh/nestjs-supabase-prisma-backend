import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UsersService {
    
    private users = [
        // create mock data with id, name, email and role with 5 values
    
        {
            id: 1,
            name: 'John Doe',
            email: 'john@email.com',
            role: 'INTERN'
        },
        {
            id: 2,
            name: 'Jane Doe',
            email: 'jane@email.com',
            role: 'ENGINEER'
        },
        {
            id: 3,
            name: 'Jack Doe',
            email: 'jack@email.com',
            role: 'ADMIN'
        },
        {
            id: 4,
            name: 'Jim Doe',
            email: 'jim@email.com',
            role: 'INTERN'
        }, 
        {
            id: 5,
            name: 'Jell Doe',
            email: 'jell@email.com',
            role: 'INTERN'
        }
        // create
    ]

    findall(role? : 'INTERN' | 'ENGINEER' | 'ADMIN') {
        if(role) {
            const rolesArray = this.users.filter(user => user.role === role);
            if (rolesArray.length === 0) {
                throw new NotFoundException('User Role Not Found');
            }
            return rolesArray;
        }
        return this.users;
    }

    findOne(id: number) {
        const user = this.users.find(user => user.id === id);
        if (!user) {
            throw new NotFoundException('User not found');
        }
        return user;
    }

    create(createUserDto: CreateUserDto) {

        const highestId = [...this.users].sort((a, b) => b.id - a.id)[0].id;
        const newUser = {
            id: highestId + 1,
            ...createUserDto
        }
        this.users.push(newUser);
        return newUser
    }

    update(id: number, updateUserDto: UpdateUserDto) {
        this.users = this.users.map(user => {
            if(user.id === id) {
                return {...user, ...updateUserDto};
            }
            return user;
        })
        return this.findOne(id);
    }

    deleteUser(id: number) {
        const userToBeRemoved = this.findOne(id);
        this.users = this.users.filter(user => user.id !== id);
        return userToBeRemoved
    }    
}
