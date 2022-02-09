import { BadRequestException, PipeTransform } from "@nestjs/common";
import { BoardStatus } from "../board-status.enum";

export class BoardStatusValidationPipe implements PipeTransform {

	readonly StatusOptions = [
		BoardStatus.PRIVATE,
		BoardStatus.PUBLIC
	]
	transform(value: any) {
		value = value.toUpperCase();
		
		if (!this.isStatusValid(value)) {
			throw new BadRequestException(`${value} is not in the status options`)
		}
		return value;
	}

	private isStatusValid(status: any) {
		const index = this.StatusOptions.indexOf(status);
		// index가 -1면 false, -1이 아니면 true
		return index !== -1;
	}
} 