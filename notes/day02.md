# Day02

## 완료

- 공연 상세 조회 API 구현
- Router 분리
- 예매 생성 API 구현
- 예매 조회 API 구현
- 예매 취소 API 구현
- GitHub Push 완료

---

## 구현한 API

### 공연 API

http GET /concerts GET /concerts/:id 

### 예매 API

http POST /reservations GET /reservations GET /reservations/:id DELETE /reservations/:id 

---

## 배운 점

### Router 분리

기존에는 모든 코드를 app.js에 작성했지만, 기능별로 Router를 분리하여 관리할 수 있다는 것을 배웠다.

text routes/  ├ concertRoutes.js  └ reservationRoutes.js 

---

### URL Parameter

http GET /concerts/:id 

요청에서

js req.params.id 

를 통해 URL 값을 받아올 수 있다.

---

### Request Body

http POST /reservations 

요청에서

js req.body 

를 통해 JSON 데이터를 받아올 수 있다.

---

### HTTP 상태 코드

js res.status(201) res.status(400) res.status(404) 

상황에 따라 적절한 상태 코드를 반환해야 한다.

---

### 배열 데이터 처리

js find() findIndex() push() splice() 

를 활용하여 간단한 데이터 저장 및 조회 기능을 구현하였다.

---

## 문제 해결

### GitHub Push 실패

원인

- 원격 저장소에 README가 이미 존재

해결

bash git pull origin main --allow-unrelated-histories --no-rebase 

이후 충돌을 해결하고 Merge Commit 수행

---

### nextReservationId 오류

에러

text ReferenceError: nextReservationId is not defined 

원인

- 변수 선언 누락 (변수명이 길어서 오타가 있었음. nextReservatioinId < i가 잘못 삽입됨.>)

해결

js let nextReservationId = 1; 

추가 후 서버 재실행

---

## 느낀 점

처음으로 단순 서버 실행을 넘어 실제 CRUD 형태의 API를 구현하였다.

특히 GET, POST, DELETE 요청을 직접 테스트하며 브라우저와 서버가 데이터를 주고받는 과정을 이해할 수 있었다.

또한 Router 분리를 통해 실무에서 사용하는 프로젝트 구조를 경험하였다.

---

## 다음 목표

- PUT API 구현
- 좌석 중복 예매 방지
- Service Layer 분리
- 예외 처리 개선
- Deep Dive 19~21장 학습