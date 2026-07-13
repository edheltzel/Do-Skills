# Designing for Mockability

*Adapted from Matt Pocock's skills (github.com/mattpocock/skills, MIT).*

Mock only at system boundaries — external APIs, databases (prefer a test DB), time, randomness, the filesystem. Never mock your own modules, internal collaborators, or anything you control. At the boundaries you *do* mock, design the interface so mocking stays trivial.

## Use dependency injection

Pass external dependencies in rather than constructing them internally:

```typescript
// Easy to mock
function processPayment(order, paymentClient) {
  return paymentClient.charge(order.total);
}

// Hard to mock
function processPayment(order) {
  const client = new StripeClient(process.env.STRIPE_KEY);
  return client.charge(order.total);
}
```

## Prefer SDK-style interfaces over generic fetchers

Give each external operation its own function instead of one generic call with conditional logic:

```typescript
// GOOD: each function is independently mockable
const api = {
  getUser: (id) => fetch(`/users/${id}`),
  getOrders: (userId) => fetch(`/users/${userId}/orders`),
  createOrder: (data) => fetch('/orders', { method: 'POST', body: data }),
};

// BAD: mocking requires conditional logic inside the mock
const api = {
  fetch: (endpoint, options) => fetch(endpoint, options),
};
```

The SDK shape means each mock returns one specific shape, no conditional logic in test setup, it is obvious which endpoints a test exercises, and type safety holds per endpoint.
