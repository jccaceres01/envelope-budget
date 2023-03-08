# Envelope Budgeting

## Api description:

The envelope budgeting method is a simple, systematic way of saving money and paying bills. The method helps you set aside what you need for bills while maintaining a personal budget. It is a popular budgeting system and can be implemented with personal finance software as well.

## Data structure:

Our api data structure only have one component model, the envelope, the entities representing this model, is stored as an array of envelopes called, envelopes.

### Structure of the envelope model: 

```
{
  id: [string] (auto_generated),
  title: [string],
  budget: [number]
}
```

### End-Point explanation:

> **/envelopes (GET)**:
>
> Get all envelopes in the database.

> **/envelopes/:envelopeID (GET)**:
>
> Get envelope by specific ID.


> **/envelopes (POST)**:
>
> Add new envelope to the database.

> **/envelopes/:envelopeId (PUT)**:
>
> Update the envelope with the specific ID with the new data in the body of the request.

> **/envelopes/:envelopeId (DELETE)**:
>
> Drop the envelope with the specific ID from the database.

> **/envelopes/transfer/:from/:to (GET)**:
>
> Transfer the budget from the envelope specified by parameter:  [from] to the envelope specified by the parameter: [to]

> **/envelopes/distribution (POST)**:
>
> Add to every envelope the value specified in body (amount) divided by the total envelopes count in the array.