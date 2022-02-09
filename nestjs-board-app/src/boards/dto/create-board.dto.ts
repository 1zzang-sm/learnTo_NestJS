import { IsNotEmpty } from "class-validator";

/**
 * dto는 class와 interface 둘다 사용 가능하나 
 * class는 interface와 다르게 런타임에서 작동하기 때문에 
 * 파이프 같은 기능을 이용할때 더 유용하다.
 */ 
export class CreateBoardDto {
	@IsNotEmpty()
	title: string;
	
	@IsNotEmpty()
	description: string;
}