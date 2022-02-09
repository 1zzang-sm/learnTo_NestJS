// 모델을 정의하기 위해서는 Class를 이용하거나 Interface를 이용하면 됨
// interface -> 변수의 타입만을 체크한다.
// classes -> 변수의 타입도 체크하고 인스턴스 또한 생성할 수가 있다.
// 우선 구조만 정의하기 위해 interface를 사용
// export interface Board{
// 	id: string,
// 	title: string,
// 	description: string,
// 	status: BoardStatus,
// }

export enum BoardStatus {
	PUBLIC = 'PUBLIC',
	PRIVATE = 'PRIVATE'
}