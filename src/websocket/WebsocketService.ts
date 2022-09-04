import { io } from '../http'
import { container } from 'tsyringe'
import { CreateUserService } from '../services/CreateUserService'
import { GetAllUsersService } from '../services/GetAllUsersService';

io.on('connect', (socket) => {
  socket.on('start', async (data) => {
    console.log(data)
    const { name, email, avatar } = data
    const createUserService = container.resolve(CreateUserService);

    const user = await createUserService.execute({
      avatar,
      email,
      name,
      socket_id: socket.id,
    });

    socket.broadcast.emit("new_users", user);
  });

  socket.on("get_users", async (callback) => {
    const getAllUsersService = container.resolve(GetAllUsersService);
    const users = await getAllUsersService.execute();

    callback(users);
  })
});
