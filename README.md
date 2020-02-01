# CookingPay 
: 기부하기 서버

## Todo
- [x] Graphql-Typescript Settings.
- [x] Connection DB - typeorm, .env
- [x] Entities - User, Post, Donation
- [x] User - hashPassword, EmailSignUp
- [x] EmailSignIn
- [x] JWT - createJWT
- [x] JWT - decodeJWT
- [x] GetMyProfile, Middleware - privateResolvers
- [x] Entity - PostImage, Post - photoUrls, Resolvers - CreatePost
- [x] GetAllPost
- [x] Deploy - Build
- [x] Deploy - Aws Lambda - No Success.
- [x] Entity - Chat, CommonMessage(PublicMessage, PrivateMessage)
- [x] Bug fixed (Private/PublicMessage - text)
- [x] SendPublicMessage
- [x] PubSub - PublicMessage / Subscription - SubscriptionPublicMessage
- [x] GetPublicMessage - No Login: Fake Message
- [x] GetPublicMessage - relations['writer']
- [x] EmailSignUp - Photo
- [x] UpdateMyProfile / Utils - Cloudniary.v2(Destroy)

## Todo - 2
- [] UserTimeline
- [] PrivateChat ( User 1:1 Chat)
- [] CreateDonation

## Install
1. yarn add graphql graphql-yoga typescript ts-node nodemon.
2. yarn add typeorm.
3. yarn add graphql-to-typescript graphql-merge graphql-tools merge-graphql-schemas @types/graphql-merge
4. yarn add gql-merge
5. yarn add @babel/runtime -> babel-runtime
6. yarn add dotenv
7. yarn add pg
8. yarn add class-validator
9. yarn add bcryptjs @types/bcryptjs
10. yarn add jsonwebtoken @types/jsonwebtoken
11. yarn add cors helmet morgan @types/morgan @types/helmet
12. yarn add copy
13. npm install -g serverless - AWS
14. yarn add serverless-plugin-typescript -AWS
15. npm i serverless-offline serverless-plugin-typescript --save-dev - AWS
16. npm i @types/aws-lambda --save-dev - AWS
17. yarn add serverless-offline
18. yarn add cloudinary

## Subscription
> [주의점]
> > 채널을 잘 맞추어야하며, pubSub에서 publish할때(메시지 구독을 전송), resolvers의 subscribe의 이름을 잘 맞추어 적어주도록 한다.

> 0. 일반적인 Subscirption
> > 1) 단순히 pubSub객체를 넣어서(app.ts에서 context의 값으로 전달 후), resolvers의 세번째 인자(context)의 { pubSub }에서 [subscribe명칭, 채널명]을 맞추어 전송
> > 2) Subscription에서 pubSub.asyncIterator("채널명"); 을 통해서 구독한다.
> > 3) 추가적으로 withFilter를 사용한다면, resolvers의 첫번째 인자에 (payload)에서 const { subscribe명: { messageId }} = payload; 를 통해서 messageId로 DB검색 후 구독하는 방식의 검증된 메시지 형식으로 구독 가능하다.( 이때, withFilter()의 실행 순서는 맨 처음 구독에 대해서는 첫번째 함수 실행하며, 그 이후의 구독에 대해서는 두번째 함수의 값의 boolean형식의 return값이 true인경우만 첫번째 함수가 실행되는 방식이다.)


> 1. SubscriptionPublicMessage 방식(순서 중요!)
> > 1) 클라이언트 -> Subscription 구독
> > 2) index.ts의 subscripions의 onConnect 콜백됨. -> 이때, 현재 로그인 유저를 context객체의 currentUser에 넣어 전달한다. (비 로그인유저는 null값)
> > 3) app.ts의 constructor의 context에 위의 2번 { currentUser } 값이 전달됨.(이때 초기에 생성된 pubSub값도 함께 전달됨.)
> > 4) SubscriptionPublicMessage가 실행됨. 
> > 5) withFilter의 (_, __, { pubSub, context })에서 context의 currentUser객체에 따라서 다른 채널로 맞춘다. 왜냐? 로그인 유저의 경우 올바른 메시지가 보임, 하지만 로그인 유저가 아닌경우는, FAKE 메시지가 보이도록 한다.
> > 6) payload의 text가 로그인/로그아웃 유저에따라서 다르게 보이게 된다.
> > 7) withFilter(함수1, 함수2)의 두번째 함수2에서 메시지를 DB에서 검증하여 검증된 메시지가 출력되도록 한다.
> > > 정리1: 약간의 낭비되는 소스는 SendPublicMessage의 resolvers에서 pubSub에 로그인과 로그아웃에 맞는 채널 2가지에 전송한다는 단점이 존재. 
> > > 정리2: withFilter()안에 함수로는 첫번째와 두번째의 함수는 다르다. withFilter첫번째 함수는 resolvers의 함수가 들어가며, 두번쨰 인자로는 Filter할 수 있는 함수가 들어간다. 메시지요소인 payload값을 확인가능하다.
> > > 정리3: Subscription하는 유저는 index.ts에서 onConnect에서 context에 currentUser값은 다른 resolvers에서 실행되지 않는다. Subscription하는 유저가 subscribe할때 실행되어서 subscribe의 resolvers의 세번째 인자로만 들어간다. - 이내용은 다음을 이해하도록 하자. [GraphqlServer의 resolvers 함수 인자 + subscriptions의 onConnect()의 리턴 객체 ] 

## Study
- Heroku
 > Heroku의 서버 PORT는 코드상 직접 넣어주면 에러가발생. H10 그래서 환경변수로 설정하여 실행해주도록 한다.