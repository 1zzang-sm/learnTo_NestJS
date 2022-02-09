import { Body, Controller, Delete, Get, NotFoundException, Param, ParseIntPipe, Patch, Post, UsePipes, ValidationPipe } from '@nestjs/common';
import { BoardStatus } from './board-status.enum';
import { Board } from './board.entity';
import { BoardsService } from './boards.service';
import { CreateBoardDto } from './dto/create-board.dto';
import { BoardStatusValidationPipe } from './pipes/board-status-validation.pipe';

@Controller('boards')
export class BoardsController {
	// boardsService: BoardsService;
	// 접근제한자를 이용해서 소스 간단하게 하기
	// 접근 제한자(public, protected, private)를 생성자(constructor) 파라미터에 선언하면
	// 접근 제한자가 사용된 생성자 파라미터는 암묵적으로 클래스 프로퍼티로 선언된다.
	constructor(private boardsService: BoardsService) {
	// 	// this.boardsService = boardsService;
	}

	@Get('/')
	getAllBoards(): Promise<Board[]> {
		return this.boardsService.getAllBoards();
	}

	@Post('/')
	@UsePipes(ValidationPipe)
	createBoard(@Body() createBoardDto: CreateBoardDto): Promise<Board> {
		return this.boardsService.createBoard(createBoardDto);
	}

	@Get('/:id')
	getBoardById(@Param('id') id: number): Promise<Board> {
		return this.boardsService.getBoardById(id);
	}

	@Delete('/:id')
	deleteBoard(@Param('id', ParseIntPipe) id: number): Promise<void> {
		return this.boardsService.deleteBoard(id);
	}

	@Patch('/:id/status')
	updateBoardStatus(
		@Param('id') id: number,
		@Body('status', BoardStatusValidationPipe) status: BoardStatus){
		return this.boardsService.updateBoardStatus(id, status);
	}

}
