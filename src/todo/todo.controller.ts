import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { TodoService } from './todo.service';
import { CreateTodoDto } from './dto/create-todo.dto';
import { UpdateTodoDto } from './dto/update-todo.dto';
import { JwtAuthGuard } from '../auth/auth.guard';
import { UserEmail } from '../common/decorators/user-email.decorators';
import { ApiTags,ApiOperation, ApiBearerAuth} from '@nestjs/swagger';
@ApiTags('Too')
@Controller('todo')
export class TodoController {
  constructor(private readonly todoService: TodoService) {}
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Post()
  @ApiOperation({description:"To create a new todo",summary:"Create a new todo"})
  async create(@Body() createTodoDto: CreateTodoDto,@UserEmail() userEmail:string) {
    return this.todoService.create(createTodoDto,userEmail);
  }
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Get()
  @ApiOperation({description:"To get all todos",summary:"Get all todos"})
  async findAll(@UserEmail() userEmail:string ) {
    // console.log(userEmail);
    return this.todoService.findAll(userEmail);
  }
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Get(':id')
  @ApiOperation({description:"To get a todo by id",summary:"Get a todo by id"})
  findOne(@Param('id') id: string) {
    return this.todoService.findOne(+id);
  }
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Patch(':id')
  @ApiOperation({description:"To update a todo by id",summary:"Update a todo by id"})
  update(@Param('id') id: string, @Body() updateTodoDto: UpdateTodoDto) {
    return this.todoService.update(+id, updateTodoDto);
  }
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  @ApiOperation({description:"To delete a todo by id",summary:"Delete a todo by id"})
  remove(@Param('id') id: string) {
    return this.todoService.remove(+id);
  }
}
