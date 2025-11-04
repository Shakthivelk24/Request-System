# 1️⃣ Register Two Users

### POST /api/users/register

## User A
```json
{
  "username": "userA",
  "email": "a@example.com",
  "password": "123456"
}
```

## User B
```json
{
  "username": "userB",
  "email": "b@example.com",
  "password": "123456"
}
```
<br />

#  2️⃣ Login Both Users

### POST /api/users/login

## Get: <br />
User A token <br />
User B token <br />
Save them separately. <br />
<br />
# 3️⃣ Send a Request (as User A → to User B)
## Use User A’s token in headers.
### POST /api/requests/send
#### Headers
```
Authorization: Bearer <UserA_Token>
```
#### Body
```json
{
  "receiverId": "<UserB_ID_from_DB>",
  "message": "Can I borrow your data science book?"
}
```
✅ Now the request belongs to: <br/>

sender → User A <br/>

receiver → User B <br/>
<br />
# 4️⃣ Check Requests (as User B)
Use User B’s token.
### GET /api/requests/received
#### Headers
```
Authorization: Bearer <UserB_Token>
```

```status
{
  "success": true,
  "request": {
    "sender": "6909a07de98d1fee6c359a38",   // User A (you)
    "receiver": "6909a08be98d1fee6c359a3b", // User B
    "message": "Can I borrow your data science book?",
    "status": "pending",
    "_id": "6909a16be98d1fee6c359a40",     // ✅ This is your <requestId>
    "createdAt": "2025-11-04T06:47:07.304Z",
    "__v": 0
  }
}
```
You’ll see the pending request from User A.
<br />
# 5️⃣ Update Status (as User B)
### PUT /api/requests/status/<requestId>
#### Headers
```
Authorization: Bearer <UserB_Token>
```
#### Body:
```json
{
  "status": "accepted"
}
```
##### ✅ Response: "Status updated successfully"
