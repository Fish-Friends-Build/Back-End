# Fish-Friends-API

Our API allows users to find and add new fishing spots in their area, and keep a journal of their fishing experiences there.

### Check out our [Product Canvas](https://docs.google.com/document/d/1P-Ve0Iq_jYPEkqtdwIR1uMQy9YMYv864oB-QODqNPNw/edit)

# Endpoints

## Register a user
POST: `/api/auth/register` 
```
{
  "username": "bestfisherman",
  "password": "mysecretthing"
}
```

## Login a user
POST: `/api/auth/login`
```
{
  "username": "bestfisherman",
  "password": "mysecretthing"
}
```