import { Body, Controller, Delete, Get, Logger, NotFoundException, Param, ParseIntPipe, Patch, Post, UseGuards, UsePipes, ValidationPipe } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { GetUser } from 'src/auth/get-user.decorator';
import { User } from 'src/auth/user.entity';
import { BoardStatus } from './board-status.enum';
import { Board } from './board.entity';
import { BoardsService } from './boards.service';
import { CreateBoardDto } from './dto/create-board.dto';
import { BoardStatusValidationPipe } from './pipes/board-status-validation.pipe';

@Controller('boards')
@UseGuards(AuthGuard())
export class BoardsController {
	// boardsService: BoardsService;
	// 접근제한자를 이용해서 소스 간단하게 하기
	// 접근 제한자(public, protected, private)를 생성자(constructor) 파라미터에 선언하면
	// 접근 제한자가 사용된 생성자 파라미터는 암묵적으로 클래스 프로퍼티로 선언된다.
	private logger = new Logger('BoardsController')
	constructor(private boardsService: BoardsService) {
	// 	// this.boardsService = boardsService;
	}

	@Get('/')
	getAllBoards(
		@GetUser() user: User
	): Promise<Board[]> {
		this.logger.verbose(`User ${user.username} trying to get all boards`);
		return this.boardsService.getAllBoards(user);
	}

	@Post('/')
	@UsePipes(ValidationPipe)
	createBoard(
		@Body() createBoardDto: CreateBoardDto,
		@GetUser() user: User): Promise<Board> {
		this.logger.verbose(`User ${user.username} creating a new board. Payload: ${JSON.stringify(createBoardDto)}`)
		return this.boardsService.createBoard(createBoardDto, user);
	}

	@Get('/:id')
	getBoardById(@Param('id') id: number): Promise<Board> {
		return this.boardsService.getBoardById(id);
	}

	@Delete('/:id')
	deleteBoard(
		@Param('id', ParseIntPipe) id: number,
		@GetUser() user:User
	): Promise<void> {
		return this.boardsService.deleteBoard(id, user);
	}

	@Patch('/:id/status')
	updateBoardStatus(
		@Param('id') id: number,
		@Body('status', BoardStatusValidationPipe) status: BoardStatus){
		return this.boardsService.updateBoardStatus(id, status);
	}

}
