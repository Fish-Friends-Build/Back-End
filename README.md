# Fish-Friends-API

Our API allows users to find and add new fishing spots in their area, and keep a journal of their fishing experiences there.
Fish Friends [front end](https://github.com/Fish-Friends-Build/Front-End) uses this Rest API to display log and display journal entries.

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

## Add Journal Entry
POST: `/api/journals`
```
{
  "numFishCaught": 2,
  "date": "December 22nd, 2019",
  "timeOfDay": "Morning",
  "location": "Hickory Creek",
  "fishType": ["Bass", "Catfish"], -----> not required
  "bait": "worms", -----> not required
  "bankOrBoat": "Bank",
  "waterType": "Freshwater",
  "notes": null
}
```

## Update a Journal Entry
PUT: `/api/journals/:id`
```
{
  "numFishCaught": 2,
  "date": "December 22nd, 2019",
  ...
}
```

## Get All Journal Entries
GET: `/api/journals`
```
returns an array containing all journal entries
```

## Get Users Journal Entries
GET: `/api/journals/user/:id`
```
returns an array containing a single users journal entries
```

## Delete a Journal Entry
DELETE: `/api/journals/:id`
```
Returns 204 on successful delete
```
