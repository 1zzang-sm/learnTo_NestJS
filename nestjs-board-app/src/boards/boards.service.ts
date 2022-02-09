import { Injectable, NotFoundException } from '@nestjs/common';
import {  BoardStatus } from './board-status.enum';
import { v1 as uuid } from 'uuid';
import { CreateBoardDto } from './dto/create-board.dto';
import { BoardRepository } from './board.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { Board } from './board.entity';

@Injectable()
export class BoardsService {
	
	constructor(
		@InjectRepository(BoardRepository)
		private boardRepository: BoardRepository) {
	}

	async getAllBoards(): Promise<Board[]> {
		return await this.boardRepository.find();
	}

	createBoard(createBoardDto: CreateBoardDto): Promise<Board> {
		return this.boardRepository.createBoard(createBoardDto);
	}

	async getBoardById(id: number): Promise<Board>{
		const found = await this.boardRepository.findOne(id);

		if (!found) {
			throw new NotFoundException(`can not find Board with id ${id}`)
		}
		return found;
	}
	
	async deleteBoard(id: number): Promise<void> {
		const result = await this.boardRepository.delete(id);
		// delete는 remove와 달리 데이터가 존재하지 않아도 영향이 안끼치기 때문에 
		if (result.affected === 0) {
			throw new NotFoundException(`can not find Board with id ${id}`)
		}	
	}

	async updateBoardStatus(id: number, status: BoardStatus): Promise<Board> {
		const findBoard = await this.getBoardById(id);
		findBoard.status = status;
		await this.boardRepository.save(findBoard);
		return findBoard;
	}

}