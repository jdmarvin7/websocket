import { User } from "../models/Users";
import { injectable } from 'tsyringe';

interface CreateuserDTO {
    email: string;
    socket_id: string;
    name: string;
    avatar: string
}

@injectable()
export class CreateUserService {

    async execute({ avatar, email, name, socket_id }: CreateuserDTO) {
        const userAlreadyExists = await User.findOne({
            email
        }).exec();

        if(userAlreadyExists) {
            const user = await User.findOneAndUpdate({
                _id: userAlreadyExists.id
            },
            {
                $set: { socket_id, avatar, name }
            },
            {
                new: true
            })
            return user
        } else {
            const user = await User.create({
                email,
                avatar,
                name,
                socket_id
            });
            return user;
        }
    }
}
