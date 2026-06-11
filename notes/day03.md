# Day 03 - Docker & MySQL 연동

## 목표

기존 메모리 기반 콘서트 데이터를 실제 데이터베이스(MySQL)로 이전하고 Docker 환경을 구축한다.

---

## 진행 내용

### 1. Docker Desktop 설치

Docker Desktop을 설치하고 정상적으로 Docker Engine이 실행되는지 확인하였다.

```bash
docker --version
docker compose version
docker ps
```

---

### 2. Docker Compose를 이용한 MySQL 컨테이너 구성

`docker-compose.yml` 파일을 생성하여 MySQL 컨테이너를 관리하도록 구성하였다.

```yaml
services:
  mysql:
    image: mysql:8
    container_name: mysql-ticketing
    restart: always
    environment:
      MYSQL_ROOT_PASSWORD: 1234
      MYSQL_DATABASE: ticketing
    ports:
      - "3306:3306"
    volumes:
      - mysql-data:/var/lib/mysql

volumes:
  mysql-data:
```

컨테이너 실행:

```bash
docker compose up -d
```

확인:

```bash
docker ps
```

---

### 3. MySQL 데이터베이스 구성

MySQL 컨테이너에 접속하였다.

```bash
docker exec -it mysql-ticketing mysql -u root -p
```

데이터베이스 확인:

```sql
SHOW DATABASES;
```

---

### 4. concerts 테이블 생성

```sql
CREATE TABLE concerts (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    venue VARCHAR(255) NOT NULL,
    concert_date DATETIME NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

테이블 확인:

```sql
SHOW TABLES;
```

---

### 5. 테스트 데이터 삽입

```sql
INSERT INTO concerts (
    title,
    venue,
    concert_date
)
VALUES (
    'IU Concert',
    'Olympic Stadium',
    '2026-12-25 19:00:00'
);
```

조회:

```sql
SELECT * FROM concerts;
```

결과:

```text
+----+------------+-----------------+---------------------+
| id | title      | venue           | concert_date        |
+----+------------+-----------------+---------------------+
|  1 | IU Concert | Olympic Stadium | 2026-12-25 19:00:00 |
+----+------------+-----------------+---------------------+
```

---

### 6. Node.js - MySQL 연결

패키지 설치:

```bash
npm install mysql2 dotenv
```

DB 연결용 커넥션 풀 생성:

```js
const mysql = require("mysql2/promise");

const pool = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
});
```

---

### 7. 콘서트 API를 DB 기반으로 변경

기존:

```js
const concerts = [...]
```

메모리 배열 사용

변경:

```sql
SELECT * FROM concerts
```

를 사용하여 MySQL에서 직접 조회하도록 수정

#### 전체 조회

```http
GET /concerts
```

#### 단건 조회

```http
GET /concerts/:id
```

---

### 테스트 결과

```bash
curl http://localhost:3000/concerts
```

응답:

```json
[
  {
    "id": 1,
    "title": "IU Concert",
    "venue": "Olympic Stadium"
  }
]
```

```bash
curl http://localhost:3000/concerts/1
```

응답:

```json
{
  "id": 1,
  "title": "IU Concert",
  "venue": "Olympic Stadium"
}
```

---

## 배운 점

* Docker Compose를 이용하여 데이터베이스를 손쉽게 관리할 수 있다.
* MySQL 볼륨을 사용하면 컨테이너 삭제 후에도 데이터가 유지된다.
* Express 서버에서 mysql2의 Connection Pool을 이용해 효율적으로 DB에 접근할 수 있다.
* 메모리 기반 데이터 저장은 서버 재시작 시 데이터가 사라지므로 실제 서비스에서는 DB 사용이 필수적이다.

---

## 다음 목표

1. reservations 테이블 설계
2. 예약 API를 MySQL 기반으로 변경
3. 좌석 중복 예약 방지 구현
4. Redis를 이용한 좌석 선점(Lock) 기능 구현
5. 동시 요청 부하 테스트 진행
