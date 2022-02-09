# Nest JS 기본 구조

### eslintrc.js 
- 개발자들이 특정한 규칙을 가지고 코드를 깔끔하게 작성할 수 있게 도와주는 라이브러리
- 타입스크립트를 쓰는 가이드 라인 제시, 문법에 오류가 나면 알려주는 역할 등등

### prettierrc
- 주로 코드 형식을 맞추는데 사용한다. 
- 작은따옴표(')를 사용할지 큰 따옴표(")를 사용할지, indent 값을 2로 줄지 4로 줄지 등등 
- 에러 찾는 것이 아닌 코드 포멧터 역할

### nest-cli.json
- nest 프로젝트를 위해 특정한 설정을 할 수 있는 json파일

### tsconfig.json
- 어떻게 타입스크립트를 컴파일 할지 설정 

### tsconfig.build.json
- tsconfig.json의 연장선상 파일이며, build를 할 때 필요한 설정들
- "excludes" 에서는 빌드할 때 필요없는 파일들 명시

### package.json 
- build: 운영환경을 위한 빌드
- format: 린트에러가 났을지 수정 
- start: 앱 시작

### module 생성 명령어
- nest g module boards
- nest: using nestcli
- g: generate
- module: shematic that i want to create
- boards: name of the schematic

### controller 생성 명령어
- nest g controller boards --no-spec
nest: using nestcli (nestcli를 이용하겠다.)
g: generate
controller: controller shematic
boards: name of the schematic
--no-spec: 테스트를 위한 소스 코드 생성x

### CLI로 명령어 입력 시 Controller 만드는 순서
1. cli는 먼저 boards 폴더 찾기
2. boards 폴더 안에 controller 파일 생성
3. boards 폴더 안에 module 파일 찾기
4. module 파일 안에다가 controller 넣어주기

### service 생성 명령어
- nest g service boards --no-spec
- @Injectable()가 있어 다른 컴포넌트에서 이 서비스를 사용 할 수 있게 만들어준다.
- controller에서 service를 사용하려면 생성자에 선언하여 DI 해야함.

### NEstJS Providers, Service ?
### Proviers 란?
- Provier는 Nest의 기본 개념입니다. 대부분의 기본 Nest 클래스는 서비스, 리포지토리, 팩토리, 헬퍼등 프로바이더로 취급될 수 있습니다.
- 프로바이더의 주요 아이디어는 <종속성으로 주입>할 수 있다는 것입니다. 
- 즉, 객체는 서로 다양한 관계를 만들 수 있으며 객체의 인스턴스를 "연결"하는 기능은 대부분 Nest 런타임 시스템에 위임될 수 있습니다.

### Service 란?
- 서비스는 소프트웨어 개발내의 공통 개념이며, NestJS, Javascript에서만 쓰이는 개념이 아닙니다.
- @Injectable 데코레이터로 감싸져서 모듈에 제공되며, 이 서비스 인스턴스는 애플리케이션 전체에서 사용 될 수 있다.
- 서비스는 컨트롤러에서 데이터의 유효성 체크를 하거나 데이터베이스에 아이템을 생성하는 등의 작업을 하는 부분을 처리합니다.

### DTO (Data Transfer Object)
- 계층간 데이터 교환을 위한 객체
- DB에서 데이터를 얻어 Service or Controller 등으로 보낼 때 사용하는 객체를 말한다.
- DTO는 데이터가 네트워크를 통해 전송되는 방법을 정의하는 객체입니다.
- interface나 class를 이용해서 정의 될 수 있습니다.( 하지만 클래스를 이용하는 것을 Nest JS에서 추천하고 있다. )

### 쓰는 이유
- 데이터 유효성을 체크하는데 효율적이다.
- 더 안정적인 코드로 만들어 준다. 타입스크립트의 타입으로도 사용 된다.

### Pipe ?
- 파이프는 @Injectable() 데코레이터로 주석이 달린 클래스이다.
- 파이프는 data transformation(데이터 변형)과 data validation(데이터 유효성 체크)를 위해서 사용 된다.
- 파이프는 컨트롤러 경로 처리기에 의해 처리되는 인수에 대해 작동한다.
- Nest는 메소드가 호출되기 직전에 파이프를 삽입하고 파이프는 메소드로 향하는 인수를 수신하고 이에 대해 작동합니다.

### Data Transformation?
- 입력 데이터를 원하는 형식으로 변환( 예: 문자열에서 정수로 )
- 만약 숫자를 받길 원하는데 문자열 형식으로 온다면 파이프에서 자동으로 숫자로 바꿔준다.
 String to Integer Ex) string '7' => Integer 7

 ### Data Validation?
 - 입력 데이터를 평가하고 유효한 경우 변경되지 않은 상태로 전달하면 된다.
 - 그렇지 않으면 데이터가 올바르지 않을 때 예외를 발생시킨다.
 - 만약 이름의 길이가 10자 이하여야 하는데 10자 이상 되면 에러를 발생시킨다.

 ### 파이프는 위에 두가지 모든 경우에서...
 - 라우터 핸들러(Route Handler)가 처리하는 인수에 대해서 작동합니다.
 - 그리고 파이프는 메소드를 바로 직전에 작동해서 
 - 메소드로 향하는 인수에 대해서 변환할 것이 있으면 변환하고 유효성 체크를 위해서도 호출됩니다.

 ### PIPE 사용하는 방법(Binding Pipes)
 - 파이프를 사용하는 방법은 세가지로 나눠질 수 있다.
 1. Handler-level Pipes
 2. Parameter-level Pipes
 3. Global-level Pipes
 - 이름에서 말하는 것 그대로 핸들러 레벨, 파라미터 레벨, 글로벌 레벨로 파이프 사용할 수 있다.

 ### Hanlder-level Pipes 
 - 핸들러 레벨에서 @UsePipes() 데코레이터를 이용해서 사용 할 수 있습니다.
 - 이 파이프는 모든 파라미터에 적용이 됩니다.
 - ex) @Get('/a')
	@UsePipes(pipe)
	tempMethod(@Body.....){}

 ### Parameter-level Pipes
 - 파라미터 레벨의 파이프 이기에 특정한 파라미터에게만 적용되는 파이프 입니다.
 - ex) @Body('title', ParameterPipe) title: string

 ### Global Pipes
 - 글로벌 파이프로서 애플리케이션 레벨의 파이프입니다.
 - 클라이언트에서 들어오는 모든 요청에 적용이 됩니다.
 - 가장 상단 영역인 main.ts에 넣어주시면 됩니다.
 - ex ) async function bootstrap(){
	 const app = await NestFactory.create(AppModule);
	 app.useGlobalPipes(GlobalPipes);
	 await app.listen(3000);
 }

 ### Built-in Pipes
 - Nest JS에 기본적으로 사용할 수 있게 만들어 놓은 6가지 파이프가 있다.
 - ValidationPipe
 - ParseIntPipe
 - ParseBoolPipe
 - ParseArrayPipe
 - ParseUUIDPipe
 - DefaultValuePipe
 - 이름을 보면 각각의 파이프가 어떠한 역할을 하는지 짐작을 할 수 있다. 
 - ex..ParseIntPipe
 - ex) @Get(':id') 
	findOne(@Param('id', ParseIntPipe) id:number){...}
 - localhost:3000/abc 라고 숫자가 아닌 문자로 요청할 경우 에러가 발생하지 않지만,
 - ParseIntPipe가 에러를 발생하게 한다.

### 파이프를 이용한 유효성 체크
### 필요한 모듈
- class-validator, class-transformer
- npm install class-validator class-transformer --save
Documentation page
- https://github.com/typestack/class-validator#manual-validation

### 커스텀 파이프 구현 방법
- 먼저 PipeTransform이란 인터페이스를 새롭게 만들 커스텀 파이프에 구현해줘야 합니다.
- 이 PipeTransform 인터페이스는 모든 파이프에서 구현해줘야 하는 인터페이스입니다.
- 그리고 이것과 함께 모든 파이프는 transform() 메소드가 필요합니다.
- 이 메소드는 NestJS가 인자(arguments)를 처리하기 위해서 사용됩니다.

### transform() method
- 이 메소드는 두개의 파라미터를 가진다.
- 첫번째 파라미터는 처리가 된 인자의 값(value)이며,
  두번째 파라미터는 인자에 대한 메타 데이터를 포함한 객체입니다.
- transform() 메소드에서 Return된 값은 Route Handler로 전해진다.
만약 예외(Exception)가 발생하면 클라이언트에 바로 전해진다.

### TypeORM(Object Relational Mapping)
### TypeORM?
- TypeORM은 node.js에서 실행되고 TypeScript로 작성된 객체 관계형 매퍼 라이브러리이다.
- TypeORM은 MySQL, PostgresSQL, MariaDB, SQLite, MS SQL Server, Oracle, SAP Hana 및 WebSQL과 같은 여러 데이터베이스를 지원합니다.

### ORM(Object Relational Mapping)
- 객체와 관계형 데이터베이스의 데이터를 자동으로 변형 및 연결하는 작업
- ORM을 이용한 개발은 객체와 데이터베이스의 변형에 유연하게 사용할 수 있다.

### TypeORM 특징과 이점
- 모델을 기반으로 데이터베이스 테이블 체계를 자동으로 생성한다.
- 데이터베이스에서 개체를 쉽게 삽입, 업데이트 및 삭제할 수 있습니다.
- 테이블 간의 매핑( 일대일, 일대 다 및 다 대다 )을 만든다.
- 간단한 CLI 명령을 제공한다.

- TypeORM은 간단한 코딩으로 ORM 프레임 워크를 사용하기 쉽습니다.
- TypeORM은 다른 모듈과 쉽게 통합됩니다. 

### TypeORM을 사용하기 위해서 설치해야하는 모듈들
@nestjs/typeorm
- NestJS에서 TypeOrm을 사용하기 위해 연동시켜주는 모듈
typeorm
- TypeORM 모듈
pg
- Postgres 모듈
npm install pg typeorm @nestjs/typeorm --save
다큐멘테이션:
https://docs.nestjs.com/techniques/database 

### 왜 Entity를 생성해야하나요?